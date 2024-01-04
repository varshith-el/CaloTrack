const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route   POST api/users
// @desc    Register user
// @access  Public
/*
router.post(
    '/',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password } = req.body;
  
      try {
        // See if user exists
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }
  
        user = new User({
          name,
          email,
          password,
        });
  
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        // Return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );
  */

//register a new user.

router.post(
  '/register',
  [
    check('userid', 'Userid is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userid,name, email, password } = req.body;

    try {
      // See if user exists
      let user_id = await User.findById(userid);
      if (user_id) {
        return res.status(400).json({ errors: [{ msg: 'Userid already exists,Choose another' }] });
      }

      // See if user exists
      let user = await User.findByEmail(email);
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = await User.create(userid,email,hashedPassword);

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.username,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // Set the JWT in a cookie
          res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
          // Set the username in a cookie
          res.cookie('username', user.username, { httpOnly: true, secure: true, sameSite: 'strict' });
          res.json({ msg: 'User reggistered successfully' });
          //res.json({ token });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// update user data/profile

router.put('/:user_id', auth, async (req, res) => {
  const { user_id,name, height, weight, gender,activityLevel, goal, age} = req.body;
  console.log(req.body)

  try {
    // Update the user data
    await User.update(user_id, name, height, weight, gender,activityLevel, goal, age);

    res.json({ msg: 'User data updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
  
module.exports = router;
  