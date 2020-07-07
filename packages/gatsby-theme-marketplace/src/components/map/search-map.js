/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment, useState } from 'react';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import Input from '../form/input';

const acceptedKeys = [38, 40, 13, 27];

const Search = ({
  lat,
  lng,
  panTo,
  address,
  mapIssues,
  handleChange,
  value,
}) => {
  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => lat, lng: () => lng },
      radius: 200 * 1000,
    },
  });

  let cachedVal = '';
  const [currIndex, setCurrIndex] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleEnter = (idx) => {
    setCurrIndex(idx);
  };

  const handleLeave = () => {
    setCurrIndex(null);
  };
  const handleKeyDown = (e) => {
    if (!hasSuggestions || !acceptedKeys.includes(e.keyCode)) return;

    if (e.keyCode === 27) {
      dismissSuggestions();
      return;
    }
    if (e.keyCode === 13) {
      if (currIndex === null || undefined) return;
      const suggestion = { description: value.newAddress };
      handleSelect(e, suggestion);
      return;
    }
    let nextIndex;
    if (e.keyCode === 38) {
      e.preventDefault();
      nextIndex = currIndex ?? data.length;
      nextIndex = nextIndex > 0 ? nextIndex - 1 : null;
    } else {
      nextIndex = currIndex ?? -1;
      nextIndex = nextIndex < data.length - 1 ? nextIndex + 1 : null;
    }

    setCurrIndex(nextIndex);
    handleChange(e, data[nextIndex] ? data[nextIndex].description : cachedVal);
  };

  const handleInput = (e) => {
    setShowSuggestions(true);
    handleChange(e);
    setValue(e.target.value);
    cachedVal = e.target.value;
  };

  /* COMBO BOX SETUP */
  const hasSuggestions = status === 'OK';

  const dismissSuggestions = () => {
    setCurrIndex(null);
    clearSuggestions();
  };
  const handleSelect = async (e, suggestion) => {
    const { description } = suggestion;
    handleChange(e, description, 'newAddress');
    setShowSuggestions(false);
    dismissSuggestions();
    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log(error);
    }
  };
  const renderSuggestions = () => {
    const suggestions = data.map((suggestion, idx) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <button
          key={id}
          sx={{
            listStyleType: 'none',
            display: 'block',
            border: 'transparent',
            bg: (t) => (idx === currIndex ? t.colors.light[3] : 'transparent'),
            textAlign: 'left',
            width: '100%',
            fontSize: 1,
            lineHeight: 1.5,
            p: 3,
            py: 2,
            '&:hover': {
              bg: (t) => t.colors.light[3],
              border: (t) => `1px solid ${t.colors.light[3]}`,
            },
          }}
          onClick={(e) => handleSelect(e, suggestion)}
          onMouseEnter={() => handleEnter(idx)}
          role="option"
          aria-selected={idx === currIndex}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </button>
      );
    });
    return suggestions;
  };

  /* END */

  return (
    <Fragment>
      <Input
        type="text"
        name="nameAddress"
        placeholder="Casa / Trabajo"
        handleChange={handleChange}
        label="Lugar"
        value={value.nameAddress}
        required="required"
      />
      <div sx={{ position: 'relative' }}>
        <Input
          type="text"
          name="newAddress"
          handleChange={handleInput}
          handleKeyDown={handleKeyDown}
          placeholder="Escribe aquí tu dirección"
          label="Dirección"
          ariaAutocomplete="list"
          ariaControls="ex-list-box"
          value={value.newAddress}
          disabled={!ready}
          required="required"
          focus={() => {
            setShowSuggestions(true);
          }}
        />
        {showSuggestions && hasSuggestions && (
          <ul
            sx={{
              position: 'absolute',
              px: 0,
              top: '48px',
              border: (t) => `1px solid ${t.colors.light[3]}`,
              width: '100%',
              zIndex: 200,
              bg: 'white',
              boxShadow: `0px 2px 4px rgba(96, 97, 112, 0.16), 0px 0px 1px rgba(40, 41, 61, 0.04)`,
            }}
            onMouseLeave={handleLeave}
            role="listbox"
            id="ex-list-box"
          >
            {renderSuggestions()}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default Search;
