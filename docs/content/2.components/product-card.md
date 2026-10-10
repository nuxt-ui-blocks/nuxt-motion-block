---
title: Product Card
description: A store-ready product tile with a hover zoom, star rating, discount badge, wishlist and add-to-cart states.
navigation:
  icon: i-lucide-shopping-bag
---

# Product Card

A complete product tile: full-bleed image that zooms on hover, an optional badge, a
half-star-accurate rating, price with an optional strike-through discount, a wishlist
heart and an add-to-cart button that confirms for two seconds.

The card has no slots and no markup of its own to extend ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â it is a fixed layout, so
what varies between products is data, not structure. `image`, `title` and `price` are
the only required props.

## Usage

Everything is a prop. There are no emits: the two interactions call back through the
`onAddToCart` and `onWishlist` props, so handle them from the parent rather than
listening for events.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="product-card-basic" />
  :::
#code
```vue
<template>
  <div class="grid w-full max-w-lg grid-cols-1 gap-5 sm:grid-cols-2">
    <MProductCard
      title="Studio Headphones"
      :price="249"
      :original-price="329"
      currency="$"
      badge="sale"
      :rating="4.6"
      image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      @add-to-cart="added++"
    />

    <MProductCard
      title="Mechanical Keyboard"
      :price="149"
      currency="$"
      badge="new"
      :rating="4"
      image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
      @wishlist="wishlisted++"
    />

    <span class="col-span-full text-xs text-muted">
      Added to cart: {{ added }} ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· wishlisted: {{ wishlisted }}
    </span>
  </div>
</template>

<script setup lang="ts">
const added = ref(0)
const wishlisted = ref(0)
</script>
```
::

## Stars and discounts

Two things are computed rather than passed, and both have thresholds worth knowing
before you trust the numbers.

**Rating.** The fractional part decides whether a half star is drawn: `>= 0.75` rounds
the next star up to full, `>= 0.25` and `< 0.75` draws a half, and anything below
`0.25` truncates. So `4` renders four full stars, `4.5` renders four and a half, `4.8`
renders five, and `4.2` renders four. Half stars are painted with an SVG gradient whose
id is namespaced per card instance.

**Discount.** The strike-through price and the percentage chip only appear when
`originalPrice` is set *and* greater than `price`. The percentage is
`round((originalPrice - price) / originalPrice * 100)`. An `originalPrice` at or below
`price` renders nothing rather than a zero or negative discount.

`badge` also picks its own colour: the string is lowercased and matched against `sale`
for `error` and `new` for `success`, with `primary` for everything else.

## Props

::field-group
  ::field{name="image" type="string"}
  Required. Product image, `object-cover` in a square frame. It is also the card's
  `alt` text source and is set `draggable="false"` so a drag never starts a ghost image
  mid-tile.
  ::
  ::field{name="title" type="string"}
  Required. Product name, clamped to one line. It is used verbatim in the card's
  `aria-label`, in the wishlist button's label and in the image's `alt`.
  ::
  ::field{name="price" type="number"}
  Required. Current price, rendered as `currency` immediately followed by the number ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â
  it is string concatenation, so `249.5` will read as `$249.5`. Pre-format the value if
  you need cents.
  ::
  ::field{name="originalPrice" type="number"}
  Strike-through price. Only rendered when strictly greater than `price`; see the
  discount note above.
  ::
  ::field{name="currency" type="string" default="'$'"}
  Symbol placed directly before the price, for both the current and the struck-through
  amount. No locale handling.
  ::
  ::field{name="rating" type="number"}
  Optional star rating out of five. Omit it and the whole rating row disappears,
  including its `aria-label`.
  ::
  ::field{name="badge" type="string"}
  Optional label for the badge over the image. `sale` and `new` are recognised and get
  their own colour; anything else is `primary`.
  ::
  ::field{name="onAddToCart" type="() => void"}
  Called when the button is pressed, immediately after the card enters its confirming
  state. Receives no payload ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the product is identified by the props you already
  rendered.
  ::
  ::field{name="onWishlist" type="() => void"}
  Called when the heart is toggled, again with no payload. The filled state is internal
  and does not reset.
  ::
  ::field{name="ui" type="object" default="{}"}
  Merged over the card's own `ui` slots, so your keys win. The component zero-pads the
  body itself ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â Nuxt UI's own `p-4 sm:p-6` would inset the image by 24px and break the
  full-bleed frame ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â so overriding `body` reintroduces that inset.
  ::
  ::field{name="class" type="string"}
  Merged onto the `UCard` root, beneath the component's own radius, border and overflow
  classes.
  ::
