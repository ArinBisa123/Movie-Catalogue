import TheMovieDbSource from '../../data/themoviedb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
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
    LikeButtonInitiator.init({
      LikeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
      },
    });
    moviesContainer.innerHTML = createMovieDetailTemplate(movie);
  },
};

export default Detail;
