const fetchMovies = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "b262c28d",
            s: searchTerm
        }
    });
    console.log(response.data);
}



const inputMovie = document.querySelector('input');

let timingID
const inputFunc = (event) =>{
    if(timingID) {
        clearInterval(timingID);
    }
    timingID = setTimeout(() => {
        fetchMovies(event.target.value);
    }, 500);
}

inputMovie.addEventListener('input', inputFunc);