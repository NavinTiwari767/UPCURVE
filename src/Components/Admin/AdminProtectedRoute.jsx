import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const adminSession = localStorage.getItem('admin_session');
      
      if (!adminSession) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Additional validation if needed
      const adminData = JSON.parse(adminSession);
      const isValid = adminData && adminData.email && (adminData.role === 'admin' || adminData.role === 'super_admin');
      
      setIsAuthenticated(isValid);
    } catch (error) {
      console.error('Admin auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AdminProtectedRoute;