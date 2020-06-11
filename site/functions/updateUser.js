require('dotenv').config();
const fetch = require('node-fetch');

const { checkHeaderForValidToken, getToken } = require('./utils/auht0');

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
  const { name, phone, address, lat, lng } = JSON.parse(event.body);
  const token = await getToken();
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
  }
};
