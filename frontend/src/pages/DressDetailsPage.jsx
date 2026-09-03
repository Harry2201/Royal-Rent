// pages/DressDetailsPage.jsx
// Royale Rent — Editorial dress details page

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

import { getDressById, getRecommendations } from '../services/dressService';
import { getDressAvailability } from '../data/listings';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BookingRequestModal from '../components/dress/BookingRequestModal';
import DressRecommendations from '../components/dress/DressRecommendations';

/* ─────────────────────────────────────────────
   TRUST PILL
───────────────────────────────────────────── */

const TrustPill = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 border border-royal-border px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
    {children}
  </span>
);

/* ─────────────────────────────────────────────
   STAR RATING
───────────────────────────────────────────── */

const Stars = ({ rating }) => (
  <span className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <svg
        key={n}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
      >
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

/* ─────────────────────────────────────────────
   IMAGE GALLERY
───────────────────────────────────────────── */

function DressGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const gallery = (images || []).filter(Boolean);

  if (!gallery.length) {
    return (
      <div className="sticky top-24 self-start">
        <div className="flex aspect-[3/4] items-center justify-center bg-royal-offwhite text-sm text-royal-muted">
          No image
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-24 self-start">
      {/* Main image */}
      <div className="aspect-[3/4] overflow-hidden bg-royal-offwhite">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={gallery[active]}
            alt={title}
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="mt-3 flex gap-2">
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square flex-1 overflow-hidden transition-opacity duration-200 ${
                active === i
                  ? 'opacity-100'
                  : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   OWNER CARD (luxury host profile)
───────────────────────────────────────────── */

function OwnerCard({ owner }) {
  if (!owner) return null;

  return (
    <div className="border-t border-royal-border pt-8">
      <p className="text-label mb-5 text-royal-charcoal">
        Meet the Owner
      </p>

      <div className="flex items-start gap-5">
        {/* Avatar — enlarged for a luxury profile feel */}
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden">
          {owner.avatar ? (
            <img
              src={owner.avatar}
              alt={owner.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-royal-border text-2xl font-medium">
              {owner.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-base font-medium">
              {owner.name}
            </span>

            {owner.verified && (
              <span className="bg-royal-ink px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white">
                Verified
              </span>
            )}
          </div>

          <p className="text-xs text-royal-charcoal">
            {owner.city} · Member since {owner.joinedYear}
          </p>
        </div>
      </div>

      {/* Trust metrics grid */}
      <div className="mt-7 grid grid-cols-2 gap-4 border-y border-royal-border py-6 sm:grid-cols-4">
        <div>
          <p className="text-lg font-light tracking-tight">
            {owner.rentalsCompleted}
          </p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
            Rentals
          </p>
        </div>

        <div>
          <p className="text-lg font-light tracking-tight">
            {owner.acceptanceRate}
          </p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
            Acceptance Rate
          </p>
        </div>

        <div>
          <p className="text-lg font-light tracking-tight">
            {owner.responseTime}
          </p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
            Response Time
          </p>
        </div>

        <div>
          <p className="text-lg font-light tracking-tight">
            {owner.joinedYear}
          </p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
            Member Since
          </p>
        </div>
      </div>

      {owner.bio && (
        <p className="mt-6 border-l border-royal-border pl-4 text-sm italic leading-relaxed text-royal-charcoal">
          "{owner.bio}"
        </p>
      )}

      {/* Secondary CTA — UI only, no functionality wired up yet */}
      <button
        type="button"
        onClick={() => toast('Owner messaging will be available in a later phase.')}
        className="mt-6 w-full border border-royal-charcoal py-3 text-[11px] uppercase tracking-[0.14em] text-royal-charcoal transition-colors hover:bg-royal-charcoal hover:text-white"
      >
        Message Owner
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SAMPLE REVIEWS
───────────────────────────────────────────── */

const SAMPLE_REVIEWS = [
  {
    id: 'r1',
    name: 'Aditi Rao',
    city: 'Pune',
    text:
      'The outfit arrived beautifully packaged and exactly as described.',
    rating: 5,
    occasion: 'Reception',
    size: 'M',
    date: 'March 2025',
  },
  {
    id: 'r2',
    name: 'Tanvi Khanna',
    city: 'Delhi',
    text:
      'The quality felt extraordinary for a rental. Truly premium.',
    rating: 5,
    occasion: 'Cocktail',
    size: 'S',
    date: 'January 2025',
  },
  {
    id: 'r3',
    name: 'Meera Iyer',
    city: 'Bengaluru',
    text:
      'Fit perfectly and the fabric quality was beyond what I expected for a rental piece.',
    rating: 5,
    occasion: 'Wedding',
    size: 'L',
    date: 'November 2024',
  },
  {
    id: 'r4',
    name: 'Naina Kapoor',
    city: 'Mumbai',
    text:
      'Owner was incredibly responsive and the dress photos matched reality exactly.',
    rating: 4,
    occasion: 'Sangeet',
    size: 'M',
    date: 'February 2025',
  },
  {
    id: 'r5',
    name: 'Riya Malhotra',
    city: 'Chandigarh',
    text:
      'Felt like couture, not a rental. Got so many compliments at the reception.',
    rating: 5,
    occasion: 'Reception',
    size: 'S',
    date: 'December 2024',
  },
  {
    id: 'r6',
    name: 'Sanya Bose',
    city: 'Kolkata',
    text:
      'Packaging, fit, and finish were all impeccable. Would rent again without hesitation.',
    rating: 5,
    occasion: 'Cocktail',
    size: 'L',
    date: 'April 2025',
  },
  {
    id: 'r7',
    name: 'Ishita Mehra',
    city: 'Jaipur',
    text:
      'Exceeded expectations — the embroidery detail was stunning in person.',
    rating: 5,
    occasion: 'Wedding',
    size: 'M',
    date: 'October 2024',
  },
  {
    id: 'r8',
    name: 'Priya Nair',
    city: 'Hyderabad',
    text:
      'Smooth process from booking to return. The dress made the entire evening feel special.',
    rating: 4,
    occasion: 'Engagement',
    size: 'S',
    date: 'May 2025',
  },
];

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function DressDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const [dress, setDress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '8%']
  );

  /* ─────────────────────────────────────────────
     FETCH DRESS
  ───────────────────────────────────────────── */

  useEffect(() => {
    async function loadDress() {
      try {
        setLoading(true);

        const data = await getDressById(id);

        setDress(data);
        const recs = await getRecommendations(data, 4);
        setRecommendations(recs);
      } catch (error) {
        console.error('Failed to load dress:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDress();

    window.scrollTo(0, 0);
  }, [id]);

  /* ─────────────────────────────────────────────
     LOADING
  ───────────────────────────────────────────── */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm uppercase tracking-[0.12em] text-royal-charcoal">
          Loading editorial...
        </p>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     NOT FOUND
  ───────────────────────────────────────────── */

  if (!dress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="mb-4 text-sm text-royal-charcoal">
            This listing no longer exists.
          </p>

          <Link
            to="/explore"
            className="text-label underline"
          >
            Back to explore
          </Link>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     TEMP OWNER
  ───────────────────────────────────────────── */

  const owner = dress.owner || {
    name: dress.ownerName || 'Royale Member',
    city: dress.city || 'India',
    joinedYear: '2024',
    rentalsCompleted: 12,
    acceptanceRate: '98%',
    responseTime: 'within 1 hour',
    verified: true,
    bio:
      'Collects contemporary bridal silhouettes and modern reception wear. Every piece is steamed, inspected, and packaged by hand before it reaches you.',
  };

  // Ensure acceptanceRate exists even for owners coming from dress.owner
  // (UI-only fallback — does not touch services/context layer)
  if (owner && owner.acceptanceRate === undefined) {
    owner.acceptanceRate = '98%';
  }

  const inWishlist = isWishlisted(dress.id);

  const handleWishlist = async () => {
    try {
      await toggleWishlist(dress);
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };
  
  const handleBook = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingOpen(true);
  };

  const rental = Number(dress.rentalPrice) || 0;
  const original = Number(dress.originalPrice) || 0;
  const savings = original > 0 ? Math.max(0, original - rental) : 0;
  const savingsPct =
    original > 0 ? Math.round((savings / original) * 100) : 0;

  const avail = getDressAvailability(dress);
  const availabilityLabel =
    avail.status === 'booked'
      ? 'Currently booked'
      : avail.from && avail.to
        ? `Available ${avail.from} — ${avail.to}`
        : 'Available for booking';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pb-4 pt-28">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-royal-charcoal">
          <Link to="/">Home</Link>
          <span>·</span>
          <Link to="/explore">Explore</Link>
          <span>·</span>
          <span>{dress.category}</span>
        </nav>
      </div>

      {/* Main */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_480px] lg:gap-20">

          {/* Gallery */}
          <div ref={heroRef}>
            <DressGallery
              images={dress.images?.length ? dress.images : [dress.image]}
              title={dress.title}
            />
          </div>

          {/* Right Panel */}
          <div className="pt-2">

            {/* Tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              <TrustPill>{dress.category}</TrustPill>
              <TrustPill>{dress.occasion}</TrustPill>
              <TrustPill>{dress.city}</TrustPill>
            </div>

            {/* Title */}
            <h1 className="mb-2 text-[2rem] font-light leading-tight tracking-[-0.03em]">
              {dress.title}
            </h1>

            <p className="mb-5 text-sm text-royal-charcoal">
              {dress.brand}
            </p>

            {/* Rating */}
            <div className="mb-7 flex items-center gap-3">
              <Stars rating={dress.rating} />

              <span className="text-xs text-royal-charcoal">
                {dress.rating} · {dress.reviewCount} rentals
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-5 border-y border-royal-border py-6">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-[2rem] font-light tracking-tight">
                  ₹{rental.toLocaleString('en-IN')}
                </span>

                <span className="text-sm text-royal-charcoal">
                  / rental
                </span>
              </div>

              <p className="text-xs text-royal-charcoal">
                Retail ₹
                {original.toLocaleString('en-IN')}
                {' '}· You save{' '}
                <span className="font-medium text-royal-ink">
                  {savingsPct}%
                </span>
              </p>
            </div>

            {/* Value comparison block */}
            <div className="mb-8 bg-royal-offwhite p-6">
              <p className="text-label mb-5 text-royal-charcoal">
                Why Rent Instead?
              </p>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-light tracking-tight text-royal-charcoal line-through">
                    ₹{original.toLocaleString('en-IN')}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
                    Retail Price
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium tracking-tight">
                    ₹{rental.toLocaleString('en-IN')}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
                    Rental Price
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium tracking-tight text-royal-ink">
                    ₹{savings.toLocaleString('en-IN')}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
                    You Save
                  </p>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="mb-8 flex flex-wrap gap-2">
              <TrustPill>✓ Verified owner</TrustPill>
              <TrustPill>✓ Professionally cleaned</TrustPill>
              <TrustPill>✓ Secure payment</TrustPill>
            </div>

            {/* Availability */}
            <p className="mb-4 text-xs uppercase tracking-[0.12em] text-royal-charcoal">
              {availabilityLabel}
            </p>

            {/* CTA */}
            <div className="mb-10 flex gap-3">
              <button
                onClick={handleBook}
                className="flex-1 bg-royal-ink py-4 text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-royal-charcoal"
              >
                Request to rent
              </button>

              <button
                onClick={handleWishlist}
                aria-label={
                  inWishlist
                    ? 'Remove from wishlist'
                    : 'Add to wishlist'
                }
                className="flex w-14 items-center justify-center border border-royal-border transition-colors hover:border-royal-charcoal"
              >
                {inWishlist ? '♥' : '♡'}
              </button>
            </div>

            {/* Story */}
            {dress.story && (
              <div className="mb-10">
                <p className="text-label mb-4 text-royal-charcoal">
                  The story
                </p>

                <p className="text-sm italic leading-relaxed text-royal-charcoal">
                  "{dress.story}"
                </p>
              </div>
            )}

            {/* Styling Notes */}
            <div className="mb-10">
              <p className="text-label mb-4 text-royal-charcoal">
                Styling Notes
              </p>

              <ul className="space-y-2 text-sm leading-relaxed text-royal-charcoal">
                {Array.isArray(dress.stylingNotes) && dress.stylingNotes.length > 0 ? (
                  dress.stylingNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))
                ) : dress.stylingNotes && typeof dress.stylingNotes === 'object' ? (
                  <>
                    <li>
                      <span className="font-medium text-royal-ink">Jewellery — </span>
                      {dress.stylingNotes.jewellery || 'Emerald kundan jewellery'}
                    </li>
                    <li>
                      <span className="font-medium text-royal-ink">Footwear — </span>
                      {dress.stylingNotes.footwear || 'Champagne heels'}
                    </li>
                    <li>
                      <span className="font-medium text-royal-ink">Hairstyle — </span>
                      {dress.stylingNotes.hairstyle || 'Soft wave hairstyle'}
                    </li>
                    <li>
                      <span className="font-medium text-royal-ink">Best for — </span>
                      {dress.stylingNotes.bestOccasions || 'Receptions and destination weddings'}
                    </li>
                  </>
                ) : (
                  <li>Ask the owner for jewellery, footwear, and styling notes.</li>
                )}
              </ul>
            </div>

            {/* Description */}
            <div className="mb-10">
              <p className="text-label mb-4 text-royal-charcoal">
                About this piece
              </p>

              <p className="text-sm leading-relaxed text-royal-charcoal">
                {dress.description}
              </p>
            </div>

            {/* Owner */}
            <OwnerCard owner={owner} />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="bg-royal-offwhite py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">

            <div className="mb-10 flex items-baseline justify-between">
              <p className="text-label text-royal-charcoal">
                What renters said
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-royal-muted">
                Editorial sample quotes — not live booking reviews
              </p>

              <div className="flex items-center gap-2">
                <Stars rating={dress.rating} />
                <span className="text-sm">
                  {dress.rating} · {dress.reviewCount} rentals
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {SAMPLE_REVIEWS.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-7"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        {review.name}
                      </p>

                      <p className="text-xs text-royal-charcoal">
                        {review.city} · {review.date}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-royal-charcoal">
                        {review.occasion} · Size {review.size}
                      </p>
                    </div>

                    <Stars rating={review.rating} />
                  </div>

                  <p className="text-sm italic leading-relaxed text-royal-charcoal">
                    "{review.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <DressRecommendations
  dresses={recommendations}
  title="More From This Collection"
/>

      <Footer />
      <BookingRequestModal
        dress={dress}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}