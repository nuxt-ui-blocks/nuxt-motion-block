---
title: Wallet Card
description: A subtle wallet-style card that reveals balance and masked card details with a hover shine.
navigation:
  icon: i-lucide-wallet
---

# Wallet Card

The Wallet Card presents a compact financial summary with balance, masked card number and optional header/footer slots. It uses `motion-v` for a small spring entrance and a thin shine sweep that plays on hover to draw attention without distracting. Ported from smoothui's wallet-card.

## Usage

Drop the card where you want to show a payment method or account balance. Keep numbers concise and use the `shine` prop to disable the highlight if it competes with other motion.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wallet-card-basic" />
  :::
#code
```vue
<template>
  <MWalletCard
    balance="$2,450.00"
    card-number="4242424242424242"
  >
    <p class="text-xs text-muted">
      Active • Next payment in 12 days
    </p>
  </MWalletCard>
</template>
```
::

## Props

::field-group
  ::field{name="balance" type="string" default="undefined"}
  The displayed balance text. Rendered with `text-2xl font-bold text-highlighted`. Omitted when undefined.
  ::
  ::field{name="cardNumber" type="string" default="undefined"}
  Full card number used to compute `maskedCardNumber` (`•••• •••• •••• <last4>`). Only the last four digits are shown.
  ::
  ::field{name="shine" type="boolean" default="true"}
  Toggles the hover shine overlay. When `false`, the shine never renders and the hover state is not tracked.
  ::
  ::field{name="class" type="string"}
  Merged onto the root `motion.div` (which has `relative overflow-hidden`).
  ::
  ::field{name="ui" type="CardProps['ui']" default="{}"}
  UI configuration passed through to the underlying `UCard` component.
  ::
::

## Events

No events are emitted by this component.

## Slots

::field-group
  ::field{name="default"}
  Content shown in the body between the balance/card number and footer. Intended for short status text or metadata.
  ::
  ::field{name="header"}
  Header slot passed through to `UCard`. Rendered only when provided.
  ::
  ::field{name="footer"}
  Footer slot passed through to `UCard`. Rendered only when provided.
  ::
::

## Accessibility

The root is an animated container with no interactive semantics beyond the card's internal elements. The shine is `pointer-events-none` and purely decorative (`aria-hidden` not present but non-interactive). Balance and card number are plain text. No keyboard handlers, roles, or ARIA attributes are added by the component. No `prefers-reduced-motion` handling is present in the source; the entrance spring and shine animation will run regardless of user preference.

## Performance

- Entrance uses `motion-v` with a spring (`stiffness: 300, damping: 30`, initial `y: 40, opacity: 0`) applied to the root container.
- Shine overlay is rendered conditionally via `v-if="props.shine"`; its opacity is toggled with `transition-opacity duration-500` on `showShine` (hover state tracked with `@mouseenter/@mouseleave`).
- The shine sweep is a single absolutely positioned gradient div driven by a scoped CSS keyframe `shine` (`translateX(-100%) → translateX(100%)`) with `animation: shine_0.8s_ease-out_forwards`.
- `maskedCardNumber` is a computed property that slices the last 4 digits only when `cardNumber` is present; no heavy formatting loops.
- No timers, event listeners outside hover, or WebGL are used.

::tip
The shine animation runs once per hover (`forwards` only) and resets when the element re-enters hover; keeping `shine` true is cheap since the overlay is `pointer-events-none`.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.walletCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `wrapper` | `relative overflow-hidden` |
| `card` | `h-full` |
| `body` | `space-y-4` |
| `balance` | `text-2xl font-bold text-highlighted` |
| `cardNumber` | `text-sm text-muted font-mono tracking-wider` |
| `shine` | `absolute inset-0 pointer-events-none z-20 transition-opacity duration-500` |
| `shineBeam` | `absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_0.8s_ease-out_forwards]` |
