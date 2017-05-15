var express = require('express');
var router = express.Router();
var passport = require('passport');
GoogleStrategy = require( 'passport-google-oauth' ).Strategy;
router.get('', passport.authenticate('google', { scope : ['profile', 'email'] }));

module.exports = router;