import { async } from 'regenerator-runtime';
import FavoriteMovieIdb from '../data/favorite-movie-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ LikeButtonContainer, movie }) {
    this._likeButtonContainer = LikeButtonContainer;
    this._movie = movie;
    await this._renderButton();
  },
  async _renderButton() {
    const { id } = this._movie;
    if (await this._isMovieExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },
  async _isMovieExist(id) {
    const movie = await FavoriteMovieIdb.getMovie(id);
    return !!movie;
  },
  _renderLike() {
    this._likeButtonContainer.innerHtml = createLikeButtonTemplate;
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.putMovie(this._movie);
      this._renderButton();
    });
  },
  _renderLiked() {
    this._likeButtonContainer.innerHtml = createLikedButtonTemplate;
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.deleteMovie(this._movie.id);
      this._renderButton();
    });
  },

};

export default LikeButtonInitiator;
