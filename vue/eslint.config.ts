import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['netlify.toml', 'netlify/functions/slack/slack.js'],
})
// Your custom configs here
