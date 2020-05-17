const path = require('path');
const withDefaults = require('./utils/default-options');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (['build-html', 'develop-html'].includes(stage)) {
    /*
     * During the build step, `auth0-spa-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-spa-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-spa-js/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

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
