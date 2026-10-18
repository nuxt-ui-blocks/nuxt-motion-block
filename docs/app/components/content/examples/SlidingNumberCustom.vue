<template>
  <ComponentPlayground
    name="SlidingNumber"
    :defaults="{
      value: 1234,
      padStart: false,
      decimalSeparator: '.',
      precision: 0,
    }"
    :controls="{
      value: { kind: 'number', min: 0, max: 100000, step: 1, label: 'Value' },
      precision: { kind: 'number', min: 0, max: 4, step: 1, label: 'Precision' },
    }"
  />
</template>
