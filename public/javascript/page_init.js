/**
 * Created by mikhailmetrikin on 5/17/17.
 */
// var randomMemeImage = function() {
//   $.get("/memes/one", function(data) {
//
//     $('.topic-image').attr({
//       "src": data.url,
//       "id": data.id,
//       "data-external": data.imgFlipID
//     });
//   });
// };
// randomMemeImage();

// TODO:(Mikhail Metrikin) : Will use this later
// // host selects a meme card
// $(".choice-card").click(function() {
//
//   //need to check if host is the one that clicked the choice-card
//   // need to wrap this in a then function
//   $('#best-meme').modal('show');
//
//   setTimeout(function() {
//     $('#best-meme').modal('hide');
//     //start next round here
//   }, 3000);
//
// });


// Host selects a meme card
$("#meme-submit").click(function() {
  $(".timer").hide();
  $("#player-cards").hide();

  $("#top-text").val("");
  $("#bottom-text").val("");
  //need a transition function to wait for all user to submit or time-out
  $("#choice-card-container").show();


});
