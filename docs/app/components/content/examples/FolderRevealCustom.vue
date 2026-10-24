<template>
  <ComponentPlayground
    name="FolderReveal"
    min-height="320px"
    :controls="{
      color: {
        kind: 'select',
        options: [
          { label: 'Manila', value: 'manila' },
          { label: 'Rose', value: 'rose' },
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
          { label: 'Slate', value: 'slate' },
        ],
      },
      trigger: {
        kind: 'select',
        options: [
          { label: 'Hover', value: 'hover' },
          { label: 'Click', value: 'click' },
        ],
      },
      size: { kind: 'number', min: 180, max: 360, step: 10 },
      spread: { kind: 'number', min: 20, max: 100, step: 4 },
      rotation: { kind: 'number', min: 0, max: 14, step: 1 },
    }"
  />
</template>
