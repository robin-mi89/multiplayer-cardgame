Sequelize = require('sequelize');

module.exports = function(io, db) {

  var players   = [],
      judgeInd  = 0,
      countdown = 30,
      round     = {};
      pTotal    = 4;

  io.on('connection', function(socket){
    require('./chat')(socket, db, io);

    console.log("Socket is: ",socket.id);

    socket.on('player join', function(user) {

      user.id = socket.id;
      user.socket = socket;

      if(players.length < pTotal){
        players.push(user);

        var active = players.map(function(each, i) {
          return {uid: each.id, name: each.user_name, order: i};
        });

        io.emit('player added', active);
      }

      user.socket.emit("userID", {uid: user.id, order: players.length});


      // DEBUGGING TODO: (REMOVE) /////////////////////////////////////////////
      players.forEach(function(player) {
        console.log("Players joined: ", player.user_name);
      });
      /////////////////////////////////////////////////////////////////////////

      // When 4 players login Start game
      if(players.length >= 4) {
        StartGame();
      }

    });

    // TODO: NEEDS DEBUGGING, -- see Mikhail M.

    // socket.on('disconnect', function(){
    //
    //   // Rebuild player array without disconnected user
    //   var remain = [];
    //
    //   players.map(function(each) {
    //     if(!each.id === socket.id){
    //         remain.push(each);
    //     }
    //   }, this);
    //   players = remain;
    //
    // });

  });

  function StartGame(){

    db.Meme.find({
      order: [
        Sequelize.fn( 'RAND' )
      ]
    }).then(function(meme){

      round = {
        meme: meme,
        judgeID: players[judgeInd].id
      };

      judgeInd >= players.length - 1 ? judgeInd = 0 : judgeInd++;

      io.emit('start round', round);

      countdown = 30;

      setInterval(function() {

        if(countdown < 1){
          clearInterval(this);
        }

        io.emit('timer', {countdown: countdown});
        countdown--;
      }, 1000)


    });


  }

};