---
title: Country Picker
description: A searchable country dialog with recent choices, regional grouping and full keyboard navigation.
---

A country picker built as a modal dialog rather than a native `<select>`, because
a list of countries needs search, a flag, a dialling code and a visible selection
state at the same time. The trigger shows the current choice; the dialog holds a
search field and a listbox that stays under the same focus.

Search is diacritic-insensitive and matches the country name, the ISO code and the
dialling prefix, so `de`, `DE` and `+49` all reach Germany. When the search field
is empty, `recent` codes appear under a "Recent" heading above the full list.

The component ships with 33 common countries. That is a deliberate ceiling rather
than a full ISO dataset: pass `countries` to replace it, and the rows, flags and
search adapt to whatever you supply. Nothing is fetched, and nothing infers the
visitor's location.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="country-picker-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-6">
    <div class="w-full max-w-sm space-y-3">
      <div>
        <p class="text-sm font-medium text-highlighted">
          Billing country
        </p>
        <p class="text-xs text-muted">
          Used for tax and invoice currency.
        </p>
      </div>

      <MCountryPicker
        v-model="country"
        label="Billing country"
        :recent="['DE', 'US']"
      />

      <p class="text-xs text-muted">
        Selected code: {{ country }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const country = ref('DE')
</script>
```
::

`label` is the trigger's fallback text and accessible name. `v-model` carries the
ISO code, not the country object, so a form can submit `DE` without reaching into
the component. Leave `v-model` off and the picker keeps its own selection, seeded
once from `defaultValue`.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="country-picker-custom" />
  :::
#code
  <PlaygroundCode name="CountryPicker" />
::

`groupBy` splits the list under each country's `group`, which is a property on
your own data — the built-in list groups by region. `recent` only affects the
unsearched list, so it never hides a result that matches what was typed. Rows are
windowed once a flat list passes 50 entries; grouped lists are rendered whole,
because slicing through a section header is worse than rendering a short list.

## Props

::component-props
  ::component-prop{name="countries" type="Country[]" default="33 built-in countries"}
  The list to search. Each entry needs `code` and `name`; `dialCode`, `flag` and
  `group` are optional. Replace it to use a full dataset, and keep `code` as an
  ISO 3166-1 alpha-2 value so the flag can be derived.
  ::
  ::component-prop{name="modelValue" type="string"}
  The selected country code. While this is `undefined` the component keeps its
  own copy seeded from `defaultValue`; passing a value switches it to controlled
  mode permanently.
  ::
  ::component-prop{name="defaultValue" type="string" default="''"}
  Seeds the uncontrolled selection once, during setup. It is not watched.
  ::
  ::component-prop{name="open" type="boolean"}
  Controlled dialog state. Leave it out to let the trigger and the close actions
  drive it, and use `update:open` to observe it.
  ::
  ::component-prop{name="defaultOpen" type="boolean" default="false"}
  Opens the dialog on the first render when the state is uncontrolled.
  ::
  ::component-prop{name="recent" type="string[]" default="[]"}
  Country codes shown under a "Recent" heading while the search field is empty.
  Codes that are not in `countries` are ignored.
  ::
  ::component-prop{name="groupBy" type="boolean" default="false"}
  Groups rows under `country.group`, falling back to "Other". Grouped lists are
  not virtualized.
  ::
  ::component-prop{name="label" type="string" default="'Select country'"}
  The trigger's fallback text and accessible name, and the dialog's heading.
  Once a country is selected the trigger shows its name instead.
  ::
  ::component-prop{name="placeholder" type="string" default="'Search countries…'"}
  Placeholder for the search field.
  ::
  ::component-prop{name="emptyMessage" type="string" default="'No countries found'"}
  Shown in place of the list when the search matches nothing.
  ::
  ::component-prop{name="showDialCode" type="boolean" default="true"}
  Shows `dialCode` at the end of each row when the country has one.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Disables the trigger. The dialog cannot be opened while disabled.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the trigger wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(code: string) => void"}
  Fires with the ISO code of the chosen country, whether or not the component is
  controlled.
  ::
  ::component-event{name="update:open" type="(open: boolean) => void"}
  Fires whenever the dialog opens or closes, including from Escape, the backdrop
  and the close button. Use it with `open` to mirror the state elsewhere.
  ::
  ::component-event{name="select" type="(country: Country) => void"}
  Fires with the full country object on selection, which saves a lookup when the
  consumer needs the name or dialling code rather than only the code.
  ::
::

## Accessibility

- The trigger is a native `<button>` with `aria-haspopup="dialog"`,
  `aria-expanded` and an `aria-label` that includes the current choice, so the
  selected country is announced without reading the visible text twice.
- The dialog is `role="dialog"` with `aria-modal="true"` and a visually hidden
  heading that names it. Focus moves into the search field on open and returns to
  the trigger on close.
- While open, `Tab` and `Shift+Tab` cycle inside the dialog. The search field is
  the only tab stop in the list; rows are reached with the arrow keys, Home and
  End, and `aria-activedescendant` points at the highlighted row while focus stays
  in the input. This is the editable-combobox pattern rather than a menu.
- Selection is carried by `aria-selected`, a check icon and a weight change, not
  by colour alone. Flags are `aria-hidden` because the country name already
  carries the identity.
- The page behind is scroll-locked while the dialog is open, and its previous
  `overflow` value is restored on close. It is **not** marked `inert`, so a
  virtual cursor can still reach the page behind the backdrop.
- Under `prefers-reduced-motion` the backdrop, the panel and the card all keep
  their hidden `initial` state but use a zero-duration transition, so the dialog
  appears and disappears instantly instead of fading or scaling.

## Performance

- There is no network request and no geolocation work. The built-in list is a
  module-level array; a replacement list is only filtered, never copied deeply.
- The flat list is windowed above 50 rows using a fixed `40px` row height, so the
  DOM holds roughly 16 rows regardless of dataset size. No measurement pass and
  no external virtualizer are involved.
- The dialog is teleported to `<body>` and mounted after hydration, so the closed
  state costs nothing on the page and the trigger keeps its document position.
- Filtering, row building and the visible window are `computed` values. Typing
  changes the query, not the list, and each keystroke rebuilds a small array
  rather than touching the DOM directly.
- Only `opacity` is animated on the overlay and only `transform`/`opacity` on the
  card. The list itself never animates, so opening the dialog does not lay out the
  rows it is about to show.

::tip
The built-in 33-country list keeps the package dependency-free. For a full
dataset, pass `countries` from your own data with `code`, `name` and optional
`dialCode`/`group` fields — the component needs nothing else.
::
