module.exports.home = function (req, res, next) {
    res.render('home', {
        meta: {
            title: 'Home',
            description: 'eUprava Home Page'
        }
    });
};

module.exports.profile = function (req, res, next) {
    res.render('profile', {
        meta: {
            title: 'Profile',
            description: 'eUprava Profile Page'
        }
    });
};