/**
 * Created by mikhailmetrikin on 5/10/17.
 */
var express   = require('express'),
    db        = require('../models'),
    router    = express.Router(),
    Sequelize = require('sequelize'),
    request   = require('request');

memesConf = require('../config/meme_config');


// BasePath = /meme
router.get('/one', function(req, res) {
  db.Meme.findOne({
    order: [Sequelize.fn('RAND')]
  }).then(function(data) {
    res.json(data);
  });

});

router.get('/all', function(req, res) {
  db.Meme.findAll({}).then(function(data) {
    res.json(data);
  });

});

router.post('/create', function(req, res) {

  // Logic to save the meme prompts here
  // TODO:(Mikhail Metrikin): Rewrite this logic to check for environment then load vars

  var formData = {
      template_id : req.body.memeId,
      username : require('../config/meme_config').username || process.env.IMGF_USERNAME,
      password : require('../config/meme_config').password || process.env.IMGF_PASSWRD,
      text0 : req.body.top,
      text1 : req.body.bottom
  };

  request.post("https://api.imgflip.com/caption_image", {
    form : formData
  }, function(error, response, body) {

    var answer = JSON.parse(body);

    if (!error && response.statusCode === 200) {

      // If Img Flip api responds with a fail we use a fail meme...
      answer.success ? res.json(answer.data.url) : res.json('https://i.imgflip.com/1pasjo.jpg');
    }

  });


});

module.exports = router;
