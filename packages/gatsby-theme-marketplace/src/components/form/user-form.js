/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { navigate } from 'gatsby';

import { FaUserAlt, FaPhoneAlt, FaLocationArrow } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import GoogleMapApp from '../map/map';
import { SET_ADDRESS_MUTATION } from '../map/search-map';
import Input from './input';

const NAME_SPACE = 'https://patiodecomida/';

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

const Form = ({
  title,
  edit,
  setNewAddress,
  user,
  getTokenSilently,
  logout,
  loginWithRedirect,
}) => {
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
  const [markerProp, setMarkerProp] = useState(true);
  const [center, setCenter] = useState(null);

  const { data } = useQuery(GET_LAT_LNG_QUERY);
  const [setAddress] = useMutation(SET_ADDRESS_MUTATION);

  const { name, phone, address, email, mapIssues, lat, lng } = state;
  const { data: addressData } = useQuery(GET_ADDRESS_QUERY);

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

  useEffect(() => {
    user &&
      latUser &&
      lngUser &&
      setCenter({ lat: Number(latUser), lng: Number(lngUser) });
    !state.mapIssues &&
      state.address &&
      state.lat &&
      state.lng &&
      setMarkerProp(false);
    data &&
      data.lng &&
      data.lat &&
      setState((current) => ({ ...current, lat: data.lat, lng: data.lng }));
    addressData &&
      addressData.address &&
      addressData.address.length > 2 &&
      setState((current) => ({ ...current, address: addressData.address }));
    user && userName
      ? setState((current) => ({ ...current, name: userName }))
      : user.name &&
        !user.name.includes('@') &&
        setState((current) => ({ ...current, name: user.name }));
    user &&
      user.email &&
      setState((current) => ({ ...current, email: user.email }));
    phoneUser && setState((current) => ({ ...current, phone: phoneUser }));
  }, [
    data,
    addressData,
    user,
    latUser,
    lngUser,
    phoneUser,
    state.address,
    state.lat,
    state.lng,
    state.mapIssues,
    userName,
  ]);
  const clearInput = () => {
    setState({
      name: '',
      phone: '',
      address: '',
      email: '',
      mapIssues: false,
      lat: '',
      lng: '',
    });
  };
  useEffect(() => {
    addressUser &&
      setState((current) => ({ ...current, address: addressUser }));
    state.address && setAddress({ variables: { address: state.address } });
  }, [addressUser, setAddress, state.address]);

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
      console.log(res);

      if (res.status === 200) {
        clearInput();
        logout && logout();
        loginWithRedirect &&
          loginWithRedirect({ appState: `${window.location.pathname}` });
        !logout && navigate('/cuenta/detalles');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
        <h1 sx={{ variant: 'text.heading', textAlign: 'center' }}>{title}</h1>

        {!setNewAddress && (
          <Input
            name="name"
            required={true}
            value={state.name}
            handleChange={(e) => setState({ ...state, name: e.target.value })}
            type="text"
            placeholder="Escribe tu nombre..."
          >
            <FaUserAlt sx={{ m: 'auto' }} />
          </Input>
        )}
        {!edit && !setNewAddress && (
          <Input
            name="email"
            required={true}
            value={state.email}
            handleChange={(e) => setState({ ...state, email: e.target.value })}
            type="text"
            placeholder="juan.perez@email.com"
          >
            <MdEmail sx={{ m: 'auto' }} />
          </Input>
        )}
        {!setNewAddress && (
          <Input
            name="phone"
            required={true}
            value={state.phone}
            handleChange={(e) => setState({ ...state, phone: e.target.value })}
            type="text"
            placeholder="+51923654254"
          >
            <FaPhoneAlt sx={{ m: 'auto' }} />
          </Input>
        )}
        {mapIssues && (
          <Input
            name="address"
            required={state.mapIssues}
            value={state.address}
            handleChange={(e) =>
              setState({ ...state, address: e.target.value })
            }
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
            onClick={(e) => {
              e.preventDefault();
              setState((current) => ({
                ...current,
                mapIssues: !current.mapIssues,
              }));
            }}
          >
            {!state.mapIssues
              ? '¿Problemas para encontrar tu dirección?'
              : 'Puedes escribir tu dirección o hacer click acá e ir al mapa'}
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
  );
};

export default Form;
