<template>
  <div class="cdb-cinema-list">
    <div class="cdb-cinema-list__head">
      <div class="cdb-cinema-list__cinema">Кинотеатр</div>
      <div>Адрес</div>
    </div>

    <CdbCinemaLine
      v-for="cinema in cinemas"
      :key="cinema.id"
      :cinema="cinema"
      @about="(v) => emit('about', v)"
    />
  </div>
</template>

<script setup lang="ts">
import type { CdbCinemaListEmits, CdbCinemaListProps } from './types';

const { cinemas } = defineProps<CdbCinemaListProps>();
const emit = defineEmits<CdbCinemaListEmits>();
</script>

<style lang="scss">
@use './styles' as *;
</style>
