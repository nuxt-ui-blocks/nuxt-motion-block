<template>
  <ComponentPlayground
    name="ExpandableNavbar"
    :defaults="{
      title: 'Motion',
      items: [
        { label: 'Products', to: '#', icon: 'i-lucide-box' },
        { label: 'Pricing', to: '#', icon: 'i-lucide-tag' },
        { label: 'Docs', to: '#', icon: 'i-lucide-book-open' },
      ],
    }"
    :hide="['items']"
  />
</template>
