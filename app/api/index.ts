import auth from './auth';
import bookings from './bookings';
import cinemas from './cinemas';
import movies from './movies';
import movieSessions from './movieSessions';
import settings from './settings';
import users from './users';

export const useApi = () => {
  return {
    auth,
    bookings,
    cinemas,
    movies,
    movieSessions,
    settings,
    users,
  };
};
