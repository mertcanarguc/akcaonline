var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/register', function(req, res) {
  res.render('front/register', { });
});

router.post('/register', function(req, res) {
  User.register(new User(req.body),
  req.body.password, function(err, user) {
    if (err) {
      return res.render('front/register', { user: user });
    }
    
    passport.authenticate('local')(req,res, function() {
      res.redirect('/basarili');
    });
  });
});

router.get('/login',function(req, res) {
  res.render('front/login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req,res) {
  res.redirect('/kamp');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
