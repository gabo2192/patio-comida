import { gql } from '@apollo/client';

export const GET_LOCAL_STATE = gql`
  query GetLocalState {
    localState @client {
      modalOpen
      cartOpen
      menuOpen
      address {
        name
        address
        lat
        lng
      }
    }
  }
`;
