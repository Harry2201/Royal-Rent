import { AuthProvider } from './AuthContext';
import { DressProvider } from './DressContext';
import { WishlistProvider } from './WishlistContext';
import { BookingProvider } from './BookingContext';

function AuthenticatedProviders({ children }) {
  return (
    <DressProvider>
      <WishlistProvider>
        <BookingProvider>{children}</BookingProvider>
      </WishlistProvider>
    </DressProvider>
  );
}

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <AuthenticatedProviders>{children}</AuthenticatedProviders>
    </AuthProvider>
  );
}
