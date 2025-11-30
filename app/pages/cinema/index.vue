<template>
  <CdbCinemaList
    v-if="pageMode === Mode.LIST"
    :key="Mode.LIST"
    :cinemas="cinemaStore.cinemas"
    @about="openCinemaInfo"
  />

  <CdbCinemaInfo
    v-if="pageMode === Mode.CINEMA && currentCinema && currentCinemaSessions"
    :key="Mode.CINEMA"
    :current-cinema="currentCinema"
    :sessions="currentCinemaSessions"
    :movies-map="cinemaStore.moviesMap"
    @back="pageMode = Mode.LIST"
    @booking="goToBooking"
  />

  <CdbMovieBooking
    v-if="pageMode === Mode.BOOKING && bookingInfo && currentMovieSessionInfo"
    :info="bookingInfo"
    :movie-session-info="currentMovieSessionInfo"
    @back="pageMode = Mode.CINEMA"
    @book="bookSeats"
  />
</template>

<script setup lang="ts">
import type { Cinema } from '~/api/cinemas/types';
import { useBooking } from '~/composables/booking';
import { useErrorHadler } from '~/composables/errorHandler';
import { useCinemaStore } from '~/stores/cinema';
import type { SessionInfoForBooking } from '~/types';

const enum Mode {
  LIST,
  CINEMA,
  BOOKING,
}

const cinemaStore = useCinemaStore();
const errorHandler = useErrorHadler();
const { bookingInfo, currentMovieSessionInfo, bookSeats } = useBooking();

const pageMode = ref<Mode>(Mode.LIST);
const currentCinema = ref<Cinema | undefined>(undefined);

const currentCinemaSessions = computed(() =>
  currentCinema.value?.id
    ? cinemaStore.movieSessions[currentCinema?.value?.id]
    : undefined,
);

async function openCinemaInfo(cinema: Cinema) {
  currentCinema.value = cinema;

  try {
    await cinemaStore.fetchMovies();
    await cinemaStore.fetchCinemaSessions(cinema.id);
    pageMode.value = Mode.CINEMA;
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

onMounted(async () => {
  await cinemaStore.fetchCinemas();
});
</script>
