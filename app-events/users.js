module.exports = function(io, db){
  io.on('connection', function(socket){

    var players = [];

    socket.on('player_join', function(user) {

      players.push(user);
      console.log("Current players are", players);

    })

    // User connect event logic here

    // socket.on('chat message', function(msg){
    //   io.emit('chat message', msg);
    // });
    //
    // socket.on('disconnect', function(){
    //   console.log('user disconnected');
    // });

  });
};