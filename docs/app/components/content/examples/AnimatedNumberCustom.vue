<template>
  <ComponentPlayground
    name="AnimatedNumber"
    :defaults="{
      value: 1234,
      as: 'span',
    }"
    :controls="{
      value: { kind: 'number', min: 0, max: 100000, step: 1, label: 'Value' },
      as: {
        kind: 'select',
        options: [
          { label: 'span', value: 'span' },
          { label: 'p', value: 'p' },
          { label: 'div', value: 'div' },
        ],
      },
    }"
    :hide="['springOptions', 'format']"
  />
</template>
