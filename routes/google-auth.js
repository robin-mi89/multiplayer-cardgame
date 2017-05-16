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
module.exports = router;