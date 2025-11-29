import withNuxt from './.nuxt/eslint.config.mjs';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vueEslintParser from 'vue-eslint-parser';

export default withNuxt({
  plugins: {
    vue: pluginVue,
    prettier: eslintPluginPrettierRecommended,
  },
  rules: {
    'max-len': [
      'error',
      {
        code: 80,
        ignoreUrls: true, // Игнорировать URLs
        ignoreStrings: true, // Игнорировать строки
        ignoreTemplateLiterals: true, // Игнорировать шаблонные строки
        ignoreRegExpLiterals: true, // Игнорировать регулярные выражения
        ignoreComments: true, // ИГНОРИРОВАТЬ КОММЕНТАРИИ
        ignoreTrailingComments: true, // Игнорировать комментарии в конце строк \
      },
    ],
    'vue/no-multiple-template-root': 'off',
  },
  languageOptions: {
    parser: vueEslintParser,
  },
});
