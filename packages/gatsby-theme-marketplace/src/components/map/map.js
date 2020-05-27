/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import { gql, useMutation } from '@apollo/client';

import mapStyles from './mapStyles';
import Search from './search-map';
import Locate from './locate';

export const SET_LAT_LNG_MUTATION = gql`
  mutation SetLatLng($lat: Float!, $lng: Float!) {
    setLatLng(lat: $lat, lng: $lng) @client
  }
`;

const GoogleMapApp = ({ mapIssues }) => {
  const [marker, setMarker] = useState({ lat: null, lng: null });
  const [formattedAddress, setFormattedAddress] = useState(null);

  const [setLatLng] = useMutation(SET_LAT_LNG_MUTATION);

  const onMapClick = useCallback(
    (event) => {
      setMarker({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      setLatLng({
        variables: { lat: event.latLng.lat(), lng: event.latLng.lng() },
      });
    },
    [setLatLng],
  );

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  useEffect(() => {
    marker.lat &&
      marker.lng &&
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${marker.lat},${marker.lng}&key=${process.env.GATSBY_GOOGLE_KEY}`,
      )
        .then((res) => res.json())
        .then((results) =>
          setFormattedAddress(results.results[0].formatted_address),
        )
        .catch((err) => console.log(err));
  }, [marker]);

  const libraries = ['places'];

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: -12.046374,
    lng: -77.042793,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GATSBY_GOOGLE_KEY,
    libraries,
  });

  const options = {
    styles: mapStyles,
  };

  if (loadError) return 'Error al cargar el mapa';
  if (!isLoaded) return 'Cargando el mapa...';
  return (
    <div
      sx={{
        position: 'relative',
        width: '100%',
        height: '500px',
        pt: '51px',
        mb: '16px',
      }}
    >
      <Search
        lat={center.lat}
        lng={center.lng}
        panTo={panTo}
        formattedAddress={formattedAddress}
        mapIssues={mapIssues}
      />
      <Locate panTo={panTo} />
      <GoogleMap
        zoom={16}
        center={
          marker.lat && marker.lng
            ? { lat: marker.lat, lng: marker.lng }
            : { lat: center.lat, lng: center.lng }
        }
        mapContainerStyle={mapContainerStyle}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker
          position={
            marker.lat && marker.lng && { lat: marker.lat, lng: marker.lng }
          }
          draggable={true}
          onDragEnd={onMapClick}
        />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapApp;
