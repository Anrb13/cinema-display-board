import type { ApiFetchType } from '~/types';

export default (fetch: ApiFetchType) => ({
  /**
   * Отмечает бронирование как оплаченное.
   * @see http://localhost:3022/api-docs/#/Bookings/post_bookings__bookingId__payments
   */
  async bookingPayById(bookingId: string) {
    const { message }: { message: string } = await fetch(
      `/bookings/${bookingId}/payments`,
      {
        method: 'POST',
      },
    );

    return message;
  },
});
