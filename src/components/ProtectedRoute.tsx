import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../lib/store/useAuthStore';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'vendor')[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Call it as a function
  const hydrated = useAuthStore((state) => state.hydrated);

  if (!hydrated) {
    return null; // or a loader/spinner
  }
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.access_token);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (allowedRoles && user) {
    const userRole = user.is_vendor ? 'vendor' : 'user';

    if (!allowedRoles.includes(userRole)) {
      const redirectPath = user.is_vendor ? '/admin/dashboard' : '/user';
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;