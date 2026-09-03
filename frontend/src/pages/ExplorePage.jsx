import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import MarketplaceDressCard from '../components/dress/MarketplaceDressCard';
import DressFilters from '../components/dress/DressFilters';
import { useDresses } from '../context/DressContext';
import { useDebounce } from '../hooks/useDebounce';


export default function ExplorePage() {
  const { dresses, filters, loading, fetchDresses, updateFilters, resetFilters } = useDresses();
  const [searchInput, setSearchInput] = useState(filters.search ?? '');
  const debouncedSearch = useDebounce(searchInput, 320);

  useEffect(() => { updateFilters({ search: debouncedSearch }); }, [debouncedSearch]);

  useEffect(() => {
    fetchDresses();
  }, [
    filters.city, filters.category, filters.occasion,
    filters.gender, filters.minPrice, filters.maxPrice, filters.search,
  ]);

  const handleReset = () => { resetFilters(); setSearchInput(''); };

  return (
    <div className="min-h-screen bg-white">
      <Navbar transparent={false} />

      {/* ── Page header ── */}
      <div className="border-b border-royal-border pt-[72px]">
        <div className="container-editorial py-14 md:py-18">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label mb-5">Marketplace</p>
            <h1
              className="font-display font-semibold text-royal-cream"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.035em',
                lineHeight: 1.02,
              }}
            >
              Explore dresses
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-royal-muted">
              Designer rentals across India — curated lehengas, gowns, and sherwanis
              from real wardrobes.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 max-w-xl"
          >
            <div className="flex items-center gap-3 border-b border-royal-cream pb-0">
              {/* Search icon */}
              <svg className="h-4 w-4 shrink-0 text-royal-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search designer, style, occasion…"
                className="flex-1 bg-transparent py-3 text-sm text-royal-cream placeholder:text-royal-muted/50 focus:outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="text-royal-muted/60 transition-colors hover:text-royal-cream"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Filters + Results ── */}
      <div className="container-editorial py-8">
        <DressFilters
          filters={filters}
          onChange={updateFilters}
          onReset={handleReset}
        />

        {/* Results bar */}
        {!loading && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-royal-muted">
              {dresses.length} {dresses.length === 1 ? 'piece' : 'pieces'} available
            </p>
          </div>
        )}

        {/* States */}
        {loading ? (
          <div className="py-32">
            <LoadingSpinner label="Loading collection…" />
          </div>
        ) : dresses.length === 0 ? (
          <EmptyState onReset={handleReset} />
        ) : (
          <div className="marketplace-grid mt-8">
            {dresses.map((dress, i) => (
              <motion.div
                key={dress.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: (i % 8) * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <MarketplaceDressCard dress={dress} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom padding */}
        {!loading && dresses.length > 0 && (
          <div className="mt-20 border-t border-royal-border pt-10 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-royal-muted/50">
              End of collection · {dresses.length} pieces
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* ── Empty state ── */
function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center py-32 text-center"
    >
      {/* Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center border border-royal-border">
        <svg className="h-5 w-5 text-royal-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <p
        className="font-display font-semibold text-royal-cream"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.025em' }}
      >
        No pieces found
      </p>
      <p className="mt-2 max-w-xs text-sm text-royal-muted">
        Try adjusting your filters or search — the perfect look is in here somewhere.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 border border-royal-border px-6 py-2.5 text-sm font-medium text-royal-cream transition-colors hover:border-royal-cream"
      >
        Clear all filters
      </button>
    </motion.div>
  );
}