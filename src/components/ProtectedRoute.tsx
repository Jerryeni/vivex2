import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../lib/store/useAuthStore';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'vendor')[] | 'admin';
}

// const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
//   // const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Call it as a function
//   const hydrated = useAuthStore((state) => state.hydrated);

//   if (!hydrated) {
//     return null; // or a loader/spinner
//   }
//   const user = useAuthStore((state) => state.user);
//   const location = useLocation();

//   const isAuthenticated = useAuthStore((state) => state.access_token);

//   if (!isAuthenticated) {
//     return <Navigate to="/sign-in" state={{ from: location }} replace />;
//   }

//   if (allowedRoles && user) {
//     const userRole = user.is_vendor ? 'vendor' : 'user';

//     if (!allowedRoles.includes(userRole)) {
//       const redirectPath = user.is_vendor ? '/vendor' : '/user';
//       return <Navigate to={redirectPath} replace />;
//     }
//   }

//   return <Outlet />;
// };

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)();
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!hydrated) {
    return <div className="flex items-center justify-center h-screen"><LoadingSpinner /></div>;
  }
  

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (allowedRoles && user) {
    const userRole = user.is_vendor ? 'vendor' : 'user';
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={user.is_vendor ? '/vendor' : '/user'} replace />;
    }
  }

  return <Outlet />;
};


export default ProtectedRoute;