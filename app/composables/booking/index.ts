import { useApi } from '~/api';
import type { Seat } from '~/api/movieSessions/types';
import { useAuthStore } from '~/stores/auth';
import { useCinemaStore } from '~/stores/cinema';
import type { SessionInfoForBooking } from '~/types';
import { useErrorHadler } from '../errorHandler';

export const useBooking = () => {
  const api = useApi();
  const errorHandler = useErrorHadler();
  const cinemaStore = useCinemaStore();
  const authStore = useAuthStore();
  const notify = useNotification();

  const bookingInfo = ref<SessionInfoForBooking | undefined>(undefined);

  const currentMovieSessionInfo = computed(() =>
    bookingInfo.value?.id
      ? cinemaStore.movieSessionsInfo[bookingInfo?.value?.id]
      : undefined,
  );

  async function bookSeats(v: Seat[]) {
    if (!authStore.isAuthenticated) {
      notify.info({
        message: 'Для бронирования билетов необходимо авторизоваться',
        color: 'yellow',
      });
      navigateTo({ path: '/login' });
    } else if (currentMovieSessionInfo.value?.id) {
      try {
        await api.movieSessions.bookSeatsToMovieSession({
          movieSessionId: currentMovieSessionInfo.value?.id,
          seats: v,
        });
        notify.success({
          message: 'Выбранные места успешно забронированы',
          color: 'green',
        });
        navigateTo({ path: '/tickets' });
      } catch (e) {
        errorHandler.handle(e);
      }
    }
  }

  return {
    bookingInfo,
    currentMovieSessionInfo,
    bookSeats,
  };
};
