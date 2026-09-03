import { mockDashboardStats } from '../api/mockApi';

const useMock = import.meta.env.VITE_USE_MOCK_API !== 'false';

export async function getDashboardStats(userId, role) {
  if (useMock) return mockDashboardStats(userId, role);
  // Real API: const { data } = await api.get('/dashboard/stats');
  return {
    activeRentals: 0,
    pendingRequests: 0,
    totalListings: 0,
    earnings: 0,
    wishlistCount: 0,
  };
}
