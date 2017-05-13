var express = require('express');
var router = express.Router();
var passport = require('../config/passport.js');

router.get('', passport.authenticate('google', { scope : ['profile', 'email'] }));

module.exports = router;