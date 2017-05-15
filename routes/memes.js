/**
 * Created by mikhailmetrikin on 5/10/17.
 */
var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/all', function(req, res, next) {
  db.Meme.findAll({}).then(function(data){
    res.json(data);
  });
});

module.exports = router;