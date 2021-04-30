// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  rootPath: () => '/',
  loginPath: () => [host, 'login'].join('/'),
  signupPath: () => [host, 'signup'].join('/'),
  signupApiPath: () => [host, prefix, 'signup'].join('/'),
  loginApiPath: () => [host, prefix, 'login'].join('/'),
  dataApiPath: () => [host, prefix, 'data'].join('/'),
};
