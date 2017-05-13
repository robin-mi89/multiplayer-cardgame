var secrets = require('../config/secrets.js');
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
module.exports = {
'googleAuth' : {
        'clientID'      : secrets.CLIENT_ID,
        'clientSecret'  : secrets.CLIENT_SECRET,
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
}

