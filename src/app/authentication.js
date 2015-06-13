// Dependencies
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

// Models
var User = require('./models/UserModel');

/**
 * Configure and register authentication settings.
 * @param app The express middleware
 * @param config The application configuration
 * @param passport The passport instance
 */
module.exports = function (app, config, passport) {
  // configure for passport authentication
  app.use(session({secret: config.secret, resave: true, saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  // serialization of an user
  passport.serializeUser(function (user, callback) {
    callback(null, user._id);
  });

  // deserialization of an user
  passport.deserializeUser(function (id, callback) {
    User.findById(id, function (err, user) {
      callback(err, user);
    });
  });

  // local signup method
  passport.use('local-signup', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, callback) {
      process.nextTick(function () {
        User.findOne({'local.username': username}, function (err, user) {
          // handle errors
          if(err) return callback(err);
          if(user) return callback(null, false, {'username': 'That username already exists.'});

          // create new user and return
          var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function (err) {
            if(err) throw err;
            return callback(null, newUser);
          });
        });
      });
    }));

  // local login method
  passport.use('local-login', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, callback) {
      User.findOne({'local.username': username}, function (err, user) {
        if(err)  return callback(err);

        if(!user || !user.validPassword(password)) {
          return callback(null,
            false,
            {
              username: 'Wrong username or password',
              password: 'Wrong username or password'
            });
        }

        return callback(null, user);
      });
    }));
};

