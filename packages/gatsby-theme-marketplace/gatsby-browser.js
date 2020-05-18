import React from 'react';

import 'typeface-mclaren';
import 'sf-mono';

import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { Auth0Provider } from './utils/auth';

const Auth0Domain = process.env.GATSBY_AUTH0_DOMAIN;
const Auth0ClientID = process.env.GATSBY_AUTH0_CLIENT_ID;

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={Auth0Domain}
    client_id={Auth0ClientID}
    redirect_uri={window.location.origin}
  >
    <ApolloProvider client={client}>{element}</ApolloProvider>
  </Auth0Provider>
);
