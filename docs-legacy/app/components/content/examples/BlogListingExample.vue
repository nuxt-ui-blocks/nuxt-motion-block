<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5 }"
      >
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Blog
        </h1>
      </MInView>

      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay up to date with the latest news, tips, and insights from our team.
        </p>
      </MInView>
    </div>

    <!-- Filters and Search -->
    <MInView
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5, delay: 0.2 }"
      class="mb-8"
    >
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <UInput
            v-model="searchQuery"
            placeholder="Search articles..."
            icon="i-heroicons-magnifying-glass"
            size="lg"
          />
        </div>
        <USelectMenu
          v-model="categoryFilter"
          :options="categories"
          placeholder="All Categories"
          size="lg"
        />
      </div>
    </MInView>

    <!-- Featured Post -->
    <MInView
      v-if="featuredPost && !searchQuery && !categoryFilter"
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5, delay: 0.3 }"
      class="mb-12"
    >
      <UCard
        class="overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex flex-col md:flex-row">
          <div class="md:w-2/3">
            <img
              :src="featuredPost.image"
              :alt="featuredPost.title"
              class="w-full h-64 md:h-full object-cover"
            >
          </div>
          <div class="md:w-1/3 p-6 sm:p-8 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-4">
              <UBadge
                color="primary"
                variant="subtle"
              >
                {{ featuredPost.category }}
              </UBadge>
              <span class="text-gray-500 dark:text-gray-400 text-sm">{{ featuredPost.date }}</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {{ featuredPost.title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {{ featuredPost.excerpt }}
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <UAvatar
                  :src="featuredPost.author.avatar"
                  :alt="featuredPost.author.name"
                  size="xs"
                  class="mr-2"
                />
                <span class="text-gray-700 dark:text-gray-300 text-sm">{{ featuredPost.author.name }}</span>
              </div>
              <UButton
                :to="`#${featuredPost.slug}`"
                color="primary"
                variant="solid"
                size="sm"
              >
                Read Article
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </MInView>

    <!-- Blog Posts Grid -->
    <MAnimatedGroup
      :stagger-children="0.1"
      preset="slide"
      initial="hidden"
      animate="visible"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
    >
      <div
        v-for="post in paginatedPosts"
        :key="post.id"
      >
        <UCard
          class="h-full flex flex-col group hover:shadow-xl transition-shadow duration-300"
        >
          <div class="relative overflow-hidden rounded-t-lg">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute top-4 left-4">
              <UBadge
                color="primary"
                variant="solid"
              >
                {{ post.category }}
              </UBadge>
            </div>
          </div>

          <div class="flex-1 flex flex-col p-6">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{{ post.date }}</span>
              <span class="mx-2">•</span>
              <span>{{ post.readTime }} min read</span>
            </div>

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ post.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <div class="flex items-center justify-between mt-auto">
              <div class="flex items-center">
                <UAvatar
                  :src="post.author.avatar"
                  :alt="post.author.name"
                  size="xs"
                  class="mr-2"
                />
                <span class="text-gray-700 dark:text-gray-300 text-sm">{{ post.author.name }}</span>
              </div>
              <UButton
                :to="`#${post.slug}`"
                color="primary"
                variant="ghost"
                size="sm"
              >
                Read
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </MAnimatedGroup>

    <!-- Pagination -->
    <MInView
      v-if="filteredPosts.length > 0"
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5 }"
      class="flex justify-center"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="filteredPosts.length"
      />
    </MInView>

    <!-- Empty State -->
    <MInView
      v-if="filteredPosts.length === 0"
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5 }"
      class="text-center py-12"
    >
      <UIcon
        name="i-heroicons-newspaper"
        class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500"
      />
      <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        No articles found
      </h3>
      <p class="mt-1 text-gray-500 dark:text-gray-400">
        Try adjusting your search or filter criteria
      </p>
      <UButton
        class="mt-6"
        @click="resetFilters"
      >
        Reset Filters
      </UButton>
    </MInView>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const categoryFilter = ref('')
