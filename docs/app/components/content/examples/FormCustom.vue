<template>
  <div class="flex w-full justify-center p-6">
    <MForm
      ref="form"
      v-model="values"
      class="w-full max-w-md"
      :errors="errors"
      :fields="fields"
      success-message="Saved"
      @submit="handleSubmit"
    >
      <template #actions>
        <div class="flex flex-wrap items-center gap-2">
          <UButton type="submit">
            Create account
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
    label: 'Name',
    placeholder: 'Ada Lovelace',
    autocomplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'ada@example.com',
    autocomplete: 'email',
  },
  {
    name: 'plan',
    label: 'Plan',
    type: 'select' as const,
    placeholder: 'Choose a plan',
    description: 'You can change this later.',
    options: [
      { label: 'Starter — $0', value: 'starter' },
      { label: 'Studio — $24', value: 'studio' },
      { label: 'Agency — $79', value: 'agency' },
    ],
  },
  {
    name: 'updates',
    label: 'Product updates',
    type: 'checkbox' as const,
    description: 'One short email each month. No noise.',
  },
]

const initialValues = {
  name: '',
  email: '',
  plan: '',
  updates: true,
}

const values = ref<Record<string, string | boolean>>({ ...initialValues })
const errors = ref<Record<string, string | undefined>>({})
const form = ref<{ reset: (values?: Record<string, string | boolean>) => void } | null>(null)

function handleSubmit(next: Record<string, string | boolean>) {
  const nextErrors: Record<string, string | undefined> = {}

  if (!String(next.name ?? '').trim()) {
    nextErrors.name = 'A name is required.'
  }

  const email = String(next.email ?? '').trim()

  if (!email) {
    nextErrors.email = 'Enter your email address.'
  }
  else if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)) {
    nextErrors.email = 'Check the email format.'
  }

  if (!String(next.plan ?? '')) {
    nextErrors.plan = 'Pick a plan to continue.'
  }

  errors.value = nextErrors
}

function reset() {
  errors.value = {}
  form.value?.reset({ ...initialValues })
}
</script>
