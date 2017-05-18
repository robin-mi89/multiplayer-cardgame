$(document).ready(function() {

  var socket = io(),
    self = {};

  $.get('/api/user', function(user) {
    self = user;

    socket.emit('player join', self);

    socket.on("userID", function(user) {
      self.id = user.uid;

      console.log(user.order);

    });

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

  socket.on('start round', function(round) {

    // Change MEME to the one emitted...


    $('.topic-image').attr({
      src: round.meme.url,
      id: round.meme.id
    });

    if (self.id === round.judgeID) {
      console.log("You are the judge now!")

      // Judge mode

    } else {

      // Players Mode

    }

  });

  socket.on('timer', function(data) {

    // TODO:(Victor Tsang) Improve UI of timer here..
    $('#time').html("Time Remaining: " + data.countdown);

  });

  // TODO: (Victor Tsang) Implement score using this event
  socket.on('player added', function(players) {
    console.log('Players array is at: ', players);
    $(".players").empty();
    players.forEach(function(item, index) {
      $(".players").append("<h6>" + item.name + "</h6>");
    });
  });

  $('#meme-submit').on('click', function() {

    var memeText = {
      top: $('#top-text').val().trim() || '',
      bottom: $('#bottom-text').val().trim() || ''
    };

    $.post('/memes/new', memeText, function(err, resp) {
      if (err) throw new Error('Could not post your meme', err);



    })

  })

});
