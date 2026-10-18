<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5 }"
      >
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Work
        </h1>
      </MInView>

      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our portfolio of successful projects and creative solutions.
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
            placeholder="Search projects..."
            icon="i-heroicons-magnifying-glass"
            size="lg"
          />
        </div>
        <div class="flex gap-2">
          <USelectMenu
            v-model="categoryFilter"
            :options="categories"
            placeholder="All Categories"
            size="lg"
          />
          <USelectMenu
            v-model="sortBy"
            :options="sortOptions"
            placeholder="Sort By"
            size="lg"
          />
        </div>
      </div>
    </MInView>

    <!-- Filter Tags -->
    <MInView
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5, delay: 0.3 }"
      class="mb-8"
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in allTags"
          :key="tag"
          :color="activeTags.includes(tag) ? 'primary' : 'neutral'"
          variant="soft"
          class="cursor-pointer"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </UBadge>
      </div>
    </MInView>

    <!-- Projects Grid -->
    <MAnimatedGroup
      v-if="filteredProjects.length > 0"
      :stagger-children="0.1"
      preset="slide"
      initial="hidden"
      animate="visible"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
    >
      <div
        v-for="project in paginatedProjects"
        :key="project.id"
      >
        <UCard
          class="h-full flex flex-col group hover:shadow-xl transition-all duration-300 overflow-hidden"
          :ui="{ body: { root: 'flex-1 flex flex-col p-6' } }"
        >
          <div class="relative overflow-hidden rounded-lg mb-4">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <UButton
                :to="`/#portfolio/${project.slug}`"
                color="neutral"
                variant="solid"
                size="sm"
                class="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              >
                View Project
              </UButton>
            </div>
            <div class="absolute top-4 left-4">
              <UBadge
                :color="getCategoryColor(project.category)"
                variant="solid"
              >
                {{ project.category }}
              </UBadge>
            </div>
          </div>

          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ project.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-2">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-1 mb-4">
              <UBadge
                v-for="tag in project.tags.slice(0, 3)"
                :key="tag"
                variant="soft"
                size="xs"
              >
                {{ tag }}
              </UBadge>
              <UBadge
                v-if="project.tags.length > 3"
                variant="soft"
                size="xs"
              >
                +{{ project.tags.length - 3 }} more
              </UBadge>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
            <div class="flex items-center">
              <UAvatar
                :src="project.client.avatar"
                :alt="project.client.name"
                size="xs"
                class="mr-2"
              />
              <span class="text-gray-700 dark:text-gray-300 text-sm">{{ project.client.name }}</span>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ project.date }}
            </div>
          </div>
        </UCard>
      </div>
    </MAnimatedGroup>

    <!-- Empty State -->
    <MInView
      v-if="filteredProjects.length === 0"
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5 }"
      class="text-center py-12"
    >
      <UIcon
        name="i-heroicons-photo"
        class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500"
      />
      <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        No projects found
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

    <!-- Pagination -->
    <MInView
      v-if="filteredProjects.length > 0"
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5 }"
      class="flex justify-center"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="filteredProjects.length"
      />
    </MInView>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const categoryFilter = ref('')
const sortBy = ref('date-desc')
const activeTags = ref<string[]>([])
const page = ref(1)
const projectsPerPage = 6

const categories = [
  { label: 'All Categories', value: '' },
  { label: 'Web Design', value: 'Web Design' },
  { label: 'Mobile App', value: 'Mobile App' },
  { label: 'Branding', value: 'Branding' },
  { label: 'UI/UX', value: 'UI/UX' },
  { label: 'Development', value: 'Development' },
]

const sortOptions = [
  { label: 'Newest First', value: 'date-desc' },
  { label: 'Oldest First', value: 'date-asc' },
  { label: 'Title A-Z', value: 'title-asc' },
  { label: 'Title Z-A', value: 'title-desc' },
]

const allTags = ['Vue.js', 'React', 'Tailwind CSS', 'Figma', 'Node.js', 'TypeScript', 'GraphQL', 'Firebase', 'Next.js', 'Nuxt.js']

