import { motion } from 'framer-motion';

export default function StatCard({ label, value, hint }) {
  return (
    <motion.div
      whileHover={{ opacity: 0.95 }}
      className="card-surface p-6"
    >
      <p className="text-label">{label}</p>
      <p className="font-display mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      {hint && <p className="mt-2 text-xs text-royal-muted">{hint}</p>}
    </motion.div>
  );
}
