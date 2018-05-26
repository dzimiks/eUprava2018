var express = require('express');
var router = express.Router();

var mainCtrlr = require('../controllers/mainController');

//Setting layout for all "user" requests to main layout, and passing control to next handler
router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'layout';
  next();
});

router.get('/', mainCtrlr.home);

module.exports = router;