import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query GetUserQuery($authId: String!) {
    findUserByAuthId(authId: $authId) {
      name
      phone
      email
      whatsapp
      role
      address {
        name
        lat
        lng
        address
      }
    }
  }
`;
