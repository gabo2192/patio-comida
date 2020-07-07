/**@jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import { FaHome, FaPhone, FaShippingFast, FaStore } from 'react-icons/fa';

import Layout from '../components/layout';
import Product from '../components/market/product';

/* export const query = graphql`
  query($pageID: ID!) {
    fauna {
      findMarketByID(id: $pageID) {
        _id
        name
        logo
        address {
          name
          address
          lat
          lng
        }
        phone
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
      }
    }
  }
`; */
const MarketTemplate = ({ data }) => {
  const {
    name,
    logo,
    address,
    phone,
    services,
    products,
    categories,
  } = data.fauna.findMarketByID;
  return (
    <Layout>
      {/*  <div sx={{ variant: 'container.primary' }}>
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: ['75px 1fr', '75px 1fr max-content'],
            gridGap: [null, '8px'],
            my: '16px',
            pb: '8px',
          }}
        >
          <img
            src={logo}
            alt={name}
            sx={{
              borderRadius: '100%',
              variant: 'card.shadow',
              height: ['75px'],
            }}
          />
          <div
            sx={{
              mx: ['8px', 0, 0],
              display: 'grid',
              alignItems: 'center',
              pr: [null, '16px'],
            }}
          >
            <h1
              sx={{
                variant: 'text.heading',
                my: 0,
              }}
            >
              {name}
            </h1>
            <h3 sx={{ color: 'brown', m: 0, fontSize: '25px' }}>
              {services.includes('DELIVERY') && <FaShippingFast />}{' '}
              {services.includes('STOREPICKUP') && <FaStore />}
            </h3>
          </div>
          <div
            sx={{
              gridColumn: ['1/3', 'auto'],
              display: 'grid',
              gridTemplateColumns: '35px 1fr',
              alignItems: 'center',
              gridGap: ['8px', 0, 0],
              mt: ['8px', 0, 0],
              borderTop: ['2px dashed brown', 0, 0],
              borderLeft: [null, '2px solid brown'],
              pt: ['8px', 0, 0],
              pl: [null, '8px'],
            }}
          >
            <FaHome sx={{ color: 'brown', fontSize: '25px' }} />
            <em>{address}</em>
            <FaPhone sx={{ color: 'brown', fontSize: '20px' }} />{' '}
            <em>{phone}</em>
          </div>
        </div>
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr));',
            gridGap: '8px',
          }}
        >
          {products.data.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div> */}
      hey
    </Layout>
  );
};

export default MarketTemplate;
