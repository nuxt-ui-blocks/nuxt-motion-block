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
  <footer class="border-t border-line bg-elevated/40">
    <div class="mb-shell">
      <div class="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-10 lg:py-16">
        <div>
          <NuxtLink
            to="/"
            aria-label="Nuxt Motion Block — home"
            class="flex items-center gap-2.5"
          >
            <AppLogo :size="26" />
            <span class="font-display text-lg leading-none tracking-tight text-highlighted">
              Motion&nbsp;<span class="text-primary">Block</span>
            </span>
          </NuxtLink>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted text-pretty">
            292 animated components for Nuxt UI. Springs, staggers, scroll and 3D that inherit your design tokens.
          </p>
          <p class="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">
            01 — Motion, it turns out, was always the product.
          </p>
        </div>

        <div
          v-for="column in columns"
          :key="column.title"
        >
          <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">
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

      <div class="flex flex-col gap-4 border-t border-line-muted border-line py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed">
          MIT © 2026 Nuxt Motion Block — nuxt-motion-block.pages.dev
        </p>
        <ul class="flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed">
          <li>Theme-aware</li>
          <li>Typed</li>
          <li>Accessible</li>
          <li>MIT</li>
        </ul>
      </div>
    </div>
  </footer>
</template>
