<template>
  <ComponentPlayground
    name="ScrollRevealParagraph"
    :defaults="{
      paragraph: 'A paragraph that fills in as it travels up the viewport, one word at a time, so the reader always has the next word to reach for.',
      class: 'max-w-xl',
    }"
    :controls="{
      paragraph: { label: 'Paragraph', kind: 'string' },
    }"
  />
</template>
