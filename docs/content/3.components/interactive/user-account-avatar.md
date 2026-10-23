---
title: User Account Avatar
description: An avatar button that opens an account menu for editing a profile and reviewing orders.
---

A small account menu behind the user's avatar. Pressing the picture opens a\nnarrow popover with two collapsible sections: **Edit Profile** reveals name and\nemail fields with a save button, and **Last Orders** lists recent orders with a\nstatus, a progress bar and a view action.

The profile edits stay local to the menu until you press save, and the avatar's\naccessible name follows the new name afterwards. Orders arrive from `orders`,\nso the menu can show real fulfilment data without the component owning a\nrequest.

## Usage

Pass a `user` with an `avatar`, `name` and `email`. Two sample orders are shown\nwhen `orders` is omitted.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="user-account-avatar-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center p-6">
    <MUserAccountAvatar :user="user" />
  </div>
</template>

<script setup lang="ts">
const user = {
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces',
  name: 'Maya Chen',
  email: 'maya@northwind.studio',
}
</script>
```

::

The menu portals to the body by default, so it escapes any `overflow: hidden`\nancestor. Set `inline` when you need the panel to stay inside the component,\nfor example in a clipped preview frame.

## Customize

Supply your own orders and listen for `profile-save` and `order-view` to send\nthe changes somewhere. The save event carries the full updated user object,\nnot just the changed fields.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="user-account-avatar-custom" />
  :::
#code
  <PlaygroundCode name="UserAccountAvatar" />
::

Opening a section closes the other one. Reopening a section resets the form to\nthe last saved values, so an abandoned edit does not linger. Progress is\nclamped between 0 and 100 before it is shown or drawn.

## Props

::component-props
  ::component-prop{name="user" type="UserData"}
  Account shown in the menu. Needs `avatar`, `name` and `email`.
  ::
  ::component-prop{name="orders" type="AccountOrder[]"}
  Orders listed under **Last Orders**. Each entry takes `id`, `date`,\n  `progress` and a `status` of `processing`, `shipped` or `delivered`.
  ::
  ::component-prop{name="inline" type="boolean" default="false"}
  Render the popover in place instead of portalling it to the body.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root wrapper.
  ::
::

## Events

::component-props
  ::component-prop{name="profile-save" type="(user: UserData) => void"}
  Fired after **Save Changes** with the updated name and email.
  ::
  ::component-prop{name="order-view" type="(orderId: string) => void"}
  Fired when the view button on an order is pressed, with that order's id.
  ::
::

## Accessibility

- The avatar is a real button labelled \"Account menu for {name}\". The popover\n  trigger supplies `aria-expanded` and `aria-controls`, so its state is\n  announced rather than implied by the open panel alone.
- Escape and a click outside both close the menu, and focus returns to the\n  avatar. The menu can also be dismissed from the keyboard without reaching for\n  a pointer.
- **Edit Profile** and **Last Orders** are buttons with visible text and icons.\n  The active section is marked with a background as well as colour, and the\n  expanded region is not hidden from assistive technology while it is open.
- Collapsed sections are `inert` and `aria-hidden`, so their inputs and order\n  buttons cannot be tabbed into or announced while they are closed.
- The name and email fields have real `<label>` elements bound with `for` and\n  `id`, and the email field uses `type=\"email\"`. Save is a submit button, so\n  Enter in either field saves the form.
- Each progress bar is a `role=\"progressbar\"` with `aria-valuemin`,\n  `aria-valuemax` and `aria-valuenow`, named after its order. The percentage\n  and the status word are also plain text, so the meaning never depends on the\n  bar's colour.
- Status colours (`info`, `warning`, `success`) are paired with the words\n  \"processing\", \"shipped\" and \"delivered\".
- Under `prefers-reduced-motion` the section height and blur transitions and the\n  order bar's grow animation are removed in CSS. Sections still open, close and\n  save immediately.

## Performance

- The popover content is unmounted while the menu is closed, so no hidden form,\n  order list or progress bars sit in the DOM until the avatar is pressed.
- There are no height measurements: sections animate with a `grid-template-rows`\n  transition from `0fr` to `1fr`, which the browser resolves without JavaScript.\n- Progress bars animate with a single `transform: scaleX()` keyframe on mount\n  and do not run while nothing is changing.
- Opening a section is local state; no data is fetched. Saving copies the two\n  edited fields into the existing user object and emits once.
- The only watcher syncs an externally replaced `user` prop, and there are no\n  timers or observers to clean up.
