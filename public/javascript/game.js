$(document).ready(function() {

  var socket = io();
  var self = {};

  $.get('/api/user', function(user){
    self = user;

    // TODO: DEBUGGING FOR NOW
    //{ user_name: 'Misha Metrikin',email: 'metrikin@gmail.com',wins: 0 }
    console.log("Yep! MAde it here");
    socket.emit('player join', self);

    $('#message-submit').on('click', function(e) {
      e.preventDefault();
      var messageInput = $('#message-input').val().trim();

      if (messageInput !== '') {
        console.log(messageInput);

        var message = {
          name: self.user_name,
          text: messageInput
        };

        socket.emit('chat message', message);
        $('#message-input').val('')
      }

    });

    socket.on('chat message', function(messsage) {

      var msg = "<p class='chat-p'>" + messsage.name + ': ' + messsage.text + "</p>";
      var $chatDsp = $(".chat-display");

      $chatDsp[0].scrollTop = $chatDsp[0].scrollHeight;
      $chatDsp.append(msg);
      $chatDsp.animate({
        scrollTop: $chatDsp[0].scrollHeight
      }, "slow");

    });

  });


  var randomMemeImage = function() {
    $.get("/memes/one", function(data) {

      $('.topic-image').attr("src", data[0].url);
    });
  };
  randomMemeImage();
});
