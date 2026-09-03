import SectionReveal from '../ui/SectionReveal';

/* ─────────────────────────────────────────────────────────────
   SECTION 6 — Minimal Social Proof
   Emotion: Desire. "Others have discovered this. I want in."
   Layout: Full-bleed dark strip. Typography-only. No cards.
          Fashion editorial number style.
   ───────────────────────────────────────────────────────────── */

const PROOF = [
  { n: '2,000+', l: 'Couture pieces\nlisted across India' },
  { n: '₹50K+', l: 'Saved on\noccasion wear' },
  { n: '4.9 / 5', l: 'Average joy\nrating from renters' },
  { n: '48 hrs', l: 'Doorstep delivery\nin metro cities' },
];

export default function SocialProof() {
  return (
    <section className="bg-royal-ink py-20 md:py-28">
      <div className="container-editorial">

        <SectionReveal>
          <div className="mb-14 flex flex-col gap-3 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
            <p
              className="font-display font-semibold text-white"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.025em' }}
            >
              The numbers tell
              <br />
              <em style={{ fontStyle: 'italic' }}>their own story.</em>
            </p>
            <p className="text-sm text-white/40 md:max-w-xs">
              Built on trust. Worn with joy. Returned with care.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {PROOF.map((item, i) => (
            <SectionReveal key={item.n} delay={i * 0.07}>
              <div className="bg-royal-ink px-8 py-10">
                <p
                  className="font-display font-semibold text-white"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                  }}
                >
                  {item.n}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-white/40 whitespace-pre-line">
                  {item.l}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}