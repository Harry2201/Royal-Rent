import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import { validateLogin } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

/* ─── Login — editorial split auth, minimal form, cinematic image panel ─── */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from?.pathname || '/dashboard';
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      await login(form, remember);
      toast.success('Welcome back.');
      navigate(redirect, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar transparent={false} />

      <div className="flex min-h-screen pt-[72px]">

        {/* ── Left image panel ── */}
        <div className="relative hidden w-[55%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=85"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Bottom editorial text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-12 xl:p-16"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 mb-4">
              Royale Rent
            </p>
            <h2
              className="font-display font-semibold text-white"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Your wardrobe,<br />
              <em style={{ fontStyle: 'italic' }}>reimagined.</em>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Access reservations, wishlists, and listings in one place.
            </p>
          </motion.div>
        </div>

        {/* ── Right form panel ── */}
        <div className="flex flex-1 items-center justify-center px-6 py-16 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[380px]"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-royal-muted transition-colors hover:text-royal-cream"
            >
              ← Back
            </Link>

            <h1
              className="mt-10 font-display font-semibold"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', letterSpacing: '-0.03em' }}
            >
              Sign in
            </h1>
            <p className="mt-2 text-sm text-royal-muted">Enter your account details below.</p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-0" noValidate>

              {/* Email */}
              <div className="border-b border-royal-border pb-0 pt-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted">Email</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="input-field w-full"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="border-b border-royal-border pb-0 pt-6">
                <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted">Password</label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  className="input-field w-full"
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between pt-5 text-xs text-royal-muted">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-royal-cream"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="underline-offset-4 hover:text-royal-cream hover:underline"
                  onClick={() => toast('Password reset coming soon.')}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full bg-royal-cream py-3.5 text-sm font-medium text-white transition-colors hover:bg-royal-accent disabled:opacity-50"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-royal-border" />
                </div>
                <span className="relative bg-white px-3 text-xs text-royal-muted">or</span>
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={() => toast.success('Google sign-in coming soon.')}
                className="w-full border border-royal-border py-3.5 text-sm font-medium text-royal-cream transition-colors hover:border-royal-cream"
              >
                Continue with Google
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-8 border border-royal-border bg-royal-bg p-4 text-xs text-royal-muted">
              <p className="font-medium text-royal-cream mb-1">Demo access</p>
              customer@royalerent.com · owner@royalerent.com · admin@royalerent.com
              <br />Password: <span className="text-royal-cream">password123</span>
            </div>

            <p className="mt-6 text-center text-sm text-royal-muted">
              New here?{' '}
              <Link to="/signup" className="font-medium text-royal-cream hover:underline">
                Create account →
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}