import antfu from '@antfu/eslint-config'

export default antfu({
  gitignore: true,
  rules: {
    'antfu/no-import-dist': 'off',
  },
})
