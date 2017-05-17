Sequelize = require('sequelize');

module.exports = function(io, db) {

  var players = [];

  io.on('connection', function(socket){
    require('./chat')(socket, db);

    console.log("User connected YAY!");

    socket.on('player join', function(user) {

      players.push(user);
      console.log("Current players are", players);

      // When 4 players login Start game
      if(players.length >= 4) {
        StartGame();
      }

    });

  });

  function StartGame(){

    db.Meme.find({
      order: [
        Sequelize.fn( 'RAND' )
      ]
    }).then(function(meme){
      io.emit('start round', meme)


    });


  }

};