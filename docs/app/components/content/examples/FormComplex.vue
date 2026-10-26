<template>
  <div class="flex w-full justify-center p-6">
    <MForm
      ref="form"
      v-model="values"
      class="w-full max-w-md"
      :errors="errors"
      :fields="fields"
      success-message="Account ready"
      submit-label="Create workspace"
      @submit="handleSubmit"
    >
      <template #actions>
        <div class="flex flex-wrap items-center gap-2">
          <UButton type="submit">
            Create workspace
          </UButton>
          <UButton
            type="button"
            color="neutral"
            variant="ghost"
            @click="reset"
          >
            Reset
          </UButton>
        </div>
      </template>
    </MForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fields = [
  {
    name: 'name',
    label: 'Workspace name',
    placeholder: 'Acme Studio',
    description: 'Shown on invoices and shared links.',
    icon: 'i-lucide-building-2',
    autocomplete: 'organization',
    required: true,
  },
  {
    name: 'email',
    label: 'Billing email',
    type: 'email' as const,
    placeholder: 'billing@acme.com',
    icon: 'i-lucide-mail',
    autocomplete: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: 'At least 8 characters',
    description: 'Used to sign in to the workspace.',
    icon: 'i-lucide-lock',
    autocomplete: 'new-password',
    reveal: true,
    required: true,
  },
  {
    name: 'website',
    label: 'Website',
    type: 'url' as const,
    placeholder: 'https://acme.com',
    icon: 'i-lucide-globe',
    trailingIcon: 'i-lucide-arrow-up-right',
    autocomplete: 'url',
  },
  {
    name: 'plan',
    label: 'Plan',
    type: 'select' as const,
    placeholder: 'Choose a plan',
    description: 'You can change this at any time.',
    options: [
      { label: 'Starter', value: 'starter', icon: 'i-lucide-leaf' },
      { label: 'Studio', value: 'studio', icon: 'i-lucide-sparkles' },
      { label: 'Agency', value: 'agency', icon: 'i-lucide-building' },
    ],
    required: true,
  },
  {
    name: 'billing',
    label: 'Billing period',
    type: 'radio' as const,
    orientation: 'horizontal' as const,
    options: [
      { label: 'Monthly', value: 'monthly' },
      { label: 'Yearly', value: 'yearly' },
    ],
  },
  {
    name: 'updates',
    label: 'Product updates',
    type: 'checkbox' as const,
    description: 'One short email each month. No noise.',
  },
  {
    name: 'twoFactor',
    label: 'Two-factor authentication',
    type: 'switch' as const,
    description: 'Ask for a code from your authenticator app at sign-in.',
  },
  {
    name: 'terms',
    label: 'I agree to the terms of service',
    type: 'checkbox' as const,
    description: 'Required before the workspace can be created.',
  },
]

const initialValues = {
  name: '',
  email: '',
  password: '',
  website: '',
  plan: '',
  billing: '',
  updates: true,
  twoFactor: false,
  terms: false,
}

const values = ref<Record<string, string | boolean>>({ ...initialValues })
const errors = ref<Record<string, string | undefined>>({})
const form = ref<{ reset: (values?: Record<string, string | boolean>) => void } | null>(null)

function handleSubmit(next: Record<string, string | boolean>) {
  const nextErrors: Record<string, string | undefined> = {}

  if (!String(next.name ?? '').trim()) {
    nextErrors.name = 'Give the workspace a name.'
  }

  const email = String(next.email ?? '').trim()

  if (!email) {
    nextErrors.email = 'Enter a billing email.'
  }
  else if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)) {
    nextErrors.email = 'Check the email format.'
  }

  const password = String(next.password ?? '')

  if (!password) {
    nextErrors.password = 'Choose a password.'
  }
  else if (password.length < 8) {
    nextErrors.password = 'Use at least 8 characters.'
  }

  if (!String(next.plan ?? '')) {
    nextErrors.plan = 'Pick a plan to continue.'
  }

  if (!String(next.billing ?? '')) {
    nextErrors.billing = 'Choose a billing period.'
  }

  if (!next.terms) {
    nextErrors.terms = 'Accept the terms to continue.'
  }

  errors.value = nextErrors
}

function reset() {
  errors.value = {}
  form.value?.reset({ ...initialValues })
}
</script>
