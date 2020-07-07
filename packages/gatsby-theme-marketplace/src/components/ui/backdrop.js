/**@jsx jsx */
import { jsx } from 'theme-ui';
import { alpha } from '@theme-ui/color';

const Backdrop = ({ handleClick, disabled }) => (
  <button
    sx={{
      display: disabled && 'none',
      zIndex: '100',
      position: 'fixed',
      height: '100%',
      width: '100%',
      bg: alpha('text', 0.5),
      top: 0,
      left: 0,
      border: 'none',
      outline: 'none',
      p: 0,
    }}
    value=""
    onClick={handleClick}
    disabled={disabled}
  ></button>
);

export default Backdrop;
