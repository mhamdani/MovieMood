$(document).ready(function() {
  var apiKey = "5fe006d31daf49c4fb1bc8bfdfd5d5d5";

  //Complete location for submit location
  $("#place-to-eat").geocomplete();

  //Press enter button to submit location
  $("html").keypress(function(event) {
    if (event.keyCode == 13 || event.which == 13) {
      event.preventDefault();
      console.log($("#place-to-eat").val());
    }
  });
  //Retrieve value from text inbox & convert to button
  $("#find-place").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    //Give button an attribute to recall when searching
    console.log($("#place-to-eat").val());
  });

  var queryURL = "https://developers.zomato.com/api/v2.1/search?";

  queryURL += $.param({
    entity_id: "306", //San Francisco
    entity_type: "city"
  });
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": apiKey
    }
  }).done(function(response) {
    console.log(response);

    for (var i = 0; i < 5; i++) {
      var dining = $("<div>");
      console.log(response.restaurants[i].restaurant.name);
      var nameRest = response.restaurants[i].restaurant.name;
      dining.html("<h4>" + nameRest + "</h4>");
      $("#dinner-suggestions").append(dining);
    }
  });
});
