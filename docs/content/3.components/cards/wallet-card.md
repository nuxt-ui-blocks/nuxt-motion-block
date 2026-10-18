---
title: Wallet Card
description: A realistic card surface — gradient, printed grain, EMV chip, contactless glyph and a hover sheen — showing balance, a masked card number and optional holder details.
---

The Wallet Card renders a payment card as a physical object: a gradient surface with a faint printed grain, an inset edge highlight, an EMV chip, a contactless glyph and an optional network mark. It shows the balance, a masked card number and optional holder / expiry details, and fades a soft sheen across the surface on hover. It uses `motion-v` only for a small spring entrance.

## Usage

Drop the card where you want to show a payment method or account balance. Only the last four digits of `card-number` are ever displayed. Use the `shine` prop to disable the hover sheen if it competes with other motion.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="wallet-card-basic" />
  :::
#code
```vue
<template>
  <MWalletCard
    class="max-w-sm"
    label="Everyday"
    balance="$2,450.00"
    card-number="4242424242424242"
    holder="Ava Chen"
    expiry="08/29"
    network="visa"
  >
    <p class="text-xs text-white/70">
      Active • Next payment in 12 days
    </p>
  </MWalletCard>
</template>
```
::

## Examples

### Themed surface and network marks

The surface is a theme slot, so a single `ui.card` override reskins the whole card. Use `network` to stamp a payment mark in the corner.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="wallet-card-tone" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-wrap items-start justify-center gap-4">
    <MWalletCard
      class="max-w-sm"
      label="Savings"
      balance="$18,204.10"
      card-number="5500005555555559"
      holder="Ava Chen"
      expiry="03/27"
      network="mastercard"
    />
    <MWalletCard
      class="max-w-sm"
      label="Studio"
      balance="$640.00"
      card-number="371449635398431"
      holder="Ava Chen"
      expiry="11/28"
      network="amex"
      :ui="{ card: 'bg-[linear-gradient(145deg,oklch(0.55_0.16_300),oklch(0.3_0.12_295))]' }"
    />
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="wallet-card-custom" />
  :::
#code
  <PlaygroundCode name="WalletCard" />
::

## Props

::component-props
  ::component-prop{name="balance" type="string" default="undefined"}
  The displayed balance text. Rendered with `text-3xl font-semibold leading-none tabular-nums`. Omitted when undefined.
  ::
  ::component-prop{name="cardNumber" type="string" default="undefined"}
  Full card number used to compute the masked value. Whitespace is stripped and only the last four digits are shown (`•••• •••• •••• <last4>`).
  ::
  ::component-prop{name="holder" type="string" default="undefined"}
  Optional cardholder name, shown under a `Card holder` label in the footer.
  ::
  ::component-prop{name="expiry" type="string" default="undefined"}
  Optional expiry, shown under a `Valid thru` label in the footer.
  ::
  ::component-prop{name="label" type="string" default="undefined"}
  Optional short label shown beside the chip (for example `Everyday`).
  ::
  ::component-prop{name="network" type="'visa' | 'mastercard' | 'amex' | 'generic'" default="undefined"}
  Optional payment-network mark rendered in the footer corner.
  ::
  ::component-prop{name="shine" type="boolean" default="true"}
  Toggles the hover sheen overlay. When `false`, the sheen never renders and the hover state is not tracked.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root `motion.div` (which has `relative w-full`).
  ::
  ::component-prop{name="ui" type="object" default="{}"}
  Per-slot classes merged over the theme defaults.
  ::
::

## Events

No events are emitted by this component.

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Content shown between the balance / card number and the footer meta. Intended for short status text or metadata.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.walletCard` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="wrapper"}
  `relative w-full`
  ::
  ::component-slot-row{name="card"}
  Gradient surface with rounded corners (`aspect-[1.586]`)
  ::
  ::component-slot-row{name="grain"}
  Printed-noise overlay (`mix-blend-overlay`)
  ::
  ::component-slot-row{name="sheen"}
  Hover sheen overlay (radial highlight, `mix-blend-soft-light`)
  ::
  ::component-slot-row{name="edge"}
  Inset edge highlight (`ring-1 ring-inset ring-white/15`)
  ::
  ::component-slot-row{name="body"}
  `relative flex h-full w-full flex-col justify-between p-5`
  ::
  ::component-slot-row{name="top"}
  Chip / contactless row and label
  ::
  ::component-slot-row{name="media"}
  Chip and contactless group
  ::
  ::component-slot-row{name="label"}
  Short label beside the chip
  ::
  ::component-slot-row{name="center"}
  Balance and masked number group
  ::
  ::component-slot-row{name="balance"}
  `block text-3xl font-semibold leading-none tabular-nums`
  ::
  ::component-slot-row{name="cardNumber"}
  `block text-base font-medium tracking-[0.14em] tabular-nums text-white/85`
  ::
  ::component-slot-row{name="bottom"}
  Footer row (holder / expiry and network mark)
  ::
  ::component-slot-row{name="meta"}
  Holder / expiry group
  ::
  ::component-slot-row{name="metaLabel"}
  `Card holder` / `Valid thru` labels
  ::
  ::component-slot-row{name="metaValue"}
  Holder / expiry values
  ::
  ::component-slot-row{name="network"}
  Payment-network mark wrapper
  ::
::
## Accessibility

The root is a plain animated container. Every decorative layer — the gradient surface, printed grain, sheen, inset edge, chip, contactless glyph and network mark — is `aria-hidden="true"`. Balance, masked card number, holder and expiry are plain text, and the number only ever exposes its last four digits. No keyboard handlers, roles or ARIA attributes are added by the component, and there is no `prefers-reduced-motion` handling in source; the entrance spring and sheen run regardless of user preference.

## Performance

- Entrance uses `motion-v` with a spring (`stiffness: 260, damping: 28`, initial `y: 24, opacity: 0`) on the root container.
- The card surface is pure CSS: a gradient background (the `card` slot), a faint printed grain from an inline SVG `feTurbulence` data-URI on a `mix-blend-overlay` overlay, an inset `ring-white/15` edge, and a resting radial sheen gradient that fades in on hover (opacity toggle with `transition-opacity duration-500`).
- Chip, contactless and network marks are inline SVG with no image requests. The chip gradient id is derived from `useId()`, so the SSR and client markup match.
- `maskedCardNumber` strips whitespace and slices the last four digits only; no heavy formatting loops.
- No `requestAnimationFrame`, timers, or listeners beyond the hover handlers, and no WebGL.

::tip
The sheen is a resting highlight (`opacity-0` → `opacity-100`) rather than a one-shot sweep, so it stays subtle and costs nothing while idle — the overlay is `pointer-events-none`.
::

