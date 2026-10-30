<template>
  <ComponentPlayground
    name="ScratchToReveal"
    :defaults="{
      width: 320,
      height: 200,
      brushSize: 24,
      threshold: 45,
    }"
    :controls="{
      width: { label: 'Width', kind: 'number', min: 180, max: 480, step: 10 },
      height: { label: 'Height', kind: 'number', min: 120, max: 320, step: 10 },
      brushSize: { label: 'Brush size', kind: 'number', min: 8, max: 64, step: 2 },
      threshold: { label: 'Threshold', kind: 'number', min: 5, max: 95, step: 5 },
    }"
  />
</template>
