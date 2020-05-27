/**@jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Product from '../components/product';

export const query = graphql`
  query($pageID: ID!) {
    fauna {
      findMarketByID(id: $pageID) {
        _id
        name
        logo
        background
        slogan
        address
        phone
        products {
          _id
          title
          image
          description
          calories
          price
        }
      }
    }
  }
`;
const MarketTemplate = ({ data }) => {
  const {
    name,
    logo,
    background,
    address,
    slogan,
    phone,
    products,
  } = data.fauna.findMarketByID;
  return (
    <Layout>
      <img
        src={background}
        alt={name}
        sx={{ width: '100%', objectFit: 'cover', maxHeight: '400px' }}
      />
      <div sx={{ variant: 'container.primary' }}>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            my: '16px',
          }}
        >
          <img
            src={logo}
            alt={name}
            sx={{
              borderRadius: '100%',
              variant: 'card.shadow',
              height: '110px',
            }}
          />
          <div>
            <h1 sx={{ variant: 'text.heading', my: 0, mx: '8px' }}>{name}</h1>
            <h3 sx={{ variant: 'text.heading', my: 0, mx: '8px' }}>{slogan}</h3>
          </div>
        </div>
        {/* TO BUILD A CONTACT INTERFACE WITH ICONS */}
        <div
          sx={{
            borderTop: `1px solid #aaa`,
            textAlign: 'center',
            width: '95%',
            mx: 'auto',
            px: '2px',
            mb: '16px',
            '@media screen and (min-width:768px)': {
              width: '70%',
            },
          }}
        >
          <p
            sx={{
              color: 'muted',
              fontSize: '13px',
              my: 0,
            }}
          >
            <strong>Dirección:</strong> <em>{address}</em>{' '}
            <strong>Teléfono:</strong> <em>{phone}</em>
          </p>
        </div>
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
    </Layout>
  );
};

export default MarketTemplate;
