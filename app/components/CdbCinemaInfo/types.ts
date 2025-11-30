import type { Cinema } from '~/api/cinemas/types';
import type { Movie, MovieSession } from '~/api/movies/types';
import type { SessionInfoForBooking } from '~/types';

export interface CdbCinemaInfoProps {
  currentCinema: Cinema;
  sessions: MovieSession[];
  moviesMap?: Record<Movie['id'], Movie>;
}

export interface CdbCinemaInfoEmits {
  back: [];
  booking: [SessionInfoForBooking];
}
