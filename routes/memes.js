/**
 * Created by mikhailmetrikin on 5/10/17.
 */
var express = require('express');
var db = require('../models');
var router = express.Router();
var Sequelize = require('sequelize');

// BasePath = /meme

router.get('/one', function(req, res) {

  db.Meme.findOne({
    order: [
      Sequelize.fn('RAND'),
    ]
  }).then(function(data) {
    res.json(data);
  });

});

router.get('/all', function(req, res) {
  db.Meme.findAll({}).then(function(data) {
    res.json(data);

  });
});

router.post('/new', function(req, res) {
  // Logic to save the meme here?


});

module.exports = router;
