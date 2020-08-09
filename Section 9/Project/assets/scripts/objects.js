const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }

  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    // We can check for existence of properties in an Object:
    // if ('info' in movie) {
    // if (movie.info === undefined) {}
    const { info, ...otherProps } = movie;
    console.log('otherProps:', otherProps);
    // const { title: movieTitle } = info;
    let { getFormattedTitle } = movie;
    // NOTE: we want 'this' to refer to the movie object, so we have to use bind():
    getFormattedTitle = getFormattedTitle.bind(movie);
    let text = getFormattedTitle() + ' - ';
    for (const key in info) {
      if (key !== 'title') {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    // getFormattedTitle: function () {
    getFormattedTitle() {
      // NOTE: 'this' referes to whatever was responsible for calling the function:
      return this.info.title.toUpperCase();
    },
  };

  movies.push(newMovie);
  console.log('addMovieHandler -> movies', movies);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
