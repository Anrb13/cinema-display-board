import type { Movie, MovieSession } from '~/api/movies/types';
import type { CinemasMap, SessionInfoForBooking } from '~/types';

export interface CdbMovieInfoProps {
  currentMovie: Movie;
  sessions: MovieSession[];
  cinemasMap?: CinemasMap;
}

export interface CdbMovieInfoEmits {
  back: [];
  booking: [SessionInfoForBooking];
}
