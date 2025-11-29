<template>
  <CdbMoviesList
    v-show="isListMode"
    :movies="cinemaStore.movies"
    @about="openMovieInfo"
  />
  <div v-if="!isListMode && currentMovie" class="cdb-movies-item">
    <button class="cdb-movies-item__head" @click="isListMode = true">
      <IcBack class="cdb-movies-item__back-icon" />
      <h1>{{ currentMovie.title }}</h1>
    </button>
    <div class="cdb-movies-item__content">
      <NuxtImg
        :src="getImageSrc(currentMovie.posterImage)"
        class="cdb-movies-item__poster"
      />
      <div class="cdb-movies-item__info">
        <span class="cdb-movies-item__desc">
          {{ currentMovie.description }}
        </span>
        <span>
          {{ `Год: ${currentMovie.year}` }}
        </span>
        <span>
          {{ `Продолжительность: ${currentMovie.lengthMinutes}` }}
        </span>
        <span>
          {{ `Рейтинг: ${currentMovie.rating}` }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/api/movies/types';
import IcBack from '~/assets/icons/back.svg';
import { useErrorHadler } from '~/composables/errorHandler';
import { useCinemaStore } from '~/stores/cinema';
import { getImageSrc } from '~/utils/image';

const cinemaStore = useCinemaStore();
const errorHandler = useErrorHadler();

const isListMode = ref(true);
const currentMovie = ref<Movie | undefined>(undefined);

async function openMovieInfo(movie: Movie) {
  isListMode.value = false;
  currentMovie.value = movie;

  try {
    cinemaStore.fetchMovieSessions(movie.id);
  } catch (e) {
    errorHandler.handle(e);
  }
}

onMounted(async () => {
  await cinemaStore.fetchMovies();
});
</script>

<style lang="scss">
@use './styles' as *;
</style>
