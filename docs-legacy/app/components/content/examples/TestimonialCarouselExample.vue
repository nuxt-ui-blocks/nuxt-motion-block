<template>
  <section class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
          <UIcon
            name="i-heroicons-chat-bubble-left-right"
            class="w-4 h-4"
          />
          Testimonials
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Loved by Developers
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here's what some of our users have to say about our components.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <div class="flex items-center mb-4">
              <UAvatar
                :src="testimonial.author.avatar"
                :alt="testimonial.author.name"
                size="md"
                class="mr-3"
              />
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">
                  {{ testimonial.author.name }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ testimonial.author.role }}
                </p>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ testimonial.content }}
            </p>
            <div class="flex">
              <UIcon
                v-for="i in 5"
                :key="i"
                :name="i <= testimonial.rating ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
                class="w-5 h-5 text-yellow-400"
              />
            </div>
          </MInView>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    content: 'These components have completely transformed how we build our UI. The animations are smooth and the customization options are endless.',
    author: {
      name: 'Alex Johnson',
      role: 'Frontend Developer',
      avatar: 'https://picsum.photos/seed/alex/100/100',
    },
    rating: 5,
  },
  {
    content: 'As a designer, I appreciate how these components balance aesthetics with functionality. They\'ve saved us countless hours of development time.',
    author: {
      name: 'Sarah Williams',
      role: 'UI/UX Designer',
      avatar: 'https://picsum.photos/seed/sarah/100/100',
    },
    rating: 5,
  },
  {
    content: 'The documentation is excellent and the components are easy to integrate into our existing Nuxt projects. Highly recommended!',
    author: {
      name: 'Michael Chen',
      role: 'Tech Lead',
      avatar: 'https://picsum.photos/seed/michael/100/100',
    },
    rating: 4,
  },
]
</script>
