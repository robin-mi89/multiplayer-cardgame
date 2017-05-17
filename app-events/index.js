module.exports = function(io, db) {

  var players = [];

  io.on('connection', function(socket){
    require('./chat')(socket, db, io);

    console.log("User connected YAY!");

    socket.on('player join', function(user) {

      console.log('Player connected' + String(user));
      players.push(user);
      console.log("Current players are", players);

    });

  });

};