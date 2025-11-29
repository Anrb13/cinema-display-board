<template>
<div class="cdb-movies-list">
    <div class="cdb-movies-list__head">
      <span class="cdb-movies-list__title">Название</span>
      <span class="cdb-movies-list__length">Продолжительность</span>
      <span class="cdb-movies-list__rating">Рейтинг</span>
    </div>
    
    <CdbMovieLine
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      @about="(v) => emit('about', v)"
    />
  </div>
</template>

<script setup lang="ts">
import type { CdbMoviesListEmits, CdbMoviesListProps } from './types';

defineProps<CdbMoviesListProps>()
const emit = defineEmits<CdbMoviesListEmits>()
</script>

<style lang="scss">
@use './styles' as *;
</style>
