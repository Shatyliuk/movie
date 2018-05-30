import 'normalize.css';
import './sass/main.sass';

let moviesList = document.getElementById('movies');

function addMoviesList(movie) {
    let movieDiv = document.createElement('div');
    let img = document.createElement('img');
    let movieInfoButton = document.createElement('button');

    movieDiv.className = 'movie';
    img.src = movie.Poster;
    movieInfoButton.className = 'movie__button';

    movieDiv.appendChild(img);
    movieDiv.appendChild(addMoviesInfo(movie));
    movieDiv.appendChild(movieInfoButton);
    moviesList.appendChild(movieDiv);

}

function addMoviesInfo(movie) {
    let movieInfo = document.createElement('div');
    let movieInfoList = document.createElement('ul');

    movieInfo.className = 'movie__info';

    getData(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=d2bcf567`)
        .then(movieInfoData => {

            for (let dataItem in movieInfoData) {
                if (dataItem === 'Poster' || dataItem === 'Ratings' || dataItem === 'Response') {
                    continue;
                }

                if (dataItem === 'Website') {
                    let movieInfoItem = document.createElement('li');
                    let movieLink = document.createElement('a');

                    movieLink.href = movieInfoData[dataItem];
                    movieLink.innerHTML = 'Link';

                    movieInfoItem.innerHTML = `${dataItem.bold()}:`;
                    movieInfoItem.appendChild(movieLink);

                    movieInfoList.appendChild(movieInfoItem);
                } else {
                    let movieInfoItem = document.createElement('li');
                    movieInfoItem.innerHTML = `${dataItem.bold()}: ${movieInfoData[dataItem]}`;
                    movieInfoList.appendChild(movieInfoItem);
                }


            }
        })
        .catch(error => console.log(error));

    movieInfo.appendChild(movieInfoList);

    return movieInfo;

}

function getData(url) {

    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);

        xhr.onload = () => {

            if (xhr.status === 200) {
                let json = JSON.parse(xhr.response);
                resolve(json);
            } else {
                reject(xhr.statusText);
            }

        };

        xhr.onerror = (error) => {
            reject(error);
        };

        xhr.send();

    });

}

let searchInput = document.getElementById('search');
let searchButton = document.getElementById("searchButton");

searchInput.addEventListener('keyup', (event) => {
    event.preventDefault();

    if (event.key === 'Enter') {
        searchButton.click();
    }
});

searchButton.addEventListener("click", () => {
    let search = document.getElementById('search').value;

    if (moviesList.innerHTML) {
        moviesList.innerHTML = '';
    }

    getData(`http://www.omdbapi.com/?s=${search}&plot=full&apikey=d2bcf567`)
        .then(movies => {
            movies.Search.forEach(movie => {
                if (movie.Poster === "N/A") {
                    return;
                }
                addMoviesList(movie);
            })
        })
        .then(() => {
            let movieButton = Array.from(document.getElementsByClassName('movie__button'));

            movieButton.forEach((item) => {
                item.addEventListener("click", function () {
                    this.classList.toggle("active");
                    var panel = this.previousElementSibling;

                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
            })
        })
        .catch(error => console.log(error));
});