var Korisnik = require("../models").korisnik;

module.exports.home = function (req, res, next) {
  res.render('home', {
    meta: {
      title: 'eUprava | Home',
      description: 'eUprava Home Page',
      pocetna: 'pocetna'
    }
  });
};

module.exports.services = function (req, res, next) {
  res.render('services', {
    meta: {
      title: 'eUprava | Services',
      description: 'eUprava Services Page',
      usluge: 'usluge'
    }
  });
};

module.exports.profile = function (req, res, next) {
  res.render('profile', {
    meta: {
      title: 'eUprava | Profile',
      description: 'eUprava Profile Page',
      profil: 'profil'
    }
  });
};

module.exports.login = function (req, res, next) {
  res.render('login', {
    meta: {
      title: 'eUprava | Login',
      description: 'eUprava Login Page',
      prijava: 'prijava'
    }
  });
};

module.exports.verification = function (req, res, next) {
  res.render('twostep', {
    meta: {
      title: 'eUprava | Verifikacija',
      description: 'eUprava Login Page',
      prijava: 'prijava'
    }
  });
};

module.exports.register = function (req, res, next) {
  res.render('register', {
    meta: {
      title: 'eUprava | Register',
      description: 'eUprava Register Page'
    }
  });
};

module.exports.edelivery = function (req, res, next) {
  res.render('e-delivery', {
    meta: {
      title: 'eUprava | E Dostava',
      description: 'eUprava E Dostava Page',
      edostava: 'e-dostava'
    }
  });
};

var randomstring = require("randomstring");

module.exports.prijava = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  Korisnik.findOne({ where: { email: email } }).then(function (user) {
    if (user) {
      if (password === user.lozinka) {
        res.status(200).json({ "ok": "yes" });
        var token = randomstring.generate(5);
        let updateValues = { kljuc: token };
        Korisnik.update(updateValues, { where: { email: email } }).then((result) => {
          console.log(result);
          module.exports.sendEmail(email, "Validacioni kljuc", "Kljuc: " + token);

        });
      } else {
        res.status(401).json({ "message": "netacna sifra" });
      }
    } else {
      res.status(404).json({ "message": "ne postoji korisnik" });
    }
  }).catch(function (err) {
    res.status(404).json({ "message": "ne postoji korisnik" });
  });
};

module.exports.verifikacija = function (req, res, next) {
  let email = req.body.email;
  let key = req.body.key;
  Korisnik.findOne({ where: { email: email } }).then(function (user) {
    if (user) {
      console.log(key + " " + user.kljuc);
      if (key === user.kljuc) {
        res.status(200).json({ "jmbg": user.jmbg });
      } else {
        res.status(401).json({ "message": "nevalidan kljuc" });
      }
    } else {
      res.status(404).json({ "message": "nevalidan kljuc" });
    }
  }).catch(function (err) {
    res.status(404).json({ "message": "nevalidan kljuc" });
  });
};

module.exports.korisnik = function (req, res, next) {
  let jmbg = req.body.jmbg;
  Korisnik.findOne({ where: { jmbg: jmbg } }).then(function (user) {
    if (user) {
      res.status(200).json({ "korisnik": user });
    } else {
      res.status(404).json({ "message": "ne postoji korisnik" });
    }
  }).catch(function (err) {
    res.status(404).json({ "message": "ne postoji korisnik" });
  });
};

var nodemailer = require('nodemailer');

module.exports.sendEmail = function (email, subject, text) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cryptoleaguetest@gmail.com',
      pass: 'cryptopassword'
    }
  });

  var mailOptions = {
    from: 'cryptoleaguetest@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports.notifikacija = function (req, res, next) {
  module.exports.sendEmail(req.body.email, req.body.subject, req.body.text);
};

module.exports.sacuvajKorisnika = function (req, res, next) {
  let updateValues = { email: req.body.email, lozinka: req.body.lozinka };
  Korisnik.update(updateValues, { where: { jmbg: req.body.jmbg } }).then((result) => {
    res.status(200).json({ 'message': 'Testing' });
  });
};