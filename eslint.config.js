import eslintPluginAstro from 'eslint-plugin-astro';
export default [
  { ignores: ['.astro/'] },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
];
