import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   SECTION 7 — Aspirational Brand Statement
   Emotion: Desire → Action. The closing manifesto.
   Layout: Near full-viewport. Massive typography. One image.
          The page's emotional crescendo before the footer.
   ───────────────────────────────────────────────────────────── */

export default function BrandStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-royal-ink"
      style={{ minHeight: '85vh' }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imgY }}
      >
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85"
          alt=""
          className="h-full w-full scale-110 object-cover opacity-25"
          loading="lazy"
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-ink/60 via-royal-ink/40 to-royal-ink/80" />

      {/* Content */}
      <div className="container-editorial relative z-10 flex min-h-[85vh] flex-col justify-center py-24">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/30 mb-8">
            Our philosophy
          </p>

          {/* The manifesto */}
          <h2
            className="font-display font-semibold text-white"
            style={{
              fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
              lineHeight: 0.93,
              letterSpacing: '-0.04em',
              maxWidth: '16ch',
            }}
          >
            Fashion deserves
            <br />
            more than
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              one moment.
            </em>
          </h2>

          {/* Sub-statement */}
          <p className="mt-10 max-w-md text-[15px] leading-relaxed text-white/50">
            Own less. Wear better. Let the clothes you love
            live beyond your wardrobe — and into someone else's memory.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-14 flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/explore"
            className="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-semibold text-royal-ink transition-colors hover:bg-white/90"
          >
            Explore now
            <span>↗</span>
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-sm font-medium text-white transition-colors hover:border-white"
          >
            List your dress
          </Link>
        </motion.div>

        {/* Bottom rule + edition mark */}
        <motion.div
          className="mt-20 flex items-center justify-between border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/20">
            Royale Rent · Est. 2025
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/20">
            India's editorial fashion marketplace
          </p>
        </motion.div>
      </div>
    </section>
  );
}