import type { MovieSessionInfo, Seat } from '~/api/movieSessions/types';

export interface CdbSeatsGreedProps {
  seats: MovieSessionInfo['seats'];
  bookedSeats: MovieSessionInfo['bookedSeats'];
}

export interface CdbSeatsGreedEmits {
  select: [seat: Seat];
}
