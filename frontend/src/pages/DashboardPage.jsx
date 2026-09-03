import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import StatCard from '../components/dashboard/StatCard';
import { getDashboardStats } from '../services/dashboardService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import { ROLES } from '../utils/constants';

export default function DashboardPage() {
  const { user, isOwner, isAdmin } = useAuth();
  const { bookings, fetchBookings } = useBookings();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      await fetchBookings();
      const s = await getDashboardStats(user.id, user.role);
      setStats(s);
      setLoading(false);
    }
    if (user) load();
  }, [user, fetchBookings]);

  if (loading) return <LoadingSpinner label="Loading…" />;

  const activeRentals = bookings.filter((b) => b.status === 'approved').slice(0, 3);

  return (
    <div>
      <h1 className="heading-section">Overview</h1>
      <p className="text-body mt-2 text-sm">
        Welcome back, {user?.name?.split(' ')[0]}.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active rentals" value={stats?.activeRentals ?? 0} />
        <StatCard label="Pending requests" value={stats?.pendingRequests ?? 0} />
        {(isOwner || isAdmin) && (
          <>
            <StatCard label="Listings" value={stats?.totalListings ?? 0} />
            <StatCard
              label="Earnings"
              value={`₹${(stats?.earnings ?? 0).toLocaleString('en-IN')}`}
              hint="Approved & completed"
            />
          </>
        )}
        {user?.role === ROLES.CUSTOMER && (
          <StatCard label="Wishlist" value={stats?.wishlistCount ?? 0} />
        )}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section className="card-surface p-6 md:p-8">
          <h2 className="text-sm font-medium">Active rentals</h2>
          {activeRentals.length === 0 ? (
            <p className="text-body mt-4 text-sm">No active rentals.</p>
          ) : (
            <ul className="mt-6 space-y-4">
              {activeRentals.map((b) => (
                <li key={b.id} className="flex gap-4 border-b border-royal-border pb-4 last:border-0">
                  <img
                    src={b.dressImage}
                    alt=""
                    className="h-16 w-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{b.dressTitle}</p>
                    <p className="text-xs text-royal-muted">
                      {b.startDate} — {b.endDate}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link to="/bookings" className="mt-6 inline-block text-sm font-medium hover:underline">
            View bookings →
          </Link>
        </section>

        <section className="card-surface p-6 md:p-8">
          <h2 className="text-sm font-medium">Quick actions</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/explore">
              <Button>Explore</Button>
            </Link>
            {(isOwner || isAdmin) && (
              <Link to="/upload-dress">
                <Button variant="ghost">Upload</Button>
              </Link>
            )}
            <Link to="/wishlist">
              <Button variant="ghost">Wishlist</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
