<template>
  <ComponentPlayground
    name="Book"
    :defaults="{
      title: 'Designing Motion',
      variant: 'stripe',
      color: '#e5a00d',
      textColor: '#1f2937',
      width: 196,
      class: 'mx-auto',
    }"
    :controls="{
      title: { label: 'Title', kind: 'string' },
      variant: {
        label: 'Variant',
        kind: 'select',
        options: [
          { label: 'Stripe', value: 'stripe' },
          { label: 'Simple', value: 'simple' },
        ],
      },
      color: { label: 'Cover color', kind: 'string' },
      textColor: { label: 'Text color', kind: 'string' },
      width: { label: 'Width (px)', kind: 'number', min: 120, max: 280, step: 4 },
    }"
  />
</template>
