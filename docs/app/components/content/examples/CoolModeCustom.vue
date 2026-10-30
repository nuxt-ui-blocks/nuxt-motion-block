<template>
  <ComponentPlayground
    name="CoolMode"
    :defaults="{
      emoji: '🎉',
      particleCount: 12,
      disabled: false,
    }"
    :controls="{
      emoji: { label: 'Emoji', kind: 'string' },
      particleCount: { label: 'Particles', kind: 'number', min: 2, max: 32, step: 1 },
      disabled: { label: 'Disabled', kind: 'boolean' },
    }"
  />
</template>
