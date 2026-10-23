<template>
  <ComponentPlayground
    name="DigitRoll"
    :defaults="{
      modelValue: 42,
      min: 0,
      max: 100,
      step: 1,
      precision: 0,
      prefix: '',
      suffix: '',
      label: 'Quantity',
      stepper: true,
      scrub: true,
      clampOnBlur: true,
      disabled: false,
      class: 'w-56',
    }"
    :controls="{
      modelValue: { label: 'Value', kind: 'number', min: 0, max: 100, step: 1 },
      min: { label: 'Min', kind: 'number', min: -100, max: 100, step: 1 },
      max: { label: 'Max', kind: 'number', min: 0, max: 1000, step: 1 },
      step: { label: 'Step', kind: 'number', min: 0.1, max: 10, step: 0.1 },
      precision: { label: 'Precision', kind: 'number', min: 0, max: 3, step: 1 },
      prefix: { label: 'Prefix', kind: 'string' },
      suffix: { label: 'Suffix', kind: 'string' },
      label: { label: 'Label', kind: 'string' },
      stepper: { label: 'Stepper buttons', kind: 'boolean' },
      scrub: { label: 'Scrub', kind: 'boolean' },
      clampOnBlur: { label: 'Clamp on blur', kind: 'boolean' },
      disabled: { label: 'Disabled', kind: 'boolean' },
    }"
  />
</template>
