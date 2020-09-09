const autocompleteCreation = ({ 
    root,
    showOptions,
    inputValue,
    optionSelected,
    fetchMovies,
    name
}) => {
        
    root.innerHTML = `
        <label><b>Search for a ${name}</b></label>
        <input class="input"/>
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const inputMovie = root.querySelector('input');
    const theDropdown = root.querySelector('.dropdown');
    const resultWrapper = root.querySelector('.results');


    const inputFunc = async (event) =>{
        const items = await fetchMovies(event.target.value);
        // console.log(!movies.length);

        if(!items.length) {
            theDropdown.classList.remove('is-active');
            return;
        }
        resultWrapper.innerHTML = '';
        theDropdown.classList.add('is-active');

        for (let item of items) {
            const options = document.createElement('a');
            options.classList.add('dropdown-item');
            
            options.innerHTML = showOptions(item);

            options.addEventListener('click', () => {
                theDropdown.classList.remove('is-active');
                inputMovie.value = inputValue(item);
                optionSelected(item);
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

}