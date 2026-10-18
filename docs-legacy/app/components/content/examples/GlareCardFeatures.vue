<template>
  <section class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Powerful Features
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to create beautiful, animated interfaces.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
        >
          <MAnimatedGroup
            preset="slide"
            :stagger-children="0.1"
          >
            <MGlareCard
              class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-full"
            >
              <div class="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <UIcon
                  :name="feature.icon"
                  class="w-6 h-6 text-primary-600 dark:text-primary-400"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ feature.description }}
              </p>
              <UButton
                :to="feature.link"
                variant="link"
                color="primary"
                size="sm"
                trailing-icon="i-heroicons-arrow-right"
              >
                Learn more
              </UButton>
            </MGlareCard>
          </MAnimatedGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'Beautiful Animations',
    description: 'Pre-built animations that bring your interface to life with smooth transitions and effects.',
    icon: 'i-heroicons-sparkles',
    link: '#',
  },
  {
    title: 'Easy to Customize',
    description: 'Fully customizable components that adapt to your brand and design requirements.',
    icon: 'i-heroicons-adjustments-horizontal',
    link: '#',
  },
  {
    title: 'Nuxt UI Integration',
    description: 'Seamlessly integrates with Nuxt UI for a consistent design system.',
    icon: 'i-simple-icons-nuxtdotjs',
    link: '#',
  },
  {
    title: 'Performance Optimized',
    description: 'Lightweight components that won\'t slow down your application.',
    icon: 'i-heroicons-bolt',
    link: '#',
  },
  {
    title: 'Responsive Design',
    description: 'Looks great on all devices from mobile to desktop.',
    icon: 'i-heroicons-device-phone-mobile',
    link: '#',
  },
  {
    title: 'Developer Friendly',
    description: 'Well-documented components with clear examples and TypeScript support.',
    icon: 'i-heroicons-code-bracket',
    link: '#',
  },
]
</script>
