/**@jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';

import { useAuth0 } from '../../utils/auth';
import Layout from '../components/layout';
import Market from '../components/market';

export const query = graphql`
  query {
    fauna {
      allMarkets {
        data {
          _id
          name
          background
          logo
          path
          slogan
          address
          phone
          products {
            _id
            title
            price
          }
        }
      }
    }
  }
`;
const Index = ({ data: faunaData }) => {
  const markets = faunaData.fauna.allMarkets.data;
  const { user } = useAuth0();
  console.log(window.location.origin);

  return (
    <Layout>
      <div sx={{ variant: 'container.primary' }}>
        <h1 sx={{ variant: 'text.heading' }}>Restaurantes</h1>
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr));',
            gridGap: '8px',
          }}
        >
          {markets.map((market) => (
            <Market key={market._id} market={market} />
          ))}
        </div>
      </div>

      {user && console.log(user)}
    </Layout>
  );
};

export default Index;
