import type { Cinema } from '~/api/cinemas/types';
import type { Movie, MovieSession } from '~/api/movies/types';
import type { MovieSessionInfo } from '~/api/movieSessions/types';
import type { UserBooking } from '~/api/users/types';

export type ApiFetchType = typeof $fetch;

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

export interface MappedBookingList {
  unpaid: UserBooking[];
  future: UserBooking[];
  past: UserBooking[];
}

export type MoviesMap = Record<Movie['id'], Movie>;
export type CinemasMap = Record<Cinema['id'], Cinema>;
export type MovieSessionsInfo = Record<MovieSession['id'], MovieSessionInfo>;
