---
title: Core Concepts
description: The mental model behind Nuxt Motion Block — motion, theming and reduced motion.
---

Nuxt Motion Block is a thin layer over [Motion for Vue](https://motion.dev) and Nuxt UI. Three ideas are worth understanding before you read any component page.

## Motion model

Interactive props (hover, gestures, drag) animate with springs — stiffness and damping, not a fixed duration — because the animation has to track a moving target. Deterministic transitions (enter, exit, layout) use short eased tweens. Scroll-linked effects scrub directly against scroll progress instead of triggering once, so the page and the animation move on the same timeline.

Each component documents only its own props. Timing, spring and scroll behaviour comes from Motion for Vue; when a page exposes `duration`, `delay` or `spring` props, those pass through to it.

## Theming and the `ui` prop

Components read Nuxt UI's design tokens instead of hardcoding values — swap the palette in `app.config.ts` and the kit repaints with it. Per instance, classes go through the `ui` prop; app-wide, through `ui.<componentName>` in `app.config.ts`. Precedence matches Nuxt UI: explicit prop > `UTheme` > `app.config` > built-in default, resolved by `useMotionBlockUI`.

## Reduced motion

Components that loop or paint heavily gate their animation behind `prefers-reduced-motion`, using Motion for Vue's `useReducedMotion`. If an effect carries meaning, it degrades rather than disappears. If you compose your own motion on top, read the same signal — the kit won't stop you from ignoring it.

## SSR and hydration

DOM-animated components render their final state on the server and hydrate on the client; there is no layout shift between the two. Paint-heavy canvases (flow fields, liquid metal, fluid simulation) render nothing until mounted, so they never block first paint.

## Next steps

- [Installation](/getting-started/installation) - add the module to a Nuxt 4 app.
- [Theming](/getting-started/theming) - the `ui` prop and `app.config.ts` in detail.
- [Components](/components) - every page follows the same shape.
