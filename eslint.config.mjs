import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'

/**
 * @type {import('typescript-eslint').Config}
 */
export default [
  js.configs.recommended,
  {
    ...eslintPluginPrettierRecommended,
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
    ignores: ['dist/*'],
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  {
    plugins: {
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
    },
  },
  {
    ignores: [
      '.prettierrc.js',
      '.prettierrc.cjs',
      'postcss.config.js',
      'tailwind.config.js',
      'vite.config.js',
      'eslint.config.mjs',
      'vitest.config*.mjs',
      '*.min.js',
      'server.js',
      'webpack.config.js',
      'jest.config.js',
    ],
  },
  {
    // Checks if some imports are not being used, also auto removes them on fix
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]
