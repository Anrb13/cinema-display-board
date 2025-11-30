<template>
  <button class="cdb-button" type="button">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import type { CdbButtonProps } from './types';

const { text } = defineProps<CdbButtonProps>();
</script>

<style lang="scss">
@use './styles' as *;
</style>
