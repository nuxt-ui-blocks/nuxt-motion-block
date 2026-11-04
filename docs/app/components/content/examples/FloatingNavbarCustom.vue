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
    :controls="{ position: { kind: 'select', options: [{ label: 'Fixed', value: 'fixed' }, { label: 'Inline', value: 'inline' }] } }"
  />
</template>
