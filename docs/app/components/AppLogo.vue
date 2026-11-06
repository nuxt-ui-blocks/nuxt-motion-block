<script setup lang="ts">
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 28,
})
</script>

<template>
  <!-- Fixed hex, not mode variables: the mark must look identical on paper and on ink. -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 28 28"
    fill="none"
    role="img"
    aria-label="Motion Block"
  >
    <rect
      x="1"
      y="1"
      width="26"
      height="26"
      rx="7"
      fill="#141412"
    />
    <path
      d="M8 19.5L19.5 8"
      stroke="#f06a3c"
      stroke-width="3.2"
      stroke-linecap="round"
    />
    <circle
      cx="19"
      cy="19"
      r="2.4"
      fill="#f4f1ea"
    />
    <circle
      cx="9"
      cy="9"
      r="2.4"
      fill="#f4f1ea"
    />
  </svg>
</template>
