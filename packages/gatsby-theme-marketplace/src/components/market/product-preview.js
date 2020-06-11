/**@jsx jsx */

import { jsx } from 'theme-ui';

//UTILS
import { formatCurrency } from '../../utils/format-currency';

const ProductPreview = ({
  product: { title, image, description, price, stock },
}) => (
  <div sx={{ variant: 'card.primary', mb: 0, textDecoration: 'none' }}>
    <div sx={{ position: 'relative' }}>
      <div sx={{ width: '100%', pt: '56.25%', position: 'relative' }}>
        {image ? (
          <img
            src={image}
            alt={title}
            sx={{
              mx: 'auto',
              width: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        ) : (
          <div
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bg: 'muted',
              display: 'flex',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Tienes que insertar la imagen principal
          </div>
        )}
      </div>
    </div>
    <em sx={{ px: '20px', pt: '8px', fontSize: '14px', textAlign: 'right' }}>
      Stock: {stock}
    </em>
    <h1 sx={{ px: '20px', variant: 'text.heading' }}>{title}</h1>
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        mx: '20px',
      }}
    >
      <p sx={{ my: 0, pr: '20px' }}>
        <em>{description}</em>
      </p>
      <h3
        sx={{
          my: 0,
          p: '8px',
          textAlign: 'center',
          variant: 'text.heading',
          border: '1px solid brown',
          borderRadius: '8px',
        }}
      >
        Precio: {formatCurrency(price)}
      </h3>
    </div>

    <div sx={{ mx: 'auto', my: '16px' }}>
      <button sx={{ variant: 'button.primary' }}>Comprar</button>
    </div>
  </div>
);

export default ProductPreview;
