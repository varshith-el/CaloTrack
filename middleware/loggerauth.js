const jwt = require('jsonwebtoken')
const config = require('config')

function redirectIfLoggedIn(req, res, next) {
    const token = req.cookies.token;
  
    // Check if the token exists
    if (token) {
      // Verify the token
      try {
        jwt.verify(token, config.get('jwtSecret'));
        // If the token is valid, redirect to the homepage
        return res.redirect('/api/homepage');
      } catch (err) {
        // If the token is not valid, do nothing and allow the request to proceed
      }
    }
  
    next();
  }

module.exports = redirectIfLoggedIn