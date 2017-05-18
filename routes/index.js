var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

module.exports = router;
