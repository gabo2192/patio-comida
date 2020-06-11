/**@jsx jsx */
import { jsx } from 'theme-ui';

import { FaShippingFast, FaStore } from 'react-icons/fa';

const MarketPreview = ({
  market: { name, background, products, logo, services, categories },
}) => {
  let price = [];
  products && products.forEach((product) => price.push(product.price));
  return (
    <div
      sx={{
        variant: 'card.primary',
        mb: 0,
        textDecoration: 'none',
      }}
    >
      <div sx={{ position: 'relative' }}>
        <div sx={{ width: '100%', pt: '56.25%', position: 'relative' }}>
          {background ? (
            <img
              src={background}
              alt={name}
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

        {logo ? (
          <img
            src={logo}
            alt={name}
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '100%',
              position: 'absolute',
              top: '10px',
              left: '10px',
            }}
          />
        ) : (
          <div
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '100%',
              position: 'absolute',
              top: '10px',
              left: '10px',
              bg: 'brown',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'heading',
            }}
          >
            <h1 sx={{ textTransform: 'uppercase' }}>
              {name ? name.substring(0, 2) : 'ST'}
            </h1>
          </div>
        )}
      </div>
      <span sx={{ px: '20px', mt: '20px' }}>
        {services.includes('DELIVERY') && (
          <FaShippingFast
            sx={{
              mr: '8px',
              my: 0,
              color: 'brown',
              height: '25px',
              width: '25px',
            }}
            title="Delivery"
          />
        )}
        {services.includes('STOREPICKUP') && (
          <FaStore
            sx={{
              my: 0,
              color: 'brown',
              height: '25px',
              width: '25px',
            }}
            title="Recojo en tienda"
          />
        )}
      </span>
      <h3
        sx={{
          my: 0,
          textAlign: 'left',
          variant: 'text.heading',
          textTransform: 'uppercase',
          px: '20px',
        }}
      >
        Restaurant
      </h3>
      <h1
        sx={{
          mt: '5px',
          mb: 0,
          color: (theme) => theme.colors.brown,
          fontFamily: (theme) => theme.fonts.heading,
          px: '20px',
        }}
      >
        {name ? name : 'El nombre de tu negocio'}
      </h1>

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
        {products &&
          products.map((product) => (
            <span
              sx={{ textTransform: 'capitalize' }}
              key={product.title}
            >{`${product.title}, `}</span>
          ))}
        {products ? 'etc.' : 'Acá irá un listado de tus mejores platos'}
      </p>
    </div>
  );
};

export default MarketPreview;
