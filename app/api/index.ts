import auth from './auth';
import bookings from './bookings';
import cinemas from './cinemas';
import movies from './movies';
import movieSessions from './movieSessions';
import settings from './settings';
import users from './users';

export const useApi = () => {
  const baseUrl = useRuntimeConfig().public.apiBase;

  return {
    auth: auth(baseUrl),
    bookings: bookings(baseUrl),
    cinemas: cinemas(baseUrl),
    movies: movies(baseUrl),
    movieSessions: movieSessions(baseUrl),
    settings: settings(baseUrl),
    users: users(baseUrl),
  };
};
