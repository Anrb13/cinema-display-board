import { useApi } from '~/api';

export const useBaseStore = defineStore('baseStore', () => {
  const api = useApi();

  const state = {
    loading: ref(false),
    bookingPaymentTimeSeconds: ref(0),
  };

  const actions = {
    setLoading(v: boolean) {
      state.loading.value = v;
    },

    async fetchSettings() {
      const { bookingPaymentTimeSeconds } = await api.settings.getSettings();
      state.bookingPaymentTimeSeconds.value = bookingPaymentTimeSeconds;
    },
  };

  return {
    ...state,
    ...actions,
  };
});
