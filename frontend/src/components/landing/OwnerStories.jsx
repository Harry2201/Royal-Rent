import { motion } from 'framer-motion';
import SectionReveal from '../ui/SectionReveal';

/* ─────────────────────────────────────────────────────────────
   SECTION 5 — Owner Stories / Human Layer
   Emotion: Trust. Warmth. "Real people. Real wardrobes."
   Layout: Large portrait cards with memory captions.
          Not testimonials — intimate vignettes.
   ───────────────────────────────────────────────────────────── */

const OWNERS = [
  {
    name: 'Avantika M.',
    city: 'Mumbai',
    portrait: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=85',
    outfit: 'Ivory Zardosi Lehenga',
    memory: 'Worn at my sister\'s wedding in Jaipur. Sat in its bag for two years after. Now it dances at someone else\'s celebration every season.',
    count: '3 rentals',
  },
  {
    name: 'Priya N.',
    city: 'Chennai',
    portrait: 'https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?auto=format&fit=crop&w=600&q=85',
    outfit: 'Crimson Mirror Lehenga',
    memory: 'I wore this to my engagement. My mother said I looked like a painting. Listing it felt like sharing that joy.',
    count: '7 rentals',
  },
  {
    name: 'Ishaan V.',
    city: 'Jaipur',
    portrait: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85',
    outfit: 'Imperial Gold Sherwani',
    memory: 'My groom sherwani cost more than my first motorcycle. Listing it on Royale Rent paid for a honeymoon upgrade.',
    count: '5 rentals',
  },
  {
    name: 'Sneha K.',
    city: 'Delhi',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85',
    outfit: 'Banarasi Silk Saree',
    memory: 'Inherited from my grandmother. Still in perfect condition. I want it worn, not preserved in darkness.',
    count: '12 rentals',
  },
];

export default function OwnerStories() {
  return (
    <section className="overflow-hidden bg-royal-bg py-20 md:py-28">
      <div className="container-editorial">

        {/* Header */}
        <SectionReveal>
          <div className="mb-12 flex flex-col gap-4 border-b border-royal-border pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-label mb-4">The People</p>
              <h2
                className="font-display font-semibold text-royal-cream"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
              >
                Every piece
                <br />
                <em style={{ fontStyle: 'italic' }}>has a story.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-royal-muted">
              Behind every listing is a real memory. A real wardrobe. A real person
              who wore it at the most important moment of their life.
            </p>
          </div>
        </SectionReveal>

        {/* Owner cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OWNERS.map((owner, i) => (
            <motion.article
              key={owner.name}
              className="story-card-hover group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Portrait */}
              <div className="relative aspect-[3/4] overflow-hidden bg-white">
                <img
                  src={owner.portrait}
                  alt={owner.name}
                  className="story-card-img h-full w-full object-cover object-top"
                  loading="lazy"
                />
                {/* Permanent gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* City pill */}
                <div className="absolute left-4 top-4 border border-white/20 bg-white/15 px-2.5 py-1 backdrop-blur-sm">
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white">
                    {owner.city}
                  </p>
                </div>

                {/* Info overlay — always visible */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/50">
                    {owner.outfit}
                  </p>
                  <p className="mt-1.5 font-display text-base font-semibold leading-tight text-white" style={{ letterSpacing: '-0.02em' }}>
                    {owner.name}
                  </p>
                </div>
              </div>

              {/* Memory caption */}
              <div className="border border-t-0 border-royal-border bg-white p-5">
                <p className="text-[13px] leading-relaxed text-royal-muted italic">
                  "{owner.memory}"
                </p>
                <p className="mt-4 text-label text-royal-muted/50">{owner.count} this season</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer strip */}
        <SectionReveal delay={0.2}>
          <div className="mt-12 flex items-center justify-between border-t border-royal-border pt-8">
            <p className="text-sm text-royal-muted">
              40+ wardrobes listed across India
            </p>
            <a
              href="/signup"
              className="text-sm font-medium text-royal-cream underline-offset-4 hover:underline"
            >
              Share your wardrobe →
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}