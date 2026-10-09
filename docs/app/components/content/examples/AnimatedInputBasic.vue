<template>
  <form
    class="flex w-full max-w-sm flex-col gap-4"
    @submit.prevent="submitted = true"
  >
    <MAnimatedInput
      v-model="form.email"
      label="Work email"
      icon="i-lucide-mail"
      placeholder="you@company.com"
    />

    <MAnimatedInput
      v-model="form.workspace"
      label="Workspace"
      placeholder="Acme Inc."
      label-class-name="text-xs"
    >
      <template #icon>
        <UIcon
          name="i-lucide-sparkles"
          class="size-4 text-primary"
        />
      </template>
    </MAnimatedInput>

    <UButton
      type="submit"
      label="Create workspace"
      icon="i-lucide-arrow-right"
      icon-trailing
      class="justify-center"
    />

    <p class="text-xs text-muted">
      {{ submitted ? 'Submitted — the label float is animation-only.' : 'Labels float on focus and on a filled value.' }}
    </p>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  email: '',
  workspace: '',
})

const submitted = ref(false)
</script>
