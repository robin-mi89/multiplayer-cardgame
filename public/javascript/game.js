$(document).ready(function() {

  var socket    = io(),
      self      = {},
      submitted = false,
      roundSubs = 0;

  $.get('/api/user', function(user) {
    self = user;

    socket.emit('player join', self);

    socket.on("userID", function(user) {
      self.id = user.uid;

    });

    $('#message-submit').on('click', function(e) {
      e.preventDefault();

      var messageInput = $('#message-input').val().trim();

      if (messageInput !== '') {
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
    submitted = false;
    roundSubs = 0;

    $('.topic-image').attr({
      "src": round.meme.url,
      "id": round.meme.id,
      "data-external": round.meme.imgFlipID
    });

    if (self.id === round.judgeID) {

      // Judge mode

    } else {

      // Players Mode

    }

  });

  socket.on('judgment round', function() {
    $(".timer").hide();
    $("#player-cards").hide();
    $("#choice-card-container").show();


  });

  socket.on('timer', function(data) {
    // TODO:(Victor Tsang) Improve UI of timer here..
    $('#time').html("Time Remaining: " + data.countdown);

  });

  // TODO: (Victor Tsang) Implement score using this event
  socket.on('player added', function(players) {
    $(".players").empty();
    players.forEach(function(item, index) {
      $(".players").append("<h6>" + item.name + "</h6>");
    });
  });

  $('#meme-submit').on('click', function() {

    var memeText = {
      memeId: $('.topic-image').attr("data-external"),
      top: $('#top-text').val().trim() || '',
      bottom: $('#bottom-text').val().trim() || ''
    };

    // Generates a meme with get request to route
    $.post('/memes/create', memeText, function(resp) {
      self.meme = resp;
      SendSubmission(self);
    })

  });
  
  socket.on('round end', function() {
    if(!submitted){
      SendSubmission(self);
    }
    self.meme = undefined;

  });

  socket.on('generate card', function(sub) {
    generateCard(sub);
  });

  function generateCard(card) {
    var choiceCards = document.getElementsByClassName("choice-card-img");

    $(choiceCards[card.round]).attr({
      "src": card.meme,
      "data-player": card.id
    }).load(function() {
      $(this).closest('.choice-card').show();
    })

  }

  function SendSubmission(user) {
    submission = {
      user: user.id,
      meme: user.meme ||
      'https://img.memesuper.com/8442baface38e99f6bfa4d828f13e05f_motivation-level-lazy-puppy-lazy-meme_428-247.jpeg'
      //TODO: What should be the default if nothing submitted?
    };
    socket.emit('meme submission', submission);
    submitted = true;
  }

});
