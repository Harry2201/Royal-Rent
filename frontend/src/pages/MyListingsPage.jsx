import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDresses } from '../context/DressContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import DressCard from '../components/dress/DressCard';

export default function MyListingsPage() {
  const { myListings, fetchMyListings, loading } = useDresses();

  useEffect(() => {
    fetchMyListings();
  }, [fetchMyListings]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="heading-section">My listings</h1>
          <p className="text-body mt-2 text-sm">Dresses you share on the marketplace.</p>
        </div>
        <Link to="/upload-dress">
          <Button>Upload dress</Button>
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : myListings.length === 0 ? (
        <div className="card-surface mt-12 p-12 text-center">
          <p className="text-royal-muted">No listings yet.</p>
          <Link to="/upload-dress" className="mt-6 inline-block">
            <Button className="mt-4">Upload your first dress</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {myListings.map((dress) => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </div>
      )}
    </div>
  );
}
