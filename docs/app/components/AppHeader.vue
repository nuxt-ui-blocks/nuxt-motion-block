<script setup lang="ts">
import { computed } from 'vue'

const appConfig = useAppConfig()
const { forced: forcedColorMode } = useDocusColorMode()
const { subNavigationMode } = useSubNavigation()

const githubUrl = computed(() => (typeof appConfig.github === 'object' && appConfig.github ? appConfig.github.url || '' : ''))

const sections = [
  { label: 'Components', to: '/components' },
  { label: 'Guides', to: '/guides' },
  { label: 'Blocks', to: '/blocks' },
  { label: 'Templates', to: '/templates' },
]
</script>

<template>
  <UHeader
    :ui="{
      root: 'sticky top-0 z-50 w-full border-b border-line bg-default/90 backdrop-blur-xl transition-colors duration-300',
      container: 'mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8',
      center: 'hidden flex-1 min-w-0 justify-center lg:flex',
    }"
    :class="{ 'flex flex-col': subNavigationMode === 'header' }"
  >
    <template #left>
      <NuxtLink
        to="/"
        aria-label="Nuxt Motion Block — home"
        class="group flex items-center gap-2.5"
      >
        <AppLogo :size="26" />
        <span class="font-display text-lg leading-none tracking-tight text-highlighted">
          Motion&nbsp;<span class="text-primary">Block</span>
        </span>
      </NuxtLink>
    </template>

    <nav class="flex items-center gap-0.5">
      <NuxtLink
        v-for="section in sections"
        :key="section.to"
        :to="section.to"
        class="rounded-sm px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-200 hover:text-highlighted"
      >
        {{ section.label }}
      </NuxtLink>
    </nav>

    <template #right>
      <UContentSearchButton
        :collapsed="false"
        class="hidden lg:inline-flex lg:w-56"
      />
      <UContentSearchButton class="lg:hidden" />

      <ClientOnly v-if="!forcedColorMode">
        <UColorModeButton />
        <template #fallback>
          <div class="size-8 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
        </template>
      </ClientOnly>

      <UButton
        v-if="githubUrl"
        :to="githubUrl"
        target="_blank"
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-github"
        aria-label="GitHub"
      />
    </template>

    <template #toggle="{ open, toggle }">
      <IconMenuToggle
        :open="open"
        class="lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <AppHeaderBody />
    </template>
  </UHeader>

  <MToaster position="top-right" />
</template>
