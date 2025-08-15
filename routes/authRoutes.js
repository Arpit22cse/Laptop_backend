const express = require('express');
require('../config/passport');
const passport = require('passport');
const router = express.Router();

const AuthController = require('../controllers/authController');




router.post('/login', AuthController.login);

router.post('/signup', AuthController.signup);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
  }),
  (req, res) => {
    
    res.redirect('http://localhost:5173/profile');
  }
);


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:5173/login',
  }),
  (req, res) => {
    res.redirect('http://localhost:5173/profile');
  }
);

module.exports = router;