import type { Movie, MovieSession } from './types';

export default (baseURL: string) => ({
  /**
   * Возвращает список всех доступных фильмов.
   * @see http://localhost:3022/api-docs/#/Movies/get_movies
   */
  async getMovies() {
    const data: Movie[] = await $fetch(`/movies`, {
      baseURL,
      method: 'GET',
    });

    return data;
  },

  /**
   * Возвращает список всех доступных киносеансов для указанного фильма.
   * @see http://localhost:3022/api-docs/#/Movies/get_movies__movieId__sessions
   */
  async getMovieSessions(movieId: Movie['id']) {
    const data: MovieSession[] = await $fetch(`/movies/${movieId}/sessions`, {
      baseURL,
      method: 'GET',
    });

    return data;
  },
});
