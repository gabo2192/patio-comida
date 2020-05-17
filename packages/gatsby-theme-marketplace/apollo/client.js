import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
/* import fetch from 'node-fetch'; */

const cache = new InMemoryCache();

const link = createHttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    Authorization: `Bearer fnADrwUryhACE7HLFu9UcMasQLRwuAMo1pU-BRbC`,
  },
});

export const client = new ApolloClient({
  disableOffline: true,
  connectToDevTools: true,
  link,
  cache,
});
