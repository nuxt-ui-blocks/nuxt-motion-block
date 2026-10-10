---
title: Evervault Card
description: Cybersecurity-inspired card with dynamic gradient effects that follow cursor movement.
navigation:
  icon: i-lucide-shield
---

# Evervault Card

The Evervault Card component creates a cybersecurity-inspired card with dynamic gradient effects that follow cursor movement. It features a unique visual effect with animated text patterns and gradient overlays.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ever-vault-card-example" />
  :::
#code
```vue
<template>
  <MEverVaultCard gradient-colors="from-green-500 to-blue-700">
    <div class="space-y-4">
      <UIcon name="i-lucide-lock" class="w-8 h-8 text-white mx-auto" />
      <h3 class="text-xl font-bold text-white text-center">Secure Vault</h3>
      <p class="text-gray-300 text-center">Your data is protected with military-grade encryption</p>
    </div>
  </MEverVaultCard>
</template>
```
::

## Props

::field-group
  ::field{name="gradientColors" type="string" default="'from-green-500 to-blue-700'"}
  Tailwind CSS gradient classes for the card background.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the card.
  ::
  
  ::field{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::
::

## Examples

### Basic Ever Vault Card

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ever-vault-card-basic" />
  :::
#code
```vue
<template>
  <MEverVaultCard>
    <div class="space-y-4">
      <UIcon name="i-lucide-shield" class="w-8 h-8 text-white mx-auto" />
      <h3 class="text-xl font-bold text-white text-center">Basic Vault</h3>
      <p class="text-gray-300 text-center">Standard security protection</p>
    </div>
  </MEverVaultCard>
</template>
```
::

### With Custom Gradient

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ever-vault-card-gradient" />
  :::
#code
```vue
<template>
  <MEverVaultCard gradient-colors="from-red-500 to-pink-700 via-rose-400">
    <div class="space-y-4">
      <UIcon name="i-lucide-zap" class="w-8 h-8 text-white mx-auto" />
      <h3 class="text-xl font-bold text-white text-center">High Voltage</h3>
      <p class="text-gray-300 text-center">Maximum security with enhanced protection</p>
    </div>
  </MEverVaultCard>
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ever-vault-card-styled" />
  :::
#code
```vue
<template>
  <MEverVaultCard class="border-2 border-cyan-400">
    <div class="space-y-4">
      <UIcon name="i-lucide-diamond" class="w-8 h-8 text-cyan-400 mx-auto" />
      <h3 class="text-xl font-bold text-cyan-400 text-center">Premium Vault</h3>
      <p class="text-cyan-300 text-center">Luxury security with premium features</p>
    </div>
  </MEverVaultCard>
</template>
```
::

### With Interactive Content

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ever-vault-card-interactive" />
  :::
#code
```vue
<template>
  <MEverVaultCard>
    <div class="space-y-4 text-center">
      <UIcon name="i-lucide-key" class="w-8 h-8 text-white mx-auto" />
      <h3 class="text-xl font-bold text-white">Interactive Vault</h3>
      <p class="text-gray-300">Click the button to unlock premium features</p>
      <UButton color="white" variant="solid" size="sm" class="mt-2">Unlock</UButton>
    </div>
  </MEverVaultCard>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.everVaultCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'group/card relative overflow-hidden bg-transparent'` |
| `body` | `'w-full h-full bg-default'` |
| `overlay` | `'pointer-events-none absolute inset-0'` |
| `mask` | `'absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50'` |
| `gradient` | `'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500'` |
| `pattern` | `'absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100'` |
| `patternText` | `'absolute inset-x-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.everVaultCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `group/card relative overflow-hidden bg-transparent` |
| `body` | `w-full h-full bg-default` |
| `overlay` | `pointer-events-none absolute inset-0` |
| `mask` | `absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50` |
| `gradient` | `absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500` |
| `pattern` | `absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100` |
| `patternText` | `absolute inset-x-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.everVaultCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `group/card relative overflow-hidden bg-transparent` |
| `body` | `w-full h-full bg-default` |
| `overlay` | `pointer-events-none absolute inset-0` |
| `mask` | `absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50` |
| `gradient` | `absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500` |
| `pattern` | `absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100` |
| `patternText` | `absolute inset-x-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.everVaultCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `group/card relative overflow-hidden bg-transparent` |
| `body` | `w-full h-full bg-default` |
| `overlay` | `pointer-events-none absolute inset-0` |
| `mask` | `absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50` |
| `gradient` | `absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500` |
| `pattern` | `absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100` |
| `patternText` | `absolute inset-x-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500` |
