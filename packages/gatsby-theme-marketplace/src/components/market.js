/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

import { FaShippingFast, FaStore } from 'react-icons/fa';

const Market = ({ market: { name, path, background, products } }) => {
  let price = [];
  products.forEach((product) => price.push(product.price));

  return (
    <Link
      sx={{
        variant: 'card.primary',
        textDecoration: 'none',
      }}
      to={`restaurantes/${path}`}
    >
      <img
        src={background}
        alt={name}
        sx={{
          mx: 'auto',
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <span sx={{ px: '20px', mt: '20px' }}>
        <FaShippingFast
          sx={{ mr: '8px', my: 0, color: (t) => t.colors.brown }}
          title="Delivery"
        />
        <FaStore
          sx={{ my: 0, color: (t) => t.colors.brown }}
          title="Restaurante"
        />
      </span>
      <p
        sx={{
          my: 0,
          textAlign: 'left',
          variant: 'text.heading',
          textTransform: 'uppercase',
          fontSize: '12px',
          px: '20px',
        }}
      >
        Restaurant
      </p>
      <h3
        sx={{
          mt: '5px',
          mb: 0,
          color: (theme) => theme.colors.brown,
          fontFamily: (theme) => theme.fonts.heading,
          px: '20px',
        }}
      >
        {name}
      </h3>
      <p
        sx={{
          mt: '5px',
          mb: 0,
          textAlign: 'justify',
          px: '20px',
          pb: '20px',
          color: 'muted',
          fontSize: '13px',
        }}
      >
        {products.map((product) => (
          <span
            sx={{ textTransform: 'capitalize' }}
          >{`${product.title}, `}</span>
        ))}
        etc.
      </p>
    </Link>
  );
};

export default Market;
