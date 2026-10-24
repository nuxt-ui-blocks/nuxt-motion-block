<template>
  <ComponentPlayground
    name="DepthParallaxWords"
    :defaults="{
      text: 'Every word arrives from further back',
      stagger: 70,
      delay: 0,
      triggerOnView: false,
      class: 'max-w-md text-center text-3xl font-bold text-highlighted',
    }"
    :controls="{
      text: { label: 'Text', kind: 'string' },
      stagger: { label: 'Stagger (ms)', kind: 'number', min: 0, max: 200, step: 5 },
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 1000, step: 50 },
      triggerOnView: { label: 'Trigger on view', kind: 'boolean' },
    }"
  />
</template>
