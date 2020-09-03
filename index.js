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


/* 
// Old version 
let timingID;
const inputFunc = (event) =>{
    if(timingID) {
        clearInterval(timingID);
    }
    timingID = setTimeout(() => {
        fetchMovies(event.target.value);
    }, 500);
}
 */

const helperBounce = (func, delay = 1000) => {
    let timingID;
    return (...args) => {
        if(timingID) {
            clearInterval(timingID);
        }
        timingID = setTimeout( () => {
            func.apply(null, args);
        }, delay)
    }
}


const inputFunc = (event) => {
        fetchMovies(event.target.value);
}


inputMovie.addEventListener('input', helperBounce(inputFunc, 500));