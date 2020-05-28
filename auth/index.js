const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");

const secret = config.jwt.secret;

function sign(data) {
  data = JSON.stringify(data);
  return jwt.sign(data, secret);
}
function verify(token) {
  return jwt.verify(token, secret);
}
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    if (decoded.id !== owner) {
      throw error("Usuario no autorizado", 401);
    }
  },
  logged: function (req, owner) {
    const decoded = decodeHeader(req);
  },
};
function getToken(auth) {
  if (!auth) {
    throw new Error("Token no enviado");
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("Formato invalido");
  }
  let token = auth.replace("Bearer ", "");
  return token;
}
function decodeHeader(req) {
  const authorization = req.headers.authorization || " ";
  const token = getToken(authorization);
  const decode = verify(token);
  req.user = decode;
  return decode;
}
module.exports = {
  sign,
  check,
};
