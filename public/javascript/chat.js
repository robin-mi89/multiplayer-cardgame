$(function () {
  var socket = io();

  $('#message-submit').on('click', function(e) {
    e.preventDefault();
    var messageInput = $('#message-input').val().trim();

    if(messageInput){
      console.log(messageInput);

      $('#message-input').val('')
    }

  });

  // $('#chat-box').submit(function(){
  //   console.log("Enter pressed");
  //   socket.emit('chat message', $('#m').val());
  //   $('#m').val('');
  //   return false;
  // });

});