/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import { gql, useMutation } from '@apollo/client';

import mapStyles from './mapStyles';
import Search from './search-map';
import Locate from './locate';
import ErrorMarker from './error-marker';

export const SET_LAT_LNG_MUTATION = gql`
  mutation SetLatLng($lat: Float!, $lng: Float!) {
    setLatLng(lat: $lat, lng: $lng) @client
  }
`;

const libraries = ['places'];

const GoogleMapApp = ({
  mapIssues,
  markerProp,
  center,
  markerDefault,
  fixedMap,
}) => {
  const centerDefault = {
    lat: -12.046374,
    lng: -77.042793,
  };

  const [marker, setMarker] = useState({ lat: null, lng: null });
  const [formattedAddress, setFormattedAddress] = useState(null);
  const [markerState, setMarkerState] = useState(false);
  const [centerState, setCenterState] = useState(centerDefault);

  useEffect(() => {
    center && center.lat && center.lng && setCenterState(center);
  }, [center, setCenterState]);

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
      setMarkerState(false);
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
    markerProp && setMarkerState(true);
    marker && marker.lat && marker.lng && setMarkerState(false);
    !marker.lat && !marker.lng && setMarker(markerDefault);
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
  }, [marker, markerProp, markerDefault]);

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
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
    <div>
      {!fixedMap && (
        <Search
          lat={centerState.lat}
          lng={centerState.lng}
          panTo={panTo}
          formattedAddress={formattedAddress}
          mapIssues={mapIssues}
        />
      )}
      <div
        sx={{
          position: 'relative',
          width: '100%',
          pt: '56.25%',
        }}
      >
        <Locate panTo={panTo} />
        <GoogleMap
          zoom={16}
          center={marker && marker.lat && marker.lng ? marker : centerState}
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
        {markerState && (
          <ErrorMarker handleClick={() => setMarkerState(false)} />
        )}
      </div>
    </div>
  );
};

export default GoogleMapApp;
