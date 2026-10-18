<template>
  <footer class="bg-gray-900 text-gray-400 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-2">
          <h3 class="text-white text-xl font-bold mb-4">
            MotionBlocks
          </h3>
          <p class="mb-6 max-w-md">
            Creating beautiful, animated interfaces with Vue and Tailwind CSS.
          </p>
          <div class="flex space-x-4">
            <UButton
              v-for="(social, index) in socialLinks"
              :key="index"
              :icon="social.icon"
              :to="social.to"
              color="gray"
              variant="ghost"
              size="sm"
              square
            />
          </div>
        </div>
        <div
          v-for="(column, index) in linkColumns"
          :key="index"
        >
          <h4 class="text-white font-semibold mb-4">
            {{ column.title }}
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(link, linkIndex) in column.links"
              :key="linkIndex"
            >
              <a
                :href="link.to"
                class="hover:text-white transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-12 pt-8 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>© 2023 MotionBlocks. All rights reserved.</p>
        <div class="mt-4 md:mt-0 flex space-x-6">
          <a
            href="#"
            class="hover:text-white transition-colors"
          >Privacy Policy</a>
          <a
            href="#"
            class="hover:text-white transition-colors"
          >Terms of Service</a>
          <a
            href="#"
            class="hover:text-white transition-colors"
          >Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socialLinks = [
  { label: 'Twitter', to: '#', icon: 'i-simple-icons-x' },
  { label: 'GitHub', to: '#', icon: 'i-simple-icons-github' },
  { label: 'LinkedIn', to: '#', icon: 'i-simple-icons-linkedin' },
]

const linkColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Components', to: '#' },
      { label: 'Templates', to: '#' },
      { label: 'Pricing', to: '#' },
      { label: 'Changelog', to: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', to: '#' },
      { label: 'Tutorials', to: '#' },
      { label: 'Blog', to: '#' },
      { label: 'Support', to: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Contact', to: '#' },
      { label: 'Partners', to: '#' },
    ],
  },
]
</script>
