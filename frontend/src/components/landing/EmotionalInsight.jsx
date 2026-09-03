import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionReveal from '../ui/SectionReveal';

/* ─────────────────────────────────────────────────────────────
   SECTION 3 — Emotional Insight
   Emotion: Connection. The "aha" — why this platform matters.
   Layout: Full-width stark typography. Minimal. No imagery.
          The words ARE the design.
   ───────────────────────────────────────────────────────────── */

export default function EmotionalInsight() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-28 md:py-40"
      aria-label="Brand philosophy"
    >
      {/* Very faint vertical rule — editorial detail */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-royal-border/40 hidden lg:block" />

      <motion.div style={{ opacity }} className="container-editorial">

        {/* Line 1 — the problem */}
        <SectionReveal y={32}>
          <p className="text-label mb-10 inline-flex items-center gap-3">
            <span className="h-px w-6 bg-royal-muted" />
            The truth about wedding fashion
          </p>
          <div
            className="font-display font-semibold text-royal-cream"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
            }}
          >
            <p>Most wedding outfits</p>
            <p>are worn once.</p>
          </div>
        </SectionReveal>

        {/* Spacer with editorial rule */}
        <SectionReveal delay={0.1}>
          <div className="my-12 flex items-center gap-6 md:my-16">
            <div className="h-px flex-1 bg-royal-border" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-royal-muted/50">
              Then forgotten.
            </span>
            <div className="h-px flex-1 bg-royal-border" />
          </div>
        </SectionReveal>

        {/* Line 2 — the resolution */}
        <SectionReveal delay={0.15} y={32}>
          <div
            className="font-display font-semibold"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
            }}
          >
            <p className="text-royal-muted/30">Royale Rent gives them</p>
            <p className="text-royal-cream">
              <em style={{ fontStyle: 'italic' }}>another life.</em>
            </p>
          </div>
        </SectionReveal>

        {/* Supporting stats — editorial proof */}
        <SectionReveal delay={0.25}>
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-royal-border pt-12 md:grid-cols-4 md:mt-20">
            {[
              { n: '94%', l: 'of bridal outfits worn only once' },
              { n: '₹2L+', l: 'average spend on occasion wear' },
              { n: '40+', l: 'cities with active listings' },
              { n: '2,000+', l: 'pieces finding new moments' },
            ].map((s) => (
              <div key={s.l}>
                <p
                  className="font-display font-semibold text-royal-cream"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
                >
                  {s.n}
                </p>
                <p className="mt-2 text-[11px] leading-snug text-royal-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </motion.div>
    </section>
  );
}