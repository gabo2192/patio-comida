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
        top: 10,
        border: 'transparent',
        bg: 'white',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        bg: 'white',
        borderRadius: 4,
        textAlign: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
        '&:hover': {
          transform: 'scale(1.2)',
        },
      }}
      onClick={handleLocate}
    >
      <FaCompass
        sx={{
          height: '24px',
          width: '24px',
          color: (t) => t.colors.dark[4],
        }}
      />
    </button>
  );
};

export default Locate;
