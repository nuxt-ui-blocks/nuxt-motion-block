<template>
  <div class="flex w-full justify-center p-6">
    <MForm
      v-model="values"
      class="w-full max-w-md"
      :errors="errors"
      :fields="fields"
      submit-label="Send message"
      @submit="handleSubmit"
    />
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
    description: 'Only used to reply to this message.',
    autocomplete: 'email',
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea' as const,
    placeholder: 'What are you building?',
    rows: 3,
  },
]

const values = ref<Record<string, string | boolean>>({
  name: '',
  email: '',
  message: '',
})

const errors = ref<Record<string, string | undefined>>({})

function handleSubmit(next: Record<string, string | boolean>) {
  const name = String(next.name ?? '').trim()
  const email = String(next.email ?? '').trim()
  const message = String(next.message ?? '').trim()
  const nextErrors: Record<string, string | undefined> = {}

  if (!name) {
    nextErrors.name = 'Tell us who you are.'
  }

  if (!email) {
    nextErrors.email = 'An email address is required.'
  }
  else if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)) {
    nextErrors.email = 'That email address looks incomplete.'
  }

  if (!message) {
    nextErrors.message = 'Add a sentence about the project.'
  }

  errors.value = nextErrors
}
</script>
