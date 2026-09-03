import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="page-canvas">
      <Navbar transparent={false} />
      <div className="container-editorial flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-[120px] font-semibold leading-none text-royal-border"
        >
          404
        </motion.p>
        <h1 className="heading-section mt-6">Page not found</h1>
        <p className="text-body mt-4 max-w-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="mt-10">
          <Button>Home</Button>
        </Link>
        <Link to="/explore" className="mt-4 text-sm text-royal-muted hover:text-royal-cream">
          Explore dresses
        </Link>
      </div>
    </div>
  );
}
