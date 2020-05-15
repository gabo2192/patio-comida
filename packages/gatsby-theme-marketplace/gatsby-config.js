const withDefaults = require('./utils/default-options');

module.exports = (options) => {
  const { faunaSecret } = withDefaults(options);
  return {
    plugins: [
      {
        resolve: 'gatsby-source-graphql',
        options: {
          fieldName: 'fauna',
          typeName: 'Fauna',
          url: 'https://graphql.fauna.com/graphql',
          headers: {
            Authorization: `Bearer ${faunaSecret}`,
          },
        },
      },
      'gatsby-plugin-theme-ui',
    ].filter(Boolean),
  };
};
