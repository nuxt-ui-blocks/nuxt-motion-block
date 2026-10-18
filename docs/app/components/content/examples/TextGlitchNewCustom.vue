<template>
  <ComponentPlayground
    name="TextGlitchNew"
    :defaults="{
      text: 'GLITCH',
      speed: 0.5,
      enableShadows: true,
      enableOnHover: false,
    }"
    :controls="{
      speed: { label: 'Speed', kind: 'number', min: 0.1, max: 3, step: 0.1 },
      enableShadows: { label: 'Shadows', kind: 'boolean' },
      enableOnHover: { label: 'On hover', kind: 'boolean' },
    }"
  />
</template>
