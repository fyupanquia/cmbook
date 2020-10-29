const jwt = require("jsonwebtoken");
const config = require("../config");
const Err = require('../utils/error')
const secret = config.jwt.secret;

function sign(data) {
  try {
    data = typeof data === "object" ? JSON.stringify(data) : data;
    return jwt.sign(data, secret);
  } catch (error) {
    return null
  }
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);
    if (decoded.id !== owner) {
      throw new Err("Unauthorized", 401);
    }
  },

  logged: function (req, owner) {
    const decoded = decodeHeader(req);
    req._auth = decoded;
  },
};

function getToken(auth) {
  if (!auth) {
    throw new Err("Unauthorized", 401);
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw new Err("Unauthorized", 401);
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
