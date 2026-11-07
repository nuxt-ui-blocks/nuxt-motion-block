---
title: Guides
description: Walkthroughs for using Nuxt Motion Block — from a fresh Nuxt app to a page with motion that ships.
---

Short, task-shaped walkthroughs. Each one assumes Nuxt 4 and Nuxt UI v4 already installed.

## From install to first animation

Add the module with one command:

```bash
npx nuxi module add nuxt-motion-block
```

`nuxi module add` registers `@nuxt/ui`, `motion-v/nuxt` and `nuxt-motion-block` in `nuxt.config.ts`. If you add it manually instead, install the peer dependencies yourself and register the modules in the same order.

Then drop a component into a page:

```vue [app/pages/index.vue]
<script setup lang="ts">
useSeoMeta({ title: 'Motion Block' })
</script>

<template>
  <MRetroGrid class="absolute inset-0 -z-10 h-full" />

  <h1 class="text-4xl font-bold">Hello, motion.</h1>
  <MTextShimmer class="text-lg text-muted">
    Motion that reads your tokens.
  </MTextShimmer>
</template>
```

## Check three things before shipping

- **Reduced motion** - toggle `prefers-reduced-motion` in your browser's rendering panel. Loops should stop; no content should stay hidden.
- **SSR** - disable JavaScript and reload. Text content must still be there; animation is hydration, not decoration that blocks reading.
- **Paint cost** - below-the-fold canvases (`PixelFlowField`, `LiquidMetal`) mount eagerly. Push them behind a scroll trigger, or they trade your first paint for decoration.

## Next steps

- [Installation](/getting-started/installation) - the prerequisites and manual setup.
- [Core Concepts](/core-concepts) - how the motion model fits together.
- [Components](/components) - the index of everything installed.
