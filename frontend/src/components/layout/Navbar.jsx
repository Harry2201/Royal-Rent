import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar({ transparent = true }) {
  const scrolled = useScrollPosition(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, isOwner, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const solid = !transparent || scrolled;

  const navLinks = [
    { href: '#collections', label: 'Edits' },
    { href: '#how-it-works', label: 'Process' },
    { href: '#stories', label: 'Stories' },
  ];

  const handleAnchor = (e, href) => {
    if (!isLanding) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'border-b border-royal-border bg-white/96 backdrop-blur-md'
          : 'border-b border-transparent bg-white/0'
      }`}
    >
      <nav className="container-immersive flex items-center justify-between gap-6 py-4 md:py-5">

        {/* Wordmark */}
        <Link
          to="/"
          className="font-display text-base font-semibold tracking-tight text-royal-cream md:text-lg"
          style={{ letterSpacing: '-0.02em' }}
        >
          Royale Rent
        </Link>

        {/* Center links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={isLanding ? href : '/'}
              onClick={(e) => handleAnchor(e, href)}
              className="text-[13px] font-medium text-royal-muted transition-colors hover:text-royal-cream"
            >
              {label}
            </a>
          ))}
          <Link
            to="/explore"
            className="text-[13px] font-medium text-royal-muted transition-colors hover:text-royal-cream"
          >
            Marketplace
          </Link>
        </div>

        {/* Right actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-[13px] font-medium text-royal-muted transition-colors hover:text-royal-cream"
              >
                Dashboard
              </Link>
              <Link
                to="/wishlist"
                className="text-[13px] font-medium text-royal-muted transition-colors hover:text-royal-cream"
              >
                Wishlist
              </Link>
              {(isOwner || isAdmin) && (
                <Link
                  to="/upload-dress"
                  className="border border-royal-border px-4 py-2 text-[13px] font-medium transition-colors hover:border-royal-cream"
                >
                  List dress
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="text-[13px] font-medium text-royal-muted transition-colors hover:text-royal-cream"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[13px] font-medium text-royal-muted transition-colors hover:text-royal-cream"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="border border-royal-cream bg-royal-cream px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-royal-accent"
              >
                Join free
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`h-px w-5 bg-royal-cream transition-all ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`h-px w-5 bg-royal-cream transition-all ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-royal-border bg-white lg:hidden"
          >
            <div className="container-immersive flex flex-col gap-0 py-4">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={isLanding ? href : '/'}
                  onClick={(e) => { handleAnchor(e, href); setMenuOpen(false); }}
                  className="border-b border-royal-border py-4 text-sm font-medium text-royal-muted"
                >
                  {label}
                </a>
              ))}
              <Link to="/explore" onClick={() => setMenuOpen(false)} className="border-b border-royal-border py-4 text-sm font-medium text-royal-muted">Marketplace</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="border-b border-royal-border py-4 text-sm font-medium">Dashboard</Link>
                  <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="border-b border-royal-border py-4 text-sm font-medium">Wishlist</Link>
                  {(isOwner || isAdmin) && (
                    <Link to="/upload-dress" onClick={() => setMenuOpen(false)} className="border-b border-royal-border py-4 text-sm font-medium">List dress</Link>
                  )}
                  <button type="button" onClick={handleLogout} className="py-4 text-left text-sm font-medium text-royal-muted">Sign out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="border-b border-royal-border py-4 text-sm font-medium">Sign in</Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="py-4 text-sm font-medium">Join free →</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}