::

## Accessibility

The `UCard` is given `role="article"` and an `aria-label` of
`"<title> - <currency><price>"`, so the tile is announced as a labelled region. The
image carries `alt` set to the title and is not a link.

Both controls are real buttons. The wishlist heart has a `motion.button` with an
`aria-label` that changes with its state ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â "Add ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ to wishlist" versus "Remove ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ from
wishlist" ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and a visible focus ring. The add-to-cart button keeps Nuxt UI's
`aria-label` and disables itself in the confirming state, so a screen reader reports
it as unavailable for the two seconds it takes to reset.

The rating row is `aria-label="<rating> out of 5 stars"` and its five SVG stars are
`aria-hidden`, so the stars are announced once as a number rather than five times.
Every icon-only element ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â heart, cart, check ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â is `aria-hidden` with the label or
button text carrying the meaning. The badge sits in a `role="status"` region.

Hover affordances are gated on `(hover: hover) and (pointer: fine)`, so on touch the
image never scales and the overlay never fades ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and on touch devices the wishlist heart
is fully opaque rather than hidden until hover, because otherwise there is no way to
reach it.

`prefers-reduced-motion` is honoured throughout: the in-view entrance, the badge scale,
the icon morph and the press feedback all collapse to `duration: 0`, the initial states
become their resting values, and the hover zoom and overlay transitions are not applied
at all.

## Performance

- The card enters once, on its first appearance in the viewport: `while-in-view` with
  a `-50px` margin and `once: true`, so scrolling past it again does not re-animate.
- The "Added" state is a 2-second `setTimeout` that clears any previous timer first and
  is cleared on unmount. It is the only timer in the component.
- The button label is swapped by `AnimatePresence mode="wait"`, so the outgoing glyph
  finishes before the incoming one starts ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â one label in the DOM at a time, not two
  overlaid.
- Hover zoom and the overlay are CSS transitions on `transform` and `opacity`; the
  press feedback and the button icon are motion. None of them touch layout.
- Half-star gradient ids come from `useId()` per card instance, so several half-rated
  cards on one page cannot collide.
- The card's `ui` is a computed that reads `isHoverDevice`, so the hover shadow class is
  applied on mount once the `matchMedia` query resolves and after that only when the
  device class actually changes.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.productCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `group w-full` |
| `media` | `relative aspect-square overflow-hidden bg-muted` |
| `image` | `h-full w-full object-cover` |
| `overlay` | `pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300` |
| `badgeWrapper` | `absolute top-3 left-3` |
| `badge` | `px-2.5 py-1 font-semibold shadow-sm` |
| `wishlistButton` | `absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-default/80 backdrop-blur-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` |
| `wishlistIcon` | `size-4` |
| `content` | `flex flex-1 flex-col gap-2 p-4` |
| `title` | `line-clamp-1 text-sm font-semibold tracking-tight text-highlighted` |
| `rating` | `flex items-center gap-0.5` |
| `starHalf` | `size-3.5 text-warning` |
| `star` | `size-3.5` |
| `ratingValue` | `ml-1 text-xs font-medium text-muted` |
| `priceRow` | `flex items-baseline gap-2` |
| `price` | `text-xl font-bold tracking-tight text-highlighted` |
| `priceOld` | `text-sm text-muted line-through` |
| `discount` | `rounded-md bg-error/10 px-1.5 py-0.5 text-xs font-semibold text-error` |
| `footer` | `mt-auto pt-2` |
| `buttonLabel` | `flex items-center gap-2` |
