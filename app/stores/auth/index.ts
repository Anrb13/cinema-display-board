import { useApi } from '~/api';
import type { UserInfo } from '~/api/auth/types';
import { useErrorHadler } from '~/composables/errorHandler';

export const useAuthStore = defineStore('authStore', () => {
  const api = useApi();
  const errorHandler = useErrorHadler();

  const state = {
    isAuthenticated: ref(false),
    token: ref<string | undefined>(undefined),
  };

  const actions = {
    async login({ username, password }: UserInfo) {
      try {
        const token = await api.auth.login({ username, password });
        state.token.value = token;
        state.isAuthenticated.value = true;
      } catch (e) {
        errorHandler.handle(e);
      }
    },

    async register({ username, password }: UserInfo) {
      try {
        const token = await api.auth.register({ username, password });
        state.token.value = token;
        state.isAuthenticated.value = true;
      } catch (e) {
        errorHandler.handle(e);
      }
    },
  };

  return {
    ...state,
    ...actions,
  };
});
