import type { UserInfo } from './types';

const apiBaseUrl = useRuntimeConfig().public.apiBase;

export default {
  /**
   * Аутентификация пользователя и получение JWT токена.
   * @see http://localhost:3022/api-docs/#/Auth/post_login
   */
  async login({ username, password }: UserInfo) {
    const { token }: { token: string } = await $fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      body: { username, password },
    });

    return token;
  },

  /**
   * Регистрация нового пользователя в системе.
   * @see http://localhost:3022/api-docs/#/Auth/post_register
   */
  async register({ username, password }: UserInfo) {
    const { token }: { token: string } = await $fetch(
      `${apiBaseUrl}/register`,
      {
        method: 'POST',
        body: { username, password },
      }
    );

    return token;
  },
};
