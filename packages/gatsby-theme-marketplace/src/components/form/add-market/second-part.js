/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { FaLocationArrow } from 'react-icons/fa';

import GoogleMapApp from '../../map/map';
import Input from '../input';

const SecondPart = ({
  mapIssues,
  address,
  handleChange,
  center,
  markerProp,
  handleClick,
  handleBack,
  handleFoward,
}) => {
  return (
    <Fragment>
      <div>
        {mapIssues && (
          <Input
            name="address"
            required={mapIssues}
            value={address}
            handleChange={handleChange}
            type="text"
            placeholder="Av Javier Prado 1234"
          >
            <FaLocationArrow sx={{ m: 'auto' }} />
          </Input>
        )}
        {!mapIssues && (
          <GoogleMapApp
            mapIssues={mapIssues}
            center={center}
            markerProp={markerProp}
            markerDefault={center}
          />
        )}
        <p sx={{ textAlign: 'center' }}>
          <button
            sx={{
              variant: 'button.secondary',
            }}
            onClick={handleClick}
          >
            {!mapIssues
              ? '¿Problemas para encontrar tu dirección?'
              : 'Puedes escribir tu dirección o hacer click acá e ir al mapa'}
          </button>
        </p>
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
          type="button"
          onClick={handleFoward}
          value="Siguiente"
          disabled={!address}
          sx={
            !address
              ? {
                  opacity: '0.5',
                  variant: 'button.secondary',
                }
              : { variant: 'button.secondary' }
          }
        />
      </p>
    </Fragment>
  );
};

export default SecondPart;
