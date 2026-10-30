<template>
  <ComponentPlayground
    name="Lens"
    :defaults="{
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
      alt: 'A snow-covered mountain ridge at sunrise',
      zoom: 2.4,
      size: 180,
      class: 'h-64 w-full rounded-xl',
    }"
    :controls="{
      src: { label: 'Source', kind: 'string' },
      alt: { label: 'Alt text', kind: 'string' },
      zoom: { label: 'Zoom', kind: 'number', min: 1.2, max: 5, step: 0.2 },
      size: { label: 'Lens size', kind: 'number', min: 80, max: 280, step: 10 },
    }"
  />
</template>
