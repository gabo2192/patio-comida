/**@jsx jsx */

import { jsx } from 'theme-ui';

const Product = ({
  product: { title, image, description, calories, price },
}) => (
  <div sx={{ variant: 'card.primary', ':hover': {} }}>
    <img
      src={image}
      alt={title}
      sx={{
        height: '175px',
        width: '100%',
        objectFit: 'cover',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
    />
    <h3 sx={{ mb: 0, px: '20px', variant: 'text.heading' }}>{title}</h3>
    <p sx={{ my: 0, px: '20px' }}>{description}</p>
    {calories && (
      <p
        sx={{ my: 0, px: '20px', textAlign: 'right', variant: 'text.heading' }}
      >
        Calorías: {calories}
      </p>
    )}
    <h3 sx={{ my: 0, px: '20px', textAlign: 'right', variant: 'text.heading' }}>
      Precio:{' '}
      {price.toLocaleString('es-PE', {
        style: 'currency',
        currency: 'PEN',
      })}
    </h3>
    <div sx={{ mx: 'auto', my: '16px' }}>
      <button sx={{ variant: 'button.primary' }}>Comprar</button>
    </div>
  </div>
);

export default Product;
