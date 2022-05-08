const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  authMiddleware: function ({ req }) {
    const token =
      req.headers.authorization || req.body.token || req.query.token;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const decoded = jwt.verify(token, secret, { maxAge: expiration });
      req.me = decoded;
    } catch (err) {
      console.log("Invalid token");
    }

    return req;
  },

  signToken: function ({ email, username, _id }) {
    const payload = {
      email,
      username,
      _id,
    };
    return jwt.sign(payload, secret, { expiresIn: expiration });
  },
};
