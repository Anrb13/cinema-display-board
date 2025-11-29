import type { Movie } from '~/api/movies/types';

export interface CdbMovieLineProps {
  movie: Movie;
}

export interface CdbMovieLineEmits {
  about: [movie: Movie];
}
