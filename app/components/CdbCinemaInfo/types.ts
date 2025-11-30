import type { Cinema } from '~/api/cinemas/types';
import type { MovieSession } from '~/api/movies/types';
import type { MoviesMap, SessionInfoForBooking } from '~/types';

export interface CdbCinemaInfoProps {
  currentCinema: Cinema;
  sessions: MovieSession[];
  moviesMap?: MoviesMap;
}

export interface CdbCinemaInfoEmits {
  back: [];
  booking: [SessionInfoForBooking];
}
