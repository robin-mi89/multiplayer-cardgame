var express = require('express');
var router = express.Router();

/* GET START home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memeski' });
});

module.exports = router;
