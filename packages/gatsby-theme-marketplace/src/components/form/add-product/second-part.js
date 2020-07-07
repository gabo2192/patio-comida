/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { categories as importedCategories } from '../add-market/third-part';

import { MdDateRange } from 'react-icons/md';
import { FaFire } from 'react-icons/fa';

import Input from '../input';

const SecondPart = ({
  product,
  handleChange,
  handleBefore,
  handleCategory,
}) => {
  const { frequency, featured, schedule, categories } = product;
  return (
    <Fragment>
      <div>
        <Input
          name="featured"
          type="checkbox"
          value={featured}
          handleChange={handleChange}
          placeholder="¿QUIERES DESTACAR TU PLATO?"
        >
          <FaFire />
        </Input>
        <Input
          name="frequency"
          type="checkbox"
          value={frequency}
          handleChange={handleChange}
          placeholder="¿Vendes este plato todos los días?"
        >
          <MdDateRange />
        </Input>

        <Input
          name="schedule"
          type="checkbox"
          value={schedule}
          handleChange={handleChange}
          placeholder="¿Vendes este plato a toda hora?"
        >
          <MdDateRange />
        </Input>
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
          value="Crear"
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

export default SecondPart;
