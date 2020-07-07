import { useEffect } from 'react';
import { navigate } from 'gatsby';

import { useAuth0 } from '../../utils/auth';

export const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();
  useEffect(() => {
    if (loading) return undefined;
    if (isAuthenticated) return undefined;
    const asyncLogin = async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      });
    };
    asyncLogin();
  }, [loading, isAuthenticated, loginWithRedirect, user]);
  if (loading) return null;
  if (isAuthenticated) return children;
  return null;
};
