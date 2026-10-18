<template>
  <ComponentPlayground
    name="TypingText"
    :defaults="{
      text: 'Hello, world',
      texts: ['Hello world', 'Bonjour', 'Hola'],
      speed: 100,
      delay: 0,
      showCursor: true,
      cursor: '|',
      loop: false,
      pauseDuration: 2000,
      startOnView: true,
      once: false,
      animation: 'fadeIn',
      inViewMargin: '0px',
    }"
    :controls="{
      text: { label: 'Text', kind: 'string', placeholder: 'Hello, world' },
      texts: { label: 'Texts to cycle', kind: 'array', placeholder: 'Hello world, Bonjour, Hola' },
      speed: { label: 'Speed (ms per character)', kind: 'number', min: 20, max: 300, step: 10 },
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 2000, step: 50 },
      showCursor: { label: 'Show cursor', kind: 'boolean' },
      cursor: { label: 'Cursor', kind: 'string', placeholder: '|' },
      animation: {
        label: 'Animation preset',
        kind: 'select',
        options: [
          { label: 'Fade in', value: 'fadeIn' },
          { label: 'Blur in', value: 'blurIn' },
          { label: 'Blur in up', value: 'blurInUp' },
          { label: 'Blur in down', value: 'blurInDown' },
          { label: 'Slide up', value: 'slideUp' },
          { label: 'Slide down', value: 'slideDown' },
          { label: 'Slide left', value: 'slideLeft' },
          { label: 'Slide right', value: 'slideRight' },
          { label: 'Scale up', value: 'scaleUp' },
          { label: 'Scale down', value: 'scaleDown' },
        ],
      },
      loop: { label: 'Loop', kind: 'boolean' },
      pauseDuration: { label: 'Pause between loops (ms)', kind: 'number', min: 0, max: 5000, step: 100 },
      startOnView: { label: 'Start on view', kind: 'boolean' },
      once: { label: 'Once', kind: 'boolean' },
      inViewMargin: { label: 'In-view margin', kind: 'string', placeholder: '0px' },
    }"
  />
</template>
