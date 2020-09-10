const autocompleteConfig = {
    showOptions: (movie) => {
        const imgsrc = movie.Poster === "N/A" ? '' : movie.Poster;
        return `
            <img src="${imgsrc}"/>
            ${movie.Title} (${movie.Year})
        `;
    }, 
    inputValue: (movie) => {
        return movie.Title;
    },
    fetchMovies: async (searchTerm) => {
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
    },
}

autocompleteCreation({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    optionSelected: (movie) => {
        document.querySelector('.tutorial').classList.add('is-hidden');
        fetchMovieSelected(movie, document.querySelector('#left-summary'), 'left');
    }, 
});

autocompleteCreation({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    optionSelected: (movie) => {
        document.querySelector('.tutorial').classList.add('is-hidden');
        fetchMovieSelected(movie, document.querySelector('#right-summary'), 'right');
    }, 
});


let leftMovie;
let rightMovie;
const fetchMovieSelected = async (movie, summarySelector, sideMovie) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'b262c28d', 
            i: movie.imdbID
        }
    });
    console.log(response.data);
    const movieDetail = response.data;
    summarySelector.innerHTML = movieInformation(movieDetail);

    if(sideMovie === 'left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie){
        runCompareFunc();
    }
}

const runCompareFunc = () => {
    const leftSide = document.querySelectorAll('#left-summary .notification');
    const rightSide = document.querySelectorAll('#right-summary .notification');

    leftSide.forEach((leftElement, index) => {
        const rightElement = rightSide[index];

        leftMovieStats = parseFloat(leftElement.dataset.value);
        rightMovieStats = parseFloat(rightElement.dataset.value);

        if(leftMovieStats > rightMovieStats) {
            leftElement.classList.remove('is-warning');
            leftElement.classList.add('is-success');
        } else {
            rightElement.classList.remove('is-warning');
            rightElement.classList.add('is-success');
        }

        // console.log(leftElement, rightElement);
    })
}


const movieInformation = (movieDetail) => {
    const boxOffice = parseFloat(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseFloat(movieDetail.Metascore);
    const imbdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseFloat(movieDetail.imdbVotes);

    let count = 0;
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);

        if(isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0);


    // console.log(awards);
    // console.log(boxOffice, metascore, imbdbRating, imdbVotes);
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
        <article class="notification is-warning">
            <p class="title">${movieDetail.Actors}</p>
            <p class="subtitle">Actors</p>
        </article>
        <article data-value="${awards}" class="notification is-warning">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value="${boxOffice}" class="notification is-warning">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-warning">
            <p class="title">${movieDetail.Director}</p>
            <p class="subtitle">Director</p>
        </article>
        <article data-value="${metascore}" class="notification is-warning">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value="${imbdbRating}" class="notification is-warning">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Ratings</p>
        </article>
        <article class="notification is-warning">
            <p class="title">${movieDetail.Ratings[0].Source}: ${movieDetail.Ratings[0].Value} </p>
            <p class="title">${movieDetail.Ratings[1].Source}: ${movieDetail.Ratings[1].Value} </p>
            <p class="title">${movieDetail.Ratings[2].Source}: ${movieDetail.Ratings[2].Value} </p>
            <p class="subtitle">Ratings</p>
        </article>
        <article data-value="${imdbVotes}" class="notification is-warning">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
        <article class="notification is-warning">
            <p class="title">${movieDetail.Released}</p>
            <p class="subtitle">Released date</p>
        </article>
        <article class="notification is-warning">
            <p class="title">${movieDetail.Runtime}</p>
            <p class="subtitle">Runtime</p>
        </article>
    `;
}