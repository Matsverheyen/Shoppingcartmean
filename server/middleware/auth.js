const jwt = require('jsonwebtoken');
require('dotenv').config();
verifyJWTToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    });
  });
};

function verifyAuthToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    if (token.includes('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    verifyJWTToken(token)
      .then(decodedToken => {
        req.user = decodedToken;
        next();
      })
      .catch(err => {
        res.status(401).json({
          message: 'Invalid auth token provided.'
        });
      });
  } else {
    res.status(401).json({
      message: 'No auth token provided'
    });
  }
}

module.exports = verifyAuthToken;