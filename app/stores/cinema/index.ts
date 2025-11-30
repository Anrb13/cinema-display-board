import { useApi } from '~/api';
import type { Cinema } from '~/api/cinemas/types';
import type { Movie, MovieSession } from '~/api/movies/types';
import type { MovieSessionInfo } from '~/api/movieSessions/types';

export const useCinemaStore = defineStore('cinemaStore', () => {
  const api = useApi();

  const state = {
    movies: ref<Movie[]>([]),
    movieSessions: ref<Record<MovieSession['movieId'], MovieSession[]>>({}),
    movieSessionsInfo: ref<Record<MovieSession['id'], MovieSessionInfo>>({}),
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

    async fetchMovieSessionInfo(movieSessionId: MovieSession['id']) {
      if (!state.movieSessionsInfo.value[movieSessionId]) {
        const movieSessionInfo =
          await api.movieSessions.getMovieSessionInfo(movieSessionId);
        state.movieSessionsInfo.value[movieSessionId] = movieSessionInfo;
      }
    },
  };

  const getters = {
    movies: computed(() => state.movies.value),
    movieSessions: computed(() => state.movieSessions.value),
    movieSessionsInfo: computed(() => state.movieSessionsInfo.value),
    cinemas: computed(() => state.cinemas.value),

    moviesMap: computed(() =>
      Object.fromEntries(state.movies.value.map((item) => [item.id, item])),
    ),
    cinemasMap: computed(() =>
      Object.fromEntries(state.cinemas.value.map((item) => [item.id, item])),
    ),
  };

  return {
    ...actions,
    ...getters,
  };
});
