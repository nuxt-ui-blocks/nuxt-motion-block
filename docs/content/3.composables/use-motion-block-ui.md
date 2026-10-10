---
title: useMotionBlockUI
description: Resolve a component's ui slots against its tailwind-variants theme and app.config overrides.
navigation:
  icon: i-lucide-swatch-book
---

# useMotionBlockUI

`useMotionBlockUI` is the composable behind every component's [`ui` prop](/getting-started/theming). It takes a component's `tailwind-variants` theme, merges the user's `app.config.ui.<name>` overrides into it, and returns a `tv` instance you can call once per slot.

Use it when you author a component that should follow the same theming contract as the rest of Nuxt Motion Block — a `ui` prop for per-slot overrides, `class` for the primary slot, and app-wide defaults from `app.config`.

## Usage

```vue
<script setup lang="ts">
import { useMotionBlockUI } from 'nuxt-motion-block/runtime/composables/useMotionBlockUI'
import spotlight from 'nuxt-motion-block/runtime/theme/spotlight'

const props = withDefaults(defineProps<{
  class?: string
  ui?: Record<string, any>
}>(), {
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'spotlight',
  props,
  theme: spotlight,
})
</script>

<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })" />
</template>
```

Call the returned `ui` instance per slot (`ui.root(...)`, `ui.header(...)`) rather than reading `ui.value` directly, so the slot's variant and `class` arguments are applied.

## Parameters

::field-group
  ::field{name="name" type="string"}
  The component name, also used as the `app.config` key (`ui.<name>`). Use the camelCase name, e.g. `magneticButton`.
  ::

  ::field{name="props" type="object"}
  The component's raw props. They are passed through `useComponentProps`, so an explicit prop wins over the `UTheme` component prop and the `app.config` value.
  ::

  ::field{name="theme" type="object"}
  The component's `tailwind-variants` theme, usually imported from `nuxt-motion-block/runtime/theme`.
  ::
::

## Returns

::field-group
  ::field{name="props" type="object"}
  The props resolved through `useComponentProps`, with precedence `prop` > `UTheme` > `app.config`.
  ::

  ::field{name="ui" type="ComputedRef"}
  The component's `tv` instance, extended with the user's `app.config.ui.<name>` overrides. Call it per slot in the template.
  ::
::
