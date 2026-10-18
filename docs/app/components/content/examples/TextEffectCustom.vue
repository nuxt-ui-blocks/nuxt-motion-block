<template>
  <ComponentPlayground
    name="TextEffect"
    :defaults="{
      children: 'Split the string, then stagger the reveal.',
      per: 'char',
      preset: 'blur',
      as: 'p',
      delay: 0,
      speedReveal: 1,
      speedSegment: 1,
      trigger: true,
      segmentWrapperClassName: '',
    }"
    :controls="{
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
      per: {
        kind: 'select',
        options: [
          { label: 'char', value: 'char' },
          { label: 'word', value: 'word' },
          { label: 'line', value: 'line' },
        ],
      },
      preset: {
        kind: 'select',
        options: [
          { label: 'blur', value: 'blur' },
          { label: 'fade-in-blur', value: 'fade-in-blur' },
          { label: 'scale', value: 'scale' },
          { label: 'fade', value: 'fade' },
          { label: 'slide', value: 'slide' },
        ],
      },
      delay: { label: 'Delay (s)', kind: 'number', min: 0, max: 2, step: 0.1 },
      speedReveal: { label: 'Speed reveal', kind: 'number', min: 0, max: 4, step: 0.1 },
      speedSegment: { label: 'Speed segment', kind: 'number', min: 0.2, max: 4, step: 0.1 },
      trigger: { label: 'Trigger', kind: 'boolean' },
      segmentWrapperClassName: { label: 'Segment wrapper class', kind: 'string' },
    }"
    :hide="['variants', 'containerTransition', 'segmentTransition']"
  />
</template>
