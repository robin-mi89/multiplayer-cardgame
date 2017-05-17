$(document).ready(function() {
  console.log(user._id);
  console.log(user.local.email);

  var socket = io();

  $('#message-submit').on('click', function(e) {
    e.preventDefault();
    var messageInput = $('#message-input').val().trim();

    if (messageInput !== '') {
      console.log(messageInput);

      socket.emit('chat message', messageInput);
      $('#message-input').val('')
    }

  });

  socket.on('chat message', function(messsage) {

    // TODO: MESSSAGES WILL HAVE USER INFO APPENDED
    var msg = "<p class='chat-p'>" + messsage + "</p>";
    var $chatDsp = $(".chat-display");

    $chatDsp[0].scrollTop = $chatDsp[0].scrollHeight;
    $chatDsp.append(msg);
    $chatDsp.animate({
      scrollTop: $chatDsp[0].scrollHeight
    }, "slow");

  });
  var randomMemeImage = function() {
    $.get("/memes/one", function(data) {

      $('.topic-image').attr("src", data[0].url);
    });
  };
  randomMemeImage();
});
