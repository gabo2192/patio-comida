/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import GoogleMapApp from '../map/map';

const NAME_SPACE = 'https://patiodecomida/';

const User = ({ user }) => {
  const [showMap, setShowMap] = useState(false);
  console.log(user);
  const latUser =
    user && user[`${NAME_SPACE}address`]
      ? user[`${NAME_SPACE}address`].lat
      : null;
  const lngUser =
    user && user[`${NAME_SPACE}address`]
      ? user[`${NAME_SPACE}address`].lng
      : null;
  const userName = user ? user[`${NAME_SPACE}name`] : null;
  const addressUser =
    user && user[`${NAME_SPACE}address`]
      ? user[`${NAME_SPACE}address`].address
      : null;
  const phoneUser = user ? user[`${NAME_SPACE}phone`] : null;
  const center = latUser &&
    lngUser && { lat: Number(latUser), lng: Number(lngUser) };
  useEffect(() => {
    latUser && lngUser && center && setShowMap(true);
  }, [lngUser, latUser, center, setShowMap]);

  return (
    <div sx={{ variant: 'container.primary', mt: '8px', maxWidth: '768px' }}>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gridGap: '8px',
        }}
      >
        <div
          sx={{
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr',
              gridGap: '8px',
              alignItems: 'center',
            }}
          >
            <div
              sx={{
                maxWidth: '50px',
                maxHeight: '50px',
                borderRadius: '100%',
                overflow: 'hidden',
              }}
            >
              {user && user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  sx={{ width: '100%' }}
                />
              )}
            </div>
            <div>
              <h1 sx={{ variant: 'text.heading' }}>
                Hola{' '}
                {user && userName
                  ? userName.split(' ')[0]
                  : user.name && <span>{user.name.split(' ')[0]}</span>}
              </h1>
            </div>
          </div>
          <div sx={{ mt: '8px' }}>
            {user && user.email && (
              <p sx={{ mt: 0 }}>
                Email: <em>{user.email}</em>
              </p>
            )}
            {user && phoneUser && (
              <p sx={{ mt: 0 }}>
                Teléfono: <em>{phoneUser}</em>
              </p>
            )}
            {user && phoneUser && (
              <p sx={{ mt: 0 }}>
                Dirección: <em>{addressUser}</em>
              </p>
            )}
          </div>
        </div>
        {showMap && (
          <GoogleMapApp
            fixedMap={true}
            center={center}
            markerDefault={center}
          />
        )}
      </div>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gridGap: '8px',
        }}
      >
        <div sx={{ border: '1px solid brown' }}>
          <h3 sx={{ variant: 'text.heading', textAlign: 'center' }}>
            Administra tus datos
          </h3>
          <p sx={{ display: 'flex', textAlign: 'center' }}>
            <Link
              to="/cuenta/edita-tu-perfil"
              sx={{ variant: 'button.link', mx: 'auto' }}
            >
              Edita tu perfil
            </Link>
          </p>
          <p sx={{ display: 'flex', textAlign: 'center' }}>
            <Link
              to="/cuenta/actualiza-tu-direccion"
              sx={{ variant: 'button.link', mx: 'auto' }}
            >
              Actualiza tu dirección
            </Link>
          </p>
        </div>
        <div sx={{ border: '1px solid brown' }}>
          <h3 sx={{ variant: 'text.heading', textAlign: 'center' }}>
            Historial de compras/ventas
          </h3>
          <p sx={{ textAlign: 'center' }}>
            <button
              sx={{ variant: 'button.secondary' }}
              onClick={() => console.log('clicked')}
            >
              Pedidos
            </button>
          </p>
          <p sx={{ textAlign: 'center' }}>
            <button
              sx={{ variant: 'button.secondary' }}
              onClick={() => console.log('clicked')}
            >
              Ventas
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
