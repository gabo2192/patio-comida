import { gql } from '@apollo/client';

export const GET_STORE = gql`
  query GetStoreUser {
    store @client {
      name
      phone
      logo
      image
      email
      address
      categories
      services
    }
  }
`;
