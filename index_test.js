const fetchMovies = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'b262c28d',
            s: searchTerm
        }
    });
    if (response.Error) {
        return [];
    }
    return response.data;
}

const inputMovie = document.querySelector('input');

let timingID;
const inputFunc = (event) => {
    if(timingID) {
        clearInterval(timingID);
    }
    timingID = setTimeout(() => {
        fetchMovies(event.target.value);
    }, 1000);
}

inputMovie.addEventListener('input', inputFunc)