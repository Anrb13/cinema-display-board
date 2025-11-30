import type { Settings } from './types';

export default (baseURL: string) => ({
  /**
   * Возвращает текущие настройки приложения, включая время, в течение которого бронирование должно быть оплачено.
   * @see http://localhost:3022/api-docs/#/Settings/get_settings
   */
  async getSettings() {
    const data: Settings = await $fetch(`/settings`, {
      baseURL,
      method: 'GET',
    });

    return data;
  },
});
