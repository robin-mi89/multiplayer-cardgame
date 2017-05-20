Sequelize = require('sequelize');

module.exports = function(io, db) {

  var players   = [],
      judgeInd  = 0,
      countdown = 30,
      round     = {},
      pTotal    = 4,
      playrRef  = {},
      roundSubs = 0,
      actJudge  = undefined;

  io.on('connection', function(socket){
    require('./chat')(socket, db, io);

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

      // When 4 players login Start game
      if(players.length >= 4) {

        // Create object reference for players by their Socket.id
        playrRef = players.reduce(function(map, user) {
          map[user.id] = user;
          return map;
        }, {});
        StartGame();

      }

    });

    socket.on('meme submission', function(sub) {

      if(playrRef.hasOwnProperty(sub.user)){
        // Count submission

        sub.round = roundSubs;
        roundSubs++;
        io.emit('generate card', sub);

        if(roundSubs === 4){
          // All four things submitted
          io.emit('judgment round')
        }
      }

    });

    socket.on('judge hovering', function(id) {
      socket.broadcast.emit('judge looking', id)
    });

    socket.on('decision', function(chosen) {

      // Example
      // winner = {
      //          playerID: Gjeo-BCRYUzLDVGIAAAF,  // Socket ID
      //          cardId: "card-1"                 // id = "card-1"
      //        }

      var winner = playrRef[chosen.playerID];
      io.emit('announce winner', {
        name: winner.user_name,
        card_id: chosen.cardId
      });

    })

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
        Sequelize.fn('RAND')
      ]
    }).then(function(meme){

      round = {
        meme: meme,
        judgeID: players[judgeInd].id
      };

      actJudge = players[judgeInd];
      judgeInd >= players.length - 1 ? judgeInd = 0 : judgeInd++;
      io.emit('start round', round);

      countdown = 30;

      setInterval(function() {
        if(countdown < 1){
          io.emit('round end');
          clearInterval(this);
        }

        io.emit('timer', {countdown: countdown});
        countdown--;
      }, 1000)

    });
  }



};