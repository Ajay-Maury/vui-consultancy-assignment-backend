const jwt = require("jsonwebtoken");

const hasEmptyValue = (...args) => {
  for (const arg of args) {
    if (!arg || !arg.trim()) {
      return true;
    }
  }
  return false;
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

const generateErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({status:false, message });
};

const getAuthBearerToken = (req) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return null;
  }

  const [bearer, token] = authorizationHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return null;
  }
  return token;
};

module.exports = {
  hasEmptyValue,
  generateToken,
  generateErrorResponse,
  getAuthBearerToken,
};
