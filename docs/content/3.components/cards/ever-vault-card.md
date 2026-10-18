---
title: Evervault Card
description: Cybersecurity-inspired card with dynamic gradient effects that follow cursor movement.
---

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
      <UIcon
        name="i-lucide-lock"
        class="w-8 h-8 text-white mx-auto"
      />
      <h3 class="text-xl font-bold text-white text-center">
        Secure Vault
      </h3>
      <p class="text-dimmed text-center">
        Your data is protected with military-grade encryption
      </p>
    </div>
  </MEverVaultCard>
</template>
```
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
  <MEverVaultCard class="max-w-md mx-auto">
    <div class="space-y-8 p-8">
      <div class="flex justify-center">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
          <UIcon
            name="i-lucide-lock"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <div class="text-center">
        <h3 class="text-3xl font-bold text-white mb-4">
          Secure Vault
        </h3>
        <p class="text-dimmed mb-8">
          Enterprise-grade encryption and security protection for your most sensitive data
        </p>
      </div>
      <div class="space-y-4">
        <div class="flex items-center p-4 bg-default/10 backdrop-blur-sm rounded-lg hover:bg-default/20 transition-colors">
          <UIcon
            name="i-lucide-shield-check"
            class="w-6 h-6 text-green-400 mr-4"
          />
          <div>
            <h4 class="font-semibold text-white">
              256-bit AES Encryption
            </h4>
            <p class="text-dimmed text-sm">
              Military-grade security for your data
            </p>
          </div>
        </div>
        <div class="flex items-center p-4 bg-default/10 backdrop-blur-sm rounded-lg hover:bg-default/20 transition-colors">
          <UIcon
            name="i-lucide-key"
            class="w-6 h-6 text-primary mr-4"
          />
          <div>
            <h4 class="font-semibold text-white">
              Zero-Knowledge Architecture
            </h4>
            <p class="text-dimmed text-sm">
              We can't see your data, ever
            </p>
          </div>
        </div>
        <div class="flex items-center p-4 bg-default/10 backdrop-blur-sm rounded-lg hover:bg-default/20 transition-colors">
          <UIcon
            name="i-lucide-globe"
            class="w-6 h-6 text-purple-400 mr-4"
          />
          <div>
            <h4 class="font-semibold text-white">
              Global Compliance
            </h4>
            <p class="text-dimmed text-sm">
              GDPR, HIPAA, and SOC2 compliant
            </p>
          </div>
        </div>
      </div>
      <div class="pt-4 flex flex-col sm:flex-row gap-3">
        <UButton
          color="primary"
          variant="solid"
          block
        >
          Access Vault
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          block
        >
          Learn More
        </UButton>
      </div>
    </div>
  </MEverVaultCard>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="ever-vault-card-custom" />
  :::
#code
  <PlaygroundCode name="EverVaultCard" />
::

## Props

::component-props
  ::component-prop{name="gradientColors" type="string" default="'from-green-500 to-blue-700'"}
  Tailwind CSS gradient classes for the card background.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the card.
  ::
  
  ::component-prop{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.everVaultCard` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group/card relative overflow-hidden bg-transparent`
  ::
  ::component-slot-row{name="body"}
  `w-full h-full bg-default`
  ::
  ::component-slot-row{name="overlay"}
  `pointer-events-none absolute inset-0`
  ::
  ::component-slot-row{name="mask"}
  `absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50`
  ::
  ::component-slot-row{name="gradient"}
  `absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500`
  ::
  ::component-slot-row{name="pattern"}
  `absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100`
  ::
  ::component-slot-row{name="patternText"}
  `absolute inset-x-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500`
  ::
::

