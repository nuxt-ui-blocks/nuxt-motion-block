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
