/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Backdrop from './backdrop';
import Icon from '../../assets/svg/svg';

const Modal = ({ children, handleClick, maxWidth, active }) => (
  <Fragment>
    <Backdrop handleClick={handleClick} disabled={!active} />
    <div
      sx={{
        position: 'fixed',
        width: ['100vw'],
        maxWidth: maxWidth && maxWidth,
        height: ['100vh', 'auto'],
        mx: [null, `calc((100vw - ${maxWidth}) / 2)`],
        my: [null, '10vh'],
        top: [0],
        left: 0,
        background: (t) => t.colors.light[0],
        p: 3,
        transform: active ? 'translateX(0)' : 'translateX(100%)',
        opacity: active ? 1 : 0,
        transition: '400ms',
        zIndex: '101',
      }}
    >
      <div
        sx={{
          position: 'relative',
          pt: 4,
          height: '100%',
          overflowY: ['scroll', 'hidden'],
        }}
      >
        <button
          sx={{
            bg: 'transparent',
            outline: 'none',
            border: 'transparent',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={handleClick}
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>
  </Fragment>
);

export default Modal;
