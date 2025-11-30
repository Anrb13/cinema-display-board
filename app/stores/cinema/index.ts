import { useApi } from '~/api';
import type { Cinema } from '~/api/cinemas/types';
import type { Movie, MovieSession } from '~/api/movies/types';

export const useCinemaStore = defineStore('cinemaStore', () => {
  const api = useApi();

  const state = {
    movies: ref<Movie[]>([]),
    movieSessions: ref<Record<MovieSession['movieId'], MovieSession[]>>({}),
    cinemas: ref<Cinema[]>([]),
  };

  const actions = {
    async fetchMovies() {
      if (!state.movies.value.length) {
        const movies = await api.movies.getMovies();
        state.movies.value = movies;
      }
    },

    async fetchMovieSessions(movieId: Movie['id']) {
      if (!state.movieSessions.value[movieId]) {
        const sessions = await api.movies.getMovieSessions(movieId);
        state.movieSessions.value[movieId] = sessions;
      }
    },

    async fetchCinemas() {
      if (!state.cinemas.value.length) {
        const cinemas = await api.cinemas.getCinemas();
        state.cinemas.value = cinemas;
      }
    },
  };

  const getters = {
    moviesMap: computed(() =>
      Object.fromEntries(state.movies.value.map((item) => [item.id, item])),
    ),
    cinemasMap: computed(() =>
      Object.fromEntries(state.cinemas.value.map((item) => [item.id, item])),
    ),
  };

  return {
    ...state,
    ...actions,
    ...getters,
  };
});
