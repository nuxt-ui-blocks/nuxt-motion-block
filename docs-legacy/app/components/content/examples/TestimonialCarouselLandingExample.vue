<template>
  <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="text-center mb-16">
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5 }"
      >
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Trusted by thousands of users
        </h1>
      </MInView>

      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Don't just take our word for it. Here's what our customers have to say about their experience.
        </p>
      </MInView>
    </div>

    <!-- Testimonial Carousel -->
    <MInView
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5, delay: 0.2 }"
    >
      <UCarousel
        v-slot="{ item }"
        :items="testimonials"
        :ui="{ item: 'w-full' }"
        class="rounded-xl overflow-hidden"
        indicators
      >
        <UCard
          class="h-96 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 border-0"
          :ui="{ body: { base: 'flex flex-col items-center text-center p-8 sm:p-12' } }"
        >
          <div class="mb-6">
            <div class="flex justify-center mb-4">
              <UIcon
                v-for="i in 5"
                :key="i"
                name="i-heroicons-star-solid"
                class="w-5 h-5 text-amber-400"
              />
            </div>
            <p class="text-xl italic text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              "{{ item.quote }}"
            </p>
          </div>

          <div class="mt-8 flex flex-col items-center">
            <UAvatar
              :src="item.avatar"
              :alt="item.author"
              size="lg"
              class="mb-4"
            />
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">
                {{ item.author }}
              </p>
              <p class="text-gray-600 dark:text-gray-400">
                {{ item.position }} at {{ item.company }}
              </p>
            </div>
          </div>
        </UCard>
      </UCarousel>
    </MInView>

    <!-- Stats Section -->
    <MInView
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5, delay: 0.3 }"
      class="mt-20"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <MAnimatedNumber
            :value="stat.value"
            class="text-3xl font-bold text-gray-900 dark:text-white mb-2"
            :format="stat.format || ((value) => Math.round(value).toLocaleString())"
          />
          <p class="text-gray-600 dark:text-gray-400">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </MInView>
  </div>
</template>

<script setup lang="ts">
const testimonials = ref([
  {
    quote: 'This platform has completely transformed how we manage our business operations. The intuitive interface and powerful features have saved us countless hours every week.',
    author: 'Sarah Johnson',
    position: 'CEO',
    company: 'Tech Innovations',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    quote: 'I\'ve tried many similar solutions, but nothing comes close to the seamless experience this platform provides. The customer support is exceptional too!',
    author: 'Michael Chen',
    position: 'Product Manager',
    company: 'Global Solutions',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    quote: 'Since implementing this solution, our team productivity has increased by 40%. The automation features alone are worth the investment.',
    author: 'Emma Rodriguez',
    position: 'Operations Director',
    company: 'Future Enterprises',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
])

const stats = ref([
  { value: 98, label: 'Customer Satisfaction', format: value => `${Math.round(value)}%` },
  { value: 10000, label: 'Active Users' },
  { value: 4.9, label: 'Average Rating', format: value => `${value.toFixed(1)}/5` },
  { value: 24, label: 'Hours Saved Weekly' },
])
</script>
