<template>
  <section>
    <h1>Авторизация</h1>

    <button @click="login">GAU</button>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

function login() {
  authStore.login({ username: 'gau', password: 'gau' });
}
</script>
