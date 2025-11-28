import type { UserBooking } from './types';

export default (baseUrl: string) => ({
  /**
   * Возвращает список всех бронирований, сделанных текущим аутентифицированным пользователем.
   * @see http://localhost:3022/api-docs/#/Users/get_me_bookings
   */
  async getUserBookings() {
    const data: UserBooking[] = await $fetch(`${baseUrl}/settings`, {
      method: 'GET',
    });

    return data;
  },
});
