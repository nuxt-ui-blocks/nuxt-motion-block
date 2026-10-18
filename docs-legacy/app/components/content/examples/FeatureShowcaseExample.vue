<template>
  <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="text-center mb-16">
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5 }"
        class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
      >
        <UIcon
          name="i-heroicons-sparkles"
          class="w-4 h-4"
        />
        <span>Powerful Features</span>
      </MInView>

      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Everything you need to succeed
        </h1>
      </MInView>

      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Our platform provides all the tools and features you need to build, grow, and scale your business.
        </p>
      </MInView>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <MAnimatedGroup
        v-for="(feature, index) in features"
        :key="feature.title"
        :stagger-children="0.1"
        :transition="{ delay: index * 0.1 }"
        preset="slide"
        initial="hidden"
        animate="visible"
      >
        <UCard
          class="h-full group hover:shadow-xl transition-all duration-300 border-0"
          :ui="{ body: { base: 'flex flex-col h-full' } }"
        >
          <div class="flex-1">
            <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
              <UIcon
                :name="feature.icon"
                class="w-6 h-6 text-blue-600 dark:text-blue-400"
              />
            </div>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-400 mb-6">
              {{ feature.description }}
            </p>
          </div>

          <UButton
            variant="link"
            color="primary"
            size="sm"
            class="p-0 font-medium"
          >
            Learn more
            <UIcon
              name="i-heroicons-arrow-right"
              class="w-4 h-4 ml-1"
            />
          </UButton>
        </UCard>
      </MAnimatedGroup>
    </div>

    <!-- CTA Section -->
    <MInView
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5, delay: 0.3 }"
      class="mt-20 text-center"
    >
      <UCard class="max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div class="p-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p class="text-blue-100 mb-6">
            Join thousands of satisfied users who have transformed their business with our platform.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <UButton
              color="white"
              variant="solid"
              size="lg"
            >
              Start Free Trial
            </UButton>
            <UButton
              color="white"
              variant="outline"
              size="lg"
            >
              Schedule a Demo
            </UButton>
          </div>
        </div>
      </UCard>
    </MInView>
  </div>
</template>

<script setup lang="ts">
const features = ref([
  {
    title: 'Intuitive Dashboard',
    description: 'Our user-friendly dashboard gives you complete control over your data and operations with real-time insights.',
    icon: 'i-heroicons-chart-bar',
  },
  {
    title: 'Advanced Analytics',
    description: 'Gain deep insights into your business performance with our powerful analytics and reporting tools.',
    icon: 'i-heroicons-presentation-chart-bar',
  },
  {
    title: 'Seamless Integration',
    description: 'Connect with your favorite tools and services through our extensive library of integrations.',
    icon: 'i-heroicons-arrow-path',
  },
  {
    title: 'Enterprise Security',
    description: 'Military-grade encryption and security protocols to keep your data safe and compliant.',
    icon: 'i-heroicons-shield-check',
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated support team is always available to help you succeed with personalized assistance.',
    icon: 'i-heroicons-lifebuoy',
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Grow your business with confidence knowing our infrastructure can handle any workload.',
    icon: 'i-heroicons-server',
  },
])
</script>
