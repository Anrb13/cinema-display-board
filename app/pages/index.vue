<template>
  <CdbMoviesList
    v-show="isListMode"
    :movies="cinemaStore.movies"
    @about="openMovieInfo"
  />
  <CdbMovieInfo
    v-if="!isListMode && currentMovie && currentMovieSessions"
    :current-movie="currentMovie"
    :sessions="currentMovieSessions"
    :cinemas-map="cinemaStore.cinemasMap"
    @back="isListMode = true"
    @booking="goToBooking"
  />
</template>

<script setup lang="ts">
import type { Movie } from '~/api/movies/types';
import CdbMovieInfo from '~/components/CdbMovieInfo/CdbMovieInfo.vue';
import { useErrorHadler } from '~/composables/errorHandler';
import { useCinemaStore } from '~/stores/cinema';

const cinemaStore = useCinemaStore();
const errorHandler = useErrorHadler();

const isListMode = ref(true);
const currentMovie = ref<Movie | undefined>(undefined);

const currentMovieSessions = computed(() =>
  currentMovie.value?.id
    ? cinemaStore.movieSessions[currentMovie?.value?.id]
    : undefined,
);

async function openMovieInfo(movie: Movie) {
  currentMovie.value = movie;

  try {
    await cinemaStore.fetchCinemas();
    await cinemaStore.fetchMovieSessions(movie.id);
  } catch (e) {
    errorHandler.handle(e);
  } finally {
    isListMode.value = false;
  }
}

function goToBooking() {}

onMounted(async () => {
  await cinemaStore.fetchMovies();
});
</script>
