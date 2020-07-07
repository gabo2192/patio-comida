/**@jsx jsx */
import { Fragment } from 'react';
import { jsx, Styled } from 'theme-ui';
import { Global } from '@emotion/core';

import Header from './header/header';

const Layout = ({ children }) => {
  return (
    <div
      sx={{
        backgroundColor: 'background',
        minHeight: '100vh',
        pb: 3,
      }}
    >
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box',
          },
          'html,body': {
            margin: 0,
          },
          '.visually-hidden': {
            position: 'absolute !important',
            height: '1px',
            width: '1px',
            overflow: 'hidden',
            clip: 'rect(1px, 1px, 1px, 1px)',
            whiteSpace: 'nowrap',
          },
        }}
      />
      <Header />
      <div
        sx={{
          mb: 5,
          mt: [2, 2, 4],
          mx: 'auto',
          maxWidth: (t) => `calc(${t.breakpoints.slice(-1)[0]} + 96px)`,
          width: '90vw',
        }}
      >
        <main sx={{ variant: 'marketplace.layout.main' }}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
