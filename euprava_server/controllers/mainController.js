module.exports.home = function (req, res, next) {
    res.render('home', {
        meta: {
            title: 'Home',
            description: 'eUprava Home Page'
        }
    });
};