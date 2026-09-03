export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },
  dresses: {
    list: '/dresses',
    detail: (id) => `/dresses/${id}`,
    create: '/dresses',
    update: (id) => `/dresses/${id}`,
    delete: (id) => `/dresses/${id}`,
    myListings: '/dresses/my-listings',
    search: '/dresses/search',
  },
  wishlist: {
    list: '/wishlist',
    add: (dressId) => `/wishlist/${dressId}`,
    remove: (dressId) => `/wishlist/${dressId}`,
  },
  bookings: {
    list: '/bookings',
    create: '/bookings',
    update: (id) => `/bookings/${id}`,
    incoming: '/bookings/incoming',
    outgoing: '/bookings/outgoing',
  },
  users: {
    profile: '/users/profile',
    update: '/users/profile',
  },
  admin: {
    overview: '/admin/overview',
    users: '/admin/users',
    dresses: '/admin/dresses',
  },
};
