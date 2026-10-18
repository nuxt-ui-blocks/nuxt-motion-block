<template>
  <ComponentPlayground
    name="PerspectiveText3D"
    :defaults="{
      text: 'Depth in the letterforms',
      driver: 'static',
      split: 'words',
      depth: 40,
      perspective: 800,
      rotateX: 8,
      rotateY: 10,
      offset: ['start 0.9', 'end 0.45'],
    }"
    :controls="{
      driver: {
        kind: 'select',
        options: [
          { label: 'Static', value: 'static' },
          { label: 'Pointer', value: 'pointer' },
          { label: 'Scroll', value: 'scroll' },
        ],
      },
      split: {
        kind: 'select',
        options: [
          { label: 'Words', value: 'words' },
          { label: 'Lines', value: 'lines' },
        ],
      },
      depth: { label: 'Depth (px)', kind: 'number', min: 0, max: 120, step: 2 },
      perspective: { label: 'Perspective (px)', kind: 'number', min: 200, max: 2000, step: 50 },
      rotateX: { label: 'Rotate X (°)', kind: 'number', min: -60, max: 60, step: 1 },
      rotateY: { label: 'Rotate Y (°)', kind: 'number', min: -60, max: 60, step: 1 },
    }"
  />
</template>
