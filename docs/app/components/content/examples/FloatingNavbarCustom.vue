<template>
  <ComponentPlayground
    name="FloatingNavbar"
    :defaults="{
      brand: 'Motion',
      position: 'inline',
      links: [
        { label: 'Features', to: '#' },
        { label: 'Pricing', to: '#' },
        { label: 'Docs', to: '#' },
      ],
    }"
    :hide="['links']"
    :controls="{ position: { kind: 'select', options: ['fixed', 'inline'] } }"
  />
</template>
