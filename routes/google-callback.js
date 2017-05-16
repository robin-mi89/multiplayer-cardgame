var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport); 


router.get('/auth/google/callback',
            passport.authenticate( 'google', 
            {
    		failureRedirect: '/fail'
            }),
            function(req, res) 
            {
                console.log("successful redirect");
                res.redirect('/');
            });
            
module.exports = router;
