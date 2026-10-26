<template>
  <ComponentPlayground
    name="AiLoader"
    :defaults="{
      label: 'Thinking',
      variant: 'dots',
      showElapsed: false,
    }"
    :controls="{
      label: { label: 'Label', kind: 'string' },
      variant: {
        label: 'Variant',
        kind: 'select',
        options: [
          { label: 'Dots', value: 'dots' },
          { label: 'Bar', value: 'bar' },
          { label: 'Grid', value: 'grid' },
        ],
      },
      showElapsed: { label: 'Show elapsed', kind: 'boolean' },
    }"
  />
</template>
