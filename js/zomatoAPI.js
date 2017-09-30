$(document).ready(function() {
  console.log("hello");
  var apiKey = "5fe006d31daf49c4fb1bc8bfdfd5d5d5";
  var cityName = "";
  //Complete location for submit location
  $("#place-to-eat").geocomplete();

  //Retrieve value from text inbox & convert to button
  // Press enter button to submit location
  $("html").keypress(function(event) {
    if (event.keyCode == 13 || event.which == 13) {
      event.preventDefault();
      // console.log($("#place-to-eat").val());
      cityName = $("#place-to-eat").val();
      console.log(cityName);
      var queryURL = "https://developers.zomato.com/api/v2.1/cities?";

      queryURL += $.param({
        q: cityName
      });

      $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
          "user-key": apiKey
        }
      }).done(function(response) {
        console.log(response);
        console.log(response.location_suggestions[0].id);
        cityNum = response.location_suggestions[0].id;

        //Calling another ajax request
        var queryURLlocate =
          "https://developers.zomato.com/api/v2.1/location_details?";

        //Create URL of locations based on city
        queryURLlocate += $.param({
          entity_id: cityNum,
          entity_type: "city"
        });
        $.ajax({
          url: queryURLlocate,
          method: "GET",
          headers: {
            "user-key": apiKey
          }
        }).done(function(response) {
          console.log(response);
          $("#dinner-suggestions").empty();
          for (var i = 0; i < 5; i++) {
            var dining = $("<div>");
            console.log(response.best_rated_restaurant[i].restaurant.name);
            var nameRest = response.best_rated_restaurant[i].restaurant.name;
            dining.html("<h4>" + nameRest + "</h4>");

            $("#dinner-suggestions").append(dining);
          }
        });
      });
    }
  });
});
