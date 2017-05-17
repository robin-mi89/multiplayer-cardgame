module.exports = function(socket, db){

  var players = [];

  console.log("User connected YAY!");

  socket.on('player join', function(user) {

    console.log('Player connected' + String(user));
    players.push(user);
    console.log("Current players are", players);

  });

    // User connect event logic here

    // socket.on('chat message', function(msg){
    //   io.emit('chat message', msg);
    // });
    //
    // socket.on('disconnect', function(){
    //   console.log('user disconnected');
    // });

};