var mongoose = require('mongoose');
var User = mongoose.model('User');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


// =========================================================================
// LOCAL ===================================================================
// =========================================================================

// Login
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        console.log(errors);
        return done(null, false, req.flash('error', messages));
    }

    if (email) {
        email = email.toLowerCase();
    }

    User.findOne({'local.email': email}, function (err, user) {

        if (err) {
            console.log(err);

            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
        else {

            return done(null, user);
        }
    });
}));

//Sign up
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({'local.email': email}, function (err, existingUser) {
        if (err) {
            return done(err);
        }
        if (existingUser) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        if (req.user) {
            var user = req.user;
            user.local.email = email;
            user.local.password = user.encryptPassword(password);
            user.save(function (err) {
                if (err)
                    throw err;
                return done(null, user);
            });
        }
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));