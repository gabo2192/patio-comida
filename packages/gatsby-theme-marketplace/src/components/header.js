/**@jsx jsx */
import { jsx } from 'theme-ui';
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
        {!isAuthenticated && (
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
          <button sx={{ variant: 'button.primary' }} onClick={() => logout()}>
            Log out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
