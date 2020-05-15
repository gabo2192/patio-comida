/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

const Header = () => (
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
    </div>
  </header>
);

export default Header;
