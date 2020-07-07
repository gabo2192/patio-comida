import React from 'react';
import { navigate } from 'gatsby';

import 'typeface-mclaren';
import 'sf-mono';

import ApolloWrapper from './apollo/client';
import { Auth0Provider } from './utils/auth';

const Auth0Domain = process.env.GATSBY_AUTH0_DOMAIN;
const Auth0ClientID = process.env.GATSBY_AUTH0_CLIENT_ID;
const Auth0Audience = process.env.GATSBY_AUTH0_AUDIENCE;

const onRedirectCallback = (appState) => {
  navigate(
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
    onRedirectCallback={onRedirectCallback}
    audience={Auth0Audience}
  >
    <ApolloWrapper>{element}</ApolloWrapper>
  </Auth0Provider>
);
