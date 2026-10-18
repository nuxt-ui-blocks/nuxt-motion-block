<template>
  <ComponentPlayground
    name="Drawer"
    :hide="[
      'defaultOpen',
      'portal',
      'nested',
      'close',
      'closeIcon',
      'fixed',
      'handleOnly',
      'snapPoints',
      'activeSnapPoint',
      'closeThreshold',
      'setBackgroundColorOnScale',
      'noBodyStyles',
      'preventScrollRestoration',
    ]"
    :defaults="{
      open: false,
      direction: 'bottom',
      title: 'Drawer',
      description: 'Flip Open, then try the other props.',
    }"
    :controls="{
      direction: { kind: 'select', options: directionOptions },
    }"
  >
    <p class="text-sm text-muted">
      Toggle <strong>Open</strong> to reveal the drawer. This paragraph is the
      drawer's default slot content.
    </p>
  </ComponentPlayground>
</template>

<script setup lang="ts">
const directionOptions = [
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top', value: 'top' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
]
</script>
