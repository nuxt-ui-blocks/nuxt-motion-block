<template>
  <ComponentPlayground
    name="SpinningText"
    :defaults="{
      children: 'NUXT-MOTION-BLOCK',
      duration: 10,
      reverse: false,
      fontSize: 1,
      radius: 5,
    }"
    :controls="{
      children: { label: 'Text', kind: 'string', placeholder: 'NUXT-MOTION-BLOCK' },
      duration: { label: 'Duration (s)', kind: 'number', min: 2, max: 30, step: 0.5 },
      reverse: { label: 'Reverse', kind: 'boolean' },
      fontSize: { label: 'Font size', kind: 'number', min: 0.5, max: 3, step: 0.1 },
      radius: { label: 'Radius', kind: 'number', min: 2, max: 12, step: 0.5 },
    }"
  />
</template>
