const jwt = require("jsonwebtoken");
const { generateErrorResponse, getAuthBearerToken } = require("../utils/utils");

const HTTP_UNAUTHORIZED = 401;
const UNAUTHORIZED_MESSAGE = 'Unauthorized';

const blacklistedTokens = new Set();

const authenticate = (req, res, next) => {
  const token = getAuthBearerToken(req);

  // Check if the token is valid and not blacklisted
  if (!token) {
    return generateErrorResponse(res, HTTP_UNAUTHORIZED, UNAUTHORIZED_MESSAGE);
  }

  const decodedToken = jwt.decode(token);

  // Check if the token has expired
  if (!decodedToken || decodedToken.exp <= Date.now() / 1000) {
    // Token has expired, remove it from the blacklist
    blacklistedTokens.delete(token);
    return generateErrorResponse(res, HTTP_UNAUTHORIZED, "Token has expired");
  }

  // Check if the token is blacklisted
  if (blacklistedTokens.has(token)) {
    return generateErrorResponse(res, HTTP_UNAUTHORIZED, "Token revoked");
  }

  // Token is valid, set userId in the request and continue
  req.userId = decodedToken.userId;
  next();
};

module.exports = {
  authenticate,
  blacklistedTokens,
}
