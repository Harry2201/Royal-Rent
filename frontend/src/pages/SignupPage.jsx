import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import { validateSignup } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const userTypes = [
  { id: 'rent', label: 'Rent a dress', desc: 'Browse curated pieces for your event' },
  { id: 'list', label: 'List my dress', desc: 'Share pieces and earn from your wardrobe' },
];

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    userType: 'rent', termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignup(form);
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, userType: form.userType, city: 'Bengaluru' }, true);
      toast.success('Account created.');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, name, type = 'text', placeholder }) => (
    <div className="border-b border-royal-border pb-0 pt-2">
      <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        className="input-field w-full"
      />
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar transparent={false} />
      <div className="flex min-h-screen pt-[72px]">

        {/* Image panel */}
        <div className="relative hidden w-[45%] lg:block">
          <img
            src="https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?auto=format&fit=crop&w=1200&q=85"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-12 xl:p-16"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40 mb-4">Join Royale Rent</p>
            <h2
              className="font-display font-semibold text-white"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Modern rental for<br />
              <em style={{ fontStyle: 'italic' }}>Indian celebrations.</em>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              List or rent designer pieces with India's editorial fashion marketplace.
            </p>
          </motion.div>
        </div>

        {/* Form panel */}
        <div className="flex flex-1 items-start justify-center overflow-y-auto px-6 py-16 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[420px] py-4"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-royal-muted hover:text-royal-cream">
              ← Back
            </Link>

            <h1
              className="mt-10 font-display font-semibold"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', letterSpacing: '-0.03em' }}
            >
              Create account
            </h1>
            <p className="mt-2 text-sm text-royal-muted">Start listing or renting in minutes.</p>

            <form onSubmit={handleSubmit} className="mt-10" noValidate>
              <div className="space-y-6">
                <Field label="Full name" name="name" />
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                  <Field label="Phone" name="phone" type="tel" placeholder="+91" />
                </div>
                <div className="grid grid-cols-2 gap-6">
  <div> Password
    <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      className="border border-black p-2 w-full"
    />
  </div>

  <div> Confirm Password
    <input
      type="password"
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={handleChange}
      className="border border-black p-2 w-full"
    />
  </div>
</div>
              </div>

              {/* User type */}
              <div className="mt-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted mb-3">I want to</p>
                <div className="grid grid-cols-2 gap-3">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, userType: type.id }))}
                      className={`border p-4 text-left transition-colors ${
                        form.userType === type.id
                          ? 'border-royal-cream bg-royal-bg'
                          : 'border-royal-border hover:border-royal-muted'
                      }`}
                    >
                      <span className="block text-sm font-medium">{type.label}</span>
                      <span className="mt-1 block text-xs text-royal-muted leading-snug">{type.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs text-royal-muted">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                  className="mt-0.5 accent-royal-cream"
                />
                <span>
                  I agree to the{' '}
                  <button type="button" className="text-royal-cream underline-offset-4 hover:underline" onClick={() => toast('Terms coming soon.')}>
                    Terms & Conditions
                  </button>
                </span>
              </label>
              {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full bg-royal-cream py-3.5 text-sm font-medium text-white transition-colors hover:bg-royal-accent disabled:opacity-50"
              >
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-royal-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-royal-cream hover:underline">Sign in →</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}