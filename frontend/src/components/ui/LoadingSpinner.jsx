import { motion } from 'framer-motion';

export default function LoadingSpinner({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
      <motion.div
        className="h-8 w-8 rounded-full border-2 border-royal-border border-t-royal-cream"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      <span className="text-sm text-royal-muted">{label}</span>
    </div>
  );
}
