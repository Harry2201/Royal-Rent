import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-royal-cream text-white border border-royal-cream shadow-none hover:bg-royal-accent',
  ghost:
    'bg-transparent border border-royal-border text-royal-cream shadow-none hover:border-royal-cream',
  link: 'bg-transparent border-0 text-royal-cream shadow-none p-0 font-medium underline-offset-4 hover:underline',
  google:
    'bg-royal-bg-soft border border-royal-border text-royal-cream shadow-none hover:bg-royal-bg',
};

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-cream/30 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <motion.button
      type={type}
      whileHover={disabled || loading ? {} : { opacity: 0.92 }}
      whileTap={disabled || loading ? {} : { scale: 0.99 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-royal-border border-t-royal-cream" />
          Please wait…
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
