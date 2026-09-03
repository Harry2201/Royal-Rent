import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import { mockBookingApi } from '../api/mockApi';

const useMock = import.meta.env.VITE_USE_MOCK_API !== 'false';

export async function getBookings(userId, role) {
  if (useMock) return mockBookingApi.getForUser(userId, role);
  const endpoint =
    role === 'owner' ? ENDPOINTS.bookings.incoming : ENDPOINTS.bookings.outgoing;
  const { data } = await api.get(endpoint);
  return data;
}

export async function createBooking(payload) {
  if (useMock) return mockBookingApi.create(payload);
  const { data } = await api.post(ENDPOINTS.bookings.create, payload);
  return data;
}

export async function updateBookingStatus(id, status) {
  if (useMock) return mockBookingApi.updateStatus(id, status);
  const { data } = await api.patch(ENDPOINTS.bookings.update(id), { status });
  return data;
}
