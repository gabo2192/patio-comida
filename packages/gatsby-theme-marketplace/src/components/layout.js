/**@jsx jsx */
import { Fragment } from 'react';
import { jsx } from 'theme-ui';
import { Global } from '@emotion/core';

import Header from './header/header';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Global
        styles={{
          body: { margin: 0, height: '100%' },
          html: { height: '100%', boxSizing: 'border-box' },
          '#___gatsby': { height: '100%' },
          '#gatsby-focus-wrapper': { height: '100%' },
        }}
      />
      <Header />
      <main sx={{ height: 'calc(100% - 108px)' }}>{children}</main>
    </Fragment>
  );
};

export default Layout;
