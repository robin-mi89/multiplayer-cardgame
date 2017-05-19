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
    res.json(req.user);
});
// {
//     // TODO: DEBUGGING THIS
//     //res.json(req.user);
//
//     ///////////////////////////////////////////////////////////////////////////////////////
//     res.json({ user_name: 'Misha' + String(Math.floor(Math.random() * 100)),
//       email: 'metrikin@gmail.com',wins: 0 })
//     ///////////////////////////////////////////////////////////////////////////////////////
// });

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