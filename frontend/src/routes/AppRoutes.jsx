import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import { ROLES } from '../utils/constants';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ExplorePage from '../pages/ExplorePage';
import DressDetailsPage from '../pages/DressDetailsPage';
import DashboardPage from '../pages/DashboardPage';
import MyListingsPage from '../pages/MyListingsPage';
import WishlistPage from '../pages/WishlistPage';
import BookingRequestsPage from '../pages/BookingRequestsPage';
import ProfileSettingsPage from '../pages/ProfileSettingsPage';
import UploadDressPage from '../pages/UploadDressPage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';

function LegacyDressRedirect() {
  const { id } = useParams();
  return <Navigate to={`/dress/${id}`} replace />;
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/explore"
          element={
            <PageTransition>
              <ExplorePage />
            </PageTransition>
          }
        />
        <Route
          path="/dress/:id"
          element={
            <PageTransition>
              <DressDetailsPage />
            </PageTransition>
          }
        />
        <Route path="/dresses/:id" element={<LegacyDressRedirect />} />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <PageTransition>
                <LoginPage />
              </PageTransition>
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <PageTransition>
                <SignupPage />
              </PageTransition>
            </GuestRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/bookings" element={<BookingRequestsPage />} />
          <Route path="/settings" element={<ProfileSettingsPage />} />
          <Route
            path="/my-listings"
            element={
              <RoleRoute roles={[ROLES.OWNER, ROLES.ADMIN]}>
                <MyListingsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/upload-dress"
            element={
              <RoleRoute roles={[ROLES.OWNER, ROLES.ADMIN]}>
                <UploadDressPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <RoleRoute roles={[ROLES.ADMIN]}>
                <AdminPage />
              </RoleRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
