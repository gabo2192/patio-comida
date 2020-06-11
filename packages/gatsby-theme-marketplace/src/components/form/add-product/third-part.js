/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';

import { categories as importedCategories } from '../add-market/third-part';

const ThirdPart = ({ product, handleCategory, handleBefore }) => {
  const { categories } = product;
  return (
    <Fragment>
      <div>
        <h3 sx={{ variant: 'text.heading' }}>Categorías</h3>
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr 1fr', '1fr 1fr 1fr'],
            gridGap: '8px',
          }}
        >
          {importedCategories.map(({ description, value }) => (
            <button
              key={`category-${value}`}
              onClick={(e) => handleCategory(e, value)}
              sx={{
                variant: 'button.secondary',
                opacity: categories.includes(value) ? 1 : 0.5,
                color: categories.includes(value) ? 'brown' : 'black',
                bg: categories.includes(value) ? 'secondary' : 'muted',
                borderColor: categories.includes(value) ? 'secondary' : 'muted',
              }}
            >
              {description}
            </button>
          ))}
        </div>
      </div>
      <p sx={{ textAlign: 'center' }}>
        <input
          aria-label="back"
          type="button"
          onClick={handleBefore}
          value="Atrás"
          disabled={!categories}
          sx={{ variant: 'button.secondary', mr: '8px' }}
        />
        <input
          aria-label="submit"
          type="submit"
          onClick={() => console.log('clicked')}
          value="Crear y agregar otro"
          disabled={!categories}
          sx={
            !categories
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
