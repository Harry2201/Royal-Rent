import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as wishlistService from '../services/wishlistService';
import { useAuth } from './AuthContext';
import { STORAGE_KEYS } from '../utils/constants';

const WishlistContext = createContext(null);

function loadLocalWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [ids, setIds] = useState(loadLocalWishlist());
  const [loading, setLoading] = useState(false);

  const persistIds = (nextIds) => {
    setIds(nextIds);
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(nextIds));
  };

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const data = await wishlistService.getWishlist();
      setItems(data);
      persistIds(data.map((d) => d.id));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) fetchWishlist();
  }, [isAuthenticated, fetchWishlist]);

  const isWishlisted = (dressId) => ids.includes(dressId);

  const toggleWishlist = async (dress) => {
    const dressId = typeof dress === 'string' ? dress : dress.id;
    const wasWishlisted = isWishlisted(dressId);

    if (!isAuthenticated) {
      const next = wasWishlisted
        ? ids.filter((id) => id !== dressId)
        : [...ids, dressId];
      persistIds(next);
      if (!wasWishlisted && typeof dress === 'object') {
        setItems((prev) => [...prev, dress]);
      } else if (wasWishlisted) {
        setItems((prev) => prev.filter((d) => d.id !== dressId));
      }
      return { added: !wasWishlisted, requiresAuth: true };
    }

    try {
      if (wasWishlisted) {
        await wishlistService.removeFromWishlist(dressId);
        persistIds(ids.filter((id) => id !== dressId));
        setItems((prev) => prev.filter((d) => d.id !== dressId));
        return { added: false };
      }
      await wishlistService.addToWishlist(dressId);
      persistIds([...ids, dressId]);
      if (typeof dress === 'object') setItems((prev) => [...prev, dress]);
      await fetchWishlist();
      return { added: true };
    } catch (err) {
      throw err;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        ids,
        loading,
        isWishlisted,
        toggleWishlist,
        fetchWishlist,
        count: ids.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
