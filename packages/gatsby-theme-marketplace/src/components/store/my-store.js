/**@jsx jsx */
import { jsx } from 'theme-ui';
import { gql, useQuery } from '@apollo/client';
import { navigate, Link } from 'gatsby';

import Product from '../market/product';

const GET_USER_STORE = gql`
  query findUserByAuthId($authId: String!) {
    findUserByAuthId(authId: $authId) {
      market {
        name
        path
        background
        services
        products {
          data {
            _id
            title
            image
            description
            price
          }
        }
        logo
        address
        phone
        published
      }
    }
  }
`;

const MyStore = ({ user }) => {
  const { data, loading, error } = useQuery(GET_USER_STORE, {
    variables: { authId: user.sub },
    fetchPolicy: 'network-only',
  });
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error! {console.log(error)}</div>;
  let products;
  const { market } = data.findUserByAuthId;
  if (!market) navigate('/cuenta/vender/crear-tienda');

  market ? (products = market.products.data) : (products = []);
  if (products.length < 1) navigate('/cuenta/vender/crear-producto');
  return (
    <div sx={{ variant: 'container.primary' }}>
      <Link to="/cuenta/vender/crear-producto">Crear producto</Link>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr));',
          gridGap: '8px',
        }}
      >
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
  return <div>hey</div>;
};

export default MyStore;
