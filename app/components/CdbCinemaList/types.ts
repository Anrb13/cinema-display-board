import type { Cinema } from '~/api/cinemas/types';

export interface CdbCinemaListProps {
  cinemas: Cinema[];
}

export interface CdbCinemaListEmits {
  about: [cinema: Cinema];
}
