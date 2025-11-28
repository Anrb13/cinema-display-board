import type { Settings } from './types';

export default (baseUrl: string) => ({
  /**
   * Возвращает текущие настройки приложения, включая время, в течение которого бронирование должно быть оплачено.
   * @see http://localhost:3022/api-docs/#/Settings/get_settings
   */
  async getSettings() {
    const data: Settings = await $fetch(`${baseUrl}/settings`, {
      method: 'GET',
    });

    return data;
  },
});
