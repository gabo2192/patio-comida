import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client';

const cache = new InMemoryCache();

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
  resolvers: {
    Mutation: {
      setLatLng: (_root, { lat, lng }, { cache }) => {
        cache.writeQuery({
          query: gql`
            query GetLatLng {
              lat
              lng
            }
          `,
          data: { lat: lat, lng: lng },
        });
      },
      setAddress: (_root, { address: addressData }, { cache }) => {
        cache.writeQuery({
          query: gql`
            query GetAddress {
              address
            }
          `,
          data: { address: addressData },
        });
      },
    },
  },
});
