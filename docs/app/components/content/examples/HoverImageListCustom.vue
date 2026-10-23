<template>
  <ComponentPlayground
    name="HoverImageList"
    :defaults="{
      items: [
        {
          id: 'nuxt',
          title: 'Nuxt',
          meta: 'The full-stack Vue framework',
          href: 'https://nuxt.com',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop',
          alt: 'Code on a dark screen',
        },
        {
          id: 'motion',
          title: 'Motion for Vue',
          meta: 'A production-ready animation library',
          href: 'https://motion.dev',
          image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop',
          alt: 'Retro computer hardware',
        },
        {
          id: 'nuxt-ui',
          title: 'Nuxt UI',
          meta: 'A UI library for Nuxt applications',
          href: 'https://ui.nuxt.com',
          image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=600&fit=crop',
          alt: 'A designer working on an interface',
        },
      ],
      revealMode: 'cursor',
      follow: true,
      imageSize: 240,
      class: 'max-w-xl',
    }"
    :controls="{
      items: { label: 'Items (JSON)', kind: 'json' },
      revealMode: {
        label: 'Reveal mode',
        kind: 'select',
        options: [
          { label: 'Cursor', value: 'cursor' },
          { label: 'Fixed', value: 'fixed' },
        ],
      },
      follow: { label: 'Follow pointer', kind: 'boolean' },
      imageSize: { label: 'Image size', kind: 'number', min: 96, max: 400, step: 8 },
    }"
  />
</template>
