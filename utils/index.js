const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const sendResetPasswordEmail = require('./sendResetPasswordEmail');
const createHash = require('./createHash');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  sendResetPasswordEmail,
  createHash,
};
