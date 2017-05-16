var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport); 

router.get('', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

function isLoggedIn(req, res, next) {
    console.log("checking logged in");
    if (req.isAuthenticated())
        return next();

    res.redirect('/auth/google');
}

module.exports = router;