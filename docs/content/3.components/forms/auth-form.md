---
title: Auth Form
description: A sign-in and sign-up form with a mode cross-fade, live password rules, provider buttons and a submit button that morphs through its states.
---

A complete email-and-password form for the two moments every account has: coming
back, and starting out. The heading, the copy and the password rules swap when
the mode changes, sliding in from the side you are heading toward, and the
password field only appears once the email looks usable.

The form owns the small stuff — which mode is showing, what has been typed,
whether the password is visible — and reports everything else outward. You drive
`status`, so submitting, success and failure stay your decision; the form renders
the state you hand it, including the button that morphs from label to spinner to
tick.

## Usage

Pass a `mode`, or bind `v-model:mode` to let the switch at the bottom of the form
change it. Listen for `submit` with the current values, then move `status`
through `submitting`, `success` or `error` as the request resolves.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="auth-form-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-2">
    <MAuthForm
      v-model:mode="mode"
      :status="status"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

type Mode = 'sign-in' | 'sign-up'
type Status = 'idle' | 'submitting' | 'success' | 'error'

const mode = ref<Mode>('sign-in')
const status = ref<Status>('idle')

let timer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function onSubmit() {
  clearTimer()
  status.value = 'submitting'

  timer = setTimeout(() => {
    status.value = 'success'
    timer = setTimeout(() => {
      status.value = 'idle'
    }, 2200)
  }, 900)
}

onBeforeUnmount(clearTimer)
</script>
```
::

The password field is hidden until the email parses, and stays out of the tab
order until then. Submitting emits `{ email, password }`; nothing is sent by the
component itself, so the same form works with a server action, a store or a
fetch call.

## Customize

`providers` adds OAuth-style buttons above the email field, each with a UIcon
name, and `showMagicLink` adds a passwordless shortcut under the password.
Replace `requirements` to change the rules — each entry needs an `id`, a `label`
and a `test` predicate, and the list ticks over as the password changes.

Field errors live in `fieldErrors`, keyed by `email` or `password`. A form-level
`error` with `status="error"` renders an alert above the form and moves focus to
it, which is what a failed request should do.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="auth-form-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-3 py-2">
    <MAuthForm
      v-model:mode="mode"
      :status="status"
      :error="error"
      :field-errors="fieldErrors"
      :providers="providers"
      :requirements="requirements"
      show-magic-link
      class="rounded-2xl border border-default bg-elevated/40 p-6"
      @submit="onSubmit"
      @magic-link="onMagicLink"
      @provider="onProvider"
    >
      <template #footer>
        <p class="mt-4 text-center text-xs text-muted">
          By continuing you agree to the demo terms.
        </p>
      </template>
    </MAuthForm>

    <p
      class="text-xs text-muted"
      role="status"
      aria-live="polite"
    >
      {{ feedback }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

type Mode = 'sign-in' | 'sign-up'
type Status = 'idle' | 'submitting' | 'success' | 'error'

interface Requirement {
  id: string
  label: string
  test: (password: string) => boolean
}

const mode = ref<Mode>('sign-up')
const status = ref<Status>('idle')
const error = ref<string>()
const fieldErrors = ref<{ email?: string, password?: string }>({})
const feedback = ref('Submit with taken@example.com to see the error state.')

const providers = [
  { id: 'github', label: 'GitHub', icon: 'i-lucide-github' },
  { id: 'google', label: 'Google', icon: 'i-lucide-chrome' },
]

const requirements: Requirement[] = [
  { id: 'length', label: 'At least 10 characters', test: password => password.length >= 10 },
  { id: 'uppercase', label: 'One uppercase letter', test: password => /[A-Z]/.test(password) },
  { id: 'number', label: 'One number', test: password => /\d/.test(password) },
  { id: 'symbol', label: 'One symbol', test: password => /[^A-Z0-9]/i.test(password) },
]

let timer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function onSubmit(values: { email: string, password: string }) {
  clearTimer()
  error.value = undefined
  fieldErrors.value = {}

  const unmet = requirements.filter(requirement => !requirement.test(values.password))

  if (unmet.length) {
    fieldErrors.value = { password: `Still needed: ${unmet.map(item => item.label.toLowerCase()).join(', ')}.` }
    return
  }

  status.value = 'submitting'

  timer = setTimeout(() => {
    if (values.email.trim().toLowerCase() === 'taken@example.com') {
      status.value = 'error'
      error.value = 'That email is already registered. Try signing in instead.'
      return
    }

    status.value = 'success'
    feedback.value = `Account created for ${values.email}.`
    timer = setTimeout(() => {
      status.value = 'idle'
    }, 2200)
  }, 900)
}

function onMagicLink(values: { email: string }) {
  feedback.value = values.email
    ? `Magic link sent to ${values.email}.`
    : 'Add an email first, then request a magic link.'
}

function onProvider(id: string) {
  feedback.value = `Continue with ${id} would open the provider.`
}

onBeforeUnmount(clearTimer)
</script>
```
::

