export default (baseURL: string) => ({
  /**
   * Отмечает бронирование как оплаченное.
   * @see http://localhost:3022/api-docs/#/Bookings/post_bookings__bookingId__payments
   */
  async bookingPayById(bookingId: string) {
    const { message }: { message: string } = await $fetch(
      `/bookings/${bookingId}/payments`,
      {
        baseURL,
        method: 'POST',
      },
    );

    return message;
  },
});
