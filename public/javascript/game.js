$(document).ready(function() {

  var socket = io(),
      self = {};

  $.get('/api/user', function(user){

    self = user;

    // TODO: DEBUGGING FOR NOW
    //{ user_name: 'Misha Metrikin',email: 'metrikin@gmail.com',wins: 0 }

    // TODO:(Victor \\ Misha \\ Robin) Arrange the "Scores " panel here..

    socket.emit('player join', self);

    socket.on("userID", function(userID) {
      self.id = userID;
      console.log('User is: ', self)
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

    if(self.id === round.judgeID){
      console.log("You are the judge now!")

      // Judge mode

    }else{

      // Players Mode

    }

  });

  socket.on('timer', function (data) {

    // TODO:(Victor Tsang) Improve UI of timer here..
    $('#time').html("Time Remaining: " + data.countdown);

  });

  $('#meme-submit').on('click', function() {

    var memeText = {
      top: $('top-text').val().trim() || '',
      bottom: $('bottom-text').val().trim() || ''
    };

    $.post('/meme/new', memeText ,function(err, resp){
      if(err) throw new Error('Could not post your meme', err);



    })

  })

});
