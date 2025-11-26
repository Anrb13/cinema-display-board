import type { UserBooking } from './types';

const apiBaseUrl = useRuntimeConfig().public.apiBase;

export default {
  /**
   * Возвращает список всех бронирований, сделанных текущим аутентифицированным пользователем.
   * @see http://localhost:3022/api-docs/#/Users/get_me_bookings
   */
  async getUserBookings() {
    const data: UserBooking[] = await $fetch(`${apiBaseUrl}/settings`, {
      method: 'GET',
    });

    return data;
  },
};
