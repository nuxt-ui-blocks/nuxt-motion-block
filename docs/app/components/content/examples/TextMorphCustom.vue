<template>
  <ComponentPlayground
    name="TextMorph"
    :defaults="{
      text: 'Morphing text',
      as: 'span',
      className: '',
    }"
    :controls="{
      as: {
        kind: 'select',
        options: [
          { label: 'span', value: 'span' },
          { label: 'p', value: 'p' },
          { label: 'h1', value: 'h1' },
          { label: 'h2', value: 'h2' },
          { label: 'div', value: 'div' },
        ],
      },
      text: { label: 'Text', kind: 'string' },
    }"
    :hide="['variants', 'transition']"
  />
</template>
