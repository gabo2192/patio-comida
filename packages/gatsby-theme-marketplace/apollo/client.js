import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client';
/* import fetch from 'node-fetch'; */

const cache = new InMemoryCache();

/* const typeDefs = gql`
  extend type Query {
    isAuthenticated: Boolean!
    user: User!
    loading: Boolean!
    popupOpen: Boolean!
    loginWithPopup: Boolean!
    handleRedirectCallback: Boolean!
    getIdTokenClaims: Boolean!
    loginWithRedirect: Boolean!
    getTokenSilently: Boolean!
    getTokenWithPopup: Boolean!
    logout: Boolean!
  }
  type User {

  }
`; */

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
});
