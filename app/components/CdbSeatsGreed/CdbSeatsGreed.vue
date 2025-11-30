<template>
  <div class="cdb-seats-greed">
    <!-- Заголовок с номерами мест -->
    <div class="cdb-seats-greed__head">
      <div class="cdb-seats-greed__empty" />
      <div
        v-for="seatNum in seats.seatsPerRow"
        :key="`header-${seatNum}`"
        class="cdb-seats-greed__seat-number"
      >
        {{ seatNum }}
      </div>
    </div>

    <!-- Ряды с местами -->
    <div
      v-for="row in seats.rows"
      :key="`row-${row}`"
      class="cdb-seats-greed__seat-row"
    >
      <!-- Номер ряда -->
      <div class="cdb-seats-greed__row-number">
        {{ `Ряд ${row}` }}
      </div>

      <!-- Места в ряду -->
      <div
        v-for="seatNum in seats.seatsPerRow"
        :key="`seat-${row}-${seatNum}`"
        class="cdb-seats-greed__seat-cell"
      >
        <input
          :id="`seat-${row}-${seatNum}`"
          type="checkbox"
          :disabled="isSeatBooked(row, seatNum)"
          class="cdb-seats-greed__seat-checkbox"
          @change="onSeatSelect(row, seatNum)"
        />
        <label
          :for="`seat-${row}-${seatNum}`"
          :class="[
            'cdb-seats-greed__seat-label',
            {
              'cdb-seats-greed__seat-label--booked': isSeatBooked(row, seatNum),
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CdbSeatsGreedEmits, CdbSeatsGreedProps } from './types';

const { seats, bookedSeats } = defineProps<CdbSeatsGreedProps>();
const emit = defineEmits<CdbSeatsGreedEmits>();

const isSeatBooked = (rowNumber: number, seatNumber: number): boolean => {
  return bookedSeats.some(
    (seat) => seat.rowNumber === rowNumber && seat.seatNumber === seatNumber,
  );
};

const onSeatSelect = (rowNumber: number, seatNumber: number) => {
  if (!isSeatBooked(rowNumber, seatNumber)) {
    emit('select', { rowNumber, seatNumber });
  }
};
</script>

<style lang="scss">
@use './styles' as *;
</style>
