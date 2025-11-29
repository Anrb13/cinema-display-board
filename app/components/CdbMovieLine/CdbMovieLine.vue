<template>
  <div class="cdb-movie-line">
    <img class="cdb-movie-line__poster" :src="src" :alt="movie.title" />
    <span class="cdb-movie-line__title">{{ movie.title }}</span>
    <span class="cdb-movie-line__length">{{ movie.lengthMinutes }}</span>
    <span class="cdb-movie-line__rating">{{ movie.rating }}</span>
    <CdbButton
      class="cdb-movie-line__button"
      text="Показать сеансы"
      @click="emit('about', movie)"
    />
  </div>
</template>

<script setup lang="ts">
import CdbButton from '~/components/CdbButton/CdbButton.vue';
import { getImageSrc } from '~/utils/image';
import type { CdbMovieLineEmits, CdbMovieLineProps } from './types';

const { movie } = defineProps<CdbMovieLineProps>();
const emit = defineEmits<CdbMovieLineEmits>();

const src = getImageSrc(movie.posterImage);
</script>

<style lang="scss">
@use './styles' as *;
</style>
