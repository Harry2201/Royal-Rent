import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '../ui/SectionReveal';

/* ─────────────────────────────────────────────────────────────
   SECTION 2 — Curated Collections Rail
   Emotion: Curiosity. "I wonder what I could wear…"
   Layout: Horizontal cinematic rail. Image-first. Title overlaid.
   Netflix-for-couture energy.
   ───────────────────────────────────────────────────────────── */

const EDITS = [
  {
    id: 'bridal',
    label: 'Bridal Edit',
    headline: 'The Bride',
    sub: 'Lehengas · Gowns · Anarkalis',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85',
    wide: false,
  },
  {
    id: 'groom',
    label: 'Groom Edit',
    headline: 'The Groom',
    sub: 'Sherwanis · Bandhgalas · Kurtas',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=85',
    wide: true,
  },
  {
    id: 'reception',
    label: 'Reception Night',
    headline: 'The Night',
    sub: 'Gowns · Drapes · Sequins',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85',
    wide: false,
  },
  {
    id: 'cocktail',
    label: 'Cocktail Couture',
    headline: 'The Evening',
    sub: 'Columns · Minis · Drapes',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85',
    wide: false,
  },
  {
    id: 'festive',
    label: 'Festive Royale',
    headline: 'The Festival',
    sub: 'Sarees · Anarkalis · Sharara',
    image: 'https://images.unsplash.com/photo-1617307707290-1d8b95afe96d?auto=format&fit=crop&w=700&q=85',
    wide: true,
  },
  {
    id: 'farewell',
    label: 'Farewell Looks',
    headline: 'The Exit',
    sub: 'Indo-Western · Fusion · Minimal',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=85',
    wide: false,
  },
];

export default function Collections() {
  const railRef = useRef(null);
  const scroll = (dir) => railRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });

  return (
    <section id="collections" className="cinematic-section overflow-hidden bg-royal-bg py-20 md:py-28">

      {/* Header */}
      <SectionReveal>
        <div className="container-editorial mb-12 flex items-end justify-between">
          <div>
            <p className="text-label mb-4">Curated Edits</p>
            <h2
              className="font-display font-semibold text-royal-cream"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Every occasion.
              <br />
              <em style={{ fontStyle: 'italic' }}>One wardrobe.</em>
            </h2>
          </div>
          {/* Scroll arrows */}
          <div className="hidden items-center gap-2 md:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center border border-royal-border text-royal-muted transition-colors hover:border-royal-cream hover:text-royal-cream">
              ←
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center border border-royal-border text-royal-muted transition-colors hover:border-royal-cream hover:text-royal-cream">
              →
            </button>
          </div>
        </div>
      </SectionReveal>

      {/* ── Rail — image overlaid title, no clip from container ── */}
      <div
        ref={railRef}
        className="collections-rail pl-5 md:pl-8 lg:pl-14"
        style={{ paddingRight: '3.5rem' }}
      >
        {EDITS.map((edit, i) => (
          <motion.div
            key={edit.id}
            className={`collections-rail-item group flex-shrink-0 ${edit.wide ? 'w-[300px] md:w-[380px]' : 'w-[240px] md:w-[300px]'}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/explore" className="block">
              {/* Image with overlaid editorial caption */}
              <div className="relative aspect-[3/4] overflow-hidden bg-white">
                <img
                  src={edit.image}
                  alt={edit.headline}
                  className="story-card-img h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay — reveals on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Hover caption */}
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">{edit.label}</p>
                  <p className="mt-1 text-xs text-white/70">{edit.sub}</p>
                </div>
              </div>
              {/* Below-image caption */}
              <div className="pt-4">
                <p className="text-label text-royal-muted/50">{edit.label}</p>
                <h3
                  className="mt-2 font-display font-semibold text-royal-cream"
                  style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}
                >
                  {edit.headline}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Terminal CTA */}
        <div className="collections-rail-item w-[200px] flex-shrink-0">
          <Link
            to="/explore"
            className="flex h-full min-h-[360px] flex-col items-start justify-end border border-royal-border bg-white p-6 transition-colors hover:border-royal-cream"
          >
            <p className="text-label text-royal-muted">All categories</p>
            <p className="mt-3 font-display text-base font-semibold leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Explore the full collection →
            </p>
          </Link>
        </div>
      </div>

      <div className="container-editorial mt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted/30 md:hidden">
          Swipe to explore →
        </p>
      </div>
    </section>
  );
}