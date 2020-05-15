module.exports = ({
  basePath = '/',
  faunaSecret = '',
  contentPath = '/market',
}) => ({
  basePath,
  contentPath,
  faunaSecret,
});
