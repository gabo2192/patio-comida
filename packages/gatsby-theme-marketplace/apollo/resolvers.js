import gql from 'graphql-tag';
import { GET_STORE } from './cache';

export const resolvers = {
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
};
