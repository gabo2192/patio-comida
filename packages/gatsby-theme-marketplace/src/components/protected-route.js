import React from 'react';
import { useAuth0 } from '../../utils/auth';

export const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
  if (loading) return <div>Loading...</div>;
  if (isAuthenticated) return children;
  const asyncLogin = async () => {
    await loginWithRedirect({
      appState: { targetUrl: window.location.pathname },
    });
  };
  asyncLogin();
};
