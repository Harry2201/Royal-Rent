import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

export default function RoleRoute({ children, roles = [] }) {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {roles.length > 0 && !roles.includes(user?.role) ? (
        <Navigate to="/dashboard" replace />
      ) : (
        children
      )}
    </ProtectedRoute>
  );
}
