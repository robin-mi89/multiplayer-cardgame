$(document).ready(function() {
  var socket = io();

  $('#message-submit').on('click', function(e) {
    e.preventDefault();
    var messageInput = $('#message-input').val().trim();

    if (messageInput !== '') {
      console.log(messageInput);

      socket.emit('chat message', messageInput);
      $('#message-input').val('')
    }
    var msg = "<p class='chat-p'>" + messageInput + "</p>";
    $(".chat-display").append(msg);

  });

  // $('#chat-box').submit(function(){
  //   console.log("Enter pressed");
  //   socket.emit('chat message', $('#m').val());
  //   $('#m').val('');
  //   return false;
  // });

});
