/**
 * Created by mikhailmetrikin on 5/10/17.
 */
var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/one', function(req, res, next) {
  db.Meme.findAll({
    attributes: ["id"]
  }).then(function(data) {
    var randomId = randomMemeId(data.length);

    db.Meme.findAll({
      where: {
        id: randomId
      }
    }).then(function(meme) {
      res.json(meme);
    });
  });
});

router.get('/all', function(req, res, next) {
  db.Meme.findAll({}).then(function(data) {
    res.json(data);

  });
});

var randomMemeId = function(count) {
  return Math.floor(Math.random() * count) + 1
};

module.exports = router;
