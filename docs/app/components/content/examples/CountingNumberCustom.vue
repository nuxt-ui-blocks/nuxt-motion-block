<template>
  <ComponentPlayground
    name="CountingNumber"
    :defaults="{
      from: 0,
      to: 1000,
      duration: 2,
      delay: 0,
      startOnView: true,
      once: false,
      inViewMargin: '0px',
    }"
    :controls="{
      from: { kind: 'number', min: 0, max: 1000, step: 1, label: 'From' },
      to: { kind: 'number', min: 0, max: 100000, step: 1, label: 'To' },
      duration: { kind: 'number', min: 0.1, max: 10, step: 0.1, label: 'Duration (s)' },
      delay: { kind: 'number', min: 0, max: 5000, step: 100, label: 'Delay (ms)' },
    }"
    :hide="['format', 'onComplete']"
  />
</template>
