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

const inputMovie = document.querySelector('input');

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
    // console.log(movies);

    for (let movie of movies) {
        const div = document.createElement('div');

        div.innerHTML = `
            <h1>${movie.Title}</h1>
            <img src="${movie.Poster}"/>
        `

        document.querySelector('#target').appendChild(div);
    }
}


inputMovie.addEventListener('input', helperBounce(inputFunc, 500));