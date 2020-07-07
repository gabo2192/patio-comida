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
    title,
    description,
    image,
    featured,
    frequency,
    schedule,
    stock,
    price,
    categories,
  } = JSON.parse(event.body);

  if (!title || !description || !image || !stock || !price || !categories) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        msg: 'Campos inválidos',
      }),
    };
  } else {
    let data;
    console.log('stock', parseInt(stock));
    try {
      const faunaUserBody = JSON.stringify({
        query: `
          query($authId: String!){
            findUserByAuthId(authId:$authId){
              _id
              market {
                _id
              }
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
        .then((json) => (data = json.data.findUserByAuthId));
      console.log(res);
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
      let mutationData = null;
      const postBody = JSON.stringify({
        query: `
        mutation(
          $title: String!
          $market: ID!
          $image: String!
          $description: String!
          $featured: Boolean!
          $categories: [Category!]!
          $price: Float!
          $owner: ID!
          $baseStock: Int!
          $stock : Int!
          $frequency: Boolean!
          $schedule: Boolean!
          $sold: Int
        ) {
          createProduct(
            data: {
              title: $title
              market: {connect: $market}
              image: $image
              description: $description
              categories: $categories
              featured: $featured
              price: $price
              owner: { connect: $owner } 
              baseStock: $baseStock
              stock: $stock
              frequency: $frequency
              schedule: $schedule
              sold: $sold
            }
          ) {
            _id
          }
        }
        `,
        variables: {
          title: title,
          market: data.market._id,
          image: image,
          description: description,
          categories: categories,
          featured: featured,
          price: parseFloat(price),
          owner: data._id,
          baseStock: parseInt(stock),
          stock: parseInt(stock),
          frequency: frequency,
          schedule: schedule,
          sold: 0,
          purchasedBy: [],
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
        .then((json) => (mutationData = json.data));
      if (mutationData) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            msg: mutationData.createProduct._id,
          }),
        };
      }
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: err.message || 'Fallo la creación del producto',
        }),
      };
    }
  }
};
