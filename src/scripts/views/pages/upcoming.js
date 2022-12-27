import TheMovieDbSource from '../../data/themoviedb-source';

const Upcoming = {
  async render() {
    return `<h2>Upcoming page</h2>`;
  },
  async afterRender() {
    const movies = TheMovieDbSource.upcomingMovies();
    console.log(movies);
  },
};

export default Upcoming;
