import type { ApiFetchType } from '~/types';
import type { UserBooking } from './types';

export default (fetch: ApiFetchType) => ({
  /**
   * Возвращает список всех бронирований, сделанных текущим аутентифицированным пользователем.
   * @see http://localhost:3022/api-docs/#/Users/get_me_bookings
   */
  async getUserBookings() {
    const data: UserBooking[] = await fetch(`/me/bookings`, {
      method: 'GET',
    });

    return data;
  },
});
