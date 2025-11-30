<template>
  <div class="cdb-movie-info">
    <div class="cdb-movie-info__head">
      <button class="cdb-movie-info__back" type="button" @click="emit('back')">
        <IcBack class="cdb-movie-info__back-icon" />
      </button>
      <h1 class="cdb-movie-info__title">{{ currentMovie.title }}</h1>
    </div>
    <div class="cdb-movie-info__content">
      <NuxtImg
        :src="getImageSrc(currentMovie.posterImage)"
        class="cdb-movie-info__poster"
      />
      <div class="cdb-movie-info__info">
        <span class="cdb-movie-info__desc">
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

    <div class="cdb-movie-info__sessions">
      <div
        v-for="date in sessionsByDate.availableDates"
        :key="date"
        class="cdb-movie-info__section cdb-movie-info-section"
      >
        <div class="cdb-movie-info-section__date">{{ date }}</div>
        <div
          v-for="cinemaId in sessionsByDate[date]?.availableCinemas"
          :key="cinemaId"
          class="cdb-movie-info-section__cinema"
        >
          <div class="cdb-movie-info-section__cinema-name">
            {{ cinemasMap?.[cinemaId]?.name }}
          </div>
          <CdbButton
            v-for="session in sessionsByDate?.[date]?.[cinemaId]"
            :key="session.id"
            :text="session.formattedTime"
            @click="
              emitBooking({
                id: session.id,
                cinemaName: cinemasMap?.[cinemaId]?.name,
                date: date,
                time: session.formattedTime,
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IcBack from '~/assets/icons/back.svg';
import { getImageSrc } from '~/utils/image';
import { mapSessionsByDate } from '~/utils/sessions';
import type {
  CdbMovieInfoEmits,
  CdbMovieInfoProps,
  SessionInfoForBooking,
} from './types';

const { currentMovie, sessions, cinemasMap } = defineProps<CdbMovieInfoProps>();
const emit = defineEmits<CdbMovieInfoEmits>();

const sessionsByDate = computed(() => {
  return mapSessionsByDate(sessions);
});

function emitBooking({ id, cinemaName, date, time }: SessionInfoForBooking) {
  emit('booking', {
    id,
    cinemaName,
    date,
    time,
    movieTitle: currentMovie.title,
  });
}
</script>

<style lang="scss">
@use './styles' as *;
</style>
