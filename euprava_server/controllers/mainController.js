module.exports.home = function (req, res, next) {
    res.render('home', {
        meta: {
            title: 'eUprava | Home',
            description: 'eUprava Home Page'
        }
    });
};

module.exports.services = function (req, res, next) {
  res.render('services', {
    meta: {
      title: 'eUprava | Services',
      description: 'eUprava Services Page'
    }
  });
};

module.exports.profile = function (req, res, next) {
    res.render('profile', {
        meta: {
            title: 'eUprava | Profile',
            description: 'eUprava Profile Page'
        }
    });
};

module.exports.login = function (req, res, next) {
  res.render('login', {
    meta: {
      title: 'eUprava | Login',
      description: 'eUprava Login Page'
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