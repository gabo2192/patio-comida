import { gql } from '@apollo/client';

export const LOCAL_STATE_QUERY = gql`
  query {
    menuOpen @client
  }
`;
