<template>
  <ComponentPlayground
    name="TextShimmer"
    :defaults="{
      text: 'Shimmering text',
      as: 'p',
      duration: 2,
      spread: 2,
    }"
    :controls="{
      text: { label: 'Text', kind: 'string', placeholder: 'Shimmering text' },
      as: {
        kind: 'select',
        options: [
          { label: 'p', value: 'p' },
          { label: 'span', value: 'span' },
          { label: 'h1', value: 'h1' },
          { label: 'h2', value: 'h2' },
          { label: 'div', value: 'div' },
        ],
      },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.5, max: 6, step: 0.1 },
      spread: { label: 'Spread', kind: 'number', min: 0, max: 10, step: 0.5 },
    }"
  />
</template>
