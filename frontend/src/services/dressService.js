import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import { mockDressApi } from '../api/mockApi';
import { computeRecommendations } from '../data/listings';

const useMock = import.meta.env.VITE_USE_MOCK_API !== 'false';

export async function getDresses(filters = {}) {
  if (useMock) return mockDressApi.getAll(filters);
  const { data } = await api.get(ENDPOINTS.dresses.list, { params: filters });
  return data;
}

export async function getDressById(id) {
  if (useMock) return mockDressApi.getById(id);
  const { data } = await api.get(ENDPOINTS.dresses.detail(id));
  return data;
}

export async function getMyListings(ownerId) {
  if (useMock) return mockDressApi.getMyListings(ownerId);
  const { data } = await api.get(ENDPOINTS.dresses.myListings);
  return data;
}

export async function createDress(dress, ownerId, ownerName) {
  if (useMock) return mockDressApi.create(dress, ownerId, ownerName);
  const { data } = await api.post(ENDPOINTS.dresses.create, dress);
  return data;
}

export async function updateDress(id, updates) {
  if (useMock) return mockDressApi.update(id, updates);
  const { data } = await api.patch(ENDPOINTS.dresses.update(id), updates);
  return data;
}

export async function getRecommendations(currentDress, limit = 4) {
  const { data } = await getDresses({});
  return computeRecommendations(currentDress, data, limit);
}
