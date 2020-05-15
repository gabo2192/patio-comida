const path = require('path');
const withDefaults = require('./utils/default-options');

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const { basePath } = withDefaults(options);
  const result = await graphql(`
    query {
      fauna {
        allMarkets {
          data {
            _id
            path
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic('error loading markets', result.errors);
  }
  const markets = result.data.fauna.allMarkets.data;
  markets.forEach((market) => {
    actions.createPage({
      path: path.join('/', basePath, market.path).replace(/\\/g, '/'),
      component: require.resolve('./src/templates/market-template.js'),
      context: {
        pageID: market._id,
      },
    });
  });
};
