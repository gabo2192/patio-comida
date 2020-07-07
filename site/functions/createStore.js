require('dotenv').config();
const fetch = require('node-fetch');

const { checkHeaderForValidToken } = require('./utils/auht0');

exports.handler = async (event) => {
  let user;

  try {
    user = await checkHeaderForValidToken(event.headers);
  } catch (err) {
    console.error(err);
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err }),
    };
  }
  const {
    name,
    phone,
    address,
    email,
    logo,
    image,
    categories,
    services,
  } = JSON.parse(event.body);
  if (
    !name ||
    !phone ||
    !address ||
    !email ||
    !logo ||
    !image ||
    !user ||
    !categories ||
    !services
  ) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        msg: 'Campos inválidos',
      }),
    };
  } else {
    let userId;
    try {
      const faunaUserBody = JSON.stringify({
        query: `
          query($authId: String!){
            findUserByAuthId(authId:$authId){
              _id
            }
          }
        `,
        variables: {
          authId: user.sub,
        },
      });
      const res = await fetch(`https://graphql.fauna.com/graphql`, {
        method: 'POST',
        body: faunaUserBody,
        headers: {
          authorization: `Bearer ${process.env.GATSBY_FAUNA_SECRET}`,
        },
      })
        .then((res) => res.json())
        .then((json) => (userId = json.data.findUserByAuthId._id));
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: err.message || 'Usuario no existe en Fauna',
        }),
      };
    }
    try {
      const path = name.replace(/\s+/g, '-').toLowerCase();
      let data = null
      const postBody = JSON.stringify({
        query: `
        mutation(
          $name: String!
          $path: String!
          $logo: String!
          $background: String!
          $slogan: String!
          $phone: String!
          $address: String!
          $owner: ID!
          $categories: [Category!]!
          $services: [Service!]!
        ) {
          createMarket(
            data: {
              name: $name
              path: $path
              logo: $logo
              background: $background
              slogan: $slogan
              phone: $phone
              address: $address
              owner: { connect: $owner }
              categories: $categories
              services: $services
              published: false
            }
          ) {
            _id
          }
        }
        `,
        variables: {
          name: name,
          path: path,
          logo: logo,
          background: image,
          slogan: 'hey i need to be set up',
          phone: phone,
          address: address,
          owner: userId,
          categories: categories,
          services: services,
        },
      });
      const res = await fetch(`https://graphql.fauna.com/graphql`, {
        method: 'POST',
        body: postBody,
        headers: {
          authorization: `Bearer ${process.env.GATSBY_FAUNA_SECRET}`,
        },
      })
        .then((res) => res.json())
        .then((json) => (json.data && {data = json.data}));
      if (data) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            msg: data.createMarket._id,
          }),
        };
      }
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: err.message || 'Fallo la creación de la tienda',
        }),
      };
    }
  }
};
