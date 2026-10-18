<template>
  <ComponentPlayground
    name="TextReveal"
    :defaults="{
      text: 'Reveal each character in turn',
      direction: 'up',
      effect: 'slide',
      stagger: 0.05,
      duration: 0.6,
      delay: 0,
      startOnView: false,
      once: true,
      charClass: '',
      trigger: true,
      ariaLabel: '',
      reduceMotion: false,
    }"
    :controls="{
      direction: {
        kind: 'select',
        options: [
          { label: 'up', value: 'up' },
          { label: 'down', value: 'down' },
          { label: 'left', value: 'left' },
          { label: 'right', value: 'right' },
          { label: 'random', value: 'random' },
        ],
      },
      effect: {
        kind: 'select',
        options: [
          { label: 'fade', value: 'fade' },
          { label: 'slide', value: 'slide' },
          { label: 'bounce', value: 'bounce' },
          { label: 'rotate', value: 'rotate' },
          { label: 'scale', value: 'scale' },
          { label: 'blur', value: 'blur' },
        ],
      },
      stagger: { label: 'Stagger (s)', kind: 'number', min: 0, max: 0.3, step: 0.01 },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.1, max: 3, step: 0.1 },
      delay: { label: 'Delay (s)', kind: 'number', min: 0, max: 2, step: 0.1 },
      startOnView: { label: 'Start on view', kind: 'boolean' },
      once: { label: 'Once', kind: 'boolean' },
      trigger: { label: 'Trigger', kind: 'boolean' },
      reduceMotion: { label: 'Reduce motion', kind: 'boolean' },
      charClass: { label: 'Character class', kind: 'string' },
      ariaLabel: { label: 'ARIA label', kind: 'string' },
    }"
  />
</template>
