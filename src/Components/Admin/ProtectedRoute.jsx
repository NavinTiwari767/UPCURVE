import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, type = 'customer' }) => {
  const location = useLocation();
  
  // Check for sessions
  const customerSession = localStorage.getItem('customer_session');
  const adminSession = localStorage.getItem('admin_session');
  
  // Customer Protection
  if (type === 'customer' && !customerSession) {
    return <Navigate to="/user-auth" state={{ from: location.pathname }} replace />;
  }
  
  // Admin Protection
  if (type === 'admin' && !adminSession) {
    return <Navigate to="/user-auth" state={{ 
      from: location.pathname, 
      isAdmin: true 
    }} replace />;
  }
  
  // Special case: If admin tries to access customer-only pages
  if (type === 'customer' && adminSession) {
    // Optional: You can redirect to admin dashboard or show message
    // return <Navigate to="/admin/dashboard" replace />;
  }
  
  // Special case: If customer tries to access admin-only pages
  if (type === 'admin' && customerSession) {
    return <Navigate to="/user-auth" state={{ 
      from: location.pathname,
      isAdmin: true,
      message: "Please login as admin" 
    }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;