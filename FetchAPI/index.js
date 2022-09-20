const env = {
  SERVER_URL: 'https://ghibliapi.herokuapp.com',
};

async function App() {
  try {
    const films = await fetchData();
    const layout = buildLayout(films);

    return layout;
  } catch (error) {
    return renderError(error);
  }
}

/**
 * UI
 */

function buildLayout(films) {
  const appWrapper = document.createElement('div');
  appWrapper.className = 'app-wrapper';

  const header = buildHeader();
  const filmsGrid = buildFilmsGrid(films);

  appWrapper.appendChild(header);
  appWrapper.appendChild(filmsGrid);

  return appWrapper;
}

function buildHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  header.textContent = 'Studio Ghibli';

  return header;
}

function buildFilmsGrid(films) {
  const filmsGrid = document.createElement('div');
  filmsGrid.className = 'films-grid';

  const cards = films.map(film => buildFilmCard(film));
  filmsGrid.append(...cards);

  return filmsGrid;
}

function buildFilmCard(film) {
  const filmCard = document.createElement('div');
  filmCard.className = 'film-card';
  filmCard.id = `film-card-${film.id}`;

  const thumbnailImage = document.createElement('img');
  thumbnailImage.src = film.image;
  thumbnailImage.alt = film.title;
  filmCard.appendChild(thumbnailImage);

  const movieDetailsContainer = document.createElement('div');
  movieDetailsContainer.className = 'movie-details-container';
  filmCard.appendChild(movieDetailsContainer);

  const movieTitle = document.createElement('h3');
  movieTitle.textContent = `${film.title} (${film.release_date})`;
  movieDetailsContainer.appendChild(movieTitle);

  const movieDescription = document.createElement('p');
  movieDescription.textContent = film.description?.length > 100
    ? `${film.description.slice(0, 150)}...`
    : film.description;
  movieDetailsContainer.appendChild(movieDescription);

  return filmCard;
}

function renderError(error) {
  const errorMessage = document.createElement('p');

  errorMessage.className = 'error-content';
  errorMessage.textContent = error;

  return errorMessage;
}

/**
 * Data manipulation
 */

async function fetchData() {
  const response = await fetch(`${env.SERVER_URL}/films`);

  if (response.ok) {
    return await response.json();
  }
}

/**
 * Main logic
 */

(async function () {
  const root = document.getElementById('container');
  const app = await App();

  root.appendChild(app);
})()