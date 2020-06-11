/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';

import { MdDateRange } from 'react-icons/md';
import { FaFire } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';

import Input from '../input';

const week = [
  { description: 'Lu', value: 'LUNES' },
  { description: 'Ma', value: 'MARTES' },
  { description: 'Mi', value: 'MIERCOLES' },
  { description: 'Ju', value: 'JUEVES' },
  { description: 'Vi', value: 'VIERNES' },
  { description: 'SA', value: 'SABADO' },
  { description: 'do', value: 'DOMINGO' },
];

const SecondPart = ({
  product,
  handleDays,
  handleChange,
  handleBefore,
  handleFoward,
}) => {
  const { days, frequency, featured, schedule, start, finish } = product;
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
        {!frequency && (
          <div sx={{ mb: '16px' }}>
            <h3 sx={{ variant: 'text.heading', textAlign: 'center' }}>Días</h3>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridGap: '8px',
              }}
            >
              {week.map(({ description, value }) => (
                <button
                  key={`day-${value}`}
                  onClick={(e) => handleDays(e, value)}
                  sx={{
                    variant: 'button.secondary',
                    opacity: days.includes(value) ? 1 : 0.5,
                    color: days.includes(value) ? 'brown' : 'black',
                    bg: days.includes(value) ? 'secondary' : 'muted',
                    borderColor: days.includes(value) ? 'secondary' : 'muted',
                    p: 0,
                    letterSpacing: 0,
                    borderRadius: '50%',
                    height: '50px',
                    width: '50px',
                  }}
                >
                  {description}
                </button>
              ))}
            </div>
          </div>
        )}
        <Input
          name="schedule"
          type="checkbox"
          value={schedule}
          handleChange={handleChange}
          placeholder="¿Vendes este plato a toda hora?"
        >
          <MdDateRange />
        </Input>
        {!schedule && (
          <div>
            <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Fragment>
                <h3
                  sx={{
                    variant: 'text.heading',
                    mb: '16px',
                    mt: '8px',
                  }}
                >
                  Hora de comienzo
                </h3>
                <Input
                  type="time"
                  name="start"
                  handleChange={handleChange}
                  value={start}
                >
                  <IoIosTimer />
                </Input>
              </Fragment>
              <Fragment>
                <h3 sx={{ variant: 'text.heading', mb: '16px', mt: '8px' }}>
                  Hora final
                </h3>
                <Input
                  type="time"
                  name="finish"
                  handleChange={handleChange}
                  value={finish}
                >
                  <IoIosTimer />
                </Input>
              </Fragment>
            </div>
          </div>
        )}
      </div>
      <p sx={{ textAlign: 'center' }}>
        <input
          aria-label="back"
          type="button"
          onClick={handleBefore}
          value="Atrás"
          disabled={!days}
          sx={{ variant: 'button.secondary', mr: '8px' }}
        />
        <input
          aria-label="next"
          type="button"
          onClick={handleFoward}
          value="Siguiente"
          disabled={!days}
          sx={{ variant: 'button.secondary' }}
        />
      </p>
    </Fragment>
  );
};

export default SecondPart;
