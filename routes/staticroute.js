const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

router.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

router.get('/homepage', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/homepage.html'));
  });

router.get('/addfood', function(req, res) {
res.sendFile(path.join(__dirname, 'public/addfood.html'));
});

router.get('/addexercise', function(req, res) {
res.sendFile(path.join(__dirname, 'public/addexe.html'));
});

module.exports = router;
