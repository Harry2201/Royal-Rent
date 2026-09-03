import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '../ui/SectionReveal';
import { testimonials, testimonialTabs } from '../../data/testimonials';

/* ─────────────────────────────────────────────────────────────
   SECTION 6b — Community Stories
   Emotion: Warmth, recognition. "People like me."
   Layout: Large pullquote — single dominant quote on display.
          Secondary quotes grid beside it. Not a carousel.
   ───────────────────────────────────────────────────────────── */

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('Weddings');
  const stories = testimonials[activeTab] || [];
  const [primary, ...rest] = stories;

  return (
    <section id="testimonials" className="bg-white py-20 md:py-28">
      <div className="container-editorial">

        {/* Header */}
        <SectionReveal>
          <div className="flex flex-col gap-6 border-b border-royal-border pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-label mb-4">Community</p>
              <h2
                className="font-display font-semibold text-royal-cream"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
              >
                Worn with joy.
                <br />
                <em style={{ fontStyle: 'italic' }}>Returned with love.</em>
              </h2>
            </div>

            {/* Tab filter */}
            <div className="flex self-start">
              {testimonialTabs.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`border px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors ${
                    i > 0 ? '-ml-px' : ''
                  } ${
                    activeTab === tab
                      ? 'relative z-10 border-royal-cream bg-royal-cream text-white'
                      : 'border-royal-border text-royal-muted hover:text-royal-cream'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-4 lg:grid-cols-[1.6fr_1fr]"
          >
            {/* Primary — large pullquote */}
            {primary && (
              <div className="border border-royal-border bg-royal-bg p-8 md:p-12">
                <span
                  className="font-display font-semibold leading-none text-royal-border"
                  style={{ fontSize: '5rem', lineHeight: 0.8 }}
                  aria-hidden="true"
                >
                  "
                </span>
                <p
                  className="mt-4 font-display font-medium text-royal-cream"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.02em', lineHeight: 1.4 }}
                >
                  {primary.quote.replace(/^"|"$/g, '')}
                </p>
                <div className="mt-8 flex items-center gap-4 border-t border-royal-border pt-6">
                  <div className="flex h-10 w-10 items-center justify-center bg-royal-cream">
                    <span className="font-display text-sm font-semibold text-white">
                      {primary.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-royal-cream">{primary.name}</p>
                    <p className="text-xs text-royal-muted">{primary.detail}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary — stacked compact quotes */}
            <div className="flex flex-col gap-4">
              {rest.map((story) => (
                <div key={story.name} className="flex-1 border border-royal-border p-7">
                  <span className="font-display text-3xl leading-none text-royal-border" aria-hidden="true">"</span>
                  <p className="mt-2 text-sm leading-relaxed text-royal-muted">
                    {story.quote.replace(/^"|"$/g, '')}
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-royal-border pt-4">
                    <div className="flex h-7 w-7 items-center justify-center bg-royal-bg">
                      <span className="text-xs font-semibold text-royal-muted">{story.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-royal-cream">{story.name}</p>
                      <p className="text-[10px] text-royal-muted">{story.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}