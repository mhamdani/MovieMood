import React from 'react';
import ReactDOM from 'react-dom';
var MediaQuery = require('react-responsive');

document.addEventListener("DOMContentLoaded", function() {
    var getRandom = Math.floor((Math.random() * 996) + 11);

    class MovieApp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
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
        }

        changeLink(number) {
            this.setState({
                url: "https://api.themoviedb.org/3/movie/" + number + "?api_key=37c1cec5856970e41782ef3828236ba2"
            })
        }

        getId = () => {
            let randomPage = "https://api.themoviedb.org/3/discover/movie?api_key=37c1cec5856970e41782ef3828236ba2&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=" + this.state.randomNumber + "&with_genres=" + this.state.loadGenre;
            $.ajax({url: randomPage}).done((response) => {
                var ids = [];

                $.each(response.results, function(key, array) {
                    ids.push(array.id);
                })
                let rand = Math.floor(Math.random() * 16);
                this.changeLink(ids[rand]);

                this.movieReload();

            }).fail(function() {
                console.log("error getting id")
            })

        }

        movieReload = () => {
            let loadMovie = () => {
                $.ajax({url: this.state.url}).done((response) => {
                    var genres = [];

                    $.each(response.genres, function(key, array) {
                        genres.push((" ● ") + array.name);
                    })

                    this.setState({
                        title: response.original_title,
                        description: response.overview,
                        rating: response.vote_average,
                        votes: response.vote_count,
                        releaseDate: response.release_date,
                        poster: "https://image.tmdb.org/t/p/w342/" + response.poster_path,
                        genres: genres
                    });

                }).fail(function() {
                    loadMovie();
                })
            }
            loadMovie();
        }

        componentDidMount() {
            this.getId();
        };

        handleClickTrailer() {
            event.preventDefault();
            document.querySelector("iframe").src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer";
            this.setState({display: "block"});
        };

        handleClickClose() {
            event.preventDefault();
            document.getElementById('VideoPlayer').src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer"
            this.setState({display: "none", displayGenre: "none"});
        };

        handleClickGenre() {
            event.preventDefault();
            document.getElementById('VideoPlayer').src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer"
            this.setState({displayGenre: "block"});
        };

        handleClickRoll() {
            event.preventDefault();
            $(".container").ready(function() {
                $(".title").addClass("text-focus-in");
                $(".poster").removeClass("shadow-drop-center");

                setTimeout(function() {
                    $(".poster").addClass("shadow-drop-center");
                    $(".title").removeClass("text-focus-in");
                }, 300);
            })
            this.getId();
            this.setState({
                randomNumber: Math.floor((Math.random() * 15) + 1)
            });

            console.log("page: " + this.state.randomNumber)
        };

        BtnClick(event) {
            $(".genreBtn").on("click", function() {
                $(".active").removeClass("active");
                $(this).addClass("active");
            })
            this.setState({displayGenre: "none"});
            this.getId();
        }

        BtnHorrorClick() {
            this.setState({
                loadGenre: "27"
            }, () => this.getId())

        };
        BtnFantasyClick() {
            this.setState({
                loadGenre: "14"
            }, () => this.getId())

        };
        BtnComedyClick() {
            this.setState({
                loadGenre: "35"
            }, () => this.getId())

        };
        BtnDramaClick() {
            this.setState({
                loadGenre: "18"
            }, () => this.getId())

        };
        BtnActionClick() {
            this.setState({
                loadGenre: "28"
            }, () => this.getId())

        };
        BtnScienceFictionClick() {
            this.setState({
                loadGenre: "878"
            }, () => this.getId())

        };
        BtnAdventureClick() {
            this.setState({
                loadGenre: "12"
            }, () => this.getId())

        };
        BtnFamilyClick() {
            this.setState({
                loadGenre: "10751"
            }, () => this.getId())

        };
        BtnThrillerClick() {
            this.setState({
                loadGenre: "53"
            }, () => this.getId())

        };
        BtnMysteryClick() {
            this.setState({
                loadGenre: "9648"
            }, () => this.getId())

        };
        BtnCrimeClick() {
            this.setState({
                loadGenre: "80"
            }, () => this.getId())

        };
        BtnAnimationClick() {
            this.setState({
                loadGenre: "16"
            }, () => this.getId())

        };
        BtnMusicalClick() {
            this.setState({
                loadGenre: "10402"
            }, () => this.getId())

        };
        BtnRomanceClick() {
            this.setState({
                loadGenre: "10749"
            }, () => this.getId())

        };
        BtnHistoryClick() {
            this.setState({
                loadGenre: "36"
            }, () => this.getId())

        };
        BtnWarClick() {
            this.setState({
                loadGenre: "10752"
            }, () => this.getId())

        };
        BtnWesternClick() {
            this.setState({
                loadGenre: "37"
            }, () => this.getId())

        };
        BtnTvMovieClick() {
            this.setState({
                loadGenre: "10770"
            }, () => this.getId())

        };

        render() {

            if (this.state.rating < 5.5) {
                this.state.color = "red"
            } else if (this.state.rating > 7) {
                this.state.color = "green"
            } else {
                this.state.color = "orange"
            }
            return (

                <div className="mainContainer">
                    <MediaQuery minDeviceWidth={768}>
                        <div className="container floatLeft">
                            <button onClick={() => {
                                this.BtnHorrorClick();
                                this.BtnClick()
                            }} className="genreBtn horrorBtn">
                                <span>HORROR</span>
                            </button>
                            <button onClick={() => {
                                this.BtnFantasyClick();
                                this.BtnClick()
                            }} className="genreBtn fantasyBtn">
                                <span>FANTASY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnComedyClick();
                                this.BtnClick()
                            }} className="genreBtn comedyBtn">
                                <span>COMEDY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnDramaClick();
                                this.BtnClick()
                            }} className="genreBtn dramaBtn">
                                <span>DRAMA</span>
                            </button>
                            <button onClick={() => {
                                this.BtnActionClick();
                                this.BtnClick()
                            }} className="genreBtn actionBtn">
                                <span>ACTION</span>
                            </button>
                            <button onClick={() => {
                                this.BtnScienceFictionClick();
                                this.BtnClick()
                            }} className="genreBtn scienceFictionBtn">
                                <span>SCIENCE FICTION</span>
                            </button>
                            <button onClick={() => {
                                this.BtnAdventureClick();
                                this.BtnClick()
                            }} className="genreBtn adventureBtn">
                                <span>ADVENTURE</span>
                            </button>
                            <button onClick={() => {
                                this.BtnFamilyClick();
                                this.BtnClick()
                            }} className="genreBtn familyBtn">
                                <span>FAMILY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnThrillerClick();
                                this.BtnClick()
                            }} className="genreBtn thrillerBtn">
                                <span>THRILLER</span>
                            </button>
                        </div>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={768}>
                        <div className="containerCenter floatLeft">
                            <h1 className="title">
                                {this.state.title}
                            </h1>
                            <div className="poster" style={{
                                backgroundImage: 'url(' + this.state.poster + ')'
                            }}></div>
                            <p className="description">
                                {this.state.description}
                            </p>
                            <h4 className="genre">
                                Genre: {this.state.genres}
                            </h4>
                            <h4 className="rating">
                                Average rating:&nbsp;
                                <span style={{
                                    color: this.state.color
                                }}>{this.state.rating}/10&nbsp;
                                </span>
                                ({this.state.votes}
                                &nbsp;votes)
                            </h4>
                            <div className="youtube" style={{
                                display: this.state.display
                            }}>

                                <iframe id="VideoPlayer" width="700" height="350" src="" frameBorder="0" allowFullScreen="true"></iframe>
                                <div onClick={this.handleClickClose.bind(this)} className="close"></div>

                            </div>
                            <h4 className="releaseDate">
                                Release date: {this.state.releaseDate}
                            </h4>
                            <button onClick={this.handleClickTrailer.bind(this)} className="trailerBtn">WATCH TRAILER</button>
                            <div style={{
                                flexDirection: "row"
                            }}>
                                <img className="nextButton" src="images/next.png" onClick={this.handleClickRoll.bind(this)}></img>
                            </div>
                        </div>
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth={767}>
                        <div className="container" style={{
                            display: this.state.displayGenre,
                            zIndex: "999",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            bottom: "0",
                            left: "0",
                            width: "100%",
                            height: "90%",
                            backgroundColor: "black",
                            padding: "20px",
                            marginLeft: "0px"
                        }}>
                            <button onClick={() => {
                                this.BtnHorrorClick();
                                this.BtnClick()
                            }} className="genreBtnMobile horrorBtn">
                                <span>HORROR</span>
                            </button>
                            <button onClick={() => {
                                this.BtnFantasyClick();
                                this.BtnClick()
                            }} className="genreBtnMobile fantasyBtn">
                                <span>FANTASY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnComedyClick();
                                this.BtnClick()
                            }} className="genreBtnMobile comedyBtn">
                                <span>COMEDY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnDramaClick();
                                this.BtnClick()
                            }} className="genreBtnMobile dramaBtn">
                                <span>DRAMA</span>
                            </button>
                            <button onClick={() => {
                                this.BtnActionClick();
                                this.BtnClick()
                            }} className="genreBtnMobile actionBtn">
                                <span>ACTION</span>
                            </button>
                            <button onClick={() => {
                                this.BtnScienceFictionClick();
                                this.BtnClick()
                            }} className="genreBtnMobile scienceFictionBtn">
                                <span>SCIENCE FICTION</span>
                            </button>
                            <button onClick={() => {
                                this.BtnAdventureClick();
                                this.BtnClick()
                            }} className="genreBtnMobile adventureBtn">
                                <span>ADVENTURE</span>
                            </button>
                            <button onClick={() => {
                                this.BtnFamilyClick();
                                this.BtnClick()
                            }} className="genreBtnMobile familyBtn">
                                <span>FAMILY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnThrillerClick();
                                this.BtnClick()
                            }} className="genreBtnMobile thrillerBtn">
                                <span>THRILLER</span>
                            </button>
                            <button onClick={() => {
                                this.BtnMysteryClick();
                                this.BtnClick()
                            }} className="genreBtnMobile mysteryBtn">
                                <span>MYSTERY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnCrimeClick();
                                this.BtnClick()
                            }} className="genreBtnMobile crimeBtn">
                                <span>CRIME</span>
                            </button>
                            <button onClick={() => {
                                this.BtnAnimationClick();
                                this.BtnClick()
                            }} className="genreBtnMobile animationBtn">
                                <span>ANIMATION</span>
                            </button>
                            <button onClick={() => {
                                this.BtnMusicalClick();
                                this.BtnClick()
                            }} className="genreBtnMobile musicalBtn">
                                <span>MUSICAL</span>
                            </button>
                            <button onClick={() => {
                                this.BtnRomanceClick();
                                this.BtnClick()
                            }} className="genreBtnMobile romanceBtn">
                                <span>ROMANCE</span>
                            </button>
                            <button onClick={() => {
                                this.BtnHistoryClick();
                                this.BtnClick()
                            }} className="genreBtnMobile historyBtn">
                                <span>HISTORY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnWarClick();
                                this.BtnClick()
                            }} className="genreBtnMobile warBtn">
                                <span>WAR</span>
                            </button>
                            <button onClick={() => {
                                this.BtnWesternClick();
                                this.BtnClick()
                            }} className="genreBtnMobile westernBtn">
                                <span>WESTERN</span>
                            </button>
                            <button onClick={() => {
                                this.BtnTvMovieClick();
                                this.BtnClick()
                            }} className="genreBtnMobile tvMovieBtn">
                                <span>TV MOVIE</span>
                            </button>

                        </div>
                        <div style={{
                            width: "100%",
                            height: "1700px",
                            margin: "0",
                            padding: "0",
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            position: "relative"
                        }}>
                            <h1 style={{
                                fontSize: "3.2rem",
                                borderBottom: "5px solid rgb(176, 0, 53)",
                                marginTop: "0",
                                height: "280px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center"
                            }} className="title">
                                {this.state.title}
                            </h1>
                            <div style={{
                                backgroundImage: 'url(' + this.state.poster + ')',
                                width: '400px',
                                height: '1200px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                marginTop: "20px"
                            }}></div>
                            <p style={{
                                fontSize: "30px",
                                textAlign: "center",
                                height: "800px",
                                borderBottom: "5px solid rgb(176, 0, 53)",
                                padding: "20px",
                                overflow: "auto"
                            }}>
                                {this.state.description}
                            </p>
                            <h4 style={{
                                fontSize: "3rem",
                                marginTop: "25px",
                                marginTop: "20px",
                                height: "50px",
                                textAlign: "center"
                            }}>
                                Genre: {this.state.genres}
                            </h4>
                            <h4 style={{
                                fontSize: "3rem",
                                height: "50px",
                                margin: "15px"
                            }}>
                                Average rating:&nbsp;
                                <span style={{
                                    color: this.state.color
                                }}>{this.state.rating}/10&nbsp;
                                </span>
                                ({this.state.votes}
                                &nbsp;votes)
                            </h4>
                            <div style={{
                                display: this.state.display,
                                zIndex: "998",
                                position: "absolute",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0"
                            }}>

                                <iframe id="VideoPlayer" width="970" height="1450" src="" frameBorder="0" allowFullScreen="true"></iframe>
                                <div style={{
                                    width: "100%",
                                    height: "250px",
                                    marginTop: "10px",
                                    backgroundImage: 'url(images/closeButton.jpg)',
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }} onClick={this.handleClickClose.bind(this)}></div>

                            </div>
                            <h4 style={{
                                fontSize: "2.5rem",
                                marginTop: "20px",
                                marginBottom: "50px"
                            }} className="releaseDate">
                                Release date: {this.state.releaseDate}
                            </h4>

                            <button style={{
                                height: "300px",
                                width: "900px",
                                marginLeft: "20px",
                                marginBottom: "20px",
                                backgroundImage: 'url(images/choosegenre.png)',
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }} onClick={this.handleClickGenre.bind(this)}></button>

                            <div style={{
                                height: "200px"
                            }}>
                                <button style={{
                                    fontSize: "4rem",
                                    height: "200px",
                                    width: "350px",
                                    float: "left",
                                    marginLeft: "20px",
                                    backgroundImage: 'url(images/watchtrailer.png)',
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }} onClick={this.handleClickTrailer.bind(this)}></button>
                                <button style={{
                                    fontSize: "4rem",
                                    height: "200px",
                                    width: "530px",
                                    float: "left",
                                    marginLeft: "20px",
                                    backgroundImage: 'url(images/next-2.png)',
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }} onClick={this.handleClickRoll.bind(this)}></button>
                            </div>
                        </div>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth={768}>
                        <div className="container floatLeft">
                            <button onClick={() => {
                                this.BtnMysteryClick();
                                this.BtnClick()
                            }} className="genreBtn mysteryBtn">
                                <span>MYSTERY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnCrimeClick();
                                this.BtnClick()
                            }} className="genreBtn crimeBtn">
                                <span>CRIME</span>
                            </button>
                            <button onClick={() => {
                                this.BtnAnimationClick();
                                this.BtnClick()
                            }} className="genreBtn animationBtn">
                                <span>ANIMATION</span>
                            </button>
                            <button onClick={() => {
                                this.BtnMusicalClick();
                                this.BtnClick()
                            }} className="genreBtn musicalBtn">
                                <span>MUSICAL</span>
                            </button>
                            <button onClick={() => {
                                this.BtnRomanceClick();
                                this.BtnClick()
                            }} className="genreBtn romanceBtn">
                                <span>ROMANCE</span>
                            </button>
                            <button onClick={() => {
                                this.BtnHistoryClick();
                                this.BtnClick()
                            }} className="genreBtn historyBtn">
                                <span>HISTORY</span>
                            </button>
                            <button onClick={() => {
                                this.BtnWarClick();
                                this.BtnClick()
                            }} className="genreBtn warBtn">
                                <span>WAR</span>
                            </button>
                            <button onClick={() => {
                                this.BtnWesternClick();
                                this.BtnClick()
                            }} className="genreBtn westernBtn">
                                <span>WESTERN</span>
                            </button>
                            <button onClick={() => {
                                this.BtnTvMovieClick();
                                this.BtnClick()
                            }} className="genreBtn tvMovieBtn">
                                <span>TV MOVIE</span>
                            </button>

                        </div>
                    </MediaQuery>
                </div>

            );
        }
    }

    class App extends React.Component {
        render() {
            return <div>
                <MovieApp/>
            </div>
        }
    }

    ReactDOM.render(
        <App/>, document.getElementById('app'));

})
