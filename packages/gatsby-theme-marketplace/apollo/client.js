import { ApolloClient, createHttpLink } from '@apollo/client';

import { resolvers } from './resolvers';
import { cache } from './cache';

const link = createHttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_FAUNA_SECRET}`,
  },
});

export const client = new ApolloClient({
  connectToDevTools: true,
  link,
  cache,
  resolvers: resolvers,
});
