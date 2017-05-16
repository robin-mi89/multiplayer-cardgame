// Chat message implementation here.
module.exports = function(io){
  io.on('connection', function(socket){
    // User connect event logic here

    console.log('a user connected');

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

  });
};