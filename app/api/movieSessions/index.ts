import type { MovieSession } from '../movies/types';
import type { MovieSessionInfo, Seat } from './types';

export default (baseURL: string) => ({
  /**
   * Возвращает детальную информацию о сеансе, включая забронированные места.
   * @see http://localhost:3022/api-docs/#/Movie%20Sessions/get_movieSessions__movieSessionId_
   */
  async getMovieSessionInfo(movieSessionId: MovieSession['id']) {
    const data: MovieSessionInfo = await $fetch(
      `/movieSessions/${movieSessionId}`,
      {
        baseURL,
        method: 'GET',
      },
    );

    return data;
  },

  /**
   * Бронирует указанные места на киносеанс для аутентифицированного пользователя.
   * @see http://localhost:3022/api-docs/#/Movie%20Sessions/post_movieSessions__movieSessionId__bookings
   */
  async bookSeatsToMovieSession({
    movieSessionId,
    seats,
  }: {
    movieSessionId: MovieSession['id'];
    seats: Seat[];
  }) {
    const data: MovieSessionInfo = await $fetch(
      `/movieSessions/${movieSessionId}/bookings`,
      {
        baseURL,
        method: 'POST',
        body: {
          seats,
        },
      },
    );

    return data;
  },
});
