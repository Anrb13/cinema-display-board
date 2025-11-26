import type { Cinema } from './types';

const apiBaseUrl = useRuntimeConfig().public.apiBase;

export default {
  /**
   * Возвращает список всех доступных кинотеатров.
   * @see http://localhost:3022/api-docs/#/Cinemas/get_cinemas
   */
  async getCinemas() {
    const data: Cinema[] = await $fetch(`${apiBaseUrl}/cinemas`, {
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
      `${apiBaseUrl}/cinemas/${cinemaId}/sessions`,
      {
        method: 'GET',
      }
    );

    return message;
  },
};
