<template>
  <ComponentPlayground
    name="Phototab"
    :defaults="{
      height: 400,
      tabs: [
        { name: 'Mountains', icon: 'i-lucide-mountain', image: 'https://picsum.photos/seed/mountains/800/800' },
        { name: 'Coast', icon: 'i-lucide-waves', image: 'https://picsum.photos/seed/coast/800/800' },
        { name: 'Forest', icon: 'i-lucide-trees', image: 'https://picsum.photos/seed/forest/800/800' },
        { name: 'City', icon: 'i-lucide-building-2', image: 'https://picsum.photos/seed/city/800/800' },
      ],
    }"
    :controls="{
      height: { label: 'Height', kind: 'number', min: 280, max: 560, step: 20 },
      tabs: { label: 'Tabs', kind: 'json' },
    }"
  />
</template>
