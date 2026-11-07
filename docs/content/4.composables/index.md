---
title: Composables
description: The composables Nuxt Motion Block auto-imports — theme colors, canvas cursors and ui slot resolution.
---


Every file under `runtime/composables/` is registered with Nuxt's `imports:dirs`, so the composables below can be called from your components without an import line. Only the four listed here are part of the documented API; the rest of that directory is internal and can change between releases.

## Available composables

- [useMotionBlockUI](/composables/use-motion-block-ui) - merges a component's `tv` theme with your `app.config.ts` `ui` overrides, in the same precedence Nuxt UI uses: explicit prop > `UTheme` > `app.config`.
- [useThemeColor](/composables/use-theme-color) - reads a theme token as a resolved color, SSR-safe. When the value is a plain literal it passes through unchanged, so server and first client render agree; use the `useResolved*` helpers when you need the computed style property instead of the raw token.
- [useCanvasCursor](/composables/use-canvas-cursor) - the wave-trail pointer effect behind the canvas components. It owns the requestAnimationFrame loop and cancels it on unmount.
- [useFluidCursor](/composables/use-fluid-cursor) - a WebGL fluid simulation bound to a canvas ref. Pass `{ color }` to tint the dye; without it, it reads the current theme's primary color.

## Calling them

```vue
<script setup lang="ts">
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas')
useCanvasCursor(canvasRef)
</script>
```

`useFluidCursor` and `useCanvasCursor` expect a canvas to attach to. Pass a template ref (as above) or a plain ref; both read `.value` on mount. `useMotionBlockUI` and `useThemeColor` are plain functions — call them inside `<script setup>` and use their return values in the template.

## Next steps

- [Theming](/getting-started/theming) - the `ui` prop and `app.config.ts` overrides that `useMotionBlockUI` resolves.
- [Getting started](/getting-started) - installing the module.
