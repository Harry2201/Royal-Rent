import { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { Heart } from '../icons/Heart';
import { useWishlist } from '../../context/WishlistContext';
import { dressDetailPath } from '../../utils/dressRoutes';
import { formatRentalPrice, isDressAvailable } from '../../data/listings';
import QuickViewModal from './QuickViewModal';
import toast from 'react-hot-toast';

function DressCard({
  dress,
  variant = 'marketplace',
  presentation = 'default',
  index = 0,
  tall = false,
  suppressAnimation = false,
}) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(dress.id);

  const [isHovered, setIsHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const [ref, inView] = useInView({ threshold: 0.12 });

  const images = dress.images?.length ? dress.images : dress.image ? [dress.image] : [];
  const displayImage = images[previewIndex] ?? images[0];
  const available = isDressAvailable(dress);

  const isFeatured = variant === 'featured';
  const isRail = presentation === 'rail';
  const isShowcase = presentation === 'showcase';

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (images.length > 1) setPreviewIndex(1);
  }, [images.length]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPreviewIndex(0);
  }, []);

  const handleWishlist = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const result = await toggleWishlist(dress);
        if (result.requiresAuth) {
          toast.success(result.added ? 'Saved on this device' : 'Removed');
          return;
        }
        toast.success(result.added ? 'Saved' : 'Removed');
      } catch (err) {
        toast.error(err.message || 'Could not update wishlist');
      }
    },
    [dress, toggleWishlist]
  );

  const openQuickView = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  }, []);

  const aspectClass = isRail
    ? 'aspect-[4/5]'
    : isShowcase
      ? 'aspect-[4/5]'
      : isFeatured
        ? tall
          ? 'aspect-[3/4]'
          : 'aspect-[4/5]'
        : 'aspect-[4/5]';

  const showQuickBar = !isFeatured && !isRail;
  const showFeaturedHover = isFeatured && !isRail;

  return (
    <>
      <motion.article
        ref={isFeatured && !suppressAnimation && !isRail ? ref : undefined}
        initial={suppressAnimation ? false : { opacity: 0, y: isRail ? 0 : 14 }}
        animate={
          suppressAnimation
            ? undefined
            : isFeatured && !isRail
              ? inView
                ? { opacity: 1, y: 0 }
                : {}
              : { opacity: 1, y: 0 }
        }
        transition={
          suppressAnimation
            ? undefined
            : {
                duration: 0.7,
                delay: isFeatured && !isRail ? index * 0.05 : 0,
                ease: [0.16, 1, 0.3, 1],
              }
        }
        className={`group h-full ${isFeatured || isRail ? 'cursor-crosshair' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={dressDetailPath(dress.id)} className="block">
          <div className={`relative overflow-hidden bg-royal-bg ${aspectClass}`}>
            <img
              src={displayImage}
              alt={dress.title}
              className="dress-card-image"
              loading="lazy"
            />

            <motion.div
              className="pointer-events-none absolute inset-0 bg-royal-cream/0"
              animate={{ opacity: isHovered ? 0.04 : 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {dress.featured && !isRail && (
              <span className="absolute left-2.5 top-2.5 bg-white/90 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-royal-cream backdrop-blur-sm">
                Featured
              </span>
            )}

            {!available && (
              <span className="absolute bottom-2.5 left-2.5 bg-royal-cream/90 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-white">
                Unavailable
              </span>
            )}

            {images.length > 1 && isHovered && (
              <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-0.5 w-0.5 rounded-full transition-all duration-700 ${
                      i === previewIndex ? 'w-2 bg-white' : 'bg-white/35'
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center border transition-all duration-500 ${
                wishlisted
                  ? 'border-royal-cream bg-royal-cream text-white'
                  : 'border-white/50 bg-white/75 text-royal-cream backdrop-blur-sm hover:border-royal-cream'
              }`}
            >
              <Heart filled={wishlisted} className="h-3 w-3" />
            </button>

            {showQuickBar && (
              <div
                className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-white/88 py-2.5 text-[9px] font-medium uppercase tracking-[0.16em] backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isHovered ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                <span>View</span>
                <span className="text-royal-border">|</span>
                <button type="button" onClick={openQuickView} className="hover:underline">
                  Quick view
                </button>
              </div>
            )}

            {showFeaturedHover && (
              <p
                className={`absolute inset-x-0 bottom-0 bg-white/88 py-2.5 text-center text-[9px] font-medium uppercase tracking-[0.16em] backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isHovered ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                View look →
              </p>
            )}
          </div>

          <div className={isRail ? 'pt-2.5' : 'pt-3'}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-royal-muted">
                  {dress.brand}
                </p>
                <h3
                  className={`mt-0.5 font-display font-semibold leading-snug tracking-tight text-royal-cream ${
                    isRail
                      ? 'text-[13px] line-clamp-2'
                      : isFeatured
                        ? 'text-[14px]'
                        : 'text-[13px] line-clamp-1'
                  }`}
                >
                  {dress.title}
                </h3>
              </div>
              {(isFeatured || isRail) && (
                <span className="shrink-0 text-[12px] font-medium tabular-nums text-royal-cream">
                  {formatRentalPrice(dress.rentalPrice)}
                </span>
              )}
            </div>

            {!isFeatured && !isRail && !isShowcase && (
              <div className="mt-1.5 flex items-center justify-between text-[11px]">
                <span className="font-medium text-royal-cream">
                  {formatRentalPrice(dress.rentalPrice)}
                </span>
                <span className="text-royal-muted">
                  {dress.city} · ★{dress.rating}
                </span>
              </div>
            )}

            {(isRail || (isFeatured && !isRail)) && (
              <p
                className={`mt-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-royal-muted transition-opacity duration-700 ${
                  isRail ? 'opacity-80' : 'opacity-0 group-hover:opacity-90'
                }`}
              >
                {dress.occasion} · {dress.city}
              </p>
            )}
          </div>
        </Link>
      </motion.article>

      <QuickViewModal
        dress={dress}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}

function dressCardPropsAreEqual(prev, next) {
  return (
    prev.dress.id === next.dress.id &&
    prev.variant === next.variant &&
    prev.presentation === next.presentation &&
    prev.tall === next.tall &&
    prev.index === next.index &&
    prev.suppressAnimation === next.suppressAnimation
  );
}

export default memo(DressCard, dressCardPropsAreEqual);
