/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

import Icon from '../../assets/svg/svg';

const Header = () => {
  return (
    <header
      sx={{
        bg: 'primary',
        height: 64,
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '32px 1fr 32px',
          alignItems: 'center',
          height: '100%',
          mx: 'auto',
          maxWidth: (t) => `calc(${t.breakpoints.slice(-1)[0]} + 96px)`,
          width: '90vw',
        }}
      >
        <button
          sx={{
            bg: 'transparent',
            border: 'transparent',
            p: 0,
            '&:focus': {
              border: 'text',
            },
          }}
        >
          <Icon name="menu" />
        </button>
        <Link
          sx={{
            mx: 'auto',
            '&:focus': {
              border: 'text',
            },
          }}
          to="/"
        >
          <Icon name="logo" />
        </Link>
        <button
          sx={{
            bg: 'transparent',
            border: 'transparent',
            p: 0,
            '&:focus': {
              border: 'text',
            },
          }}
          /*           onClick={() => setSearch((current) => !current)}
           */
        >
          <Icon name="search" />
        </button>
      </div>
    </header>
  );
};

export default Header;
