import auth from './auth';
import bookings from './bookings';
import cinemas from './cinemas';
import movies from './movies';
import movieSessions from './movieSessions';
import settings from './settings';
import users from './users';

export const useApi = () => {
  const baseURL = useRuntimeConfig().public.apiBase;

  return {
    auth: auth(baseURL),
    bookings: bookings(baseURL),
    cinemas: cinemas(baseURL),
    movies: movies(baseURL),
    movieSessions: movieSessions(baseURL),
    settings: settings(baseURL),
    users: users(baseURL),
  };
};
