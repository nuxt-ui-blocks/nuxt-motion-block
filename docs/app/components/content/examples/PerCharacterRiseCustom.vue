<template>
  <ComponentPlayground
    name="PerCharacterRise"
    :defaults="{
      text: 'Read it one letter at a time',
      stagger: 24,
      delay: 0,
      triggerOnView: false,
      class: 'text-center text-3xl font-bold text-highlighted',
    }"
    :controls="{
      text: { label: 'Text', kind: 'string' },
      stagger: { label: 'Stagger (ms)', kind: 'number', min: 0, max: 120, step: 2 },
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 1000, step: 50 },
      triggerOnView: { label: 'Trigger on view', kind: 'boolean' },
    }"
  />
</template>
