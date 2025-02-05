import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'eslint:recommended', // Базові правила ESLint
      'next/core-web-vitals', // Оптимізація для Core Web Vitals
      'next/typescript', // Додаткові правила для TypeScript
      'prettier', // Взаємодія з Prettier
      'plugin:@next/next/recommended', // Рекомендовані правила Next.js
    ],
    settings: {
      next: {
        rootDir: 'packages/my-app/',
      },
    },
    rules: {
      // Вимкнені або модифіковані правила
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-img-element': 'warn', // Попередження замість помилки
      '@next/next/no-typos': 'error', // Заборона помилок у Next.js API
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // Вимкнення правила no-explicit-any
    },
  }),
];

export default eslintConfig;