const page = ref(1)
const postsPerPage = 6

const categories = [
  { label: 'All Categories', value: '' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Design', value: 'Design' },
  { label: 'Business', value: 'Business' },
  { label: 'Lifestyle', value: 'Lifestyle' },
  { label: 'Travel', value: 'Travel' },
]

const posts = ref([
  {
    id: 1,
    title: 'Getting Started with Vue 3 Composition API',
    excerpt: 'Learn how to leverage the Composition API in Vue 3 to build more maintainable and scalable applications.',
    category: 'Technology',
    date: 'May 15, 2023',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    slug: 'getting-started-with-vue-3-composition-api',
  },
  {
    id: 2,
    title: 'The Future of Web Design in 2023',
    excerpt: 'Explore the latest trends and techniques that are shaping the future of web design this year.',
    category: 'Design',
    date: 'May 10, 2023',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: {
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    slug: 'the-future-of-web-design-in-2023',
  },
  {
    id: 3,
    title: 'Building a Successful SaaS Business',
    excerpt: 'Key strategies and insights for building and scaling a profitable SaaS business in today\'s competitive market.',
    category: 'Business',
    date: 'May 5, 2023',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    slug: 'building-a-successful-saas-business',
  },
  {
    id: 4,
    title: 'Minimalism in Modern Living',
    excerpt: 'How adopting minimalist principles can lead to a more fulfilling and less stressful lifestyle.',
    category: 'Lifestyle',
    date: 'April 28, 2023',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: {
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    slug: 'minimalism-in-modern-living',
  },
  {
    id: 5,
    title: 'Top Destinations for Digital Nomads',
    excerpt: 'Discover the best cities around the world for remote workers and digital nomads in 2023.',
    category: 'Travel',
    date: 'April 22, 2023',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
    slug: 'top-destinations-for-digital-nomads',
  },
  {
    id: 6,
    title: 'Advanced CSS Techniques You Should Know',
    excerpt: 'Take your CSS skills to the next level with these advanced techniques and modern approaches.',
    category: 'Technology',
    date: 'April 18, 2023',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: {
      name: 'Olivia Brown',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    slug: 'advanced-css-techniques-you-should-know',
  },
  {
    id: 7,
    title: 'The Psychology of Color in Design',
    excerpt: 'Understanding how color influences user behavior and emotions in digital design.',
    category: 'Design',
    date: 'April 12, 2023',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: {
      name: 'Daniel Taylor',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    },
    slug: 'the-psychology-of-color-in-design',
  },
  {
    id: 8,
    title: 'Remote Work Productivity Tips',
    excerpt: 'Practical tips and strategies to boost your productivity while working from home.',
    category: 'Business',
    date: 'April 5, 2023',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    author: {
      name: 'Sophia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    },
    slug: 'remote-work-productivity-tips',
  },
])

const featuredPost = computed(() => {
  if (searchQuery.value || categoryFilter.value) return null
  return posts.value[0]
})

const filteredPosts = computed(() => {
  let result = [...posts.value]

  // Remove featured post from listing when not filtering
  if (!searchQuery.value && !categoryFilter.value && result.length > 0) {
    result = result.slice(1)
  }

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post =>
      post.title.toLowerCase().includes(query)
      || post.excerpt.toLowerCase().includes(query)
      || post.category.toLowerCase().includes(query),
    )
  }

  // Apply category filter
  if (categoryFilter.value) {
    result = result.filter(post => post.category === categoryFilter.value)
  }

  return result
})

const pageCount = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const startIndex = computed(() => (page.value - 1) * postsPerPage)
const endIndex = computed(() => startIndex.value + postsPerPage)

const paginatedPosts = computed(() => {
  return filteredPosts.value.slice(startIndex.value, endIndex.value)
})

const resetFilters = () => {
  searchQuery.value = ''
  categoryFilter.value = ''
  page.value = 1
}
</script>
