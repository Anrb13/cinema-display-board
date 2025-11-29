import { useApi } from '~/api';
import type { Movie, MovieSession } from '~/api/movies/types';

export const useCinemaStore = defineStore('cinemaStore', () => {
  const api = useApi();

  const state = {
    movies: ref<Movie[]>([]),
    sessions: ref<Record<number, MovieSession[]>>({}),
  };

  const actions = {
    async fetchMovies() {
      if (!state.movies.value.length) {
        const movies = await api.movies.getMovies();
        state.movies.value = movies;
      }
    },

    async fetchMovieSessions(movieId: number) {
      if (!state.sessions.value[movieId]) {
        const sessions = await api.movies.getMovieSessions(movieId);
        state.sessions.value[movieId] = sessions;
      }
    },
  };

  return {
    ...state,
    ...actions,
  };
});
