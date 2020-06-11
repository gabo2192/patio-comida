/**@jsx jsx */
import { jsx } from 'theme-ui';
import { gql, useQuery } from '@apollo/client';

import { navigate } from 'gatsby';

const GET_USER_STORE = gql`
  query findUserByAuthId($authId: String!) {
    findUserByAuthId(authId: $authId) {
      market {
        name
        path
        background
        services
        products {
          title
          price
          description
          image
        }
        logo
        address
        phone
        published
      }
    }
  }
`;

const MyStore = ({ user, getTokenSilently }) => {
  const { data, loading, error } = useQuery(GET_USER_STORE, {
    variables: { authId: user.sub },
  });
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error! {console.log(error)}</div>;
  const { market } = data.findUserByAuthId;
  if (!market) navigate('/cuenta/vender/crear-tienda');
  const products = market.products;

  if (products.length < 1) navigate('/cuenta/vender/crear-producto');
  return <div>Hey jude</div>;
};

export default MyStore;
