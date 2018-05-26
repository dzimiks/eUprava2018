var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

var mainCtrlr = require('../controllers/mainController');


//Setting layout for all "user" requests to main layout, and passing control to next handler
router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'layout';
  next();
});


router.get('/', mainCtrlr.home);

router.get('/signin', csrfProtection, function (req, res, next) {
  var messages = req.flash('error');
  res.render('signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/signin', csrfProtection, passport.authenticate('local-signin', {
  failureRedirect: '/signin',
  failureFlash: true
}), function (req, res, next) {

  res.redirect('/manager');
});

router.get('/logout', isLoggedIn, function (req, res) {
  req.logout();
  res.redirect('/');
});

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('back');
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('back');
}


module.exports = router;
