<template>
  <ComponentPlayground
    name="AnimatedTooltip"
    :hide="['open', 'defaultOpen', 'portal']"
    :defaults="{
      text: 'Animated tooltip',
      kbds: ['⌘', 'K'],
      delayDuration: 200,
    }"
    :controls="{
      delayDuration: { kind: 'number', min: 0, max: 2000, step: 50 },
      springStiffness: { kind: 'number', min: 100, max: 1000, step: 20 },
      springDamping: { kind: 'number', min: 5, max: 60, step: 1 },
    }"
  >
    <UButton
      label="Hover me"
      color="neutral"
      variant="outline"
      icon="i-lucide-mouse-pointer"
    />
  </ComponentPlayground>
</template>
