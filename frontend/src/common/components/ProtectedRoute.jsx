import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const auth = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    console.log('ProtectedRoute Auth State:', { 
      hasUser: !!auth?.user, 
      loading: auth?.loading, 
      requiredRole,
      path: location.pathname
    });
  }, [auth, location, requiredRole]);

  if (!auth) {
    console.error('ProtectedRoute: AuthContext is missing!');
    return <div className="p-20 text-center text-red-600">Configuration Error: AuthContext missing.</div>;
  }

  const { user, loading } = auth;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute: No user found, redirecting to /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    console.log(`ProtectedRoute: Role mismatch (got ${user.role}, need ${requiredRole}), redirecting to /dashboard`);
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
