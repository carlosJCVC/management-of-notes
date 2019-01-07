const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) { 
        return done(null, false, {message: 'Not User found.'}); 
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
    if (!user.verifyPassword(password)) { 
        return done(null, false); 
    }
}));

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

/*
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { 
            return done(err); 
        }
        if (!user) { 
            return done(null, false); 
        }
        if (!user.verifyPassword(password)) { 
            return done(null, false); 
        }

        return done(null, user);
      });
    }
  ));
  */