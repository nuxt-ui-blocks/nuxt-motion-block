<template>
  <div class="space-y-12">
    <UPageHeader
      title="ExpandableCards"
      description="UCard accordion group with spring height animation and stagger entrance."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Accordion (Single)
        </p>
      </template>
      <MExpandableCards :items="faqItems" />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Accordion (Multiple)
        </p>
      </template>
      <MExpandableCards
        :items="featureItems"
        :multiple="true"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom Slot Content
        </p>
      </template>
      <MExpandableCards :items="guideItems">
        <template #item="{ item }">
          <div class="mt-2 flex gap-2">
            <UButton
              :label="`Read the ${item.title} guide`"
              size="xs"
              color="primary"
              variant="outline"
            />
            <UButton
              label="View docs"
              size="xs"
              color="neutral"
              variant="outline"
            />
          </div>
        </template>
      </MExpandableCards>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const faqItems = [
  { title: 'What is this product?', content: 'A powerful UI component library for building modern web applications with beautiful animations and interactions.' },
  { title: 'How do I get started?', content: 'Install the package, import the components you need, and start building. Check out our quick start guide for detailed instructions.' },
  { title: 'Is there a free tier?', content: 'Yes! Our community tier is completely free and includes access to all core components with MIT licensing.' },
  { title: 'Can I use it with Nuxt?', content: 'Absolutely. We provide first-class Nuxt module support with auto-imports and SSR compatibility out of the box.' },
]

const featureItems = [
  { title: 'Animation Engine', content: 'Built on motion-v with spring physics, gesture support, and hardware-accelerated transforms for buttery smooth 60fps animations.' },
  { title: 'Theme System', content: 'Full design token support with CSS custom properties, dark mode, and runtime theme switching. Customize every aspect of the visual design.' },
  { title: 'Accessibility', content: 'All components follow WAI-ARIA patterns with proper focus management, keyboard navigation, and screen reader support.' },
  { title: 'TypeScript', content: 'Written in TypeScript with full type inference, generic component APIs, and comprehensive type definitions for your IDE.' },
]

const guideItems = [
  { title: 'Installation', content: 'Run your package manager command to install the module. Then add it to your Nuxt config.' },
  { title: 'Configuration', content: 'Configure the module in nuxt.config.ts with your preferred theme, prefix, and component options.' },
  { title: 'Deployment', content: 'Build and deploy to any platform. We support Vercel, Netlify, Cloudflare Pages, and traditional Node.js hosting.' },
]
</script>
