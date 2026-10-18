<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const appConfig = useAppConfig()
const { forced: forcedColorMode } = useDocusColorMode()
const { subNavigationMode } = useSubNavigation()

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const githubUrl = computed(() => appConfig.github?.url || '')

const sections = [
  { label: 'Components', to: '/components' },
  { label: 'Guides', to: '/guides' },
  { label: 'Blocks', to: '/blocks' },
  { label: 'Templates', to: '/templates' },
]

const rootClass = computed(() => [
  'group/header sticky z-50 mx-auto mt-4 h-(--ui-header-height) w-[calc(100%-1.5rem)] max-w-6xl rounded-full border border-default bg-default/70 backdrop-blur-xl transition-[top,box-shadow,background-color] duration-300 ease-out',
  scrolled.value
    ? 'top-2 bg-default/85 shadow-lg shadow-black/[0.06]'
    : 'top-4 shadow-sm shadow-black/[0.03]',
])
</script>

<template>
  <UHeader
    :ui="{ root: rootClass, center: 'flex-1 justify-center' }"
    :class="{ 'flex flex-col': subNavigationMode === 'header' }"
  >
    <template #left>
      <NuxtLink
        to="/"
        aria-label="Nuxt Motion Block"
        class="group/logo flex items-center gap-2"
      >
        <span class="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/40 text-inverted shadow-sm transition-transform duration-300 group-hover/header:scale-110">
          <UIcon
            name="i-lucide-blocks"
            class="size-4"
          />
        </span>
        <span class="text-base font-semibold tracking-tight text-highlighted">
          Motion<span class="text-primary">Block</span>
        </span>
      </NuxtLink>
    </template>

    <nav class="hidden items-center gap-0.5 lg:flex">
      <UButton
        v-for="section in sections"
        :key="section.to"
        :to="section.to"
        color="neutral"
        variant="ghost"
        size="sm"
      >
        {{ section.label }}
      </UButton>
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

    <template
      v-if="subNavigationMode === 'header'"
      #bottom
    >
      <AppHeaderBottom />
    </template>
  </UHeader>

  <MToaster position="top-right" />
</template>
