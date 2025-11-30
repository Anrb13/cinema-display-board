<template>
  <div class="cdb-cinema-line">
    <span class="cdb-cinema-line__name">{{ cinema.name }}</span>
    <span class="cdb-cinema-line__address">{{ cinema.address }}</span>
    <CdbButton
      class="cdb-cinema-line__button"
      text="Показать сеансы"
      @click="emit('about', cinema)"
    />
  </div>
</template>

<script setup lang="ts">
import type { CdbCinemaLineEmits, CdbCinemaLineProps } from './types';

const { cinema } = defineProps<CdbCinemaLineProps>();
const emit = defineEmits<CdbCinemaLineEmits>();
</script>

<style lang="scss">
@use './styles' as *;
</style>
