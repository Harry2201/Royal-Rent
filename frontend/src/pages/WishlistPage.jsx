import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import DressCard from '../components/dress/DressCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

export default function WishlistPage() {
  const { items, loading, fetchWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) fetchWishlist();
  }, [isAuthenticated, fetchWishlist]);

  return (
    <div>
      <h1 className="heading-section">Wishlist</h1>
      <p className="text-body mt-2 text-sm">Saved looks for upcoming events.</p>

      {loading ? (
        <LoadingSpinner />
      ) : items.length === 0 ? (
        <div className="card-surface mt-12 p-12 text-center">
          <p className="text-royal-muted">Your wishlist is empty.</p>
          <Link to="/explore" className="mt-6 inline-block">
            <Button>Explore dresses</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((dress) => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </div>
      )}
    </div>
  );
}
