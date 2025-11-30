<template>
  <div class="cdb-cinema-info">
    <div class="cdb-cinema-info__head">
      <button class="cdb-movie-info__back" type="button" @click="emit('back')">
        <IcBack class="cdb-movie-info__back-icon" />
      </button>
      <h1 class="cdb-movie-info__title">{{ currentCinema.name }}</h1>
    </div>

    <div>
      <div
        v-for="date in sessionsByDateAndMovie.availableDates"
        :key="date"
        class="cdb-cinema-info__section cdb-cinema-info-section"
      >
        <div class="cdb-cinema-info-section__date">{{ date }}</div>
        <div
          v-for="movieId in sessionsByDateAndMovie[date]?.availableMovies"
          :key="movieId"
          class="cdb-cinema-info-section__movie"
        >
          <NuxtImg
            v-if="moviesMap?.[movieId]?.posterImage"
            :src="getImageSrc(moviesMap[movieId].posterImage)"
            class="cdb-cinema-info-section__poster"
          />
          <IcImgStub v-else class="cdb-cinema-info-section__stub" />
          <div class="cdb-cinema-info-section__movie-name">
            {{ moviesMap?.[movieId]?.title }}
          </div>
          <div class="cdb-cinema-info-section__btns">
            <CdbButton
              v-for="session in sessionsByDateAndMovie?.[date]?.[movieId]"
              :key="session.id"
              :text="session.formattedTime"
              class="cdb-cinema-info-section__btn"
              @click="
                emitBooking({
                  id: session.id,
                  movieTitle: moviesMap?.[movieId]?.title,
                  date: date,
                  time: session.formattedTime,
                })
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IcBack from '~/assets/icons/back.svg';
import IcImgStub from '~/assets/icons/img.svg';
import type { SessionInfoForBooking } from '~/types';
import { getImageSrc } from '~/utils/image';
import { mapSessionsByDateAndMovie } from '~/utils/sessions';
import type { CdbCinemaInfoEmits, CdbCinemaInfoProps } from './types';

const { currentCinema, sessions, moviesMap } =
  defineProps<CdbCinemaInfoProps>();
const emit = defineEmits<CdbCinemaInfoEmits>();

const sessionsByDateAndMovie = computed(() => {
  return mapSessionsByDateAndMovie(sessions);
});

function emitBooking({ id, movieTitle, date, time }: SessionInfoForBooking) {
  emit('booking', {
    id,
    cinemaName: currentCinema.name,
    date,
    time,
    movieTitle,
  });
}
</script>

<style lang="scss">
@use './styles' as *;
</style>
