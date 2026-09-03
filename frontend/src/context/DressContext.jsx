import { createContext, useContext, useState, useCallback } from 'react';
import * as dressService from '../services/dressService';
import { useAuth } from './AuthContext';

const DressContext = createContext(null);

const defaultFilters = {
  search: '',
  city: '',
  category: '',
  occasion: '',
  gender: '',
  minPrice: '',
  maxPrice: '',
};

export function DressProvider({ children }) {
  const { user } = useAuth();
  const [dresses, setDresses] = useState([]);
  const [selectedDress, setSelectedDress] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDresses = useCallback(async (overrideFilters) => {
    setLoading(true);
    setError(null);
    try {
      const merged = { ...filters, ...overrideFilters };
      const result = await dressService.getDresses(merged);
      setDresses(result.data || result);
    } catch (err) {
      setError(err.message || 'Failed to load dresses');
      setDresses([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchDressById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const dress = await dressService.getDressById(id);
      setSelectedDress(dress);
      return dress;
    } catch (err) {
      setError(err.message || 'Dress not found');
      setSelectedDress(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyListings = useCallback(async () => {
    if (!user?.id) return [];
    setLoading(true);
    try {
      const listings = await dressService.getMyListings(user.id);
      setMyListings(listings);
      return listings;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const publishDress = useCallback(
    async (dressPayload) => {
      if (!user) throw new Error('Must be logged in');
      const created = await dressService.createDress(
        dressPayload,
        user.id,
        user.name
      );
      setMyListings((prev) => [created, ...prev]);
      setDresses((prev) => [created, ...prev]);
      return created;
    },
    [user]
  );

  const updateFilters = (partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <DressContext.Provider
      value={{
        dresses,
        selectedDress,
        myListings,
        filters,
        loading,
        error,
        fetchDresses,
        fetchDressById,
        fetchMyListings,
        publishDress,
        updateFilters,
        resetFilters,
        setSelectedDress,
      }}
    >
      {children}
    </DressContext.Provider>
  );
}

export function useDresses() {
  const ctx = useContext(DressContext);
  if (!ctx) throw new Error('useDresses must be used within DressProvider');
  return ctx;
}
