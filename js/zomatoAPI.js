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
    var results = response;
  });
});
