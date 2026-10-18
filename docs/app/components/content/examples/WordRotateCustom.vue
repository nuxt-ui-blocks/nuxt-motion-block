<template>
  <ComponentPlayground
    name="WordRotate"
    :defaults="{
      words: ['design', 'build', 'create'],
      duration: 1500,
      animationStyle: 'fade',
      loop: true,
      pauseDuration: 300,
      startOnView: true,
      once: false,
      inViewMargin: '0px',
    }"
    :controls="{
      duration: { kind: 'number', min: 200, max: 5000, step: 100, label: 'Duration (ms)' },
      pauseDuration: { kind: 'number', min: 0, max: 2000, step: 50, label: 'Pause (ms)' },
      animationStyle: {
        kind: 'select',
        options: [
          { label: 'Fade', value: 'fade' },
          { label: 'Rise in', value: 'slide-up' },
          { label: 'Lower in', value: 'slide-down' },
          { label: 'Scale', value: 'scale' },
          { label: 'Flip', value: 'flip' },
        ],
      },
    }"
  />
</template>
