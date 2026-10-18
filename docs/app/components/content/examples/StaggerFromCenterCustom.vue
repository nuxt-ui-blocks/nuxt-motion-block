<template>
  <ComponentPlayground
    name="StaggerFromCenter"
    :defaults="{
      text: 'Center out',
      stagger: 22,
      delay: 0,
      triggerOnView: false,
    }"
    :controls="{
      stagger: { label: 'Stagger (ms)', kind: 'number', min: 0, max: 80, step: 1 },
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 1000, step: 50 },
      triggerOnView: { label: 'Trigger on view', kind: 'boolean' },
    }"
  />
</template>
