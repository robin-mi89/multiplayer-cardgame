Sequelize = require('sequelize');

module.exports = function(io, db) {

  var players = [],
    judgeInd = 0,
    countdown = 30,
    round = {},
    pTotal = 4,
    playrRef = {},
    roundSubs = 0,
    actJudge = undefined;

    var running = false;
    var playerReady = 0;
    var roundInterval;

  io.on('connection', function(socket) {
    require('./chat')(socket, db, io);

    socket.on('player join', function(user) {

      user.id = socket.id;
      user.socket = socket;

      if (players.length < pTotal) {
        players.push(user);

        var active = players.map(function(each, i) {
          return {
            uid: each.id,
            name: each.user_name,
            photo: each.photo,
            score: 0,
            order: i
          };
        });

        io.emit('player added', active);
      }

      user.socket.emit("userID", {
        uid: user.id,
        order: players.length
      });

      // When 4 players login Start game
      if (players.length >= 4) {

        // Create object reference for players by their Socket.id
        playrRef = players.reduce(function(map, user) {
          map[user.id] = user;
          return map;
        }, {});
        StartGame();

      }

    });

    socket.on('meme submission', function(sub) {

      if (playrRef.hasOwnProperty(sub.user)) {
        // Count submission

        sub.round = roundSubs;
        roundSubs++;
        io.emit('generate card', sub);

        if (roundSubs === 4) {
          // All four things submitted
          clearInterval(roundInterval);
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

    });

    socket.on('player ready', function() {
      playerReady++;

      if(playerReady === 4 && running === false){
        running = true;
        playerReady = 0;
        countdown = 30;

        roundInterval = function() {
          if (countdown < 1) {
            io.emit('round end');
            clearInterval(this);
          }

          clearInterval(roundInterval);

          io.emit('timer', {
            countdown: countdown
          });
          countdown--;
        };
        setInterval(roundInterval, 1000)
      }

    });

    socket.on('next round', function() {
      running = false;
      StartGame();
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


  function StartGame() {

    db.Meme.find({
      order: [
        Sequelize.fn('RAND')
      ]
    }).then(function(meme) {

      round = {
        meme: meme,
        judgeID: players[judgeInd].id
      };

      actJudge = players[judgeInd];
      judgeInd >= players.length - 1 ? judgeInd = 0 : judgeInd++;
      io.emit('start round', round);

    });
  }



};
