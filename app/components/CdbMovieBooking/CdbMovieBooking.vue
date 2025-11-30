<template>
  <div class="cdb-movie-booking">
    <div class="cdb-movie-booking__head">
      <button class="cdb-movie-booking__back" @click="emit('back')">
        <IcBack class="cdb-movie-booking__icon" />
      </button>
      <h1 class="cdb-movie-booking__title">Выбрать места</h1>
    </div>
    <div class="cdb-movie-booking__desc">
      <span>{{ `Фильм: ${info.movieTitle}` }}</span>
      <span>{{ `Кинотеатр: ${info.cinemaName}` }}</span>
      <span>{{ `Время: ${info.date}, ${info.time}` }}</span>
    </div>
    <CdbSeatsGreed
      :seats="movieSessionInfo.seats"
      :booked-seats="movieSessionInfo.bookedSeats"
      @select="selectSeat"
    />
    <CdbButton
      text="Забронировать"
      class="cdb-movie-booking__submit"
      @click="emit('book', selectedSeats)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Seat } from '~/api/movieSessions/types';
import IcBack from '~/assets/icons/back.svg';
import type { CdbMovieBookingEmits, CdbMovieBookingProps } from './types';

const { info, movieSessionInfo } = defineProps<CdbMovieBookingProps>();
const emit = defineEmits<CdbMovieBookingEmits>();

const selectedSeats = ref<Seat[]>([]);

function selectSeat(seat: Seat) {
  const index = selectedSeats.value.findIndex(
    (s) => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber,
  );

  if (index > -1) {
    // Удаляем место, если оно уже выбрано
    selectedSeats.value.splice(index, 1);
  } else {
    // Добавляем место, если его нет в списке
    selectedSeats.value.push(seat);
  }
}
</script>

<style lang="scss">
@use './styles' as *;
</style>
