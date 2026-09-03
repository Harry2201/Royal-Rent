import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionReveal from '../ui/SectionReveal';
import Discover from '../../assets/Discover.png';
import Reserve from '../../assets/Reserve.png';
import Return from '../../assets/Return.png';

/* ─────────────────────────────────────────────────────────────
   SECTION 4 — How It Works (Editorial Version)
   Emotion: Trust. "This is simple. This is real."
   Layout: Three alternating image+text story blocks.
          Large imagery. Minimal words. Cinematic pacing.
   ───────────────────────────────────────────────────────────── */

const STEPS = [
  {
    index: '01',
    label: 'Discover',
    headline: 'Find the look\nthat finds you.',
    body: 'Browse 2,000+ designer pieces — curated by occasion, city, and size. Every listing is from a real wardrobe, with a real story.',
    image: Discover,
    imageAlt: 'Browsing editorial looks',
    flip: false,
  },
  {
    index: '02',
    label: 'Reserve',
    headline: 'Request it.\nWear it.',
    body: 'Message the owner. Lock your dates. Every piece arrives steamed, pressed, and ready — with a finishing kit and size guarantee.',
    image: Reserve,
    imageAlt: 'Receiving a package',
    flip: true,
  },
  {
    index: '03',
    label: 'Return',
    headline: 'Give it back\nwith grace.',
    body: 'Schedule a doorstep pickup in one tap. We handle professional cleaning. Your sustainability, our responsibility.',
    image: Return,
    imageAlt: 'Returning an outfit',
    flip: false,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="overflow-hidden bg-white">

      {/* ── Section header ── */}
      <div className="container-editorial border-b border-royal-border py-16 md:py-20">
        <SectionReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-label mb-5">Process</p>
              <h2
                className="font-display font-semibold text-royal-cream"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', letterSpacing: '-0.035em', lineHeight: 1.0 }}
              >
                Three steps.<br />
                <em style={{ fontStyle: 'italic' }}>One perfect look.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-royal-muted">
              Peer-to-peer fashion rental designed for the rhythm of Indian celebrations.
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* ── Story blocks ── */}
      {STEPS.map((step, i) => (
        <div
          key={step.index}
          className={`border-b border-royal-border ${i % 2 === 0 ? 'bg-white' : 'bg-royal-bg'}`}
        >
          <div className={`container-editorial grid gap-0 lg:grid-cols-2 ${step.flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>

            {/* Image */}
            <motion.div
              className="how-step-img"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={step.image}
                alt={step.imageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Content */}
            <SectionReveal
              delay={0.1}
              className="flex flex-col justify-center px-0 py-14 lg:px-14 xl:px-20"
            >
              {/* Step number */}
              <span
                className="font-display font-semibold text-royal-border"
                style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', letterSpacing: '-0.05em', lineHeight: 1 }}
                aria-hidden="true"
              >
                {step.index}
              </span>

              <p className="text-label mt-4">{step.label}</p>

              <h3
                className="mt-4 font-display font-semibold text-royal-cream"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
              >
                {step.headline.split('\n').map((line, j) => (
                  <span key={j}>{line}{j === 0 && <br />}</span>
                ))}
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-royal-muted">
                {step.body}
              </p>

              {/* Step progress */}
              <div className="mt-10 flex items-center gap-2">
                {STEPS.map((_, si) => (
                  <div
                    key={si}
                    className={`h-px transition-all duration-300 ${si === i ? 'w-8 bg-royal-cream' : 'w-4 bg-royal-border'}`}
                  />
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      ))}

      {/* CTA strip */}
      <SectionReveal>
        <div className="container-editorial flex flex-wrap items-center justify-between gap-6 py-14">
          <p className="font-display text-xl font-semibold" style={{ letterSpacing: '-0.025em' }}>
            Ready to find your look?
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 border border-royal-cream bg-royal-cream px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-royal-accent"
          >
            Browse collection →
          </Link>
        </div>
      </SectionReveal>
    </section>
  );
}