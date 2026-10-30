<template>
  <ComponentPlayground
    name="ZoomableImage"
    :defaults="{
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      alt: 'A snow-covered mountain ridge at sunrise',
      class: 'h-64 w-full rounded-xl',
    }"
    :controls="{
      src: { label: 'Source', kind: 'string' },
      alt: { label: 'Alt text', kind: 'string' },
    }"
  />
</template>
