const jwt = require('jsonwebtoken')
const config = require('config')
const cookieParser = require('cookie-parser');

/*module.exports = function(req, res, next) {
    //Get token from the header
    //const token = req.header('x-auth-token')
    const token = req.cookies.token;


    //check if not token
    if(!token) {
        return res.status(401).json({msg: 'No token, authorisation denied'})
    }

    //verify token

    try {
const decoded = jwt.verify(token, config.get('jwtSecret'))
req.user = decoded.user
next()
    }
    catch(err){
res.status(401).json({msg: 'Token is not valid'})
    }
}*/



module.exports = function(req, res, next) {
  const token = req.cookies.token;

  // Check if not token
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return res.redirect('/login');
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
    return res.redirect('/login');
  }
}
