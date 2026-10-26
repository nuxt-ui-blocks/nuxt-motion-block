<template>
  <ComponentPlayground
    name="ScaleDownFade"
    :defaults="{
      text: 'Arrives at its own size',
      delay: 0,
      triggerOnView: false,
      class: 'text-center text-4xl font-semibold tracking-tight text-highlighted',
    }"
    :controls="{
      text: { label: 'Text', kind: 'string' },
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 1200, step: 50 },
      triggerOnView: { label: 'Trigger on view', kind: 'boolean' },
    }"
  />
</template>
