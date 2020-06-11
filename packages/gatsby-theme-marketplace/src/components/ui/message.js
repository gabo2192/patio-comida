/**@jsx jsx */
import { jsx } from 'theme-ui';

const Message = ({ type, message }) => {
  if (type === 'warning') {
    return (
      <div sx={{ bg: 'secondary', color: 'black', p: '8px' }}>{message}</div>
    );
  }
};

export default Message;
