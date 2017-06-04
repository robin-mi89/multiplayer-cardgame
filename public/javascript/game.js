$(document).ready(function () {
  var socket      = io(),
      self        = {},
      submitted   = false,
      roundSubs   = 0,
      judgeMode   = false,
      $topic      = $('.topic-image'),
      $choiceCard = $('.choice-card-img'),
      $bestMeme   = $('#best-meme'),
      $playersDiv = $('.players'),
      $playerCard = $('#player-cards'),
      $choiceCont = $('#choice-card-container'),
      $timer      = $('.timer');

  $.get('/api/user', function (user) {
    self = user;

    socket.emit('player join', self);

    socket.on('userID', function (user) {
      self.id = user.uid;
      self.room = user.room;
    });

    $('#message-submit').on('click', function (e) {
      e.preventDefault();

      var $messageInput = $('#message-input');
      var text = $messageInput.val().trim();

      if (text !== '') {
        var message = {
          name: self.user_name,
          photo: self.photo,
          text: text
        };
        socket.emit('chat message', message);
        $messageInput.val('');
      }
    });

    socket.on('chat message', function (message) {
      var msg = "<p class='chat-p'><img class='chat-thumbnail' src='" + message.photo + "'>" + ': ' + message.text + '</p>';
      var $chatDsp = $('.chat-display');

      $chatDsp[0].scrollTop = $chatDsp[0].scrollHeight;
      $chatDsp.append(msg);
      $chatDsp.animate({
        scrollTop: $chatDsp[0].scrollHeight
      }, 'slow');
    });
  });

  socket.on('start round', function (round) {
    resetRound();

    submitted = false;
    roundSubs = 0;

    $topic.attr({
      'src': round.meme.url,
      'id': round.meme.id,
      'data-external': round.meme.imgFlipID
    }).load(function () {
      if (self.id === round.judgeID) {
        // Judge mode
        judgeMode = true;
        $topic.addClass('player-judge');
      } else {
        // Players Mode
        judgeMode = false;
        $topic.removeClass('player-judge');
        $choiceCard.off('click');
      }
      socket.emit('player ready', self.room);
    });
  });

  socket.on('judgment round', function () {
    if (judgeMode) {
      $choiceCard.on('click', function () {
        socket.emit('decision', {
          playerID: $(this).attr('data-id'),
          cardId: $(this).attr('id'),
          room: self.room
        });
        $(this).closest('.choice-card')
            .removeClass('judge-hover')
            .mouseleave();
      });
    }
  });

  socket.on('announce winner', function (winner) {
    // Ex. winner = {name: "Misha Metrikin, card_id: "card-1"}
    var card = $('#' + winner.card_id);

    card.mouseleave();

    if (self.uid === winner.uid) {
      self.score++;
    }
    $('.player-score').each(function () {
      if ($(this).attr('id') === 'score' + winner.uid) {
        var newScore = parseInt($(this).text()) + 1;
        $(this).text(newScore);
      }
    });

    // Set stuff in the winner modal
    $('#winner-modal-title').text('Winner: ' + winner.name);
    $('#winner-modal-meme').attr('src', card.attr('src'));
    $bestMeme.modal('show');

    setTimeout(function () {
      $bestMeme.modal('hide').load(function () {

      });

      if (judgeMode) {
        socket.emit('next round', self.room);
      }
    }, 3000);
  });

  socket.on('timer', function (data) {
    // TODO:(Victor Tsang) Improve UI of timer here..
    $('.progress-bar').css('width', (data.ct * 3.33) + '%');
  });

  // TODO: (Victor Tsang) Implement score using this event
  // add player-just class to player div to highlight judge

  socket.on('player added', function (players) {
    $playersDiv.empty();
    players.forEach(function (item, index) {
      $playersDiv.append("<div class='player'><img class='player-image' src='" + item.photo + "'/><span class='player-score' id='score" + item.uid + "'>" + item.score + '</span></div>');
    });
  });

  $choiceCard.mouseenter(function () {
    if (judgeMode) {
      socket.emit('judge hovering', {id: $(this).attr('id'), room: self.room});
    }
  });

  $choiceCard.mouseleave(function () {
    if (judgeMode) {
      socket.emit('judge unhovering', {id: $(this).attr('id'), room: self.room});
    }
  });

  socket.on('judge looking', function (imgId) {
    var tag = '#' + imgId;
    $(tag).closest('.choice-card').addClass('judge-hover');
  });

  socket.on('judge unlooking', function (imgId) {
    var tag = '#' + imgId;
    $(tag).closest('.choice-card').removeClass('judge-hover');
  });

  $('#meme-submit').on('click', function () {
    var $topText = $('#top-text'),
      $bottomText = $('#bottom-text');

    var memeText = {
      memeId: $topic.attr('data-external'),
      top: $topText.val().trim() || '',
      bottom: $bottomText.val().trim() || ''
    };

    $playerCard.hide();
    $choiceCont.show();
    $topText.val('');
    $bottomText.val('');

    // Generates a meme with get request to route
    $.post('/memes/create', memeText, function (resp) {
      self.meme = resp;
      SendSubmission(self);
    });
  });

  socket.on('round end', function () {
    if (!submitted) {
      SendSubmission(self);
    }
    $timer.hide();
    $playerCard.hide();
    $choiceCont.show();
  });

  socket.on('generate card', function (sub) {
    generateCard(sub);
  });

  function generateCard (card) {
    var choiceCards = document.getElementsByClassName('choice-card-img');

    $(choiceCards[card.round]).attr({
      'src': card.meme,
      'data-id': card.user
    }).load(function () {
      $(this).closest('.choice-card').show();
    });
  }

  function SendSubmission (user) {
    submission = {
      user: user.id,
      room: user.room,
      meme: user.meme ||
        'https://img.memesuper.com/8442baface38e99f6bfa4d828f13e05f_motivation-level-lazy-puppy-lazy-meme_428-247.jpeg'
    };
    socket.emit('meme submission', submission);
    submitted = true;
  }

  function resetRound () {
    self.meme = null;
    $('.choice-card').hide();
    $timer.show();
    $playerCard.show();
    $choiceCard.attr('src', '/image/waiting.jpg');
    $choiceCont.hide();
  }
});
