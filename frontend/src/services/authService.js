import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import { mockAuthApi } from '../api/mockApi';
import { getStoredUser } from '../utils/storage';

const useMock = import.meta.env.VITE_USE_MOCK_API !== 'false';

export async function login(credentials) {
  if (useMock) return mockAuthApi.login(credentials);
  const { data } = await api.post(ENDPOINTS.auth.login, credentials);
  return data;
}

export async function register(payload) {
  if (useMock) return mockAuthApi.register(payload);
  const { data } = await api.post(ENDPOINTS.auth.register, payload);
  return data;
}

export async function fetchCurrentUser() {
  if (useMock) {
    const stored = getStoredUser();
    if (!stored?.id) throw { status: 401, message: 'Not authenticated' };
    return mockAuthApi.me(stored.id);
  }
  const { data } = await api.get(ENDPOINTS.auth.me);
  return data;
}

export async function logout() {
  if (useMock) return { success: true };
  const { data } = await api.post(ENDPOINTS.auth.logout);
  return data;
}
