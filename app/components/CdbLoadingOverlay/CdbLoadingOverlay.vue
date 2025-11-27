<template>
  <div
    v-if="baseStore.loading"
    class="cdb-loadng-overlay"
  >
    <div class="cdb-loadng-overlay__spinner" />
  </div>
</template>

<script setup lang="ts">
import { useBaseStore } from '~/stores/base';

const baseStore = useBaseStore();
</script>

<style lang="scss">
@use './styles' as *;
</style>
