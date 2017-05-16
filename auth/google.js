var secrets = require('../config/secrets.js');
module.exports = {
'googleAuth' : {
        clientID      : secrets.CLIENT_ID,
        clientSecret  : secrets.CLIENT_SECRET,
        callbackURL   : 'http://localhost:8080/auth/google/callback'
    }
};

