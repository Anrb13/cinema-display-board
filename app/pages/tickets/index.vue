<template>
  <div class="cdb-tickets">
    <h1 class="cdb-tickets__title">Мои билеты</h1>
    <template v-if="bookingList.length">
      <div v-if="mappedBookingList.unpaid.length" class="cdb-tickets__block">
        <div class="cdb-tickets__block-title">Неоплаченные</div>
        <CdbBookingLine
          v-for="item in mappedBookingList.unpaid"
          :key="item.id"
          :item="item"
          class="cdb-booking-lines__item"
          @pay="bookingPay"
          @end="onEndOfPaymentTimer"
        />
      </div>

      <div v-if="mappedBookingList.future.length" class="cdb-tickets__block">
        <div class="cdb-tickets__block-title">Будущие</div>
        <CdbBookingLine
          v-for="item in mappedBookingList.future"
          :key="item.id"
          :item="item"
          is-paid
          class="cdb-booking-lines__item"
          @pay="bookingPay"
        />
      </div>

      <div v-if="mappedBookingList.past.length" class="cdb-tickets__block">
        <div class="cdb-tickets__block-title">Прошедшие</div>
        <CdbBookingLine
          v-for="item in mappedBookingList.past"
          :key="item.id"
          :item="item"
          is-paid
          class="cdb-booking-lines__item"
          @pay="bookingPay"
        />
      </div>
    </template>

    <div v-else class="cdb-tickets__empty">
      У вас нет сохраненных билетов.<br />
      Самое время выбрать
      <a href="/" class="cdb-tickets__empty-link"> что посмотреть </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isPast } from 'date-fns';
import { useApi } from '~/api';
import type { UserBooking } from '~/api/users/types';
import { useErrorHadler } from '~/composables/errorHandler';
import { useBaseStore } from '~/stores/base';
import { useCinemaStore } from '~/stores/cinema';
import type { MappedBookingList, MovieSessionsInfo } from '~/types';

definePageMeta({
  middleware: 'auth',
});

const api = useApi();
const cinemaStore = useCinemaStore();
const notify = useNotification();
const errorHadler = useErrorHadler();
const baseStore = useBaseStore();

const bookingList = ref<UserBooking[]>([]);

function mapBookings(arr: UserBooking[], movieSessionsInfo: MovieSessionsInfo) {
  return arr.reduce(
    (acc, it) => {
      if (
        it.movieSessionId &&
        isPast(movieSessionsInfo?.[it.movieSessionId]?.startTime || '')
      ) {
        acc.past.push(it);
      } else if (!it.isPaid) {
        acc.unpaid.push(it);
      } else {
        acc.future.push(it);
      }
      return acc;
    },
    {
      unpaid: [],
      future: [],
      past: [],
    } as MappedBookingList,
  );
}
const mappedBookingList = computed(() =>
  mapBookings(bookingList.value, cinemaStore.movieSessionsInfo),
);

async function fetchUserBookings() {
  bookingList.value = await api.users.getUserBookings();
}

async function onEndOfPaymentTimer() {
  notify.info({
    message:
      'Отведенное время на оплату прошло, начните процесс бронирования заново',
    color: 'yellow',
  });
  setTimeout(() => fetchUserBookings(), 2000);
}

async function bookingPay(bookingId: UserBooking['id']) {
  try {
    const message = await api.bookings.bookingPayById(bookingId);
    notify.success({
      message,
      color: 'green',
    });
    await fetchUserBookings();
  } catch (e) {
    errorHadler.handle(e);
  }
}

onMounted(async () => {
  baseStore.setLoading(true);
  await fetchUserBookings();

  // Заполняем мапы фильмов и кинотеатров, чтобы взять нужную нам информацию
  await cinemaStore.fetchMovies();
  await cinemaStore.fetchCinemas();
  // Заполняем мапу информации о сеансах, чтобы взять movieId и cinemaId !DISC
  await Promise.all(
    bookingList.value.map((item) =>
      cinemaStore.fetchMovieSessionInfo(item.movieSessionId, false),
    ),
  );
  baseStore.setLoading(false);
});
</script>

<style lang="scss">
@use './styles' as *;
</style>
