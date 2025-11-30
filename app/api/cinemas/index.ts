import type { ApiFetchType } from '~/types';
import type { Cinema, CinemaSession } from './types';

export default (fetch: ApiFetchType) => ({
  /**
   * Возвращает список всех доступных кинотеатров.
   * @see http://localhost:3022/api-docs/#/Cinemas/get_cinemas
   */
  async getCinemas() {
    const data: Cinema[] = await fetch(`/cinemas`, {
      method: 'GET',
    });

    return data;
  },

  /**
   * Возвращает список всех доступных сеансов для указанного кинотеатра.
   * @see http://localhost:3022/api-docs/#/Cinemas/get_cinemas__cinemaId__sessions
   */
  async getCinemaSessions(cinemaId: Cinema['id']) {
    const data: CinemaSession[] = await fetch(`/cinemas/${cinemaId}/sessions`, {
      method: 'GET',
    });

    return data;
  },
});
