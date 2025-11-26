import type { Settings } from './types';

const apiBaseUrl = useRuntimeConfig().public.apiBase;

export default {
  /**
   * Возвращает текущие настройки приложения, включая время, в течение которого бронирование должно быть оплачено.
   * @see http://localhost:3022/api-docs/#/Settings/get_settings
   */
  async getSettings() {
    const data: Settings = await $fetch(`${apiBaseUrl}/settings`, {
      method: 'GET',
    });

    return data;
  },
};
