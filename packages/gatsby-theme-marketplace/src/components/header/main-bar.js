/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

const MainBar = () => {
  return (
    <div
      sx={{ bg: 'secondary', color: 'background', fontFamily: 'heading', p: 3 }}
    >
      <div sx={{ variant: 'container.primary' }}>
        <Link
          to="/restaurantes"
          sx={{ textDecoration: 'none', color: (t) => t.colors.brown }}
        >
          <h2 sx={{ m: 0 }}>Patio de Comidas</h2>
        </Link>
      </div>
    </div>
  );
};

export default MainBar;
