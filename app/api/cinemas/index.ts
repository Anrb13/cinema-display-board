import type { Cinema } from './types';

export default (baseUrl: string) => ({
  /**
   * Возвращает список всех доступных кинотеатров.
   * @see http://localhost:3022/api-docs/#/Cinemas/get_cinemas
   */
  async getCinemas() {
    const data: Cinema[] = await $fetch(`${baseUrl}/cinemas`, {
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
      `${baseUrl}/cinemas/${cinemaId}/sessions`,
      {
        method: 'GET',
      }
    );

    return message;
  },
});
