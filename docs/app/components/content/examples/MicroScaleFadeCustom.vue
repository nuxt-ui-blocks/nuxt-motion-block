<template>
  <ComponentPlayground
    name="MicroScaleFade"
    :defaults="{
      text: 'Get comfy',
      delay: 0,
      triggerOnView: false,
    }"
    :controls="{
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 1000, step: 50 },
      triggerOnView: { label: 'Trigger on view', kind: 'boolean' },
    }"
  />
</template>
