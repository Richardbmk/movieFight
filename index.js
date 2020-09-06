const fetchMovies = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "b262c28d",
            s: searchTerm
        }
    });

    if(response.data.Error){
        return [];
    }
    return response.data.Search;
}

const root = document.querySelector('#autocomplete');

root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const inputMovie = document.querySelector('input');
const theDropdown = document.querySelector('.dropdown');
const resultWrapper = document.querySelector('.results');



/* 
// Old code
let timingID
const inputFunc = (event) =>{
    if(timingID) {
        clearInterval(timingID);
    }
    timingID = setTimeout(() => {
        fetchMovies(event.target.value);
    }, 1000);
}
 */


const inputFunc = async (event) =>{
    const movies = await fetchMovies(event.target.value);
    // console.log(!movies.length);

    if(!movies.length) {
        theDropdown.classList.remove('is-active');
        return;
    }
    resultWrapper.innerHTML = '';
    theDropdown.classList.add('is-active');

    for (let movie of movies) {
        const options = document.createElement('a');
        options.classList.add('dropdown-item');
        const imgsrc = movie.Poster === "N/A" ? '' : movie.Poster;
        options.innerHTML = `
            <img src="${imgsrc}"/>
            ${movie.Title}
        `;

        options.addEventListener('click', () => {
            theDropdown.classList.remove('is-active');
            inputMovie.value = movie.Title;
            fetchMovieSelected(movie);
        });

        resultWrapper.appendChild(options);
    }
}

inputMovie.addEventListener('input', helperBounce(inputFunc, 500));

document.addEventListener('click', (event) => {
    // console.log(event.target);
    if (!root.contains(event.target)) {
        theDropdown.classList.remove('is-active');
    }
});

const fetchMovieSelected = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'b262c28d', 
            i: movie.imdbID
        }
    });
    console.log(response.data);
    const movieDetail = response.data;
    document.querySelector('#movieinfo').innerHTML = movieInformation(movieDetail);
}

const movieInformation = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Actors}</p>
            <p class="subtitle">Actors</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Director}</p>
            <p class="subtitle">Director</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Ratings</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Ratings[0].Source}: ${movieDetail.Ratings[0].Value} </p>
            <p class="title">${movieDetail.Ratings[1].Source}: ${movieDetail.Ratings[1].Value} </p>
            <p class="title">${movieDetail.Ratings[2].Source}: ${movieDetail.Ratings[2].Value} </p>
            <p class="subtitle">Ratings</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Released}</p>
            <p class="subtitle">Released date</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Runtime}</p>
            <p class="subtitle">Runtime</p>
        </article>
    `;
}