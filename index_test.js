const fetchMovies = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "b262c28d",
            s: searchTerm
        }
    });
    if(response.data.Search){
        return [];
    }
    return response.data.Search;
}

const input = document.querySelector('input');

input.addEventListener('input', (event) => {
    fetchMovies(event.target.value);
})

