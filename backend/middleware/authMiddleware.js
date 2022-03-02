const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

// This middleware will fire 
// between client req & server res

const protect = asyncHandler(async (req, res, next) => {
  // Get token from header
  const token = req.headers['x-access-token'];

  // Check if no token
  if(token === undefined) {
    res.status(400);
    throw new Error('Pas de token')
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if(err) {
      res.status(400);
      throw new Error('Token non valide')
    }

    req.id = decode.id;
    next();
  })
})

module.exports = protect;
