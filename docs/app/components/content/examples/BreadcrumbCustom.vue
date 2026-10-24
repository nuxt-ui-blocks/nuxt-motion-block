<template>
  <ComponentPlayground
    name="Breadcrumb"
    :defaults="{
      items: [
        { label: 'Docs', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Navigation', href: '#' },
        { label: 'Breadcrumb' },
      ],
      separator: 'i-lucide-chevron-right',
      ariaLabel: 'Breadcrumb',
    }"
    :controls="{
      separator: {
        label: 'Separator',
        kind: 'select',
        options: [
          { label: 'Chevron', value: 'i-lucide-chevron-right' },
          { label: 'Slash', value: 'i-lucide-slash' },
          { label: 'Arrow', value: 'i-lucide-arrow-right' },
          { label: 'Dot', value: 'i-lucide-dot' },
        ],
      },
      ariaLabel: { label: 'Accessible name', kind: 'string' },
      items: { label: 'Items', kind: 'json' },
    }"
  />
</template>
