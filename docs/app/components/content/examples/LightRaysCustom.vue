<template>
  <ComponentPlayground
    name="LightRays"
    :defaults="{
      color: '#7dd3fc',
      count: 24,
      speed: 1,
      spread: 0.85,
      length: 1.15,
      fade: 0.55,
      origin: 'top-center',
      pulsate: true,
      followMouse: false,
      class: 'h-72 w-full rounded-xl bg-neutral-950',
    }"
    :controls="{
      color: { label: 'Colour', kind: 'color' },
      count: { label: 'Beams', kind: 'number', min: 4, max: 40, step: 1 },
      speed: { label: 'Speed', kind: 'number', min: 0.2, max: 3, step: 0.1 },
      spread: { label: 'Spread', kind: 'number', min: 0.1, max: 1.5, step: 0.05 },
      length: { label: 'Length', kind: 'number', min: 0.5, max: 2, step: 0.05 },
      fade: { label: 'Fade', kind: 'number', min: 0.1, max: 0.95, step: 0.05 },
      origin: {
        label: 'Origin',
        kind: 'select',
        options: [
          { label: 'Top centre', value: 'top-center' },
          { label: 'Top left', value: 'top-left' },
          { label: 'Top right', value: 'top-right' },
          { label: 'Bottom centre', value: 'bottom-center' },
          { label: 'Bottom left', value: 'bottom-left' },
          { label: 'Bottom right', value: 'bottom-right' },
        ],
      },
      pulsate: { label: 'Pulsate', kind: 'boolean' },
      followMouse: { label: 'Follow pointer', kind: 'boolean' },
    }"
  />
</template>
