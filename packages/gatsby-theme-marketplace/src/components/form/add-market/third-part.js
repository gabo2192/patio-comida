/**@jsx jsx */

import { jsx } from 'theme-ui';
import { Fragment } from 'react';

const services = [
  { description: 'delivery', value: 'DELIVERY' },
  { description: 'recojo en tienda', value: 'STOREPICKUP' },
];

export const categories = [
  { description: 'parrillas', value: 'GRILL' },
  { description: 'pollo a la brasa', value: 'ROASTED' },
  { description: 'chifa', value: 'CHINESE' },
  { description: 'sushi/makis', value: 'SUSHI' },
  { description: 'comida criolla', value: 'PERUVIAN' },
  { description: 'menu en general', value: 'MENU' },
  { description: 'pescados y mariscos', value: 'FISH' },
  { description: 'comida rapida', value: 'FASTFOOD' },
  { description: 'repostería', value: 'CAKE' },
  { description: 'comida selvática', value: 'SELVA' },
  { description: 'comida de sierra', value: 'SIERRA' },
  { description: 'comida costeña', value: 'COSTA' },
  { description: 'sopas', value: 'SOUPS' },
  { description: 'otros', value: 'OTHER' },
];

const ThirdPart = ({
  handleService,
  handleCategory,
  store,
  handleBack,
  handleSubmit,
}) => {
  return (
    <Fragment>
      <h3>¿Qué servicios brindas?</h3>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '8px',
        }}
      >
        {services.map(({ description, value }) => (
          <button
            key={`service-${value}`}
            onClick={(e) => handleService(e, value)}
            sx={{
              variant: 'button.secondary',
              opacity: store.services.includes(value) ? 1 : 0.5,
              bg: store.services.includes(value) ? 'secondary' : 'muted',
              color: store.services.includes(value) ? 'brown' : 'black',
              borderColor: store.services.includes(value)
                ? 'secondary'
                : 'muted',
            }}
          >
            {description}
          </button>
        ))}
      </div>
      <h3>¿Qué tipo de comida sirves?</h3>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '8px',
        }}
      >
        {categories.map(({ description, value }) => (
          <button
            key={`category-${value}`}
            onClick={(e) => handleCategory(e, value)}
            sx={{
              variant: 'button.secondary',
              opacity: store.categories.includes(value) ? 1 : 0.5,
              bg: store.categories.includes(value) ? 'secondary' : 'muted',
              color: store.categories.includes(value) ? 'brown' : 'black',
              borderColor: store.categories.includes(value)
                ? 'secondary'
                : 'muted',
            }}
          >
            {description}
          </button>
        ))}
      </div>
      <p sx={{ textAlign: 'center' }}>
        <input
          aria-label="next"
          type="button"
          onClick={handleBack}
          value="Anterior"
          sx={{
            variant: 'button.secondary',
            mr: '8px',
          }}
        />
        <input
          aria-label="next"
          type="submit"
          onClick={handleSubmit}
          value="Crear restaurante"
          disabled={store.categories.length < 1 || store.services.length < 1}
          sx={
            store.categories.length < 1 || store.services.length < 1
              ? {
                  opacity: '0.5',
                  variant: 'button.primary',
                }
              : { variant: 'button.primary' }
          }
        />
      </p>
    </Fragment>
  );
};

export default ThirdPart;
