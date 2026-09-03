import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const customerLinks = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/bookings', label: 'Bookings' },
  { to: '/settings', label: 'Settings' },
];

const ownerLinks = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/my-listings', label: 'Listings' },
  { to: '/upload-dress', label: 'Upload' },
  { to: '/bookings', label: 'Bookings' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/settings', label: 'Settings' },
];

const adminLinks = [...ownerLinks, { to: '/admin', label: 'Admin' }];

export default function DashboardSidebar({ mobileOpen, onClose }) {
  const { user, isOwner, isAdmin } = useAuth();
  const links = isAdmin ? adminLinks : isOwner ? ownerLinks : customerLinks;

  const nav = (
    <nav className="flex flex-col gap-0.5 p-4">
      <p className="text-label mb-6 px-3">{user?.name?.split(' ')[0]}</p>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          onClick={onClose}
          className={({ isActive }) =>
            `rounded-md px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? 'bg-royal-cream font-medium text-white'
                : 'text-royal-muted hover:bg-royal-bg hover:text-royal-cream'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
      <NavLink
        to="/explore"
        onClick={onClose}
        className="mt-6 px-3 py-2.5 text-sm text-royal-muted hover:text-royal-cream"
      >
        ← Explore
      </NavLink>
    </nav>
  );

  return (
    <>
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24 border border-royal-border bg-white">
          {nav}
        </div>
      </aside>
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 border-r border-royal-border bg-white pt-20 transition-transform lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {nav}
      </aside>
    </>
  );
}
