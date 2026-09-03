// components/MarketplaceDressCard.jsx
// Royale Rent — explore grid card with trust signals and editorial feel.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';

const Stars = ({ rating }) => (
  <span className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <svg key={n} width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path
          d="M5 1l1.12 2.27L8.5 3.64l-1.75 1.7.41 2.41L5 6.5 2.84 7.75l.41-2.41L1.5 3.64l2.38-.37L5 1z"
          fill={n <= Math.round(rating) ? '#0a0a0a' : 'none'}
          stroke="#0a0a0a"
          strokeWidth="0.5"
        />
      </svg>
    ))}
  </span>
);

export default function MarketplaceDressCard({ dress, index = 0 }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [imgLoaded, setImgLoaded] = useState(false);
  const inWishlist = isWishlisted(dress.id);



  // Alternate aspect ratios for visual rhythm
  const isAlt = index % 3 === 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
    >
      <Link to={`/dress/${dress.id}`} className="block group">
        {/* Image container */}
        <div
          className={`relative overflow-hidden bg-royal-offwhite ${
            isAlt ? 'aspect-[4/5]' : 'aspect-[3/4]'
          }`}
        >
          {/* Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-royal-offwhite animate-pulse" />
          )}

          <img
            src={dress.images?.[0] || dress.image}
            alt={dress.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-royal-ink/0 group-hover:bg-royal-ink/10 transition-all duration-300" />

          {/* "View look" reveal */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="bg-white text-royal-ink text-[10px] tracking-[0.14em] uppercase px-4 py-2">
              View look →
            </span>
          </div>

          <button
    onClick={async (e) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        await toggleWishlist(dress);
      } catch (err) {
        console.error('Wishlist error:', err);
      }
    }}
    aria-label={inWishlist ? 'Remove from wishlist' : 'Save'}
    className="absolute top-3 right-3 h-8 w-8 bg-white/90 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-white"
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={inWishlist ? '#0a0a0a' : 'none'}
      stroke="#0a0a0a"
      strokeWidth="1.5"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </button>

          {/* Trust badge — only for top rated */}
          {dress.rating >= 4.8 && (
            <div className="absolute top-3 left-3">
              <span className="bg-royal-ink text-white text-[8px] tracking-[0.12em] uppercase px-2 py-1">
                Top rated
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-3">
          {/* City + category */}
          <p className="text-[9px] tracking-[0.14em] uppercase text-royal-charcoal mb-1.5">
            {dress.city} · {dress.category}
          </p>

          {/* Title + price on same line */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <p className="text-sm leading-snug text-royal-ink flex-1 line-clamp-2">
              {dress.title}
            </p>
            <p className="text-sm font-medium text-royal-ink whitespace-nowrap">
              ₹{(Number(dress.rentalPrice) || 0).toLocaleString('en-IN')}
            </p>
          </div>

          {/* Brand + rating */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-royal-charcoal">{dress.brand}</p>
            <div className="flex items-center gap-1.5">
              <Stars rating={dress.rating} />
              <span className="text-[9px] text-royal-charcoal">({dress.reviewCount})</span>
            </div>
          </div>

          {/* Subtle trust cue */}
          {dress.reviewCount > 10 && (
            <p className="text-[9px] tracking-[0.08em] text-royal-charcoal mt-1 opacity-70">
              Repeat renters
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}