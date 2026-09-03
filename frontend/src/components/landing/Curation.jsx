import { Link } from 'react-router-dom';
import SectionReveal from '../ui/SectionReveal';

/* ─────────────────────────────────────────────────────────────
   SECTION (between Collections + Insight)
   Emotion: Curiosity deepening into desire.
   Layout: Asymmetric 5fr/4fr. Large editorial portrait.
          Floating product card. Numbered feature list.
   ───────────────────────────────────────────────────────────── */

export default function Curation() {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[5fr_4fr] lg:gap-20 lg:items-center">

          {/* ── Left: large portrait with floating card ── */}
          <SectionReveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85"
                  alt="Curated editorial look"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              {/* Floating product card */}
              <div className="absolute -bottom-6 right-0 md:-right-6 w-52 border border-royal-border bg-white p-5">
                <p className="text-label text-royal-muted/60">Stylist Pick · This Week</p>
                <p className="mt-2 font-display text-[15px] font-semibold leading-snug" style={{ letterSpacing: '-0.02em' }}>
                  Arpita Mehta Organza Lehenga
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium">₹5,499</span>
                  <Link
                    to="/explore"
                    className="text-[10px] font-medium uppercase tracking-widest text-royal-muted hover:text-royal-cream"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* ── Right: editorial text ── */}
          <SectionReveal delay={0.12}>
            <div className="pb-6 lg:pb-0 lg:pl-4">
              <p className="text-label mb-6">Curation</p>
              <h2
                className="font-display font-semibold text-royal-cream"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
              >
                Styled by<br />
                <em style={{ fontStyle: 'italic' }}>experts.</em>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-royal-muted">
                Every look is hand-curated by fashion editors who know Indian
                wedding culture — from Banarasi weaves to contemporary drapes.
              </p>

              <ul className="mt-8 space-y-0">
                {[
                  { n: '01', t: 'Stylist consult', d: '15 minutes with a dedicated fashion advisor before you book.' },
                  { n: '02', t: 'Free size swap', d: '24 hours before your event, at no additional cost.' },
                  { n: '03', t: 'Finishing kit', d: 'Arrives with accessories, pins, and care essentials.' },
                ].map((item) => (
                  <li key={item.n} className="flex gap-5 border-t border-royal-border py-5">
                    <span className="text-label mt-0.5 shrink-0 text-royal-muted/50">{item.n}</span>
                    <div>
                      <p className="text-sm font-semibold text-royal-cream">{item.t}</p>
                      <p className="mt-1 text-xs leading-relaxed text-royal-muted">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                to="/explore"
                className="mt-8 inline-flex items-center gap-2 border border-royal-cream bg-royal-cream px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-royal-accent"
              >
                Explore curated looks
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}