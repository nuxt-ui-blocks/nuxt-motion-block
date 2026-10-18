<script setup lang="ts">
const { default: defaultValue } = defineProps<{
  name: string
  type?: string
  default?: string
  required?: boolean
}>()
</script>

<template>
  <tr class="align-top">
    <td class="px-4 py-3">
      <code class="font-mono text-[13px] font-medium text-highlighted">{{ name }}</code>
      <span
        v-if="required"
        class="ml-1.5 text-xs text-error"
        title="Required"
      >required</span>
    </td>
    <td class="px-4 py-3">
      <code
        v-if="type"
        class="font-mono text-[13px] text-primary whitespace-pre-wrap"
      >{{ type }}</code>
      <span
        v-else
        class="text-dimmed"
      >-</span>
    </td>
    <td class="px-4 py-3">
      <code
        v-if="defaultValue"
        class="font-mono text-[13px] break-all text-muted"
      >{{ defaultValue }}</code>
      <span
        v-else
        class="text-dimmed"
      >-</span>
    </td>
    <td class="px-4 py-3 text-muted [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-elevated [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px]">
      <slot />
    </td>
  </tr>
</template>
