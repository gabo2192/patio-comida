/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';

const Input = ({
  name,
  required,
  value,
  type,
  placeholder,
  label,
  disabled,
  handleChange,
  handleModal,
  focus,
  hidden,
  handleKeyDown,
  ariaAutocomplete,
  ariaControls,
}) => {
  const [active, setActive] = useState(false);

  return (
    <label
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textTransform: 'uppercase',
        p: '2px 16px',
        background: 'white',
        borderRadius: '4px',
        height: !hidden && '56px',
        mb: 3,
        border: (t) =>
          active
            ? `2px solid ${t.colors.primary}`
            : `2px solid ${t.colors.light[2]}`,
        boxShadow: (t) => active && `inset 0px 0.5px 4px ${t.colors.dark[1]}`,
        transition: '0.4s',
      }}
    >
      <span sx={{ fontSize: 2 }}>{label}</span>
      {type === 'button' && !value && (
        <p sx={{ m: 0, textTransform: 'capitalize' }}>{placeholder}</p>
      )}
      <input
        aria-label={name}
        id={name}
        name={name}
        required={required}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        aria-autocomplete={ariaAutocomplete}
        aria-controls={ariaControls}
        onFocus={
          name === 'address'
            ? handleModal
            : () => {
                focus && focus();
                setActive(true);
              }
        }
        onBlur={() => setActive(false)}
        sx={{
          border: 'transparent',
          bg: 'transparent',
          outline: 'none',
          fontSize: !value && !active ? 1 : 2,
          fontWeight: (value || active) && 700,
          mt: '4px',
          textAlign: 'left',
        }}
      />
    </label>
  );
};

export default Input;
/* 
<div
sx={{
  display: 'grid',
  gridTemplateColumns: '35px 1fr',
  gridTemplateRows: '35px',
  mb: '16px',
  '& > input[type="file" i]': {
    display: 'none',
  },
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
  {children}
</div>
{type !== 'checkbox' && (
  <input
    aria-label={name}
    id={name}
    name={name}
    required={required}
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    sx={{
      border: '1px solid #ccc',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      pl: '8px',
    }}
  />
)}
{type === 'file' && (
  <label
    htmlFor={name}
    sx={{
      border: '1px solid #ccc',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      pl: '8px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '13.33px',
      position: 'relative',
      overflow: 'hidden',
      color: exists ? 'white' : 'muted',
      bg: exists && 'muted',
    }}
  >
    {placeholder}
    <div
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        bg: exists ? 'secondary' : 'muted',
        color: 'brown',
        width: '35px',
        transition: '.4s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {exists ? (
        <FiCheckCircle sx={{ width: '30px', height: '30px' }} />
      ) : (
        <AiOutlineCloudUpload sx={{ width: '30px', height: '30px' }} />
      )}
    </div>
  </label>
)}
{type === 'checkbox' && (
  <label
    htmlFor={name}
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px',
      alignItems: 'center',
      position: 'relative',
    }}
  >
    <span
      sx={{
        variant: 'text.heading',
        px: '8px',
        fontSize: ['12px', '14px', '16px'],
      }}
    >
      {placeholder}
    </span>
    <div
      sx={{
        position: 'absolute',
        right: 0,
        display: 'inline-block',
        width: '60px',
        height: '34px',
      }}
    >
      <input
        id={name}
        name={name}
        checked={value}
        aria-label={name}
        type={type}
        sx={{ opacity: 0, width: 0, height: 0 }}
        onChange={handleChange}
      />
      <span
        sx={{
          position: 'absolute',
          cursor: 'pointer',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: value ? 'secondary' : 'muted',
          transition: '.4s',
          borderRadius: '34px',
          '::before': {
            position: 'absolute',
            content: '" "',
            height: '26px',
            width: '26px',
            left: '4px',
            bottom: '4px',
            backgroundColor: value ? 'brown' : 'white',
            transition: '.4s',
            borderRadius: '50%',
            transform: value && 'translateX(26px)',
          },
        }}
      ></span>
    </div>
  </label>
)}
</div> */
