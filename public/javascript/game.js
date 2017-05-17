$(document).ready(function() {

  var socket = io();
  var self = {};

  $.get('/api/user', function(user){

    self = user;

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

    socket.on('chat message', function(message) {

      var msg = "<p class='chat-p'>" + message.name + ': ' + message.text + "</p>";
      var $chatDsp = $(".chat-display");

      $chatDsp[0].scrollTop = $chatDsp[0].scrollHeight;
      $chatDsp.append(msg);
      $chatDsp.animate({
        scrollTop: $chatDsp[0].scrollHeight
      }, "slow");

    });

  });

  socket.on('start round', function(meme) {
    // Change MEME to the one emitted...
    $('.topic-image').attr("src", meme.url);
  });


  var randomMemeImage = function() {
    $.get("/memes/one", function(data) {

      $('.topic-image').attr("src", data.url);
    });
  };
  randomMemeImage();

});
