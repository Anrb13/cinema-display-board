import type { Movie } from '~/api/movies/types';

export interface CdbMoviesListProps {
  movies: Movie[];
}

export interface CdbMoviesListEmits {
  about: [movie: Movie];
}
