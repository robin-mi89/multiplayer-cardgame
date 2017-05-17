var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport); 

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback',
            passport.authenticate('google', 
            {
                successRedirect : '/',
                failureRedirect : '/',
                function(req, res)
                {
                    console.log(req.session);
                }
            }));

router.get('/api/user', function(req, res)
{
    console.log(req.session);
    console.log(req.user);
    res.json(req.user);
});

router.get('/logout', function(req, res) 
{
    req.logout();
    res.redirect('/');
});

router.get('/api/user', function(req, res)
{
    console.log(req.session);
    res.json({user: req.user});
});


module.exports = router;