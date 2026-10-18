<template>
  <ComponentPlayground
    name="TextLoop"
    :defaults="{
      items: ['Modern', 'Innovative', 'Beautiful', 'Interactive'],
      className: '',
      interval: 2,
      trigger: true,
    }"
    :controls="{
      items: { label: 'Items', kind: 'array', placeholder: 'Modern, Innovative, ...' },
      interval: { label: 'Interval (s)', kind: 'number', min: 0.5, max: 8, step: 0.5 },
      trigger: { label: 'Trigger', kind: 'boolean' },
    }"
    :hide="['transition', 'variants', 'onIndexChange']"
  />
</template>