The example above binds the mode, supplies its own providers and password rules,
and uses the `footer` slot for terms copy. Submitting `taken@example.com`
exercises the error state.

## Props

::component-props
  ::component-prop{name="mode" type="'sign-in' | 'sign-up'"}
  Controlled mode. Leave undefined to let the form switch its own, starting from
  `defaultMode`.
  ::
  ::component-prop{name="defaultMode" type="'sign-in' | 'sign-up'" default="'sign-in'"}
  Mode used while `mode` is unbound. Ignored once `mode` is provided.
  ::
  ::component-prop{name="status" type="'idle' | 'submitting' | 'success' | 'error'" default="'idle'"}
  Submission state. `submitting` and `success` lock the fields and the button;
  `error` reveals the `error` alert.
  ::
  ::component-prop{name="error" type="string"}
  Form-level error copy. Rendered and focused when `status` is `error`.
  ::
  ::component-prop{name="fieldErrors" type="AuthFormFieldErrors" default="{}"}
  Field errors keyed by `email` or `password`. A present message marks the
  control invalid and links the message through `aria-describedby`.
  ::
  ::component-prop{name="modelValue" type="AuthFormValues"}
  Controlled values. Leave undefined to let the form hold its own, seeded from
  `defaultValues`.
  ::
  ::component-prop{name="defaultValues" type="AuthFormValues" default="{ email: '', password: '' }"}
  Starting values while `modelValue` is unbound.
  ::
  ::component-prop{name="providers" type="AuthProvider[]" default="[]"}
  OAuth-style buttons rendered above the email field. Each entry needs `id`,
  `label` and a UIcon `icon` name.
  ::
  ::component-prop{name="requirements" type="AuthPasswordRequirement[]" default="length, uppercase, number"}
  Password rules shown in sign-up mode. Each entry needs `id`, `label` and a
  `test(password)` predicate.
  ::
  ::component-prop{name="showMagicLink" type="boolean" default="false"}
  Renders a "Send a magic link instead" button under the password.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the outer wrapper.
  ::
::

## Events

::component-props
  ::component-prop{name="submit" type="(values: AuthFormValues) => void"}
  Fired on form submission with the current email and password. The form does
  not send anything itself.
  ::
  ::component-prop{name="update:modelValue" type="(values: AuthFormValues) => void"}
  Fired on every keystroke with the next values. Bind it with `v-model` to own
  the fields.
  ::
  ::component-prop{name="update:mode" type="(mode: AuthFormMode) => void"}
  Fired when the sign-in / sign-up switch is used. Bind it with `v-model:mode` to
  control the mode.
  ::
  ::component-prop{name="magic-link" type="(values: AuthFormValues) => void"}
  Fired by the magic-link button with the current email. The password is always
  empty in this payload.
  ::
  ::component-prop{name="provider" type="(id: string) => void"}
  Fired by a provider button with that provider's `id`.
  ::
::

## Slots

::component-props
  ::component-prop{name="footer" type="slot"}
  Content below the mode switch, such as terms copy or a support link.
  ::
::

## Accessibility

- Both fields have visible `<label>` elements, and every hint or error is linked
  through `aria-describedby`. Invalid controls also carry `aria-invalid` and the
  error colour, so the state is not conveyed by colour alone.
- The form-level error is a `role="alert"` with `tabindex="-1"`. When `status`
  becomes `error` it receives focus, so a failed request is announced even if the
  submit button was focused.
- A polite live region reports submitting, success and failure, so the button's
  label change is not the only signal.
- The password field and its rules stay `inert` and `aria-hidden` until the
  email is valid, which keeps a hidden control out of the tab order and the
  accessibility tree without unmounting it.
- The show-password toggle is a button with `aria-pressed` and a label that
  flips between "Show password" and "Hide password".
- Each password rule states "met" or "not met" in visually hidden text next to
  the tick, so the rule list is usable without seeing the colour change.
- Controls use the `lg` size, which keeps the tap targets at the 44px mark used
  across the library.

## Performance

- Every transition is CSS: the mode cross-fade, the field reveal and the button
  label morph run on `transform` and `opacity` (plus `grid-template-rows` for
  height), with no measuring pass and no per-keystroke animation work.
- Revealing the password field animates a `0fr` to `1fr` grid row rather than
  reading `scrollHeight`, so nothing forces a layout during typing.
- The requirements list recomputes its ticks in one computed pass per keystroke
  instead of running each predicate repeatedly in the template.
- A `prefers-reduced-motion` media query drops the slide and the label travel,
  leaving a short opacity change.
