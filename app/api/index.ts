import { useAuthStore } from '~/stores/auth';
import auth from './auth';
import bookings from './bookings';
import cinemas from './cinemas';
import movies from './movies';
import movieSessions from './movieSessions';
import settings from './settings';
import users from './users';

export const useApi = () => {
  const baseURL = useRuntimeConfig().public.apiBase;
  const authStore = useAuthStore();

  const fetch = $fetch.create({
    baseURL,
    async onRequest({ options }) {
      if (authStore.token) {
        options.headers.set('Authorization', `Bearer ${authStore.token}`);
      }
    },
  });

  return {
    auth: auth(fetch),
    bookings: bookings(fetch),
    cinemas: cinemas(fetch),
    movies: movies(fetch),
    movieSessions: movieSessions(fetch),
    settings: settings(fetch),
    users: users(fetch),
  };
};
