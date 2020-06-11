/**@jsx jsx */
import { jsx } from 'theme-ui';

const ErrorMarker = ({ handleClick }) => (
  <div
    sx={{
      position: 'absolute',
      width: '35%',
      top: '120px',
      left: 10,
      bg: 'brown',
      p: '8px',
      color: 'white',
      textTransform: 'uppercase',
      borderRadius: 8,
    }}
  >
    <p sx={{ m: 0, p: 0, fontSize: '12px', fontWeight: 700 }}>
      Establece tu ubicación en el mapa
    </p>
    <button
      sx={{
        bg: 'transparent',
        border: 'transparent',
        position: 'absolute',
        top: 1,
        right: 1,
        color: 'white',
        fontSize: '12px',
        fontWeight: 600,
      }}
      onClick={handleClick}
    >
      X
    </button>
  </div>
);

export default ErrorMarker;
