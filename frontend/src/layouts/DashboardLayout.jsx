import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import Navbar from '../components/layout/Navbar';

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-canvas-muted min-h-screen">
      <Navbar transparent={false} />
      <div className="container-editorial flex gap-8 pb-20 pt-24 lg:pt-28">
        <DashboardSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="min-w-0 flex-1">
          <button
            type="button"
            className="mb-6 rounded-md border border-royal-border px-4 py-2 text-sm text-royal-muted lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            Menu
          </button>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
