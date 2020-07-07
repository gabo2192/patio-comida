/**@jsx jsx */
import { Spinner, jsx } from 'theme-ui';
import Backdrop from './backdrop';
const Loading = () => (
  <div
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      zIndex: '200',
    }}
  >
    <Spinner sx={{ position: 'relative' }} />
    <Backdrop />
  </div>
);

export default Loading;
