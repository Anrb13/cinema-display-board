import type { Movie, MovieSession } from './types';

const apiBaseUrl = useRuntimeConfig().public.apiBase;

export default {
  /**
   * Возвращает список всех доступных фильмов.
   * @see http://localhost:3022/api-docs/#/Movies/get_movies
   */
  async getMovies() {
    const data: Movie[] = await $fetch(`${apiBaseUrl}/movies`, {
      method: 'GET',
    });

    return data;
  },

  /**
   * Возвращает список всех доступных киносеансов для указанного фильма.
   * @see http://localhost:3022/api-docs/#/Movies/get_movies__movieId__sessions
   */
  async getMovieSessions(movieId: string) {
    const data: MovieSession[] = await $fetch(
      `${apiBaseUrl}/movies/${movieId}/sessions`,
      {
        method: 'GET',
      }
    );

    return data;
  },
};
