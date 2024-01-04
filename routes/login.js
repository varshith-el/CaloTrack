const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const lauth = require('../middleware/loggerauth')


router.post('', lauth,async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Email Not Found' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        // Set the JWT in a cookie
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        // Set the username in a cookie
        res.cookie('username', user.username, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({ msg: 'User logged in successfully' });
        //res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router
