---
title: Case Study
description: A comprehensive case study layout with project overview, challenges, solutions, and results.
navigation:
  icon: i-heroicons-document-magnifying-glass
---

# Case Study

A comprehensive case study layout with project overview, challenges, solutions, and results. Perfect for showcasing detailed project work and outcomes.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="CaseStudyExample" />
  :::
#code
```vue
<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Project Header -->
    <header class="mb-16">
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5 }"
      >
        <div class="flex items-center gap-2 mb-6">
          <UBadge
            :color="getCategoryColor(project.category)"
            variant="subtle"
          >
            {{ project.category }}
          </UBadge>
          <span class="text-gray-500 dark:text-gray-400">{{ project.date }}</span>
        </div>
      </MInView>
      
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {{ project.title }}
        </h1>
      </MInView>
      
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {{ project.description }}
        </p>
      </MInView>
      
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.3 }"
        class="flex flex-wrap gap-4"
      >
        <div class="flex items-center">
          <UAvatar
            :src="project.client.avatar"
            :alt="project.client.name"
            size="lg"
            class="mr-4"
          />
          <div>
            <p class="font-medium text-gray-900 dark:text-white">{{ project.client.name }}</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">{{ project.client.industry }}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center min-w-[120px]">
            <MAnimatedNumber
              :value="project.results.increase"
              :options="{ decimalPlaces: 0 }"
              class="text-2xl font-bold text-primary-500"
            />
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Conversion Increase</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center min-w-[120px]">
            <MAnimatedNumber
              :value="project.results.revenue"
              :options="{ prefix: '$', decimalPlaces: 0 }"
              class="text-2xl font-bold text-primary-500"
            />
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Revenue Generated</p>
          </div>
        </div>
      </MInView>
    </header>
    
    <!-- Project Image -->
    <MInView
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5, delay: 0.4 }"
      class="mb-16"
    >
      <img
        :src="project.featuredImage"
        :alt="project.title"
        class="w-full h-96 object-cover rounded-xl"
      >
    </MInView>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Main Content -->
      <main class="lg:col-span-2">
        <!-- Challenge Section -->
        <section class="mb-16">
          <MAnimatedGroup
            :stagger-children="0.1"
            preset="fade"
            initial="hidden"
            animate="visible"
          >
            <h2
              id="challenge"
              class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              The Challenge
            </h2>
            <div
              v-for="(paragraph, index) in project.challenge"
              :key="index"
              class="text-gray-700 dark:text-gray-300 mb-4"
            >
              {{ paragraph }}
            </div>
          </MAnimatedGroup>
        </section>
        
        <!-- Solution Section -->
        <section class="mb-16">
          <MAnimatedGroup
            :stagger-children="0.1"
            preset="fade"
            initial="hidden"
            animate="visible"
          >
            <h2
              id="solution"
              class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Our Solution
            </h2>
            <div
              v-for="(paragraph, index) in project.solution"
              :key="index"
              class="text-gray-700 dark:text-gray-300 mb-4"
            >
              {{ paragraph }}
            </div>
            
            <!-- Solution Steps -->
            <div class="mt-8">
              <MAnimatedGroup
                :stagger-children="0.1"
                preset="slide"
                initial="hidden"
                animate="visible"
                class="space-y-6"
              >
                <div
                  v-for="(step, index) in project.solutionSteps"
                  :key="index"
                  class="flex"
                >
                  <div class="flex-shrink-0 mr-4">
                    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white">
                      {{ index + 1 }}
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {{ step.title }}
                    </h3>
                    <p class="text-gray-700 dark:text-gray-300">
                      {{ step.description }}
                    </p>
                  </div>
                </div>
              </MAnimatedGroup>
            </div>
          </MAnimatedGroup>
        </section>
        
        <!-- Results Section -->
        <section class="mb-16">
          <MAnimatedGroup
            :stagger-children="0.1"
            preset="fade"
            initial="hidden"
            animate="visible"
          >
            <h2
              id="results"
              class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              The Results
            </h2>
            <div
              v-for="(paragraph, index) in project.results.description"
              :key="index"
              class="text-gray-700 dark:text-gray-300 mb-4"
            >
              {{ paragraph }}
            </div>
            
            <!-- Key Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <MAnimatedGroup
                :stagger-children="0.1"
                preset="slide"
                initial="hidden"
                animate="visible"
              >
                <div
                  v-for="(metric, index) in project.results.metrics"
                  :key="index"
                  class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center"
                >
                  <MAnimatedNumber
                    :value="metric.value"
                    :options="metric.options"
                    class="text-3xl font-bold text-primary-500 mb-2"
                  />
                  <p class="text-gray-700 dark:text-gray-300">
                    {{ metric.label }}
                  </p>
                </div>
              </MAnimatedGroup>
            </div>
          </MAnimatedGroup>
        </section>
        
        <!-- Testimonial -->
        <section class="mb-16">
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5 }"
          >
            <UCard>
              <div class="flex flex-col md:flex-row items-center">
                <UAvatar
                  :src="project.testimonial.avatar"
                  :alt="project.testimonial.name"
                  size="xl"
                  class="mb-4 md:mb-0 md:mr-6"
                />
                <div class="text-center md:text-left">
                  <p class="text-gray-700 dark:text-gray-300 italic mb-4">
                    "{{ project.testimonial.quote }}"
                  </p>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">
                      {{ project.testimonial.name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">
                      {{ project.testimonial.role }}, {{ project.client.name }}
                    </p>
                  </div>
                </div>
              </div>
            </UCard>
          </MInView>
        </section>
      </main>
      
      <!-- Sidebar -->
      <aside class="lg:col-span-1">
        <MAnimatedGroup
          :stagger-children="0.1"
          preset="fade"
          initial="hidden"
          animate="visible"
          class="sticky top-8"
        >
          <!-- Project Info -->
          <UCard class="mb-8">
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Project Information
            </h3>
            <ul class="space-y-3">
              <li class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Category</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ project.category }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Duration</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ project.duration }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Team Size</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ project.teamSize }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Technologies</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ project.technologies.join(', ') }}</span>
              </li>
            </ul>
          </UCard>
          
          <!-- Table of Contents -->
          <UCard class="mb-8">
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Contents
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#challenge"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  The Challenge
                </a>
              </li>
              <li>
                <a
                  href="#solution"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  Our Solution
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  The Results
                </a>
              </li>
            </ul>
          </UCard>
          
          <!-- Related Projects -->
          <UCard>
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Related Projects
            </h3>
            <ul class="space-y-4">
              <li
                v-for="related in relatedProjects"
                :key="related.id"
              >
                <NuxtLink
                  :to="`/portfolio/${related.slug}`"
                  class="block group"
                >
                  <img
                    :src="related.image"
                    :alt="related.title"
                    class="w-full h-24 object-cover rounded-lg mb-2"
                  >
                  <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {{ related.title }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ related.category }}
                  </p>
                </NuxtLink>
              </li>
            </ul>
          </UCard>
        </MAnimatedGroup>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
const project = {
  id: 1,
  title: 'E-commerce Platform Redesign',
  description: 'Complete redesign of a major e-commerce platform focusing on user experience and conversion optimization.',
  category: 'Web Design',
  date: 'June 2023',
  duration: '4 months',
  teamSize: '8 people',
  technologies: ['Vue.js', 'Tailwind CSS', 'Figma', 'Firebase'],
  featuredImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  client: {
    name: 'TechCorp Inc.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    industry: 'Technology'
  },
  challenge: [
    'TechCorp Inc. was experiencing a significant drop in conversion rates on their e-commerce platform, with users abandoning their carts at a rate of 72%. The existing platform had a cluttered interface, slow loading times, and an outdated checkout process that was causing friction in the customer journey.',
    'User research revealed that customers found the navigation confusing, product search was inefficient, and the mobile experience was particularly poor. The client needed a complete redesign to modernize their platform and improve business metrics.'
  ],
  solution: [
    'We conducted extensive user research including surveys, interviews, and usability testing to understand the pain points. Our approach focused on simplifying the user journey, streamlining the checkout process, and implementing a more intuitive navigation system.',
    'The design system was rebuilt using Tailwind CSS for consistency and maintainability. We implemented a mobile-first approach to ensure optimal performance across all devices. Key features included a smart search with filters, personalized product recommendations, and a one-page checkout process.'
  ],
  solutionSteps: [
    {
      title: 'Research & Discovery',
      description: 'Conducted user research, competitive analysis, and technical audit to identify key pain points and opportunities.'
    },
    {
      title: 'Design & Prototyping',
      description: 'Created wireframes, high-fidelity mockups, and interactive prototypes to visualize the new user experience.'
    },
    {
      title: 'Development',
      description: 'Built the new platform using Vue.js and Firebase, implementing responsive design and performance optimizations.'
    },
    {
      title: 'Testing & Launch',
      description: 'Conducted extensive QA testing, A/B testing, and user acceptance testing before the successful launch.'
    }
  ],
  results: {
    increase: 45,
    revenue: 2450000,
    description: [
      'The redesigned platform resulted in a 45% increase in conversion rates and generated an additional $2.45M in revenue within the first six months. Cart abandonment decreased from 72% to 38%, and page load times improved by 65%.',
      'User satisfaction scores increased significantly, with positive feedback on the simplified navigation and checkout process. The mobile experience saw the most dramatic improvements, with mobile conversion rates increasing by 58%.'
    ],
    metrics: [
      { value: 45, options: { suffix: '%', decimalPlaces: 0 }, label: 'Conversion Increase' },
      { value: 38, options: { suffix: '%', decimalPlaces: 0 }, label: 'Cart Abandonment' },
      { value: 65, options: { suffix: '%', decimalPlaces: 0 }, label: 'Faster Load Times' },
      { value: 58, options: { suffix: '%', decimalPlaces: 0 }, label: 'Mobile Conversion' }
    ]
  },
  testimonial: {
    name: 'Sarah Johnson',
    role: 'Product Director',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'The team delivered beyond our expectations. The new platform has transformed our business, and the results speak for themselves. We\'ve seen incredible improvements in user engagement and revenue.'
  }
}

const relatedProjects = [
  {
    id: 2,
    title: 'Mobile Banking Application',
    category: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'mobile-banking-application'
  },
  {
    id: 3,
    title: 'Corporate Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'corporate-brand-identity'
  },
  {
    id: 4,
    title: 'Health & Fitness Dashboard',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'health-fitness-dashboard'
  }
]

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
</script>