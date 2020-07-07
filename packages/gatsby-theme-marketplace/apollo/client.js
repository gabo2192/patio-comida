import React, { useState, useEffect } from 'react';
import { ApolloClient, createHttpLink, ApolloProvider } from '@apollo/client';

import { resolvers } from './resolvers';
import { cache } from './cache';

import { useAuth0 } from '../utils/auth';

const ApolloWrapper = ({ children }) => {
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getTokenSilently() : '';
      setBearerToken(token);
      localStorage.setItem('token', token);
    };
    getToken();
  }, [getTokenSilently, isAuthenticated]);

  const link = createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_FAUNA_SECRET}`,
    },
  });

  const client = new ApolloClient({
    connectToDevTools: true,
    link,
    cache,
    resolvers: resolvers,
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
