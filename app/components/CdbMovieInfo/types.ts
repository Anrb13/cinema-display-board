import type { Cinema } from '~/api/cinemas/types';
import type { Movie, MovieSession } from '~/api/movies/types';

export interface CdbMovieInfoProps {
  currentMovie: Movie;
  sessions: MovieSession[];
  cinemasMap?: Record<Cinema['id'], Cinema>;
}

export interface SessionInfoForBooking {
  id: MovieSession['id'];
  cinemaName?: Cinema['name'];
  movieTitle?: Movie['title'];
  date: string;
  time: string;
}

export interface CdbMovieInfoEmits {
  back: [];
  booking: [SessionInfoForBooking];
}

interface SessionWithTime extends MovieSession {
  formattedTime: string;
}

type CinemaSessions = Record<Cinema['id'], SessionWithTime[]> & {
  availableCinemas: Cinema['id'][];
};

export type SessionsByDate = Record<string, CinemaSessions> & {
  availableDates: string[];
};
