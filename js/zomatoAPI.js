$(document).ready(function() {
  apiKey = "31f5f6ce36102d71";
  queryURL =
    "https://api.eatstreet.com/publicapi/v1/restaurant/search-test?method=both&street-address=316+W.+Washington+Ave.+Madison,+WI";

  // queryURL += $.param({
  //   s: "happy",
  //   r: "json"
  // });
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "X-Access-Token": "31f5f6ce36102d71"
    }
  }).done(function(response) {
    console.log(response);
    var results = response;
  });
});
