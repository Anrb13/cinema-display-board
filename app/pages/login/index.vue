<template>
  <div class="cdb-login">
    <h1 class="cdb-login__title">{{ texts.title }}</h1>
    <CdbTextField
      v-model:text="model.username"
      v-model:error="errors.username"
      label="Логин"
      placeholder="Введите логин"
      class="cdb-login__textfield"
      autocomplete="username"
    />
    <CdbTextField
      v-model:text="model.password"
      v-model:error="errors.password"
      label="Пароль"
      placeholder="Введите пароль"
      class="cdb-login__textfield"
      :autocomplete="passwordAutocomplete"
      type="password"
    />
    <CdbTextField
      v-if="!isAuthMode"
      v-model:text="model.verifiedPassword"
      v-model:error="errors.verifiedPassword"
      label="Подтверждение пароля"
      placeholder="Введите пароль повторно"
      class="cdb-login__textfield"
      :autocomplete="passwordAutocomplete"
      type="password"
    />
    <CdbButton
      :text="texts.button"
      class="cdb-login__btn"
      :disabled="submitDisabled"
      @click="submit"
    />
    <div class="cdb-login__info">
      {{ texts.info }}
      <button type="button" class="cdb-login__info-btn" @click="toggleMode">
        {{ texts.infoBtn }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import {
  validateLogin,
  validatePassword,
  validateVerifiedPassword,
} from '~/utils/validation';

const authStore = useAuthStore();

const isAuthMode = ref(true);

const model = reactive({
  username: '',
  password: '',
  verifiedPassword: '',
});

const errors = reactive({
  username: '',
  password: '',
  verifiedPassword: '',
});

const texts = computed(() =>
  isAuthMode.value
    ? {
        title: 'Вход',
        button: 'Войти',
        info: 'Если у вас нет аккаунта -',
        infoBtn: 'зарегистрируйтесь',
      }
    : {
        title: 'Регистрация',
        button: 'Зарегистрироваться',
        info: 'Если вы уже зарегистрированы -',
        infoBtn: 'войдите',
      },
);

const submitDisabled = computed(
  () =>
    !model.username ||
    !model.password ||
    (!isAuthMode.value && !model.verifiedPassword),
);

const isFormValid = computed(
  () =>
    !errors.username &&
    !errors.password &&
    (isAuthMode.value || !errors.verifiedPassword),
);

const passwordAutocomplete = computed(() =>
  isAuthMode.value ? 'current-password' : 'new-password',
);

function toggleMode() {
  isAuthMode.value = !isAuthMode.value;
  errors.username = '';
  errors.password = '';
  errors.verifiedPassword = '';
}

function validateModel() {
  errors.username = validateLogin(model.username);
  errors.password = validatePassword(model.password);
  errors.verifiedPassword = validateVerifiedPassword(
    model.password,
    model.verifiedPassword,
  );
}

function submit() {
  const payload = {
    username: model.username,
    password: model.password,
  };
  validateModel();

  if (isFormValid.value) {
    if (isAuthMode.value) {
      authStore.login(payload);
    } else {
      authStore.register(payload);
    }
  }
}
</script>

<style lang="scss">
@use './styles' as *;
</style>
