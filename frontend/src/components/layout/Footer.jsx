import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Footer({ variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const isLuxury = variant === 'luxury';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Subscribed successfully');
      setEmail('');
    }, 800);
  };

  if (isLuxury) {
    return (
      <footer className="border-t border-royal-border bg-white">
        <div className="container-wide py-20 md:py-24 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
            <div>
              <Link
                to="/"
                className="font-display text-xl font-semibold tracking-tight text-royal-cream"
                style={{ letterSpacing: '-0.03em' }}
              >
                Royale Rent
              </Link>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-royal-muted">
                A fashion-tech marketplace for Indian celebrations — peer-to-peer,
                editorial, intentional.
              </p>
              <form onSubmit={handleSubscribe} className="mt-10 flex max-w-md border-b border-royal-cream">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Letters from the edit"
                  className="flex-1 bg-transparent py-3 text-sm text-royal-cream placeholder:text-royal-muted/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 text-xs font-medium uppercase tracking-widest text-royal-muted transition-colors hover:text-royal-cream disabled:opacity-50"
                >
                  {loading ? '…' : 'Join'}
                </button>
              </form>
            </div>

            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted">
                Explore
              </h4>
              <ul className="mt-5 space-y-3">
                {[
                  { label: 'All dresses', to: '/explore' },
                  { label: 'List your outfit', to: '/signup' },
                  { label: 'How it works', to: '/#how-it-works' },
                  { label: 'Stories', to: '/#stories' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-royal-muted transition-colors duration-300 hover:text-royal-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted">
                Connect
              </h4>
              <ul className="mt-5 space-y-3">
                {['Instagram', 'Pinterest', 'YouTube'].map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="text-sm text-royal-muted transition-colors duration-300 hover:text-royal-cream"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-3 border-t border-royal-border pt-10 text-xs text-royal-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Royale Rent</p>
            <p className="uppercase tracking-[0.14em]">Crafted in India</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-royal-border bg-white">
      <div className="border-b border-royal-border bg-royal-ink">
        <div className="container-wide py-14 md:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40 mb-3">
                Newsletter
              </p>
              <h3
                className="font-display font-semibold text-white"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', letterSpacing: '-0.025em' }}
              >
                New drops. Style notes.
                <br />
                Every fortnight.
              </h3>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="border border-white/20 border-l-0 bg-white px-5 text-sm font-medium text-royal-ink transition-colors hover:bg-white/90 disabled:opacity-50"
              >
                {loading ? '…' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-wide py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="font-display text-lg font-semibold tracking-tight text-royal-cream">
              Royale Rent
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-royal-muted">
              Peer-to-peer designer fashion rental for Indian weddings and celebrations.
            </p>
          </div>

          {[
            { title: 'Help', links: ['FAQs', 'Care guide', 'Corporate'] },
            { title: 'Company', links: ['About', 'Careers', 'Press'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-royal-muted transition-colors hover:text-royal-cream">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-royal-border pt-8 text-xs text-royal-muted">
          <p>© {new Date().getFullYear()} Royale Rent. All rights reserved.</p>
          <p>Handcrafted in India</p>
        </div>
      </div>
    </footer>
  );
}
