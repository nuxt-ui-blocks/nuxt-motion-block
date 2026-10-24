<template>
  <ComponentPlayground
    name="GravityLetters"
    :defaults="{
      text: 'Every letter has weight',
      trigger: 'hover',
      gravity: 1200,
      bounce: 0.35,
      friction: 0.4,
      spread: 140,
      stagger: 40,
      class: 'w-full max-w-lg text-center text-4xl font-bold text-highlighted',
    }"
    :controls="{
      text: { label: 'Text', kind: 'string' },
      trigger: {
        label: 'Trigger',
        kind: 'select',
        options: [
          { label: 'Hover', value: 'hover' },
          { label: 'Click', value: 'click' },
          { label: 'On view', value: 'inView' },
        ],
      },
      gravity: { label: 'Gravity', kind: 'number', min: 200, max: 3000, step: 100 },
      bounce: { label: 'Bounce', kind: 'number', min: 0, max: 0.8, step: 0.05 },
      friction: { label: 'Friction', kind: 'number', min: 0, max: 0.9, step: 0.05 },
      spread: { label: 'Spread', kind: 'number', min: 0, max: 400, step: 20 },
      stagger: { label: 'Stagger (ms)', kind: 'number', min: 0, max: 120, step: 5 },
    }"
  />
</template>
