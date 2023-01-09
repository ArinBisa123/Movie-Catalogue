import TheMovieDbSource from '../../data/themoviedb-source';
import UrlParser from '../../routes/url-parser';
import { createMovieDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <div id="movies" class="movies"> </div>
    `;
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movie = await TheMovieDbSource.detailMovie(url.id);
    const moviesContainer = document.querySelector('#movies');
    moviesContainer.innerHTML = createMovieDetailTemplate(movie);
  },
};

export default Detail;
