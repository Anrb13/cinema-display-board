import type { Movie, MovieSession } from './types';

export default (baseUrl: string) => ({
  /**
   * Возвращает список всех доступных фильмов.
   * @see http://localhost:3022/api-docs/#/Movies/get_movies
   */
  async getMovies() {
    const data: Movie[] = await $fetch(`${baseUrl}/movies`, {
      method: 'GET',
    });

    return data;
  },

  /**
   * Возвращает список всех доступных киносеансов для указанного фильма.
   * @see http://localhost:3022/api-docs/#/Movies/get_movies__movieId__sessions
   */
  async getMovieSessions(movieId: number) {
    const data: MovieSession[] = await $fetch(
      `${baseUrl}/movies/${movieId}/sessions`,
      {
        method: 'GET',
      }
    );

    return data;
  },
});
