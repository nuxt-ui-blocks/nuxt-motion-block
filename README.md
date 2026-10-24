# Nuxt Motion Block

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Copy-paste motion for Vue: springs, gestures, 3D, and scroll, all themed by your Nuxt UI design tokens and powered by `motion-v`.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [📖 &nbsp;Documentation](https://nuxt-motion-block.pages.dev/)
- [🌐 &nbsp;Live Preview](https://nuxt-motion-block.pages.dev/)

<p align="center">
  <a href="https://nuxt-motion-block.pages.dev/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://nuxt-motion-block.pages.dev/docs-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="https://nuxt-motion-block.pages.dev/docs-light.png">
      <img src="https://nuxt-motion-block.pages.dev/docs-dark.png" alt="Nuxt Motion Block Documentation Preview" />
    </picture>
  </a>
</p>

## ✨ Features

- 🎨 &nbsp;**260+ Motion-Enhanced Components**: 3D primitives, AI chat interfaces, animated backgrounds, interactive cards, carousels, text/number effects, and full production templates.
- ⚡ &nbsp;**Powered by motion-v**: Smooth, performant spring physics, gestures, and layout animations.
- 🧩 &nbsp;**Theme-Aware Integration**: Inherits Nuxt UI design tokens automatically with zero configuration overrides.
- 🛠️ &nbsp;**Auto-Registered**: Components register instantly under your configurable prefix (default: `M`).
- 🌐 &nbsp;**Accessibility First**: Respects `prefers-reduced-motion` and provides full keyboard and screen-reader navigation.

## 🚀 Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-motion-block
```

That's it! You can now use any Nuxt Motion Block component in your app with zero extra imports.

## 📦 Component Families

- **AI Interfaces**: Chat surfaces, streaming reasoning traces, tool calls, citations, task lists, and expressive AI orbs.
- **3D & Depth**: Interactive tilt cards, perspective text, and 3D scenes.
- **Backgrounds & Visual Effects**: Aurora curtains, spotlight beams, border trails, dither charts, and pixelated canvases.
- **Forms & Inputs**: Animated OTP inputs, floating labels, countries pickers, and scrubbers.
- **Text & Number Effects**: Rolling text, scramble reveals, shimmers, and wave typography.

## 💻 Local Development

<details>
  <summary>Developer Workflow</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with playground
  npm run dev
  
  # Run type checking
  npm run typecheck
  
  # Run tests
  npm run test
  ```

</details>

---

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-motion-block/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-motion-block

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-motion-block.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-motion-block

[license-src]: https://img.shields.io/npm/l/nuxt-motion-block.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-motion-block

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
