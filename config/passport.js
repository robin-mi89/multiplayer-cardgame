// config/passport.js

// load all the things we need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var db = require("../models");

// load the auth variables
var secrets = require('../config/secrets.js');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(err, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID        : secrets.secrets.CLIENT_ID,
        clientSecret    : secrets.secrets.CLIENT_SECRET,
        callbackURL     : secrets.secrets.CALLBACK_URL,

    },
    function(token, refreshToken, profile, done) {
        console.log("token: " + token);
        console.log("refresh token: " + refreshToken);
        console.log("profile: " + profile);
        console.log("done: " + done);
        //make the code asynchronous
        //User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
                db.User.findAll(
                {
                    where: {googleID: profile.id}
                }).then(dbUser => 
                {
                    if (err) {throw err};

                    if (dbUser)
                    {
                        return done(err, dbUser);;
                    }
                    else
                    {

                        db.User.create(
                        {
                        googleID : profile.id,
                        token : token,
                        user_name : profile.displayName,
                        email : profile.emails[0].value // pull the first email
                        }).then(function(dbUser)
                        {
                            return done(err, dbUser);
                        });
                    }
                })
        });

    }));

};
