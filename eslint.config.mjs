// @ts-check
import stylistic from '@stylistic/eslint-plugin-ts'
import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintPluginImport from 'eslint-plugin-import'

export default tsEslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...tsEslint.configs.stylistic,
  {
    plugins: {
      'stylistic': stylistic,
      'import': eslintPluginImport
    },
    rules: {
      'semi': ['warn', 'never'],
      'quotes': ['error', 'single'],
      'import/extensions': ['error', 'never', { 'ts': 'always' }],
      'stylistic/object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_'
        }
      ]
    }
  }
)
