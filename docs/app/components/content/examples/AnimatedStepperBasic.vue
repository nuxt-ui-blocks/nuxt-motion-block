<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <MAnimatedStepper
      v-model="step"
      :items="steps"
    />

    <div class="flex items-center justify-between gap-3">
      <UButton
        label="Back"
        variant="outline"
        color="neutral"
        :disabled="step === 0"
        @click="step = Math.max(0, step - 1)"
      />
      <UButton
        :label="step === steps.length - 1 ? 'Finish' : 'Continue'"
        @click="step = Math.min(steps.length - 1, step + 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const step = ref(0)

const steps = [
  {
    title: 'Account',
    description: 'Email and password',
    icon: 'i-lucide-user',
    content: 'Create the account your team will sign in with. Password rules are checked as you type.',
  },
  {
    title: 'Workspace',
    description: 'Name and region',
    icon: 'i-lucide-building',
    content: 'Pick a region close to your users. You can move a workspace later without downtime.',
  },
  {
    title: 'Invite',
    description: 'Bring teammates in',
    icon: 'i-lucide-users',
    content: 'Invite teammates by email. Invites expire after seven days.',
  },
]
</script>
