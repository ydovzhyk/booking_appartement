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
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-typos': 'error',
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }),
];

const finalEslintConfig = {
  ...eslintConfig[0],
  ignores: ['node_modules', 'dist', '.next', 'public', 'coverage'],
};

export default finalEslintConfig;
