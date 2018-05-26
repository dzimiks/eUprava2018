module.exports.home = function (req, res, next) {
    res.render('home', {
        meta: {
            title: 'eUprava | Home',
            description: 'eUprava Home Page'
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
      title: 'eUprava | Profile',
      description: 'eUprava Profile Page'
    }
  });
};