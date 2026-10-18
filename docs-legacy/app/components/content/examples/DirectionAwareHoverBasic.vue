<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <UIcon
            name="i-lucide-image"
            class="w-5 h-5 text-blue-600 dark:text-blue-400"
          />
          <span class="text-blue-700 dark:text-blue-300 font-medium">Creative Portfolio</span>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Projects
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore our portfolio of creative work and innovative solutions that showcase our expertise and vision
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <MDirectionAwareHover
          v-for="(project, index) in projects"
          :key="index"
          :image-url="project.image"
          class="rounded-2xl overflow-hidden shadow-xl"
        >
          <template #content>
            <div class="space-y-4 p-6">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <UIcon
                    :name="project.icon"
                    class="w-4 h-4 text-white"
                  />
                </div>
                <UBadge
                  :color="project.categoryColor"
                  variant="solid"
                  size="xs"
                >
                  {{ project.category }}
                </UBadge>
              </div>
              <h3 class="text-2xl font-bold text-white">
                {{ project.title }}
              </h3>
              <p class="text-white/90">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2 mt-4">
                <div
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2 py-1 bg-white/20 rounded text-xs text-white"
                >
                  {{ tag }}
                </div>
              </div>
              <div class="flex gap-3 mt-6">
                <UButton
                  color="primary"
                  variant="solid"
                  size="sm"
                  @click="viewProject(project)"
                >
                  View Project
                </UButton>
                <UButton
                  color="primary"
                  variant="ghost"
                  size="sm"
                  @click="likeProject(project)"
                >
                  <UIcon
                    name="i-lucide-heart"
                    class="w-4 h-4"
                  />
                </UButton>
              </div>
            </div>
          </template>
        </MDirectionAwareHover>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Want to see more of our work?
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Browse our complete portfolio to discover how we've helped businesses transform their digital presence.
            </p>
            <div class="flex flex-wrap gap-4">
              <UButton
                size="lg"
                color="primary"
              >
                View Full Portfolio
              </UButton>
              <UButton
                size="lg"
                variant="outline"
              >
                Contact Us
              </UButton>
            </div>
          </div>
          <div class="flex-1">
            <div class="grid grid-cols-3 gap-4">
              <div class="aspect-square rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Project"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="aspect-square rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Project"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="aspect-square rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Project"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="aspect-square rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Project"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="aspect-square rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Project"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="aspect-square rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Project"
                  class="w-full h-full object-cover"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  {
    title: 'Mountain Landscape',
    description: 'Beautiful scenic mountain view with stunning natural beauty captured in high resolution',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: 'i-lucide-mountain',
    category: 'Nature',
    categoryColor: 'green',
    tags: ['Photography', 'Landscape', 'Outdoor'],
  },
  {
    title: 'Alpine Adventure',
    description: 'Thrilling mountain climbing experience in the Swiss Alps with breathtaking views',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: 'i-lucide-zap',
    category: 'Adventure',
    categoryColor: 'blue',
    tags: ['Climbing', 'Alps', 'Extreme'],
  },
  {
    title: 'Forest Exploration',
    description: 'Deep forest trails and natural wildlife encounters in the Pacific Northwest',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: 'i-lucide-tree-pine',
    category: 'Wildlife',
    categoryColor: 'emerald',
    tags: ['Nature', 'Wildlife', 'Exploration'],
  },
  {
    title: 'Urban Architecture',
    description: 'Modern cityscapes and architectural marvels captured in urban environments',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: 'i-lucide-building',
    category: 'Architecture',
    categoryColor: 'purple',
    tags: ['City', 'Modern', 'Design'],
  },
  {
    title: 'Ocean Waves',
    description: 'Dramatic coastal scenes with powerful waves and stunning seascapes',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: 'i-lucide-waves',
    category: 'Seascape',
    categoryColor: 'cyan',
    tags: ['Ocean', 'Coastal', 'Water'],
  },
  {
    title: 'Desert Dunes',
    description: 'Golden sand dunes and desert landscapes under dramatic lighting conditions',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    icon: 'i-lucide-sun',
    category: 'Desert',
    categoryColor: 'orange',
    tags: ['Sand', 'Dunes', 'Sunset'],
  },
]

const viewProject = (project) => {
  // In a real implementation, this would navigate to the project page
  console.log('Viewing project:', project.title)
  alert(`Viewing project: ${project.title}`)
}

const likeProject = (project) => {
  // In a real implementation, this would like the project
  console.log('Liked project:', project.title)
  alert(`Liked project: ${project.title}`)
}
</script>
