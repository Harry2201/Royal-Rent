import { mockDresses } from './mock/dresses';

export const formatRentalPrice = (amount, days = 3) => {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} / ${days}d`;
};

export const getFeaturedListings = () =>
  mockDresses.filter((d) => d.featured && d.status === 'active').slice(0, 4);

export const getDressById = (id) => mockDresses.find((d) => d.id === id);

/** Canonical availability accessor — single schema across mock data and uploads. */
export const getDressAvailability = (dress) => {
  if (!dress) {
    return { from: '', to: '', status: 'available' };
  }
  if (dress.availability) {
    return {
      from: dress.availability.from ?? '',
      to: dress.availability.to ?? '',
      status: dress.availability.status ?? 'available',
    };
  }
  return {
    from: dress.availableFrom ?? '',
    to: dress.availableTo ?? '',
    status: dress.available === false ? 'booked' : 'available',
  };
};

export const isDressAvailable = (dress) => {
  const { status, to } = getDressAvailability(dress);
  if (status === 'booked') return false;
  if (!to) return status === 'available';
  const today = new Date().toISOString().split('T')[0];
  return to >= today;
};

export const computeRecommendations = (currentDress, allDresses, limit = 4) => {
  if (!currentDress) return [];

  const score = (dress) => {
    let points = 0;
    if (dress.category === currentDress.category) points += 3;
    if (dress.occasion === currentDress.occasion) points += 2;
    if (dress.city === currentDress.city) points += 1;
    if (dress.gender === currentDress.gender) points += 1;
    return points;
  };

  return [...allDresses]
    .filter((d) => d.id !== currentDress.id && d.status === 'active')
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
};

/** Sync fallback using seed mock data (prefer dressService.getRecommendations for live store). */
export const getRecommendations = (currentDress, limit = 4) =>
  computeRecommendations(currentDress, mockDresses, limit);
