import TheMovieDbSource from '../../data/themoviedb-source';
import UrlParser from '../../routes/url-parser';
import { createLikeButtonTemplate, createMovieDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <div id="movies" class="movies"> </div>
    <div id="likeButtonContainer> </div>
    `;
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movie = await TheMovieDbSource.detailMovie(url.id);
    const moviesContainer = document.querySelector('#movies');
    const likeButtonContainer=document.querySelector('#likeButtonContainer');
    likeButtonContainer.innerHTML = createLikeButtonTemplate();
    moviesContainer.innerHTML = createMovieDetailTemplate(movie);
  },
};

export default Detail;
