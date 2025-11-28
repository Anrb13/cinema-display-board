import { useBaseStore } from '~/stores/base';

export default defineNuxtPlugin(() => {
  const baseStore = useBaseStore();

  baseStore.fetchSettings();
});
