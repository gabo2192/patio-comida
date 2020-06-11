/**@jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import Market from '../../components/market/market';

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
  return (
    <Layout>
      <div sx={{ variant: 'container.primary', pt: '8px' }}>
        <h1 sx={{ variant: 'text.heading', mt: 0 }}>Restaurantes</h1>
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
    </Layout>
  );
};

export default Index;
