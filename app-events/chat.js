// Chat message implementation here.
module.exports = function(socket, db){
    socket.on('chat message', function(msg){

      db.User.findOne({
        where: {
          user_name: msg.name
        }
      }).then(function(user) {
        db.Message.create({
          message: msg.text,
          user_name: msg.name,
          UserId: user.id
        });
      });

      io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
      console.log('User disconnected, BOO!');
    });

};