import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'max-len': ['error', { code: 80 }],
    ignoreUrls: true, // Игнорировать URLs
    ignoreStrings: true, // Игнорировать строки
    ignoreTemplateLiterals: true, // Игнорировать шаблонные строки
    ignoreRegExpLiterals: true, // Игнорировать регулярные выражения
    ignoreComments: true, // ИГНОРИРОВАТЬ КОММЕНТАРИИ
    ignoreTrailingComments: true, // Игнорировать комментарии в конце строк
  },
});
