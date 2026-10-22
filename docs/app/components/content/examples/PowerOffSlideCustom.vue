<template>
  <ComponentPlayground
    name="PowerOffSlide"
    min-height="200px"
    :controls="{
      label: { kind: 'string' },
      duration: { kind: 'number', min: 500, max: 5000, step: 250 },
    }"
  />
</template>
