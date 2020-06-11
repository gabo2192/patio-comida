require('dotenv').config();

var jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { promisify } = require('util');
const fetch = require('node-fetch');
const FormData = require('form-data');

let signingKey;
const client = jwksClient({
  cache: true, // Default Value
  cacheMaxEntries: 5, // Default value
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const NAMESPACE = 'http://whotofollow.com';

const doesUserHavePermission = (user, targetPermission) => {
  if (!user) return false;

  const NAMESPACE = 'http://whotofollow.com';
  const userPermissions = user[NAMESPACE + '/permissions'];

  if (!userPermissions) return false;
  return userPermissions.includes(targetPermission);
};

const availablePermissions = {
  CREATE_INFLUENCER: 'create:influencer',
  APPROVE_INFLUENCER: 'approve:influencer',
  DELETE_INFLUENCER: 'delete:influencer',
};

const checkHeaderForValidToken = async (headers) => {
  const rawAuthorizationHeader = headers['authorization'];

  if (!rawAuthorizationHeader) {
    throw 'Unauthorized. No access token included';
  }

  const accessToken = rawAuthorizationHeader.split(' ')[1];
  if (!accessToken) {
    throw 'Unauthorized. Token is invalid.';
  }

  if (!signingKey) {
    const getSigningKey = promisify(client.getSigningKey);
    try {
      const key = await getSigningKey(process.env.AUTH0_KEY_ID);
      signingKey = key.getPublicKey();
    } catch (err) {
      console.error(err);
      throw 'Failed to verify key';
    }
  }

  try {
    var decoded = jwt.verify(accessToken, signingKey);
  } catch (err) {
    console.error(err);
    throw err.message;
  }

  if (!decoded) {
    throw 'Failed to verify token';
  }
  return decoded;
};

const getToken = async () => {
  let token;
  const params = {
    grant_type: 'client_credentials',
    client_id: `${process.env.AUTH0_CLIENT_ID}`,
    client_secret: `${process.env.ATUH0_CLIENT_SECRET}`,
    audience: 'https://fdwa.auth0.com/api/v2/',
  };
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  formBody = formBody.join('&');

  const res = await fetch('https://fdwa.auth0.com/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: formBody,
  })
    .then((res) => res.json())
    .then((json) => (token = json.access_token));
  return token;
};

module.exports = {
  availablePermissions,
  doesUserHavePermission,
  checkHeaderForValidToken,
  getToken,
};
