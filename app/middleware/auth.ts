import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const notify = useNotification();

  if (authStore.isAuthenticated === false) {
    notify.info({
      message: 'Для просмотра билетов необходимо авторизоваться',
      color: 'yellow',
    });
    return navigateTo({ path: '/login' });
  }
});
