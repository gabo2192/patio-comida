require('dotenv').config();
const fetch = require('node-fetch');

const { checkHeaderForValidToken, getToken } = require('./utils/auht0');

exports.handler = async (event) => {
  let user;
  /* AUTHENTICATION */

  try {
    user = await checkHeaderForValidToken(event.headers);
  } catch (err) {
    console.error(err);
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err }),
    };
  }
  const auth0UserId = user.sub;

  /*GET FAUNA ID */
  let faunaInfo;
  try {
    const faunaUserBody = JSON.stringify({
      query: `
        query($authId: String!){
          findUserByAuthId(authId:$authId){
            _id
            avatar
            role
          }
        }
      `,
      variables: {
        authId: auth0UserId,
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
      .then((json) => (faunaInfo = json.data.findUserByAuthId));
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: err.message || 'Usuario no existe en Fauna',
      }),
    };
  }
  /*END */
  const {
    name,
    phone,
    email,
    whatsapp,
    lat,
    lng,
    addressName,
    newAddress,
  } = JSON.parse(event.body);

  if (
    !name ||
    !phone ||
    !email ||
    !whatsapp ||
    !lat ||
    !lng ||
    !addressName ||
    !newAddress
  ) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        msg: 'Campos inválidos',
      }),
    };
  }

  try {
    const postBody = JSON.stringify({
      query: `mutation( $id: ID! $data: UserInput!){
      updateUser(id: $id data: $data){
        _id
      }
    }`,
      variables: {
        id: faunaInfo._id,
        data: {
          authId: auth0UserId,
          avatar: faunaInfo.avatar,
          role: faunaInfo.role,
          email: email,
          phone: phone,
          name: name,
          address: {
            name: addressName,
            address: newAddress,
            lat: lat,
            lng: lng,
          },
          whatsapp: whatsapp,
        },
      },
    });
    const res = await fetch(`https://graphql.fauna.com/graphql`, {
      method: 'POST',
      body: postBody,
      headers: {
        authorization: `Bearer ${process.env.GATSBY_FAUNA_SECRET}`,
      },
    });
    if (res.status === 200)
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: 'Actualización de usuario existosa',
        }),
      };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: err.message || 'Fallo en actualización usuario',
      }),
    };
  }
};
/* 
authId: String! @unique
avatar: String!
role: Role!
market: Market
products: [Product] @relation(name: "owner")
email: String
phone: String
name: String
address: [Address]
whatsapp: String
cart: [CartItem]
order: [Order] */
/* const token = await getToken();
  if (!name || !phone || !address) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        msg: 'Campos inválidos',
      }),
    };
  } else {
    try {
      const postBody = {
        user_metadata: {
          address: { lat: `${lat}`, lng: `${lng}`, address },
          phone: phone,
          name: name,
        },
      };
      const res = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user.sub}`,
        {
          method: 'PATCH',
          body: JSON.stringify(postBody),
          headers: {
            authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
        },
      );
      if (res.status === 200) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            msg: 'great',
          }),
        };
      }
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: err.message || 'Fallo la actualización en Auth0',
        }),
      };
    }
  } */
