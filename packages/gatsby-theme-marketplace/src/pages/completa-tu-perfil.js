/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FaUserAlt, FaPhoneAlt, FaLocationArrow } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useAuth0 } from '../../utils/auth';

import Layout from '../components/layout';
import GoogleMapApp from '../components/map/map';

export const GET_LAT_LNG_QUERY = gql`
  query GetLatLng {
    lat @client
    lng @client
  }
`;

export const GET_ADDRESS_QUERY = gql`
  query GetAddress {
    address @client
  }
`;

const Continue = ({ location }) => {
  const [state, setState] = useState({
    name: '',
    phone: '',
    address: null,
    email: '',
    mapIssues: false,
    lat: null,
    lng: null,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const { data } = useQuery(GET_LAT_LNG_QUERY);
  const { name, phone, address, email, mapIssues, lat, lng } = state;
  const { data: addressData } = useQuery(GET_ADDRESS_QUERY);
  const { getTokenSilently, user } = useAuth0();

  useEffect(() => {
    data &&
      data.lng &&
      data.lat &&
      setState((current) => ({ ...current, lat: data.lat, lng: data.lng }));
  }, [data]);

  useEffect(() => {
    addressData &&
      setState((current) => ({ ...current, address: addressData.address }));
  }, [addressData]);

  const clearInput = () => {
    setState({
      name: '',
      phone: '',
      address: null,
      email: '',
      mapIssues: false,
      lat: null,
      lng: null,
    });
  };
  console.log(state);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !address || !email) {
      setTimeout(() => {
        setErrorMsg(null);
      }, 2000);
      return setErrorMsg('Todos los campos son requeridos');
    }
    const postBody = { name, phone, address, email, lat, lng };
    try {
      const token = await getTokenSilently();

      const res = await fetch('/.netlify/functions/updateUser', {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setSuccessMsg(`¡Actualizaste tus datos!`);
        clearInput();
        setTimeout(() => {
          setSuccessMsg(null);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div sx={{ variant: 'container.primary' }}>
        <form sx={{ mt: '16px' }} onSubmit={handleSubmit}>
          <fieldset
            sx={{
              maxWidth: '450px',
              mx: 'auto',
              width: '100%',
              border: '1px solid rgba(0,0,0,0.1)',
              bg: 'white',
              boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1 sx={{ variant: 'text.heading', textAlign: 'center' }}>
              Completa tus datos
            </h1>
            <div sx={{ variant: 'form.inputContainer' }}>
              <div
                sx={{
                  display: 'flex',
                  bg: (t) => t.colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                }}
              >
                <FaUserAlt />
              </div>
              <input
                aria-label="name"
                id="name"
                name="name"
                type="text"
                placeholder="Juan Perez"
                required
                onChange={(e) => setState({ ...state, name: e.target.value })}
                sx={{
                  border: '1px solid #ccc',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                  pl: '8px',
                }}
              />
            </div>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: '35px 1fr',
                gridTemplateRows: '35px',
                mb: '16px',
              }}
            >
              <div
                sx={{
                  display: 'flex',
                  bg: (t) => t.colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                }}
              >
                <MdEmail sx={{ m: 'auto' }} />
              </div>

              <input
                aria-label="email"
                id="email"
                name="email"
                type="text"
                placeholder="juan.perez@email.com"
                onChange={(e) => setState({ ...state, email: e.target.value })}
                sx={{
                  border: '1px solid #ccc',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                  pl: '8px',
                }}
              />
            </div>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: '35px 1fr',
                gridTemplateRows: '35px',
                mb: '16px',
              }}
            >
              <div
                sx={{
                  display: 'flex',
                  bg: (t) => t.colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                }}
              >
                <FaPhoneAlt sx={{ m: 'auto' }} />
              </div>
              <input
                aria-label="phone"
                id="phone"
                name="phone"
                required
                type="text"
                placeholder="+51928963254"
                onChange={(e) => setState({ ...state, phone: e.target.value })}
                sx={{
                  border: '1px solid #ccc',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                  pl: '8px',
                }}
              />
            </div>
            {state.mapIssues && (
              <div
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '35px 1fr',
                  gridTemplateRows: '35px',
                  mb: '16px',
                }}
              >
                <div
                  sx={{
                    display: 'flex',
                    bg: (t) => t.colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                  }}
                >
                  <FaLocationArrow sx={{ m: 'auto' }} />
                </div>
                <input
                  aria-label="address"
                  id="address"
                  name="address"
                  type="text"
                  required={state.mapIssues}
                  placeholder="Av Javier Prado 1234"
                  onChange={(e) =>
                    setState({ ...state, address: e.target.value })
                  }
                  sx={{
                    border: '1px solid #ccc',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    pl: '8px',
                  }}
                />
              </div>
            )}
            {!state.mapIssues && <GoogleMapApp mapIssues={state.mapIssues} />}
            <p>
              <button
                sx={{
                  variant: 'button.secondary',
                }}
                onClick={() => {
                  setState((current) => ({
                    ...current,
                    mapIssues: !current.mapIssues,
                  }));
                }}
              >
                ¿Problemas para encontrar tu dirección?
              </button>
            </p>
            <p sx={{ textAlign: 'center' }}>
              <input
                aria-label="submit"
                type="submit"
                value="Enviar"
                sx={{ variant: 'button.primary' }}
              />
            </p>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
};

export default Continue;
