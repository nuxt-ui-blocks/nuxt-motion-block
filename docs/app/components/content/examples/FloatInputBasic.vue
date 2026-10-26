<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-6">
    <MFloatInput
      v-model="email"
      icon="i-lucide-mail"
      label="Email address"
      placeholder="you@example.com"
    />

    <MFloatInput
      v-model="name"
      label="Full name"
      placeholder="Ada Lovelace"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const name = ref('Ada Lovelace')
</script>
