$(document).ready(function() {
  var apiKey = "5fe006d31daf49c4fb1bc8bfdfd5d5d5";

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
