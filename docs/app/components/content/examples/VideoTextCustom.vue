<template>
  <ComponentPlayground
    name="VideoText"
    :defaults="{
      src: 'https://media.w3.org/2010/05/video/movie_300.mp4',
      text: 'Motion',
      fontSize: 'clamp(3rem, 13vw, 9rem)',
      blend: 'multiply',
      autoplay: true,
      loop: true,
      class: 'h-64 w-full rounded-xl',
    }"
    :controls="{
      src: { label: 'Source', kind: 'string' },
      text: { label: 'Text', kind: 'string' },
      fontSize: { label: 'Font size', kind: 'string' },
      blend: {
        label: 'Blend',
        kind: 'select',
        options: [
          { label: 'Multiply (dark surround)', value: 'multiply' },
          { label: 'Screen (light surround)', value: 'screen' },
        ],
      },
      autoplay: { label: 'Autoplay', kind: 'boolean' },
      loop: { label: 'Loop', kind: 'boolean' },
    }"
  />
</template>
