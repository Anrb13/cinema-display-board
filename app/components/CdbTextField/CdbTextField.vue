<template>
  <div class="cdb-textfield">
    <label
      :class="['cdb-textfield__label', error && 'cdb-textfield__label--error']"
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      :value="text"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :label="label"
      :class="['cdb-textfield__input', error && 'cdb-textfield__input--error']"
      :type="type"
      @focus="emit('update:error', '')"
      @input="(event) => emitUpdateText(event.target)"
    />
    <span v-if="error" class="cdb-textfield__error">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { CdbTExtFieldEmits, CdbTextFieldProps } from './types';

const {
  text,
  placeholder = 'Введите текст',
  label,
  error,
  autocomplete,
  type,
} = defineProps<CdbTextFieldProps>();
const emit = defineEmits<CdbTExtFieldEmits>();

function emitUpdateText(target: EventTarget | null) {
  const { value } = target as HTMLInputElement;
  emit('update:text', value.replace(/\s/g, ''));
}
</script>

<style lang="scss">
@use './styles' as *;
</style>
