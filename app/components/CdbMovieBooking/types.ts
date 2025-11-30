import type { MovieSessionInfo, Seat } from '~/api/movieSessions/types';
import type { SessionInfoForBooking } from '../CdbMovieInfo/types';

export interface CdbMovieBookingProps {
  info: SessionInfoForBooking;
  movieSessionInfo: MovieSessionInfo;
}

export interface CdbMovieBookingEmits {
  back: [];
  book: [seatsToBook: Seat[]];
}
