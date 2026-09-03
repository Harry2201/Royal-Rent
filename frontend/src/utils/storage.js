import { STORAGE_KEYS } from './constants';

export function getStorage(persist = true) {
  return persist ? localStorage : sessionStorage;
}

export function getToken() {
  return (
    localStorage.getItem(STORAGE_KEYS.TOKEN) ||
    sessionStorage.getItem(STORAGE_KEYS.TOKEN)
  );
}

export function setToken(token, persist = true) {
  clearToken();
  getStorage(persist).setItem(STORAGE_KEYS.TOKEN, token);
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
}

export function getStoredUser() {
  const raw =
    localStorage.getItem(STORAGE_KEYS.USER) ||
    sessionStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user, persist = true) {
  clearStoredUser();
  getStorage(persist).setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEYS.USER);
  sessionStorage.removeItem(STORAGE_KEYS.USER);
}

export function clearAuthStorage() {
  clearToken();
  clearStoredUser();
}
