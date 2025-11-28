import { useApi } from '~/api';
import type { UserInfo } from '~/api/auth/types';
import { useErrorHadler } from '~/composables/errorHandler';
import { useBaseStore } from '../base';

export const useAuthStore = defineStore('authStore', () => {
  const api = useApi();
  const baseStore = useBaseStore();
  const errorHandler = useErrorHadler();
  const notify = useNotification();

  const state = {
    isAuthenticated: ref(false),
    token: ref<string | undefined>(undefined),
  };

  const actions = {
    async login({ username, password }: UserInfo) {
      try {
        baseStore.setLoading(true);
        const token = await api.auth.login({ username, password });
        state.token.value = token;
        state.isAuthenticated.value = true;
        navigateTo({ path: '/tickets' });
      } catch (e) {
        errorHandler.handle(
          e,
          'Неверный логин или пароль. Проверьте введенные данные и попробуйте снова'
        );
      } finally {
        baseStore.setLoading(false);
      }
    },

    async register({ username, password }: UserInfo) {
      try {
        baseStore.setLoading(true);
        const token = await api.auth.register({ username, password });
        state.token.value = token;
        state.isAuthenticated.value = true;
        navigateTo({ path: '/tickets' });
      } catch (e) {
        errorHandler.handle(e);
      } finally {
        baseStore.setLoading(false);
      }
    },

    logout() {
      state.isAuthenticated.value = false;
      state.token.value = undefined;
      notify.success({
        message: 'Вы вышли из учетной записи',
        color: 'green',
      });
      navigateTo({ path: '/' });
    },
  };

  return {
    ...state,
    ...actions,
  };
});
