const fetchMovies = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'b262c28d',
            s: searchTerm
        }
    });
    if(response.data.Error) {
        return [];
    }

    return response.data.Search;
}

const root = document.querySelector('#autocomplete');

root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dowpdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const theDropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const bouceHelper = (func, delay = 1000) => {
    let timingID;
    return (...args) => {
        if(timingID) {
            clearInterval(timingID);
        }
        timingID = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    }
}


const inputFunc = async (event) => {
    const movies = await fetchMovies(event.target.value);

    if(!movies.length) {
        theDropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = '';
    theDropdown.classList.add('is-active');

    for (let movie of movies) {
        const options = document.createElement('a');
        options.classList.add('dropdown-item');
        const imgsrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        options.innerHTML = `
            <img src="${imgsrc}"/>
            <h2>${movie.Title}</h2>
        `;
        options.addEventListener('click', () => {
            theDropdown.classList.remove('is-active');
            input.value = movie.Title;
        })


        resultsWrapper.appendChild(options);
    }
}

input.addEventListener('input', bouceHelper(inputFunc, 500));

document.addEventListener('click', (event) => {
    if(!root.contains(event.target)) {
        theDropdown.classList.remove('is-active');
    }
});

