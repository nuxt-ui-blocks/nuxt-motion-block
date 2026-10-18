---
title: Composables
---

# Composables

Composables are reusable functions that encapsulate reactive logic and can be shared across components. They follow the Vue 3 Composition API pattern and provide a clean way to organize and share logic in your Nuxt application.

## What are Composables?

Composables in Nuxt Motion Block are utility functions that help you implement complex interactions and behaviors with minimal code. They abstract away the complexity of animations, event handling, and DOM manipulations.

## Getting Started

To use any composable, simply import it in your component:

```vue
<script setup>
import { useFluidCursor } from '#components'
</script>
```

Or if you have auto-imports configured:

```vue
<script setup>
const { cursor } = useFluidCursor()
</script>
```

Browse the sections to explore all available composables and learn how to integrate them into your projects.