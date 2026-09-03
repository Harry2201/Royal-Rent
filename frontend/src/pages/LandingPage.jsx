import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import Collections from '../components/landing/Collections';
import Curation from '../components/landing/Curation';
import EmotionalInsight from '../components/landing/EmotionalInsight';
import HowItWorks from '../components/landing/HowItWorks';
import OwnerStories from '../components/landing/OwnerStories';
import SocialProof from '../components/landing/SocialProof';
import Testimonials from '../components/landing/Testimonials';
import BrandStatement from '../components/landing/BrandStatement';

/*
  Homepage Narrative Arc:
  ─────────────────────────────────────────────────────────────
  01 Hero            → Aspiration    "Worn once. Remembered forever."
  02 Collections     → Curiosity     "What can I wear for my occasion?"
  03 Curation        → Desire        "I want that exact look."
  04 EmotionalInsight→ Connection    "Why this matters."
  05 HowItWorks      → Trust         "Simple. Real. Beautiful."
  06 OwnerStories    → Human warmth  "Real people. Real wardrobes."
  07 SocialProof     → Social proof  "Others are doing this."
  08 Testimonials    → Validation    "People like me love this."
  09 BrandStatement  → Action        "Fashion deserves more."
  10 Footer
  ─────────────────────────────────────────────────────────────
*/

export default function LandingPage() {
  return (
    <div className="page-canvas overflow-x-hidden">
      <Navbar transparent />

      <Hero />

      <main>
        {/* Curiosity */}
        <Collections />

        {/* Desire */}
        <Curation />

        {/* Connection — the "why" */}
        <EmotionalInsight />

        {/* Trust — process */}
        <HowItWorks />

        {/* Human warmth */}
        <OwnerStories />

        {/* Social validation */}
        <SocialProof />

        {/* Community voices */}
        <Testimonials />

        {/* Closing manifesto + CTA */}
        <BrandStatement />
      </main>

      <Footer />
    </div>
  );
}