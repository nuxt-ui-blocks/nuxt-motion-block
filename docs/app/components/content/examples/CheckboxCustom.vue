<template>
  <ComponentPlayground
    name="Checkbox"
    :defaults="{ modelValue: true, label: 'Accept terms', drawDuration: 0.3 }"
    :controls="{
      modelValue: { label: 'Checked' },
      label: { kind: 'string', label: 'Label', placeholder: 'Label text' },
      drawDuration: { kind: 'number', min: 0, max: 1.5, step: 0.05, label: 'Draw duration' },
    }"
  />
</template>
