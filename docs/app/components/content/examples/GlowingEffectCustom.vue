<template>
  <ComponentPlayground
    name="GlowingEffect"
    :defaults="{ glow: true, disabled: false, blur: 0, spread: 70, proximity: 56, inactiveZone: 0.12, borderWidth: 2, movementDuration: 1.6, variant: 'default' }"
    :controls="{ variant: { kind: 'select', options: [{ label: 'Default', value: 'default' }, { label: 'White', value: 'white' }] }, glow: { kind: 'boolean', label: 'Glow' }, disabled: { kind: 'boolean', label: 'Disabled' }, blur: { kind: 'number', min: 0, max: 20, step: 1 }, spread: { kind: 'number', min: 20, max: 140, step: 5 }, proximity: { kind: 'number', min: 0, max: 120, step: 4 }, inactiveZone: { kind: 'number', min: 0, max: 0.4, step: 0.01 }, borderWidth: { kind: 'number', min: 0, max: 4, step: 0.5 }, movementDuration: { kind: 'number', min: 0.2, max: 3, step: 0.1 } }"
  />
</template>
