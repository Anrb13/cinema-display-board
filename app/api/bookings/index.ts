export default (baseUrl: string) => ({
  /**
   * Отмечает бронирование как оплаченное.
   * @see http://localhost:3022/api-docs/#/Bookings/post_bookings__bookingId__payments
   */
  async bookingPayById(bookingId: string) {
    const { message }: { message: string } = await $fetch(
      `${baseUrl}/bookings/${bookingId}/payments`,
      {
        method: 'POST',
      }
    );

    return message;
  },
});
