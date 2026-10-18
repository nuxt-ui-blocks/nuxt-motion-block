<template>
  <ComponentPlayground
    name="TextScramble"
    :defaults="{
      text: 'Scrambling text',
      as: 'p',
      duration: 0.8,
      speed: 0.04,
      characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      className: '',
      trigger: true,
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
      text: { label: 'Text', kind: 'string' },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.2, max: 4, step: 0.1 },
      speed: { label: 'Speed (s)', kind: 'number', min: 0.01, max: 0.3, step: 0.01 },
      characterSet: { label: 'Character set', kind: 'string' },
      trigger: { label: 'Trigger', kind: 'boolean' },
    }"
  />
</template>
