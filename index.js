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
})