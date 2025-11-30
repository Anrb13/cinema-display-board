import type { UserInfo } from './types';

export default (baseURL: string) => ({
  /**
   * Аутентификация пользователя и получение JWT токена.
   * @see http://localhost:3022/api-docs/#/Auth/post_login
   */
  async login({ username, password }: UserInfo) {
    const { token }: { token: string } = await $fetch(`/login`, {
      baseURL,
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
    const { token }: { token: string } = await $fetch(`/register`, {
      baseURL,
      method: 'POST',
      body: { username, password },
    });

    return token;
  },
});
