require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-marketplace',
      options: {
        basePath: 'restaurantes',
        contentPath: 'restaurantes',
        faunaSecret: process.env.FAUNA_SECRET,
      },
    },
  ],
};
