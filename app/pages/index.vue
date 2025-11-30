<template>
  <FadeTransition>
    <CdbMoviesList
      v-show="pageMode === Mode.LIST"
      :key="Mode.LIST"
      :movies="cinemaStore.movies"
      @about="openMovieInfo"
    />
  </FadeTransition>

  <FadeTransition>
    <CdbMovieInfo
      v-if="pageMode === Mode.MOVIE && currentMovie && currentMovieSessions"
      :key="Mode.MOVIE"
      :current-movie="currentMovie"
      :sessions="currentMovieSessions"
      :cinemas-map="cinemaStore.cinemasMap"
      @back="pageMode = Mode.LIST"
      @booking="goToBooking"
    />
  </FadeTransition>

  <FadeTransition>
    <CdbMovieBooking
      v-if="pageMode === Mode.BOOKING && bookingInfo && currentMovieSessionInfo"
      :info="bookingInfo"
      :movie-session-info="currentMovieSessionInfo"
      @back="pageMode = Mode.MOVIE"
      @book="bookSeats"
    />
  </FadeTransition>
</template>

<script setup lang="ts">
import type { Movie } from '~/api/movies/types';
import type { Seat } from '~/api/movieSessions/types';
import CdbMovieInfo from '~/components/CdbMovieInfo/CdbMovieInfo.vue';
import type { SessionInfoForBooking } from '~/components/CdbMovieInfo/types';
import { useErrorHadler } from '~/composables/errorHandler';
import { useCinemaStore } from '~/stores/cinema';

const enum Mode {
  LIST,
  MOVIE,
  BOOKING,
}

const cinemaStore = useCinemaStore();
const errorHandler = useErrorHadler();

const pageMode = ref<Mode>(Mode.LIST);
const currentMovie = ref<Movie | undefined>(undefined);
const bookingInfo = ref<SessionInfoForBooking | undefined>(undefined);

const currentMovieSessions = computed(() =>
  currentMovie.value?.id
    ? cinemaStore.movieSessions[currentMovie?.value?.id]
    : undefined,
);
const currentMovieSessionInfo = computed(() =>
  bookingInfo.value?.id
    ? cinemaStore.movieSessionsInfo[bookingInfo?.value?.id]
    : undefined,
);

async function openMovieInfo(movie: Movie) {
  currentMovie.value = movie;

  try {
    await cinemaStore.fetchCinemas();
    await cinemaStore.fetchMovieSessions(movie.id);
    pageMode.value = Mode.MOVIE;
  } catch (e) {
    errorHandler.handle(e);
  }
}

async function goToBooking(v: SessionInfoForBooking) {
  bookingInfo.value = v;

  try {
    await cinemaStore.fetchMovieSessionInfo(v.id);
    pageMode.value = Mode.BOOKING;
  } catch (e) {
    errorHandler.handle(e);
  }
}

async function bookSeats(v: Seat[]) {
  console.log(v);
}

onMounted(async () => {
  await cinemaStore.fetchMovies();
});
</script>
