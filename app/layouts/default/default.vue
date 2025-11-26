<template>
  <div class="cdb-layout">
    <nav class="cdb-nav">
      <ul class="cdb-nav__list">
        <li
          v-for="item in NAV_LIST"
          :key="item.path"
          :class="[
            'cdb-nav__item',
            checkIsCurrentPath(item.path) && 'cdb-nav__item--current',
          ]"
        >
          <NuxtLink
            :to="item.path"
            class="cdb-nav__link"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <section class="cdb-layout__content">
      <slot />
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const NAV_LIST = [
  { path: '/', title: 'Фильмы' },
  { path: '/cinema', title: 'Кинотеатры' },
  { path: '/tickets', title: 'Мои билеты' },
  { path: '/login', title: 'Вход' },
];

function checkIsCurrentPath(path: string) {
  return route.path === path;
}
</script>

<style lang="scss">
@use './styles' as *;
</style>
