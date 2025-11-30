<template>
  <div class="cdb-booking-line">
    <div class="cdb-booking-line__info">
      <span v-if="movieName">{{ movieName }}</span>
      <span v-if="cinemaName">{{ cinemaName }}</span>
      <span>
        {{ `${formattedDate.dateString} ${formattedDate.timeString}` }}
      </span>
    </div>
    <div class="cdb-booking-line__seats">
      <span
        v-for="{ rowNumber, seatNumber } in item.seats"
        :key="`${rowNumber}-${seatNumber}`"
      >
        {{ `Ряд ${rowNumber}, место ${seatNumber}` }}
      </span>
    </div>
    <div class="cdb-booking-line__btn">
      <CdbButton
        v-if="paymentAvailable"
        text="Оплатить"
        @click="emit('pay', item.id)"
      />
    </div>
    <div class="cdb-booking-line__timer">
      <span v-if="paymentAvailable">{{ `Осталось ${formattedTime}` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBaseStore } from '~/stores/base';
import { useCinemaStore } from '~/stores/cinema';
import { formatDateAndTime, getRemainingPaymentSeconds } from '~/utils/date';
import type { CdbBookingEmits, CdbBookingLine } from './types';

const cinemaStore = useCinemaStore();
const baseStore = useBaseStore();

const { item, isPaid } = defineProps<CdbBookingLine>();
const emit = defineEmits<CdbBookingEmits>();

const timer = ref(
  getRemainingPaymentSeconds(
    item.bookedAt,
    baseStore.bookingPaymentTimeSeconds,
  ),
);

const intervalId = setInterval(() => {
  timer.value--;

  if (timer.value <= 0) {
    clearInterval(intervalId);
    emit('end');
  }
}, 1000);

const sessionInfo = computed(
  () => cinemaStore.movieSessionsInfo[item.movieSessionId],
);

const movieName = computed(() =>
  sessionInfo.value?.movieId
    ? cinemaStore.moviesMap[sessionInfo.value.movieId]?.title || ''
    : '',
);

const cinemaName = computed(() =>
  sessionInfo.value?.movieId
    ? cinemaStore.cinemasMap[sessionInfo.value.cinemaId]?.name || ''
    : '',
);

const sessionStartTime = computed(() => sessionInfo.value?.startTime || '');

const formattedDate = computed(() => formatDateAndTime(sessionStartTime.value));

const formattedTime = computed(() => {
  const minutes = Math.floor(timer.value / 60);
  const seconds = timer.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const paymentAvailable = computed(() => !isPaid && timer.value > 0);

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss">
@use './styles' as *;
</style>
