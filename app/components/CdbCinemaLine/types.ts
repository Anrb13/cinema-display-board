import type { Cinema } from '~/api/cinemas/types';

export interface CdbCinemaLineProps {
  cinema: Cinema;
}

export interface CdbCinemaLineEmits {
  about: [cinema: Cinema];
}
