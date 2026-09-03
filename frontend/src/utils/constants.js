export const ROLES = {
  CUSTOMER: 'customer',
  OWNER: 'owner',
  ADMIN: 'admin',
};

export const USER_TYPES = {
  RENT: 'rent',
  LIST: 'list',
};

export const OCCASIONS = [
  'Bridal',
  'Bridal (Groom)',
  'Reception',
  'Farewell',
  'Cocktail',
  'Festive',
  'Sangeet',
  'Mehendi',
];

export const CATEGORIES = [
  'Lehenga',
  'Saree',
  'Gown',
  'Sherwani',
  'Indo-Western',
  'Anarkali',
  'Suit',
];

export const GENDERS = {
  WOMEN: 'women',
  MEN: 'men',
};

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Jaipur',
  'Pune',
  'Kolkata',
  'Lucknow',
];

export const STORAGE_KEYS = {
  TOKEN: import.meta.env.VITE_AUTH_TOKEN_KEY || 'royale_rent_token',
  USER: import.meta.env.VITE_AUTH_USER_KEY || 'royale_rent_user',
  WISHLIST: 'royale_rent_wishlist',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  DECLINED: 'declined',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};
