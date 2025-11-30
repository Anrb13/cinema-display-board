import type { UserBooking } from '~/api/users/types';

export interface CdbBookingLine {
  item: UserBooking;
  isPaid?: boolean;
}

export interface CdbBookingEmits {
  pay: [bookingId: UserBooking['id']];
  end: [];
}
