<script setup lang="ts">
const colophon = [
  { label: 'Maintained by', value: '@MuhammadKhizar7', to: 'https://github.com/MuhammadKhizar7' },
  { label: 'License', value: 'MIT', to: 'https://github.com/nuxt-ui-blocks/nuxt-motion-block/blob/master/LICENSE' },
  { label: 'Version', value: '0.1.0' },
  { label: 'Source', value: 'nuxt-ui-blocks/nuxt-motion-block', to: 'https://github.com/nuxt-ui-blocks/nuxt-motion-block' },
]
</script>

<template>
  <div class="relative isolate overflow-hidden rounded-3xl border border-default bg-elevated/20">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(16,185,129,0.14),transparent_60%)]"
    />

    <div class="relative z-10 px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <LandingEyebrow
            index="06"
            label="Start"
          />
          <h2 class="mt-5 text-4xl font-semibold tracking-tight text-highlighted text-pretty sm:text-5xl">
            Make something that moves
          </h2>

          <p class="mt-5 max-w-md text-lg text-muted text-pretty">
            One install, then the components are yours — your theme, your tokens, your taste.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <MMagnetic>
              <UButton
                to="/getting-started"
                size="xl"
                trailing-icon="i-lucide-arrow-right"
              >
                Get started
              </UButton>
            </MMagnetic>
            <UButton
              to="https://github.com/nuxt-ui-blocks/nuxt-motion-block"
              target="_blank"
              color="neutral"
              variant="outline"
              size="xl"
              icon="i-simple-icons-github"
            >
              View on GitHub
            </UButton>
          </div>

          <div class="mt-6">
            <CopyCommand command="pnpm add nuxt-motion-block" />
          </div>
        </div>

        <dl class="self-end border-t border-default">
          <div
            v-for="row in colophon"
            :key="row.label"
            class="flex items-baseline justify-between gap-4 border-b border-default py-3"
          >
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed">
              {{ row.label }}
            </dt>
            <dd class="text-right text-sm text-muted">
              <NuxtLink
                v-if="row.to"
                :to="row.to"
                target="_blank"
                rel="noopener"
                class="transition hover:text-highlighted"
              >
                {{ row.value }}
              </NuxtLink>
              <span v-else>{{ row.value }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
