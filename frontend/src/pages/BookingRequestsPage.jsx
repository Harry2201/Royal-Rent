import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { BOOKING_STATUS, ROLES } from '../utils/constants';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

export default function BookingRequestsPage() {
  const { user, isOwner } = useAuth();
  const { bookings, loading, fetchBookings, approveBooking, declineBooking } =
    useBookings();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const list =
    isOwner || user?.role === ROLES.ADMIN
      ? bookings.filter((b) => b.ownerId === user?.id || user?.role === ROLES.ADMIN)
      : bookings.filter((b) => b.customerId === user?.id);

  const handleApprove = async (id) => {
    await approveBooking(id);
    toast.success('Approved');
  };

  const handleDecline = async (id) => {
    await declineBooking(id);
    toast.success('Declined');
  };

  return (
    <div>
      <h1 className="heading-section">Bookings</h1>
      <p className="text-body mt-2 text-sm">
        {isOwner ? 'Incoming requests for your listings.' : 'Your rental requests.'}
      </p>

      {loading ? (
        <LoadingSpinner />
      ) : list.length === 0 ? (
        <p className="mt-12 text-sm text-royal-muted">No booking requests.</p>
      ) : (
        <ul className="mt-10 space-y-4">
          {list.map((b) => (
            <li
              key={b.id}
              className="card-surface flex flex-wrap gap-4 p-5 md:p-6"
            >
              <img
                src={b.dressImage}
                alt=""
                className="h-20 w-16 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{b.dressTitle}</p>
                <p className="mt-1 text-sm text-royal-muted">
                  {isOwner ? b.customerName : b.ownerName} · {b.startDate} — {b.endDate}
                </p>
                {b.message && (
                  <p className="mt-2 text-sm text-royal-muted">{b.message}</p>
                )}
                <p className="text-label mt-3">{b.status}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-medium">
                  ₹{b.totalPrice?.toLocaleString('en-IN')}
                </span>
                {isOwner && b.status === BOOKING_STATUS.PENDING && (
                  <div className="flex gap-2">
                    <Button className="!py-2 !px-3 text-xs" onClick={() => handleApprove(b.id)}>
                      Approve
                    </Button>
                    <Button
                      variant="ghost"
                      className="!py-2 !px-3 text-xs"
                      onClick={() => handleDecline(b.id)}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
