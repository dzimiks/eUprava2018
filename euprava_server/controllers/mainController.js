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

module.exports.register = function (req, res, next) {
  res.render('register', {
    meta: {
      title: 'eUprava | Register',
      description: 'eUprava Register Page'
    }
  });
};