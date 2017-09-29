var movieApp = {};

movieApp.apiKey = 'ca6ea09713defa345edd21995ca6f8f8';

movieApp.getMovies = function(year){

	$.ajax({
		url: `https://api.themoviedb.org/3/discover/movie?`,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			api_key: movieApp.apiKey,
			primary_release_year: year,
			certification_country: 'US',
			language: "en-US",
			include_adult: false,
			certification: 'R',
			page: 1
		}
	}).then(function(res){
		var moviesOutput = res.results;
		console.log(moviesOutput);
		// this only sends the DATA of the moviesOutput variable to displayMovies we use an arbitrary var 'item' in this case to add a new name to the data so we can loop over it using the forEach method
		movieApp.displayMovies(moviesOutput);


	})
}

movieApp.browserStuff = function(){
	$('.fader').addClass('animated fadeInRight');
	$('i').addClass('animated infinite bounce');
	$('a').smoothScroll({
			offset:0,
			speed: 400
		});



	$(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
       $('.prelude h3').addClass('animated fadeInLeft');
    }




});
}



movieApp.displayMovies = function(item){
	console.log(item);
// the someObject is just an arbitrary var that loops over the objects in 'item'.
	$('.movieInfo').empty();
	item.forEach(function(someObject){

		// var titleEl = $('<h2>').text(someObject.original_title);
		var posters = $(`<img>`).attr(`src`, `https://image.tmdb.org/t/p/w300${someObject.poster_path}`);
		var synopsis = $('<p>').text(someObject.overview);
		var synopsisContainer = $('<div>').addClass('synopsisContainer').append(synopsis);
		var movieContainer = $('<div>').addClass('flickity-cell').append(posters, synopsisContainer)
		$('.movieInfo').append(movieContainer);

	});

}


movieApp.event = function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		$('html, body').animate({
	        scrollTop: $('#dynamicInputs').offset().top
	      }, 1000);
		var ageInput = Number($('select').val());
		var birthYear = Number($('input').val());
		// console.log(ageInput);
		var userInput = (birthYear + ageInput);
		if (birthYear > 2000){
			swal({
			  title: "You're too young!",
			  imageUrl: "assets/fritzthecat.jpg",
			  imageSize: "400x400"
			});
		}
		else if (birthYear <= 1965) {
			swal({
				type: "info",
				title: `The MPAA R rating was not in effect when you were ${ageInput}`


			})
		}
		else {
			movieApp.getMovies(userInput);
		}
	});
	// on change event listener on the age om change will first check to see if there are 4 digits in the input and if there are then it makes the request and goes and gets the data.
}



movieApp.init = function(){
	movieApp.getMovies();
	movieApp.event();
	movieApp.browserStuff();

}




$(function(){
	movieApp.init();

});
