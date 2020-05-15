/**@jsx jsx */

import { Fragment } from 'react';
import { jsx } from 'theme-ui';
import { Global } from '@emotion/core';

import 'typeface-mclaren';
import 'sf-mono';

import Header from './header';

const Layout = ({ children }) => (
  <Fragment>
    <Global
      styles={{
        body: { margin: 0, height: '100%' },
        html: { height: '100%' },
        '#___gatsby': { height: '100%' },
      }}
    />
    <Header />
    <main>{children}</main>
  </Fragment>
);

export default Layout;
