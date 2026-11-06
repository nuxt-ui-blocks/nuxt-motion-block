<script setup lang="ts">
interface FooterLink {
  label: string
  to: string
  external?: boolean
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const columns: FooterColumn[] = [
  {
    title: 'Docs',
    links: [
      { label: 'Getting started', to: '/getting-started' },
      { label: 'Components', to: '/components' },
      { label: 'Blocks', to: '/blocks' },
      { label: 'Templates', to: '/templates' },
    ],
  },
  {
    title: 'Library',
    links: [
      { label: 'GitHub', to: 'https://github.com/nuxt-ui-blocks/nuxt-motion-block', external: true },
      { label: 'npm', to: 'https://www.npmjs.com/package/nuxt-motion-block', external: true },
      { label: 'Changelog', to: 'https://github.com/nuxt-ui-blocks/nuxt-motion-block/blob/master/CHANGELOG.md', external: true },
      { label: 'MIT license', to: 'https://github.com/nuxt-ui-blocks/nuxt-motion-block/blob/master/LICENSE', external: true },
    ],
  },
  {
    title: 'Built with',
    links: [
      { label: 'Nuxt UI', to: 'https://ui.nuxt.com', external: true },
      { label: 'Motion for Vue', to: 'https://motion.dev', external: true },
      { label: 'Docus', to: 'https://docus.dev', external: true },
      { label: 'Cloudflare Pages', to: 'https://pages.cloudflare.com', external: true },
    ],
  },
]
</script>

<template>
  <UFooter class="border-t border-default">
    <template #top>
      <!--
        UFooter only wraps #left/#right in the page container, so #top has to
        bring its own gutters or it runs flush to the viewport edge.
      -->
      <div class="mx-auto grid w-full max-w-(--ui-container) gap-10 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:px-8">
        <div>
          <p class="font-serif text-2xl leading-tight text-highlighted">
            Motion Block
          </p>
          <p class="mt-2 max-w-xs text-sm text-muted text-pretty">
            292 animated components for Nuxt UI. Springs, staggers, scroll and 3D that inherit your design tokens.
          </p>
        </div>

        <div
          v-for="column in columns"
          :key="column.title"
        >
          <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed">
            {{ column.title }}
          </p>
          <ul class="mt-4 space-y-2.5">
            <li
              v-for="link in column.links"
              :key="link.label"
            >
              <NuxtLink
                :to="link.to"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener' : undefined"
                class="text-sm text-muted transition hover:text-highlighted"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        © 2026 Nuxt Motion Block · MIT · built by
        <NuxtLink
          to="https://github.com/MuhammadKhizar7"
          target="_blank"
          rel="noopener"
          class="text-highlighted underline decoration-default underline-offset-4 transition hover:decoration-primary"
        >@MuhammadKhizar7</NuxtLink>
      </p>
    </template>

    <template #right>
      <UButton
        to="https://github.com/nuxt-ui-blocks/nuxt-motion-block"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-simple-icons-github"
        aria-label="GitHub repository"
      />
    </template>
  </UFooter>
</template>
