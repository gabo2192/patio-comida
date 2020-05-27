/**@jsx jsx */
import { jsx } from 'theme-ui';
import { FaCompass } from 'react-icons/fa';

const Locate = ({ panTo }) => {
  const handleLocate = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (position) =>
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      () => null,
    );
  };
  return (
    <button
      aria-label="ubicame"
      sx={{
        position: 'absolute',
        zIndex: '100',
        p: 0,
        right: 10,
        top: '116px',
        border: 'transparent',
        bg: 'white',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.2)',
        },
      }}
      onClick={handleLocate}
    >
      <FaCompass
        sx={{ height: '28px', width: '28px', color: (t) => t.colors.brown }}
      />
    </button>
  );
};

export default Locate;
