import { useEffect } from 'react';
import { useAuth0 } from '../../utils/auth';
import { navigate } from 'gatsby';

const NAME_SPACE = 'https://patiodecomida/';

export const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();
  useEffect(() => {
    if (loading) return undefined;
    if (isAuthenticated) {
      const userPhone = user ? user[`${NAME_SPACE}phone`] : null;
      const userAddress = user ? user[`${NAME_SPACE}address`] : null;

      if (userPhone && userAddress.address) {
        return undefined;
      } else {
        navigate('/completa-tu-perfil');
      }
      return undefined;
    }
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
