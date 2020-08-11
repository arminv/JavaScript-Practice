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
    // getFormattedTitle = getFormattedTitle.bind(movie);
    // NOTE: alternatively, we can use call() instead of bind()
    // NOTE: bind prepares for futute execution(hence we save it in a variable), but call executes right away:
    let text = getFormattedTitle.call(movie) + ' - ';
    // NOTE: we can also use apply() instead of call(), the difference is that the second arg passed to it
    // will have to be an array(whereas with call we can pass an infinite number of args and they do NOT have to be inside and array):
    // let text = getFormattedTitle.apply(movie, []) + ' - ';
    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
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

  if (extraName.trim() === '' || extraValue.trim() === '') {
    return;
  }

  const newMovie = {
    info: {
      // NOTE: set & get (special keywords) allow us do define setters and getters - they help with validation, callback, transformation, etc.:
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    // getFormattedTitle: function () {
    getFormattedTitle() {
      // NOTE: 'this' referes to whatever was responsible for calling the function:
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title = title;
  console.log('newMovie.info.title', newMovie.info.title);

  movies.push(newMovie);
  console.log('addMovieHandler -> movies', movies);
  renderMovies();
};

// NOTE: arrow functions do not bind 'this' to anything:
const searchMovieHandler = function () {
  // NOTE: for events, the browser binds 'this' to the DOM element that triggered the event:
  console.log(this);
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
