<template>
  <ComponentPlayground
    name="AnimatedAvatarGroup"
    :hide="['avatars']"
    :defaults="{
      avatars: [
        { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Ana Ruiz' },
        { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Ben Osei' },
        { src: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Cleo Park' },
        { src: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Dmitri Ilves' },
        { src: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Elin Haugen' },
      ],
      size: 'lg',
      max: 4,
      maxVisible: 4,
      overlap: 0.35,
      expandOnHover: true,
      hoverScale: 1.08,
      staggerDelay: 0.03,
    }"
    :controls="{
      size: {
        kind: 'select',
        options: [
          { label: 'sm', value: 'sm' },
          { label: 'md', value: 'md' },
          { label: 'lg', value: 'lg' },
          { label: 'xl', value: 'xl' },
          { label: '2xl', value: '2xl' },
        ],
      },
      max: { kind: 'number', min: 0, max: 8, step: 1, label: 'Max' },
      maxVisible: { kind: 'number', min: 1, max: 8, step: 1, label: 'Max visible' },
      overlap: { kind: 'number', min: 0, max: 0.6, step: 0.05, label: 'Overlap' },
      expandOnHover: { kind: 'boolean', label: 'Expand on hover' },
      hoverScale: { kind: 'number', min: 1, max: 1.5, step: 0.01, label: 'Hover scale' },
      staggerDelay: { kind: 'number', min: 0, max: 0.2, step: 0.01, label: 'Stagger (s)' },
    }"
    min-height="360px"
  />
</template>
