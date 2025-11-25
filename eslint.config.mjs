// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {"rules": {"max-len": ["error", { "code": 80 }]}}
)
