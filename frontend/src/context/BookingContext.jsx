import { createContext, useContext, useState, useCallback } from 'react';
import * as bookingService from '../services/bookingService';
import { useAuth } from './AuthContext';
import { BOOKING_STATUS } from '../utils/constants';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!user) return [];
    setLoading(true);
    try {
      const data = await bookingService.getBookings(user.id, user.role);
      setBookings(data);
      return data;
    } catch {
      setBookings([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createBooking = async (payload) => {
    if (!user) throw new Error('Authentication required');
    const booking = await bookingService.createBooking({
      ...payload,
      customerId: user.id,
      customerName: user.name,
    });
    setBookings((prev) => [booking, ...prev]);
    return booking;
  };

  const approveBooking = (id) => updateBookingStatus(id, BOOKING_STATUS.APPROVED);
  const declineBooking = (id) => updateBookingStatus(id, BOOKING_STATUS.DECLINED);

  const updateBookingStatus = async (id, status) => {
    const updated = await bookingService.updateBookingStatus(id, status);
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  };

  const incomingRequests = bookings.filter(
    (b) => b.ownerId === user?.id && b.status === BOOKING_STATUS.PENDING
  );
  const outgoingRequests = bookings.filter((b) => b.customerId === user?.id);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        incomingRequests,
        outgoingRequests,
        fetchBookings,
        createBooking,
        approveBooking,
        declineBooking,
        updateBookingStatus,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings must be used within BookingProvider');
  return ctx;
}
