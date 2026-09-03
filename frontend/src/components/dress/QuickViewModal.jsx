import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { dressDetailPath } from '../../utils/dressRoutes';
import { formatRentalPrice, isDressAvailable } from '../../data/listings';

export default function QuickViewModal({ dress, open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!dress) return null;

  const available = isDressAvailable(dress);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${dress.title}`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-royal-cream/40 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close quick view"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg border border-royal-border bg-white shadow-2xl"
          >
            <div className="grid sm:grid-cols-2">
              <div className="aspect-[3/4] bg-royal-bg sm:aspect-auto sm:min-h-[280px]">
                <img
                  src={dress.images?.[0] || dress.image}
                  alt={dress.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-royal-muted">
                  {dress.brand} · {dress.category}
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight">
                  {dress.title}
                </h2>
                <p className="mt-2 text-sm text-royal-muted line-clamp-3">{dress.description}</p>
                <p className="mt-4 font-medium">{formatRentalPrice(dress.rentalPrice)}</p>
                <p className="mt-1 text-xs text-royal-muted">
                  {dress.city} · Size {dress.size} · ★{dress.rating} ({dress.reviewCount})
                </p>
                <span
                  className={`mt-3 inline-flex w-fit px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${
                    available
                      ? 'bg-royal-bg text-royal-cream'
                      : 'bg-royal-cream/10 text-royal-muted'
                  }`}
                >
                  {dress.availability?.status === 'booked'
                    ? 'Currently booked'
                    : dress.availability?.status === 'limited'
                      ? 'Limited slots'
                      : 'Available'}
                </span>
                <div className="mt-auto flex gap-2 pt-6">
                  <Link
                    to={dressDetailPath(dress.id)}
                    onClick={onClose}
                    className="flex-1 bg-royal-cream py-3 text-center text-sm font-medium text-white transition-colors hover:bg-royal-accent"
                  >
                    View details
                  </Link>
                  <button
                    type="button"
                    onClick={onClose}
                    className="border border-royal-border px-4 py-3 text-sm font-medium hover:border-royal-cream"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
