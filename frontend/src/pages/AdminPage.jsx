import { useAuth } from '../context/AuthContext';
import StatCard from '../components/dashboard/StatCard';

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="heading-section">Admin</h1>
      <p className="text-body mt-2 text-sm">
        Signed in as {user?.name}. This screen is a Phase 2 placeholder — live
        user, listing, and booking analytics will arrive with the backend.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <StatCard label="Users" value="—" hint="Placeholder" />
        <StatCard label="Listings" value="—" hint="Placeholder" />
        <StatCard label="Bookings" value="—" hint="Placeholder" />
      </div>
    </div>
  );
}
