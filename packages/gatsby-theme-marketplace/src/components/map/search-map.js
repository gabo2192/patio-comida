/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useEffect } from 'react';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import { gql, useMutation } from '@apollo/client';

import { FaLocationArrow } from 'react-icons/fa';

export const SET_ADDRESS_MUTATION = gql`
  mutation SetAddress($address: String!) {
    setAddress(address: $address) @client
  }
`;

const Search = ({ lat, lng, panTo, formattedAddress, mapIssues }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => lat, lng: () => lng },
      radius: 200 * 1000,
    },
  });
  const [setAddress] = useMutation(SET_ADDRESS_MUTATION);

  useEffect(() => {
    if (formattedAddress) {
      setValue(formattedAddress);
    }
  }, [formattedAddress, setValue]);
  useEffect(() => {
    setAddress({
      variables: { address: value },
    });
  }, [value, setAddress]);
  return (
    <div
      sx={{
        position: 'absolute',
        top: 0,
        zIndex: '100',
        p: 0,
        width: '100%',
        '& input': {
          border: '1px solid #ccc',
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
          pl: '8px',
          width: '100%',
          height: '35px',
        },
      }}
    >
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log('error!');
          }
        }}
      >
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
          <ComboboxInput
            value={value}
            required={!mapIssues}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Escribe tu dirección"
          />
        </div>
        <ComboboxPopover sx={{ bg: 'white' }}>
          <ComboboxList sx={{ listStyleType: 'none', pl: '8px' }}>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption
                  key={id}
                  value={description}
                  sx={{ py: '4px', cursor: 'pointer', height: '35px' }}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
