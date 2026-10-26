<template>
  <div class="flex w-full flex-col items-center gap-4 p-6">
    <MForm
      v-model="values"
      class="w-full max-w-md"
      :schema="schema"
      :fields="fields"
      success-message="Invite sent"
      submit-label="Send invite"
      @submit="handleSubmit"
    />

    <p
      v-if="submitted.email"
      class="text-sm text-muted"
    >
      Invited {{ submitted.email }} as {{ submitted.role }}.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Use at least two characters.'),
  email: z.email('Enter a complete email address.'),
  role: z.enum(['viewer', 'editor', 'admin'], { message: 'Pick a role.' }),
})

const fields = [
  {
    name: 'name',
    label: 'Full name',
    placeholder: 'Ada Lovelace',
    icon: 'i-lucide-user',
    autocomplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'ada@example.com',
    icon: 'i-lucide-mail',
    autocomplete: 'email',
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select' as const,
    placeholder: 'Choose a role',
    description: 'Admins can invite other people.',
    options: [
      { label: 'Viewer', value: 'viewer', icon: 'i-lucide-eye' },
      { label: 'Editor', value: 'editor', icon: 'i-lucide-pencil' },
      { label: 'Admin', value: 'admin', icon: 'i-lucide-shield' },
    ],
  },
]

const values = ref<Record<string, string | boolean>>({
  name: '',
  email: '',
  role: '',
})

const submitted = ref<Record<string, string | boolean>>({})

function handleSubmit(next: Record<string, string | boolean>) {
  submitted.value = next
}
</script>
