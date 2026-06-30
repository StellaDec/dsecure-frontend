import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default tseslint.config(
  { ignores: ['dist', '.venv', 'node_modules', 'scripts', 'public', '**/*.backup.*'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/no-danger': 'warn',
      'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/utils/api',
              message: 'Use @/utils/enhancedApiClient instead of legacy api.ts for secure communication.'
            },
            {
              name: '../utils/api',
              message: 'Use @/utils/enhancedApiClient instead of legacy api.ts for secure communication.'
            }
          ]
        }
      ]
    },
  },
)
