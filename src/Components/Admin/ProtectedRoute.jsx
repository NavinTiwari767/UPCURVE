import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '../../services/auth';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center mt-10">Checking auth...</p>;

  if (!session) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
