require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const { checkHeaderForValidToken } = require('./utils/auht0');

exports.handler = async (event) => {
  try {
    const user = await checkHeaderForValidToken(event.headers);
    console.log(user);
    console.log(
      'DOTENV',
      require('dotenv').config({
        path: `.env.${process.env.NODE_ENV}`,
      }),
    );

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err) {
    console.log(
      'DOTENV',
      require('dotenv').config({
        path: `.env.${process.env.NODE_ENV}`,
      }),
    );

    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err }),
    };
  }
};
