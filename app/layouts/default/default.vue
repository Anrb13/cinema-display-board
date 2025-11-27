<template>
  <div class="cdb-layout">
    <nav class="cdb-nav">
      <ul class="cdb-nav__list">
        <li
          v-for="item in navList"
          :key="item.path"
          :class="[
            'cdb-nav__item',
            item.path &&
              checkIsCurrentPath(item.path) &&
              'cdb-nav__item--current',
          ]"
        >
          <NuxtLink
            v-if="item.path"
            :to="item.path"
            class="cdb-nav__link"
          >
            {{ item.title }}
          </NuxtLink>
          <button
            v-else
            class="cdb-nav__link"
            @click="authStore.logout"
          >
            {{ item.title }}
          </button>
        </li>
      </ul>
    </nav>
    <section class="cdb-layout__content">
      <slot />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const authStore = useAuthStore();

const loginRoute = computed(() =>
  authStore.isAuthenticated
    ? { title: 'Выход' }
    : { path: '/login', title: 'Вход' }
);

const navList = computed(() => [
  { path: '/', title: 'Фильмы' },
  { path: '/cinema', title: 'Кинотеатры' },
  { path: '/tickets', title: 'Мои билеты' },
  loginRoute.value,
]);

function checkIsCurrentPath(path: string) {
  return route.path === path;
}
</script>

<style lang="scss">
@use './styles' as *;
</style>
