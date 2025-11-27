export const useBaseStore = defineStore('baseStore', () => {
  const state = {
    loading: ref(false),
  };

  const actions = {
    setLoading(v: boolean) {
      state.loading.value = v;
    },
  };

  return {
    ...state,
    ...actions,
  };
});
