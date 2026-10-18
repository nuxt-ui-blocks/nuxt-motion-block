<template>
  <ComponentPlayground
    name="ScrollImageReveal"
    :defaults="{
      src: 'https://picsum.photos/seed/playground-reveal/900/600',
      alt: 'A misty mountain ridge at sunrise',
      mask: 'wipe',
      direction: 'left',
      parallax: 60,
      once: false,
      offset: ['start 0.9', 'end 0.6'],
      rounded: 'rounded-2xl',
      class: 'h-72',
    }"
    :controls="{
      mask: {
        kind: 'select',
        options: [
          { label: 'Wipe', value: 'wipe' },
          { label: 'Curtain', value: 'curtain' },
          { label: 'Circle', value: 'circle' },
          { label: 'Blinds', value: 'blinds' },
          { label: 'Scale', value: 'scale' },
        ],
      },
      direction: {
        kind: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Up', value: 'up' },
          { label: 'Down', value: 'down' },
        ],
      },
      parallax: { kind: 'number', min: 10, max: 200, step: 10 },
      once: { kind: 'boolean', label: 'Once' },
    }"
    :hide="['offset']"
  />
</template>
