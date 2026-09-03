import { mockUsers } from '../data/mock/users';
import { mockDresses } from '../data/mock/dresses';
import { mockBookings } from '../data/mock/bookings';
import { ROLES, BOOKING_STATUS } from '../utils/constants';

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

let dressesStore = [...mockDresses];
let bookingsStore = [...mockBookings];
let wishlistStore = ['dress-2', 'dress-7'];

const generateToken = (userId) =>
  `mock_jwt_${userId}_${Date.now().toString(36)}`;

const sanitizeUser = (user) => {
  const { password, ...safe } = user;
  return { ...safe, role: safe.role?.toLowerCase() };
};

export const mockAuthApi = {
  async login({ email, password }) {
    await delay(600);
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) throw { status: 401, message: 'Invalid email or password' };
    return {
      token: generateToken(user.id),
      user: sanitizeUser(user),
    };
  },

  async register(payload) {
    await delay(800);
    const exists = mockUsers.some((u) => u.email === payload.email);
    if (exists) throw { status: 409, message: 'Email already registered' };
    const role =
      payload.userType === 'list' ? ROLES.OWNER : ROLES.CUSTOMER;
    const newUser = {
      id: `user-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      role,
      city: payload.city || 'Bengaluru',
      avatar: null,
    };
    mockUsers.push(newUser);
    return {
      token: generateToken(newUser.id),
      user: sanitizeUser(newUser),
    };
  },

  async me(userId) {
    await delay(300);
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw { status: 401, message: 'Session expired' };
    return sanitizeUser(user);
  },
};

export const mockDressApi = {
  async getAll(filters = {}) {
    await delay(500);
    let results = [...dressesStore].filter((d) => d.status === 'active');

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          (d.brand || '').toLowerCase().includes(q) ||
          d.tags?.some((t) => t.includes(q))
      );
    }
    if (filters.city) results = results.filter((d) => d.city === filters.city);
    if (filters.category)
      results = results.filter((d) => d.category === filters.category);
    if (filters.occasion)
      results = results.filter((d) => d.occasion === filters.occasion);
    if (filters.gender) results = results.filter((d) => d.gender === filters.gender);
    if (filters.minPrice)
      results = results.filter((d) => d.rentalPrice >= Number(filters.minPrice));
    if (filters.maxPrice)
      results = results.filter((d) => d.rentalPrice <= Number(filters.maxPrice));

    return { data: results, total: results.length };
  },

  async getById(id) {
    await delay(400);
    const dress = dressesStore.find((d) => d.id === id);
    if (!dress) throw { status: 404, message: 'Dress not found' };
    return dress;
  },

  async getMyListings(ownerId) {
    await delay(450);
    return dressesStore.filter((d) => d.ownerId === ownerId);
  },

  async create(dress, ownerId, ownerName) {
    await delay(700);
    const today = new Date().toISOString().split('T')[0];
    const defaultTo = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];
    const availability = {
      from: dress.availability?.from ?? today,
      to: dress.availability?.to ?? defaultTo,
      status: dress.availability?.status ?? 'available',
    };
    const images = dress.images?.length ? dress.images : dress.image ? [dress.image] : [];
    const newDress = {
      ...dress,
      id: `dress-${Date.now()}`,
      ownerId,
      ownerName,
      status: 'active',
      rating: 0,
      reviewCount: 0,
      image: images[0] || '',
      images,
      gender: dress.gender ?? 'women',
      availability: {
        ...availability,
        status: availability.status ?? 'available',
      },
      wishlisted: false,
      featured: false,
      uploadedAt: today,
      size: dress.size ?? dress.sizes?.[0] ?? 'M',
    };
    dressesStore = [newDress, ...dressesStore];
    return newDress;
  },

  async update(id, updates) {
    await delay(500);
    const idx = dressesStore.findIndex((d) => d.id === id);
    if (idx === -1) throw { status: 404, message: 'Dress not found' };
    dressesStore[idx] = { ...dressesStore[idx], ...updates };
    return dressesStore[idx];
  },
};

export const mockWishlistApi = {
  async getAll() {
    await delay(350);
    return dressesStore.filter((d) => wishlistStore.includes(d.id));
  },

  async add(dressId) {
    await delay(250);
    if (!wishlistStore.includes(dressId)) wishlistStore.push(dressId);
    return wishlistStore;
  },

  async remove(dressId) {
    await delay(250);
    wishlistStore = wishlistStore.filter((id) => id !== dressId);
    return wishlistStore;
  },
};

export const mockBookingApi = {
  async getForUser(userId, role) {
    await delay(450);
    if (role === ROLES.OWNER) {
      return bookingsStore.filter((b) => b.ownerId === userId);
    }
    if (role === ROLES.ADMIN) return bookingsStore;
    return bookingsStore.filter((b) => b.customerId === userId);
  },

  async create(payload) {
    await delay(600);
    const dress = dressesStore.find((d) => d.id === payload.dressId);
    const booking = {
      id: `booking-${Date.now()}`,
      dressId: payload.dressId,
      dressTitle: dress?.title || 'Dress',
      dressImage: dress?.images?.[0] || dress?.image || '',
      customerId: payload.customerId,
      customerName: payload.customerName,
      ownerId: dress?.ownerId,
      ownerName: dress?.ownerName,
      startDate: payload.startDate,
      endDate: payload.endDate,
      totalPrice: payload.totalPrice,
      status: BOOKING_STATUS.PENDING,
      message: payload.message || '',
      createdAt: new Date().toISOString(),
    };
    bookingsStore = [booking, ...bookingsStore];
    return booking;
  },

  async updateStatus(id, status) {
    await delay(400);
    const idx = bookingsStore.findIndex((b) => b.id === id);
    if (idx === -1) throw { status: 404, message: 'Booking not found' };
    bookingsStore[idx] = { ...bookingsStore[idx], status };
    return bookingsStore[idx];
  },
};

export const mockDashboardStats = async (userId, role) => {
  await delay(400);
  const listings = dressesStore.filter((d) => d.ownerId === userId);
  const bookings =
    role === ROLES.OWNER
      ? bookingsStore.filter((b) => b.ownerId === userId)
      : bookingsStore.filter((b) => b.customerId === userId);

  return {
    activeRentals: bookings.filter((b) => b.status === BOOKING_STATUS.APPROVED).length,
    pendingRequests: bookings.filter((b) => b.status === BOOKING_STATUS.PENDING).length,
    totalListings: listings.length,
    earnings: bookings
      .filter((b) => [BOOKING_STATUS.APPROVED, BOOKING_STATUS.COMPLETED].includes(b.status))
      .reduce((sum, b) => sum + b.totalPrice, 0),
    wishlistCount: wishlistStore.length,
  };
};
