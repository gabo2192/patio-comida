/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { Link } from 'gatsby';

import { useAuth0 } from '../../../utils/auth';

const TopBar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    loading,
  } = useAuth0();
  return (
    <div
      sx={{
        bg: 'brown',
        color: 'background',
        p: '8px',
      }}
    >
      <div
        sx={{
          variant: 'container.primary',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {!isAuthenticated && !loading && (
          <button
            sx={{
              variant: 'button.header',
            }}
            onClick={() =>
              loginWithRedirect({ appState: `${window.location.pathname}` })
            }
          >
            Ingresa
          </button>
        )}
        {isAuthenticated && user && (
          <Fragment>
            <Link
              sx={{
                textDecoration: 'none',
                padding: 0,
                marginRight: '10px',
                fontSize: '17px',
                display: 'flex',
                alignItems: 'center',
                variant: 'button.header',
              }}
              to="/cuenta/vender"
            >
              Vender
            </Link>
            <Link
              sx={{
                textDecoration: 'none',
                padding: 0,
                marginRight: '10px',
                fontSize: '17px',
                display: 'flex',
                alignItems: 'center',
                variant: 'button.header',
              }}
              to="/cuenta/detalles"
            >
              Cuenta
            </Link>
            <button
              aria-label="logout"
              sx={{ variant: 'button.header' }}
              onClick={() => logout()}
            >
              Salir
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default TopBar;
