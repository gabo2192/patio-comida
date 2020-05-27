/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { Link } from 'gatsby';
import { useAuth0 } from '../../utils/auth';

const Header = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    loading,
  } = useAuth0();
  return (
    <header
      sx={{ bg: 'secondary', color: 'background', fontFamily: 'heading', p: 3 }}
    >
      <div sx={{ width: '90vw', maxWidth: 1200, mx: 'auto' }}>
        <Link
          to="/restaurantes"
          sx={{ textDecoration: 'none', color: (t) => t.colors.brown }}
        >
          <h2 sx={{ m: 0 }}>Patio de Comidas</h2>
        </Link>
        {!isAuthenticated && !loading && (
          <button
            sx={{ variant: 'button.primary' }}
            onClick={() =>
              loginWithRedirect({ appState: `${window.location.pathname}` })
            }
          >
            Log in
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
                variant: 'button.primary',
              }}
              to="cuenta/details"
            >
              Cuenta
            </Link>
            <button sx={{ variant: 'button.primary' }} onClick={() => logout()}>
              Log out
            </button>
          </Fragment>
        )}
      </div>
    </header>
  );
};

export default Header;
