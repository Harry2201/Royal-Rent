import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import { mockWishlistApi } from '../api/mockApi';

const useMock = import.meta.env.VITE_USE_MOCK_API !== 'false';

export async function getWishlist() {
  if (useMock) return mockWishlistApi.getAll();
  const { data } = await api.get(ENDPOINTS.wishlist.list);
  return data;
}

export async function addToWishlist(dressId) {
  if (useMock) return mockWishlistApi.add(dressId);
  const { data } = await api.post(ENDPOINTS.wishlist.add(dressId));
  return data;
}

export async function removeFromWishlist(dressId) {
  if (useMock) return mockWishlistApi.remove(dressId);
  const { data } = await api.delete(ENDPOINTS.wishlist.remove(dressId));
  return data;
}
