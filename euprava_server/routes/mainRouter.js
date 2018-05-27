var express = require('express');
var router = express.Router();

var mainCtrlr = require('../controllers/mainController');

//Setting layout for all "user" requests to main layout, and passing control to next handler
router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'layout';
  next();
});

router.get('/', mainCtrlr.home);
router.get('/usluge', mainCtrlr.services);
router.get('/profil', mainCtrlr.profile);
router.get('/prijava', mainCtrlr.login);
router.get('/verifikacija', mainCtrlr.verification);
router.get('/registracija', mainCtrlr.register);
router.get('/e-dostava', mainCtrlr.edelivery);

router.post('/prijava', mainCtrlr.prijava);
router.post('/korisnik', mainCtrlr.korisnik);
router.post('/notifikacija', mainCtrlr.notifikacija);
router.post('/verifikacija', mainCtrlr.verifikacija);


module.exports = router;