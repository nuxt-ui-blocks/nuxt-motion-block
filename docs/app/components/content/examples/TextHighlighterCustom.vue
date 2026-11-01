<template>
  <ComponentPlayground
    name="TextHighlighter"
    :defaults="{
      text: 'move with intent',
      duration: 0.7,
      delay: 0.1,
    }"
    :controls="{
      text: { label: 'Text', kind: 'string' },
      highlightColor: { label: 'Highlight colour (blank = theme)', kind: 'color' },
      duration: { label: 'Duration', kind: 'number', min: 0.1, max: 2, step: 0.1 },
      delay: { label: 'Delay', kind: 'number', min: 0, max: 1.5, step: 0.1 },
    }"
  />
</template>
