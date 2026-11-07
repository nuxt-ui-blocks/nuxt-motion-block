import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // Nuxt entry (module)
    './src/module',
    // Vue-without-Nuxt entry: Vue plugin (app.use(motion)) with global M* registration
    './src/vue-plugin',
  ],
  externals: ['#build/ui', 'vite', /^\.\/runtime\/components\//],
})
