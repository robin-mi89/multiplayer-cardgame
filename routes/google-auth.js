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
// router.get('/unlink/google', isLoggedIn, function(req, res) {
//     var user          = req.user;
//     user.google.token = undefined;
//     user.save(function(err) {
//         res.redirect('/profile');
//     });
// });
module.exports = router;