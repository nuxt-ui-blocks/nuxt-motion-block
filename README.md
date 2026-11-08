# Nuxt Motion Block

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

**Current version: v0.2.0** — see the [changelog](./CHANGELOG.md) for release notes. Supports Nuxt 4, Vue 3 + Vite, Laravel + Inertia and AdonisJS + Inertia.

292 animated Vue components for Nuxt UI — springs, staggers, scroll and 3D that inherit your design tokens. Powered by `motion-v`.

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

- 🎨 &nbsp;**292 Motion-Enhanced Components**: 3D primitives, AI chat interfaces, animated backgrounds, interactive cards, carousels, text/number effects, and full production templates.
- ⚡ &nbsp;**Powered by motion-v**: Smooth, performant spring physics, gestures, and layout animations.
- 🧩 &nbsp;**Theme-Aware Integration**: Inherits Nuxt UI design tokens automatically with zero configuration overrides.
- 🛠️ &nbsp;**Auto-Registered**: Components register instantly under your configurable prefix (default: `M`).
- 🌐 &nbsp;**Accessibility First**: Respects `prefers-reduced-motion` and provides full keyboard and screen-reader navigation.

## 🚀 Quick Setup

Pick the install that matches your app (all four are covered out of the box, no Nuxt required except for the module path):

| Framework | Install | Entry point |
| --------- | ------- | ----------- |
| **Nuxt 4** | `npx nuxi module add nuxt-motion-block` | auto-imported as `M*` |
| **Vue 3 + Vite** | `pnpm add nuxt-motion-block @nuxt/ui motion-v` + `app.use(motionBlock)` | `nuxt-motion-block/vue-plugin` |
| **Laravel + Inertia** | same as Vue (Laravel Vite plugin alongside) | s/o above |
| **AdonisJS + Inertia** | same as Vue (Adonis Vite plugin instead of Laravel's) | s/o above |

### Nuxt

```bash
npx nuxi module add nuxt-motion-block
```

Prerequisites: Nuxt 4, [@nuxt/ui](https://ui.nuxt.com) ^4.11.2 and [motion-v](https://motion.dev) ^2.4.4 (they are registered automatically by `nuxi module add`). You can now use any Nuxt Motion Block component in your app with zero extra imports.

### Vue / Laravel / AdonisJS

```bash
pnpm add nuxt-motion-block @nuxt/ui motion-v tailwindcss
```

```ts
import ui from '@nuxt/ui/vue-plugin'
import motionBlock from 'nuxt-motion-block/vue-plugin'

app.use(ui)
app.use(motionBlock)
```

See [/getting-started/vue](https://nuxt-motion-block.pages.dev/getting-started/vue) and [/getting-started/laravel](https://nuxt-motion-block.pages.dev/getting-started/laravel) for the complete wiring (all docs pages cross-reference each other).

### Commands (pnpm / npm / yarn / bun)

| Manager | Nuxt 4 | Vue 3 + Vite / Laravel / AdonisJS |
| ------- | ------ | ---------------------------------- |
| pnpm | `npx nuxi module add nuxt-motion-block` | `pnpm add nuxt-motion-block @nuxt/ui motion-v tailwindcss` |
| npm | `npx nuxi module add nuxt-motion-block` | `npm install nuxt-motion-block @nuxt/ui motion-v tailwindcss` |
| yarn | `npx nuxi module add nuxt-motion-block` | `yarn add nuxt-motion-block @nuxt/ui motion-v tailwindcss` |
| bun | `bunx nuxi module add nuxt-motion-block` | `bun add nuxt-motion-block @nuxt/ui motion-v tailwindcss` |

`nuxi module add` also registers `@nuxt/ui` and `motion-v` in `nuxt.config.ts` for you. If you would rather add the module by hand, install the peers yourself (`pnpm add nuxt-motion-block @nuxt/ui motion-v`) and register all three modules yourself. Plain-Vue apps wire it up through `vite.config.ts` plus `app.use(ui).use(motionBlock)` — see the guides linked above or paste the prompt below into your AI agent.


## AI Agents

Paste this into Claude Code, Cursor, Amp, opencode or any other AI coding agent and it will install Nuxt Motion Block for you.

**Nuxt 4**

```text
Add Nuxt Motion Block to this Nuxt 4 project.
1. Run `npx nuxi module add nuxt-motion-block`.
2. Register the modules in `nuxt.config.ts`: `modules: ['@nuxt/ui', 'motion-v/nuxt', 'nuxt-motion-block']`.
3. Pin `@nuxt/ui >= 4.11.2` and `motion-v >= 2.4.4`.
4. Components are auto-imported with an M prefix (`<MAnimatedBackground>`, `<MTextGlitch>`).
5. Before using a component, read its page with the `list-pages` / `get-page` tools from the `nuxt-motion-block` MCP server (`npx nuxt-motion-block-mcp`), or at `https://nuxt-motion-block.pages.dev/raw/components/<category>/<name>.md`. Do not guess its props, events or slots.
```

**Vue 3 / Laravel / AdonisJS**

```text
Add Nuxt Motion Block to this Vue app (works for Laravel, AdonisJS and plain Vite too).
1. Run `pnpm add nuxt-motion-block @nuxt/ui motion-v tailwindcss`.
2. Add `ui()` from `@nuxt/ui/vite` to `vite.config.ts` and register the plugins in your entry: `app.use(ui).use(motionBlock)`.
3. Pin `@nuxt/ui >= 4.11.2` and `motion-v >= 2.4.4`.
4. All components are globally registered with an M prefix (`<MAnimatedBackground>`, `<MTextGlitch>`). For `ui.<name>` slot overrides matching Nuxt UI, pass `ui` to the plugin: `app.use(motionBlock, { ui })`.
5. Before using a component, read its page with the `list-pages` / `get-page` tools from the `nuxt-motion-block` MCP server (`npx nuxt-motion-block-mcp`), or at `https://nuxt-motion-block.pages.dev/raw/components/<category>/<name>.md`. Do not guess its props, events or slots.
```

Full guide: [Installing with an AI agent](https://nuxt-motion-block.pages.dev/getting-started/ai-agents).


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
  pnpm dev:prepare

  # Develop with playground
  pnpm dev

  # Run type checking
  pnpm test:types

  # Run tests
  pnpm test
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
