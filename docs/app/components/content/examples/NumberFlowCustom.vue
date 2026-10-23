<template>
  <ComponentPlayground
    name="NumberFlow"
    :defaults="{
      modelValue: 42,
      min: 0,
      max: 999,
    }"
    :controls="{
      modelValue: { label: 'Value', kind: 'number', min: 0, max: 999, step: 1 },
      min: { label: 'Min', kind: 'number', min: 0, max: 500, step: 1 },
      max: { label: 'Max', kind: 'number', min: 0, max: 999, step: 1 },
    }"
  />
</template>