const projects = ref([
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign of a major e-commerce platform focusing on user experience and conversion optimization.',
    category: 'Web Design',
    date: 'June 2023',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    client: {
      name: 'TechCorp Inc.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    tags: ['Vue.js', 'Tailwind CSS', 'Figma', 'Firebase'],
    slug: '#ecommerce-platform-redesign',
  },
  {
    id: 2,
    title: 'Mobile Banking Application',
    description: 'Secure mobile banking application with biometric authentication and real-time transaction monitoring.',
    category: 'Mobile App',
    date: 'May 2023',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    client: {
      name: 'FinanceGlobal',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    tags: ['React Native', 'Node.js', 'GraphQL', 'Biometrics'],
    slug: '#mobile-banking-application',
  },
  {
    id: 3,
    title: 'Corporate Brand Identity',
    description: 'Comprehensive brand identity package including logo, color palette, typography, and brand guidelines.',
    category: 'Branding',
    date: 'April 2023',
    image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    client: {
      name: 'StartupXYZ',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    tags: ['Illustrator', 'Photoshop', 'Brand Guidelines', 'Typography'],
    slug: 'corporate-brand-identity',
  },
  {
    id: 4,
    title: 'Health & Fitness Dashboard',
    description: 'Interactive dashboard for health tracking application with data visualization and personalized insights.',
    category: 'UI/UX',
    date: 'March 2023',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    client: {
      name: 'Wellness Co.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    tags: ['Figma', 'Data Visualization', 'User Research', 'Prototyping'],
    slug: '#health-fitness-dashboard',
  },
  {
    id: 5,
    title: 'SaaS Analytics Platform',
    description: 'Enterprise analytics platform with customizable dashboards, reporting tools, and real-time data processing.',
    category: 'Development',
    date: 'February 2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    client: {
      name: 'DataInsights Ltd.',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
    tags: ['React', 'Node.js', 'MongoDB', 'D3.js', 'WebSocket'],
    slug: '#saas-analytics-platform',
  },
  {
    id: 6,
    title: 'Restaurant Booking System',
    description: 'Online reservation system for restaurants with table management, waitlist features, and customer notifications.',
    category: 'Web Design',
    date: 'January 2023',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    client: {
      name: 'Fine Dining Group',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    tags: ['Vue.js', 'Firebase', 'Twilio', 'Stripe'],
    slug: '#restaurant-booking-system',
  },
  {
    id: 7,
    title: 'Educational Mobile App',
    description: 'Gamified learning platform for children with interactive lessons, progress tracking, and parental controls.',
    category: 'Mobile App',
    date: 'December 2022',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    client: {
      name: 'EduTech Solutions',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    },
    tags: ['Flutter', 'Firebase', 'Gamification', 'Animation'],
    slug: '#educational-mobile-app',
  },
  {
    id: 8,
    title: 'Non-Profit Website Redesign',
    description: 'Modern, accessible website for a non-profit organization focused on fundraising and community engagement.',
    category: 'Web Design',
    date: 'November 2022',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    client: {
      name: 'Charity Foundation',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    },
    tags: ['Nuxt.js', 'Tailwind CSS', 'Accessibility', 'Donation Integration'],
    slug: '#nonprofit-website-redesign',
  },
])

const filteredProjects = computed(() => {
  let result = [...projects.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(project =>
      project.title.toLowerCase().includes(query)
      || project.description.toLowerCase().includes(query)
      || project.category.toLowerCase().includes(query)
      || project.tags.some(tag => tag.toLowerCase().includes(query)),
    )
  }

  // Apply category filter
  if (categoryFilter.value) {
    result = result.filter(project => project.category === categoryFilter.value)
  }

  // Apply tag filters
  if (activeTags.value.length > 0) {
    result = result.filter(project =>
      activeTags.value.every(tag => project.tags.includes(tag)),
    )
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'date-desc':
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      break
    case 'date-asc':
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break
    case 'title-asc':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'title-desc':
      result.sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  return result
})

const pageCount = computed(() => Math.ceil(filteredProjects.value.length / projectsPerPage))

const startIndex = computed(() => (page.value - 1) * projectsPerPage)
const endIndex = computed(() => startIndex.value + projectsPerPage)

const paginatedProjects = computed(() => {
  return filteredProjects.value.slice(startIndex.value, endIndex.value)
})

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Web Design': return 'blue'
    case 'Mobile App': return 'purple'
    case 'Branding': return 'pink'
    case 'UI/UX': return 'green'
    case 'Development': return 'amber'
    default: return 'gray'
  }
}

const toggleTag = (tag: string) => {
  if (activeTags.value.includes(tag)) {
    activeTags.value = activeTags.value.filter(t => t !== tag)
  }
  else {
    activeTags.value.push(tag)
  }
  page.value = 1
}

const resetFilters = () => {
  searchQuery.value = ''
  categoryFilter.value = ''
  sortBy.value = 'date-desc'
  activeTags.value = []
  page.value = 1
}
</script>
