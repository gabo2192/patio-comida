/**@jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { Fragment, useState, useEffect, useCallback } from 'react';
import { navigate } from 'gatsby';
import { useQuery, useMutation, gql } from '@apollo/client';

import Modal from '../ui/modal';
import Input from './input';
import GoogleMapApp from '../map/map';
import Loading from '../ui/loading';

export const OPEN_MODAL_MUTATION = gql`
  mutation OpenModal {
    openModal @client
  }
`;

export const CLOSE_MODAL_MUTATION = gql`
  mutation CloseModal {
    closeModal @client
  }
`;
export const GET_LOCAL_STATE = gql`
  query GetLocalState {
    localState @client {
      modalOpen
      cartOpen
      menuOpen
      address {
        name
        address
        lat
        lng
      }
    }
  }
`;

const FormUser = ({ user, getTokenSilently }) => {
  const { loading: localLoading, error, data } = useQuery(GET_LOCAL_STATE);

  const { modalOpen, address } = data.localState;
  /* STATES */
  const [state, setState] = useState({
    name: '',
    email: user.email,
    phone: '',
    whatsapp: '',
    address: '',
  });
  const [mapIssues, setMapIssues] = useState(false);
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(false);

  const [openModal] = useMutation(OPEN_MODAL_MUTATION);
  const [closeModal] = useMutation(CLOSE_MODAL_MUTATION);

  const handleMarker = ({ lat, lng }) => {
    setCenter({ lat, lng });
  };

  const userInputs = [
    {
      name: 'name',
      placeholder: 'John Doe',
      type: 'text',
      label: 'Nombre',
      value: state.name,
      required: true,
    },
    {
      name: 'email',
      placeholder: 'jhon.doe@gmail.com',
      type: 'email',
      label: 'Email',
      value: state.email,
      required: true,
      disabled: true,
    },
    {
      name: 'phone',
      placeholder: 'Escribe tu teléfono...',
      type: 'number',
      label: 'Teléfono',
      value: state.phone,
      required: true,
    },
    {
      name: 'whatsapp',
      placeholder: 'Escribe tu whatsapp...',
      type: 'number',
      label: 'Whatsapp',
      value: state.whatsapp,
      required: true,
    },
    {
      name: 'address',
      placeholder: 'Escribe tu dirección...',
      type: 'button',
      label: 'Dirección',
      value: state.address,
      required: true,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleModalClose = () => {
    closeModal();
  };

  const handleModalOpen = () => {
    openModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !state.name ||
      !state.phone ||
      !state.address ||
      !state.email ||
      !state.whatsapp
    ) {
      setTimeout(() => {
        alert('Completa todos los campos');
      }, 2000);
    }
    const { name, phone, email, whatsapp } = state;
    const { lat, lng, name: addressName, address: newAddress } = address;
    const postBody = {
      name,
      phone,
      email,
      whatsapp,
      lat,
      lng,
      addressName,
      newAddress,
    };
    try {
      setLoading(true);
      const token = await getTokenSilently();
      const res = await fetch('/.netlify/functions/updateUser', {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (res.status === 200) {
        navigate('cuenta/detalles');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const stateUpdate = useCallback(
    (address) => {
      if (address && address.address) {
        setState((c) => ({ ...c, address: address.address }));
      }
    },
    [setState],
  );
  useEffect(() => {
    address && stateUpdate(address);
  }, [address, stateUpdate]);

  if (localLoading) return <div>Loading...</div>;
  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        sx={{ maxWidth: '400px', mx: 'auto', bg: 'white', p: 3 }}
      >
        <Styled.h3 sx={{ textAlign: 'center' }}>Completa tu perfil</Styled.h3>
        {userInputs.map((item) => (
          <Input
            key={item.name}
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            handleChange={handleChange}
            label={item.label}
            value={item.value || ''}
            required={item.required}
            handleModal={handleModalOpen}
            hidden={item.hidden || false}
            disabled={item.disabled || false}
          />
        ))}
        <input
          type="submit"
          value="Enviar"
          sx={{ variant: 'button.primary', width: '100%' }}
        />
      </form>

      <Modal handleClick={handleModalClose} maxWidth="640px" active={modalOpen}>
        {!loading && (
          <div
            sx={{
              display: 'grid',
              gridTemplateRows: ['32px 1fr', '32px 1fr auto-content'],
              gridGap: 2,
            }}
          >
            <Styled.h3 sx={{ textAlign: 'center' }}>Dirección</Styled.h3>

            <GoogleMapApp
              mapIssues={mapIssues}
              center={center}
              markerProp={true}
              markerDefault={center}
              handleMarker={handleMarker}
            />
            <div
              sx={{
                position: ['fixed', 'relative'],
                bottom: 0,
                left: 0,
                width: '100%',
                bg: 'white',
                px: 3,
                py: 2,
              }}
            >
              <button
                sx={{
                  variant: 'button.primary',
                  width: '100%',
                }}
                onClick={handleModalClose}
              >
                Listo
              </button>
            </div>
          </div>
        )}
        {loading && <Loading />}
      </Modal>
    </Fragment>
  );
};

export default FormUser;
