import type { Cinema } from './types';

export default (baseURL: string) => ({
  /**
   * Возвращает список всех доступных кинотеатров.
   * @see http://localhost:3022/api-docs/#/Cinemas/get_cinemas
   */
  async getCinemas() {
    const data: Cinema[] = await $fetch(`/cinemas`, {
      baseURL,
      method: 'GET',
    });

    return data;
  },

  /**
   * Возвращает список всех доступных сеансов для указанного кинотеатра.
   * @see http://localhost:3022/api-docs/#/Cinemas/get_cinemas__cinemaId__sessions
   */
  async getCinemaSessions(cinemaId: string) {
    const { message }: { message: string } = await $fetch(
      `/cinemas/${cinemaId}/sessions`,
      {
        baseURL,
        method: 'GET',
      },
    );

    return message;
  },
});
