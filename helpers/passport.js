//load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var GoogleStrategy = require('passport-google-oauth2').Strategy;
  var config    = require(__dirname + '/../config/config.json');

  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callback,
      passReqToCallback: true // allows us to pass back the entire request to the callback
	},

    function(request, accessToken, refreshToken, email, profile, done) {

      console.log(profile);

      var data = {
        email:     profile.emails[0].value,
        password:  profile.id,
        firstname: profile.name.givenName,
        lastname:  profile.name.familyName,
        strategy:  'google',
        role:      'user'
      };

      User.findOne({
        where: {
          email: data.email,
          strategy: 'google'
        }
      }).then(function(user) {
        console.log(user);
        if(!user) {
          User.create(data).then(function(newUser) {
            if (!newUser) {
              return done(null, false);
            } else {
              return done(null, newUser);
            }
          });
        } else {
          user.last_login = Date.now();
          user.save(function(err) {
            if(err) {
              console.error(err);
            }
          });
          done(null, user);
        }
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Facebook-Signin'
        });
      });
    }
  ));

  passport.use(new FacebookStrategy({
      clientID: config.facebook.app_id,
	  clientSecret: config.facebook.app_secret,
	  callbackURL: config.facebook.callback,
	  profileFields:['id','first_name','last_name', 'email']
	},

    function(accessToken, refreshToken, profile, done) {

      var data = {
        email:     profile.emails[0].value,
        password:  profile.id,
        firstname: profile.name.givenName,
        lastname:  profile.name.familyName,
        strategy:  'facebook',
        role:      'user'
      };
      console.log(profile);

      User.findOne({
        where: {
          email: data.email,
          strategy: 'facebook'
        }
      }).then(function(user) {
        console.log(user);
        if(!user) {
          User.create(data).then(function(newUser) {
            if (!newUser) {
              return done(null, false);
            } else {
              return done(null, newUser);
            }
          });
        } else {
          user.last_login = Date.now();
          user.save(function(err) {
            if(err) {
              console.error(err);
            }
          });
          done(null, user);
        }
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Facebook-Signin'
        });
      });
    }
  ));

  // Local Signup
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {

      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({
        where: {
          email: email,
          strategy: 'local'
        }
      }).then(function(user) {
        if (user) {
          return done(null, false, {
            message: 'That email is already taken'
          });
        } else {
          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            strategy:  'local',
            role:      'user'
          };
          User.create(data).then(function(newUser) {
            console.log("Created: " + created);
            if (!newUser) {
              return done(null, false);
            } else {
              return done(null, newUser);
            }
          });
        }
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Signup'
        });
      });
    }
  ));

  //Local Signin
  passport.use('local-signin', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {

      var User = user;
      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);
      };

      User.findOne({
        where: {
          email: email,
          strategy: 'local'
        },
      }).then(function(user) {
        if (!user) {
          return done(null, false, {
            message: 'Email does not exist.'
          });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        user.last_login = Date.now();
        user.save(function(err) {
          if(err) {
            console.error(err);
          }
        });
        var userinfo = user.get();
        return done(null, userinfo);

      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
      });
    }
  ));

  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
}
