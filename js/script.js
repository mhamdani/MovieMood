_this.movieReload = function () {
    var loadMovie = function loadMovie() {
        $.ajax({ url: _this.state.url }).done(function (response) {
            var genres = [];

            $.each(response.genres, function (key, array) {
                genres.push(" | " + array.name);
            });

            _this.setState({
                title: response.original_title,
                description: response.overview,
                rating: response.vote_average,
                votes: response.vote_count,
                releaseDate: response.release_date,
                poster: "https://image.tmdb.org/t/p/w342/" + response.poster_path,
                genres: genres
            });
        }).fail(function () {
            loadMovie();
        });
    };
    loadMovie();
};

_this.state = {
    title: "",
    poster: "",
    url: "https://api.themoviedb.org/3/movie/" + "555" + "?api_key=37c1cec5856970e41782ef3828236ba2",
    trailerUrl: "",
    description: "",
    rating: "",
    votes: "",
    releaseDate: "",
    color: "black",
    genres: "",
    display: "none",
    displayGenre: "none",
    randomNumber: "",
    loadGenre: "",
    border: ""
};
return _this;
}

console.log(response.overview)

$(document).ready(function() {

$(".poster").append(this.response.overview)
}



// _createClass(MovieApp, [{
// key: 'changeLink',
// value: function changeLink(number) {
//     this.setState({
//         url: "https://api.themoviedb.org/3/movie/" + number + "?api_key=37c1cec5856970e41782ef3828236ba2"
//     });
// }
// }, {
// key: 'componentDidMount',
// value: function componentDidMount() {
//     this.getId();
// }
// }, {
// key: 'handleClickTrailer',
// value: function handleClickTrailer() {
//     event.preventDefault();
//     document.querySelector("iframe").src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer";
//     this.setState({ display: "block" });
// }
// }, {
// key: 'handleClickClose',
// value: function handleClickClose() {
//     event.preventDefault();
//     document.getElementById('VideoPlayer').src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer";
//     this.setState({ display: "none", displayGenre: "none" });
// }
// }, {
// key: 'handleClickGenre',
// value: function handleClickGenre() {
//     event.preventDefault();
//     document.getElementById('VideoPlayer').src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer";
//     this.setState({ displayGenre: "block" });
// }
// }, {
// key: 'handleClickRoll',
// value: function handleClickRoll() {
//     event.preventDefault();
//     $(".container").ready(function () {
//         $(".title").addClass("text-focus-in");
//         $(".poster").removeClass("shadow-drop-center");
//
//         setTimeout(function () {
//             $(".poster").addClass("shadow-drop-center");
//             $(".title").removeClass("text-focus-in");
//         }, 300);
//     });
//     this.getId();
//     this.setState({
//         randomNumber: Math.floor(Math.random() * 15 + 1)
//     });
//
//     console.log("page: " + this.state.randomNumber);
// }
// }, {
// key: 'BtnClick',
// value: function BtnClick(event) {
//     $(".genreBtn").on("click", function () {
//         $(".active").removeClass("active");
//         $(this).addClass("active");
//     });
//     this.setState({ displayGenre: "none" });
//     this.getId();
// }
// }, {
// key: 'render',
// value: function render() {
//     var _this20 = this,
//         _ref;
//
//     if (this.state.rating < 5.5) {
//         this.state.color = "red";
//     } else if (this.state.rating > 7) {
//         this.state.color = "#009688";
//     } else {
//         this.state.color = "orange";
//     }
//     return _react2.default.createElement(
//         'div',
//         { className: 'mainContainer' },
//         _react2.default.createElement(
//             MediaQuery,
//             { minDeviceWidth: 768 },
//             _react2.default.createElement(
//                 'div',
//                 { className: 'container floatLeft' },
//                 _react2.default.createElement(
//                     'button',
//                     { onClick: function onClick() {
//                             _this20.BtnHorrorClick();
//                             _this20.BtnClick();
//                         }, className: 'genreBtn horrorBtn' },
//                     _react2.default.createElement(
//                         'span',
//                         null,
//                         'SCARE ME'
//                     )
//                 ),
//
//         _react2.default.createElement(
//             MediaQuery,
//             { maxDeviceWidth: 767 },
//             _react2.default.createElement(
//                 'div',
//                 { className: 'container', style: {
//                         display: this.state.displayGenre,
//                         zIndex: "999",
//                         position: "absolute",
//                         top: "0",
//                         right: "0",
//                         bottom: "0",
//                         left: "0",
//                         width: "100%",
//                         height: "90%",
//                         backgroundColor: "black",
//                         padding: "20px",
//                         marginLeft: "0px"
//                     } },
//
//             _react2.default.createElement(
//                 'div',
//                 { style: {
//                         width: "100%",
//                         height: "1700px",
//                         margin: "0",
//                         padding: "0",
//                         backgroundColor: "rgba(0, 0, 0, 0.9)",
//                         display: "flex",
//                         alignItems: "center",
//                         flexDirection: "column",
//                         position: "relative"
//                     } },
//                 _react2.default.createElement(
//                     'h1',
//                     { style: {
//                             fontSize: "3.2rem",
//                             borderBottom: "5px solid rgb(176, 0, 53)",
//                             marginTop: "0",
//                             height: "280px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             textAlign: "center"
//                         }, className: 'title' },
//                     this.state.title
//                 ),
//                 _react2.default.createElement('div',
//                 { style: {
//                         backgroundImage: 'url(' + this.state.poster + ')',
//                         width: '400px',
//                         height: '1200px',
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         marginTop: "20px"
//                     } }),
//                 _react2.default.createElement(
//                     'div',
//                     { className: 'description-container' },
//                     this.state.description
//                 ),
//
//                 _react2.default.createElement(
//                     'h4',
//                     { style: {
//                             fontSize: "3rem",
//                             height: "50px",
//                             margin: "15px"
//                         } },
//                     'Average rating:\xA0',
//                     _react2.default.createElement(
//                         'span',
//                         { style: {
//                                 color: this.state.color
//                             } },
//                         this.state.rating,
//                         '/10\xA0'
//                     ),
//                     '(',
//                     this.state.votes,
//                     '\xA0votes)'
//                 ),
//                 _react2.default.createElement(
//                     'div',
//                     { style: {
//                             display: this.state.display,
//                             zIndex: "998",
//                             position: "absolute",
//                             top: "0",
//                             right: "0",
//                             bottom: "0",
//                             left: "0"
//                         } },
//                     _react2.default.createElement('iframe', { id: 'VideoPlayer', width: '970', height: '1450', src: '', frameBorder: '0', allowFullScreen: 'true' }),
//                     _react2.default.createElement('div', { style: {
//                             width: "100%",
//                             height: "250px",
//                             marginTop: "10px",
//                             backgroundImage: 'url(images/closeButton.jpg)',
//                             backgroundSize: "cover",
//                             backgroundRepeat: "no-repeat",
//                             backgroundPosition: "center"
//                         }, onClick: this.handleClickClose.bind(this) })
//                 ),
//                 _react2.default.createElement(
//                     'h4',
//                     { style: {
//                             fontSize: "2.5rem",
//                             marginTop: "20px",
//                             marginBottom: "50px"
//                         }, className: 'releaseDate' },
//                     'Release date: ',
//                     this.state.releaseDate
//                 ),
//                 _react2.default.createElement('button', { style: {
//                         height: "300px",
//                         width: "900px",
//                         marginLeft: "20px",
//                         marginBottom: "20px",
//                         backgroundImage: 'url(images/choosegenre.png)',
//                         backgroundSize: "cover",
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "center"
//                     }, onClick: this.handleClickGenre.bind(this) }),
//                 _react2.default.createElement(
//                     'div',
//                     { style: {
//                             height: "200px"
//                         } },
//                     _react2.default.createElement('button', { style: {
//                             fontSize: "4rem",
//                             height: "200px",
//                             width: "350px",
//                             float: "left",
//                             marginLeft: "20px",
//                             backgroundImage: 'url(images/watchtrailer.png)',
//                             backgroundSize: "cover",
//                             backgroundRepeat: "no-repeat",
//                             backgroundPosition: "center"
//                         }, onClick: this.handleClickTrailer.bind(this) }),
//                         //
//
//                         //
//
//                     _react2.default.createElement('button', { style: {
//                             fontSize: "4rem",
//                             height: "200px",
//                             width: "530px",
//                             float: "left",
//                             marginLeft: "20px",
//                             backgroundImage: 'url(images/next-2.png)',
//                             backgroundSize: "cover",
//                             backgroundRepeat: "no-repeat"
//                         }, onClick: this.handleClickRoll.bind(this) })
//                 )
//             )
//         ),
//         _react2.default.createElement(
//             MediaQuery,
//             { minDeviceWidth: 768 },
//             _react2.default.createElement(
//                 'div',
//                 { className: 'containerCenter floatLeft' },
//                 _react2.default.createElement(
//                     'h1',
//                     { className: 'title' },
//                     this.state.title
//                 ),
//                 _react2.default.createElement('div', { className: 'flickity-cell poster', style: {
//                         backgroundImage: 'url(' + this.state.poster + ')'
//                     } }),
//                 _react2.default.createElement(
//                     'h4',
//                     { className: 'rating' },
//                     'Rating:\xA0',
//                     _react2.default.createElement(
//                         'span',
//                         { style: {
//                                 color: this.state.color
//                             } },
//                         this.state.rating,
//                         '/10\xA0'
//                     ),
//                     '(',
//                     'average votes)'
//                 ),
//                 _react2.default.createElement(
//                     'div',
//                     { className: 'youtube', style: {
//                             display: this.state.display
//                         } },
//                     _react2.default.createElement('iframe', { id: 'VideoPlayer', width: '700', height: '350', src: '', frameBorder: '0', allowFullScreen: 'true' }),
//                     _react2.default.createElement('div', { onClick: this.handleClickClose.bind(this), className: 'close' })
//                 ),
//                 _react2.default.createElement(
//                     'h4',
//                     { className: 'releaseDate' },
//                     'Release date: ',
//                     this.state.releaseDate
//                 ),
//                 _react2.default.createElement(
//                     'button',
//                     { onClick: this.handleClickTrailer.bind(this), className: 'trailerBtn' },
//                     'Watch Trailer'
//                 ),
//                 _react2.default.createElement(
//                     'div',
//                     { style: {
//                             flexDirection: "row"
//                         } },
//                     _react2.default.createElement('img', { className: 'nextButton', src: 'images/next.png', onClick: this.handleClickRoll.bind(this) })
//                 )
//             )
//         ),
//     );
// }
// }]);
//
// return MovieApp;
// }(_react2.default.Component);
