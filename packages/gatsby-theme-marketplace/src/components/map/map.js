/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import { useMutation, gql, useQuery } from '@apollo/client';
import { GET_LOCAL_STATE } from '../form/form-user';

import mapStyles from './mapStyles';
import Search from './search-map';
import Locate from './locate';
import Loading from '../ui/loading';

const libraries = ['places'];

export const SET_ADDRESS_MUTATION = gql`
  mutation SetAddress($address: String) {
    setAddress(address: $address) @client
  }
`;

export const SET_ADDRESSNAME_MUTATION = gql`
  mutation SetAddressName($name: String) {
    setAddressName(name: $name) @client
  }
`;

export const SET_ADDRESSLATLNG_MUTATION = gql`
  mutation setAddressLatLng($lng: Float, $lat: Float) {
    setAddressLatLng(lng: $lng, lat: $lat) @client
  }
`;

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
};

const center = {
  lat: -12.046374,
  lng: -77.042793,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const GoogleMapApp = ({ mapIssues, markerDefault, fixedMap, handleMarker }) => {
  const { data } = useQuery(GET_LOCAL_STATE);

  const [setAddress] = useMutation(SET_ADDRESS_MUTATION);
  const [setAddressName] = useMutation(SET_ADDRESSNAME_MUTATION);
  const [setAddressLatLng] = useMutation(SET_ADDRESSLATLNG_MUTATION);

  const [marker, setMarker] = useState(
    markerDefault || { lat: null, lng: null },
  );

  const markerRef = useRef();

  markerRef.current = marker;

  const [fetchAddress, setFetchAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const { address } = data.localState;
  /*   console.log(address);
  console.log(marker); */

  const [localAddress, setLocalAddress] = useState({
    nameAddress: address.name || '',
    newAddress: address.address || '',
  });
  const handleChange = (e, newVal, newName) => {
    const { name, value } = e.target;
    const setName = newName || name;
    const setValue = newVal || value;
    if (setName === 'nameAddress') {
      setAddressName({
        variables: {
          name: setValue,
        },
      });
      setLocalAddress((c) => ({ ...c, nameAddress: setValue }));
    }
    if (setName === 'newAddress') {
      setAddress({
        variables: {
          address: setValue,
        },
      });
      setLocalAddress((c) => ({ ...c, newAddress: setValue }));
    }
  };

  const onMapClick = useCallback(
    (e) => {
      setMarker({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      setAddressLatLng({
        variables: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      });
      !fetchAddress && setFetchAddress(true);
    },
    [fetchAddress, setAddressLatLng],
  );
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(
    ({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(16);
      handleMarker({ lat, lng });
      setMarker({ lat, lng });
      setAddressLatLng({
        variables: {
          lat: lat,
          lng: lng,
        },
      });
    },
    [handleMarker, setAddressLatLng],
  );

  useEffect(() => {
    const onFetchAddress = async () => {
      const marker = markerRef.current;
      if (marker && marker.lat && marker.lng) {
        setLoading(true);
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${marker.lat},${marker.lng}&key=${process.env.GATSBY_GOOGLE_KEY}`,
        )
          .then((res) => res.json())
          .then((results) => {
            setAddress({
              variables: {
                address: results.results[0].formatted_address,
              },
            });
            setLocalAddress((c) => ({
              ...c,
              newAddress: results.results[0].formatted_address,
            }));
            setFetchAddress(false);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    };
    fetchAddress && onFetchAddress();
  }, [fetchAddress, setAddress]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GATSBY_GOOGLE_KEY,
    libraries,
  });

  if (loadError) return 'Error al cargar el mapa';
  if (!isLoaded) return 'Cargando el mapa...';
  return (
    <div
      sx={{ display: 'grid', gridTemplateRows: '56px 56px 1fr', gridGap: 2 }}
    >
      {loading && <Loading />}
      {!fixedMap && (
        <Search
          center={marker || center}
          panTo={panTo}
          address={address}
          value={localAddress}
          mapIssues={mapIssues}
          handleChange={handleChange}
        />
      )}
      <div
        sx={{
          position: 'relative',
          width: '100%',
          pt: ['100%', '56.25%'],
        }}
      >
        <Locate panTo={panTo} />
        <GoogleMap
          zoom={16}
          center={marker && marker.lat && marker.lng ? marker : center}
          mapContainerStyle={mapContainerStyle}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {!fixedMap && (
            <Marker
              position={
                marker && marker.lat && marker.lng ? marker : markerDefault
              }
              draggable={true}
              onDragEnd={onMapClick}
            />
          )}
          {fixedMap && <Marker position={markerDefault} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default GoogleMapApp;
