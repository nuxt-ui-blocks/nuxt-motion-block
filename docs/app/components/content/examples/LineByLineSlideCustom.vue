<template>
  <ComponentPlayground
    name="LineByLineSlide"
    :defaults="{
      text: 'Copy that arrives\none line at a time',
      lines: ['Copy that arrives', 'one line at a time'],
      stagger: 120,
      delay: 0,
      triggerOnView: false,
    }"
    :controls="{
      stagger: { label: 'Stagger (ms)', kind: 'number', min: 0, max: 400, step: 10 },
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 1000, step: 50 },
      triggerOnView: { label: 'Trigger on view', kind: 'boolean' },
    }"
  />
</template>
