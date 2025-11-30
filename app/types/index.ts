import type { Cinema } from '~/api/cinemas/types';
import type { Movie, MovieSession } from '~/api/movies/types';

export interface SessionInfoForBooking {
  id: MovieSession['id'];
  cinemaName?: Cinema['name'];
  movieTitle?: Movie['title'];
  date: string;
  time: string;
}

interface SessionWithTime extends MovieSession {
  formattedTime: string;
}

type CinemaSessions = Record<Cinema['id'], SessionWithTime[]> & {
  availableCinemas: Cinema['id'][];
};

export type SessionsByDateAndCinema = Record<string, CinemaSessions> & {
  availableDates: string[];
};

type MovieSessions = Record<Movie['id'], SessionWithTime[]> & {
  availableMovies: Cinema['id'][];
};

export type SessionsByDateAndMovie = Record<string, MovieSessions> & {
  availableDates: string[];
};
