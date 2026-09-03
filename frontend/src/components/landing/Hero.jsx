import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import Dress1 from '../../assets/Dress1.png';
import Dress2 from '../../assets/Dress2.png';
import Dress3 from '../../assets/Dress3.png';


/* ─────────────────────────────────────────────────────────────
   SECTION 1 — Cinematic Hero
   Emotion: Aspiration. The first frame of the film.
───────────────────────────────────────────────────────────── */

export default function Hero() {
  /* ─────────────────────────────────────────────
     Hero image collection
  ───────────────────────────────────────────── */
  const heroImages = [Dress1, Dress2, Dress3];

  /* ─────────────────────────────────────────────
     Active image state
  ───────────────────────────────────────────── */
  const [currentImage, setCurrentImage] = useState(0);

  /* ─────────────────────────────────────────────
     Auto image transition
  ───────────────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      
      {/* ─────────────────────────────────────────────
          FULL-BLEED IMAGE AREA
      ───────────────────────────────────────────── */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[62%] overflow-hidden">
        
        {/* ─────────────────────────────────────────────
            IMAGE TRANSITIONS
        ───────────────────────────────────────────── */}
        <AnimatePresence mode="wait">

          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Bridal editorial"

            initial={{
              opacity: 0,
              scale: 1.08,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              scale: 1.03,
            }}

            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}

            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </AnimatePresence>

        {/* ─────────────────────────────────────────────
            DARK OVERLAY FOR TEXT VISIBILITY
        ───────────────────────────────────────────── */}
        <div className="absolute inset-0 bg-black/28" />

        {/* ─────────────────────────────────────────────
            RIGHT SIDE FADE
        ───────────────────────────────────────────── */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-white lg:block" />

        {/* ─────────────────────────────────────────────
            MOBILE BOTTOM FADE
        ───────────────────────────────────────────── */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-white via-white/85 to-transparent lg:hidden" />
      </div>

      {/* ─────────────────────────────────────────────
          TOP BAR
      ───────────────────────────────────────────── */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-[88px] md:px-8 lg:px-14">
        
        <motion.span
          className="text-label text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Royale Rent · S/S 2025
        </motion.span>

        <motion.span
          className="text-label hidden text-white md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          Indian Wedding Fashion
        </motion.span>
      </div>

      {/* ─────────────────────────────────────────────
          LEFT SIDE VERTICAL LABEL
      ───────────────────────────────────────────── */}
      <motion.div
        className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.22em] text-white/80">
          Peer-to-peer · Designer Rental
        </p>
      </motion.div>

      {/* ─────────────────────────────────────────────
          HERO CONTENT
      ───────────────────────────────────────────── */}
      <div className="container-editorial relative z-20 flex min-h-screen flex-col justify-end pb-20 lg:justify-center lg:pb-0">
        
        <div className="lg:ml-auto lg:w-[46%] lg:pl-10 xl:pl-14">

          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.0,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            {/* ─────────────────────────────────────────────
                MAIN HEADLINE
            ───────────────────────────────────────────── */}
            <h1
              className="font-display font-semibold text-white lg:text-royal-cream"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 6.75rem)',
                lineHeight: 0.93,
                letterSpacing: '-0.04em',

                /* TEXT SHADOW FOR IMAGE CONTRAST */
                textShadow:
                  '0px 4px 24px rgba(0,0,0,0.28)',
              }}
            >
              Worn once.
              <br />

              <em style={{ fontStyle: 'italic' }}>
                Remembered
              </em>

              <br />
              forever.
            </h1>

            {/* ─────────────────────────────────────────────
                SUB COPY
            ───────────────────────────────────────────── */}
            <p
              className="mt-8 max-w-[30ch] text-[15px] leading-[1.7] text-white/88 lg:text-royal-muted"
              style={{
                textShadow:
                  '0px 2px 18px rgba(0,0,0,0.35)',
              }}
            >
              The lehenga that made a room stop.
              The gown that became the photo.
              Rent it. Live it. Return it with grace.
            </p>
          </motion.div>

          {/* ─────────────────────────────────────────────
              CTA BUTTONS
          ───────────────────────────────────────────── */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              to="/explore"
              className="inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-medium text-black transition-all duration-500 hover:bg-black hover:text-white"
            >
              Explore collection
              <span className="opacity-50">↗</span>
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center gap-3 border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-500 hover:bg-white hover:text-black"
            >
              List your outfit
            </Link>
          </motion.div>

          {/* ─────────────────────────────────────────────
              EDITORIAL CREDIT
          ───────────────────────────────────────────── */}
          <motion.p
            className="mt-14 text-[10px] uppercase tracking-[0.16em] text-white/60 lg:text-royal-muted/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            Bridal edit · Mumbai, 2025
          </motion.p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          BOTTOM MARQUEE
      ───────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/10 bg-black/20 py-3.5 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
      >
        <div className="marquee-track text-label text-white/55">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-8"
              >
                Bridal Lehengas
                <span className="h-px w-5 bg-current opacity-30" />

                Designer Gowns
                <span className="h-px w-5 bg-current opacity-30" />

                Groom Sherwanis
                <span className="h-px w-5 bg-current opacity-30" />

                Reception Looks
                <span className="h-px w-5 bg-current opacity-30" />

                Cocktail Couture
                <span className="h-px w-5 bg-current opacity-30" />

                Farewell Drapes
                <span className="h-px w-5 bg-current opacity-30" />
              </span>
            ))}
        </div>
      </motion.div>
    </section>
  );
}