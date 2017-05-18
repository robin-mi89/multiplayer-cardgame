/**
 * Created by mikhailmetrikin on 5/17/17.
 */
var randomMemeImage = function() {
  $.get("/memes/one", function(data) {

    $('.topic-image').attr({
      src: data.url,
      id: data.id
    });
  });
};
randomMemeImage();