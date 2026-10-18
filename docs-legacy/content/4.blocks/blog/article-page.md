---
title: Article Page
description: A complete article page with featured image, author information, table of contents, and related articles.
navigation:
  icon: i-heroicons-document-text
---

# Article Page

A complete article page with featured image, author information, table of contents, and related articles. Perfect for blog posts and documentation pages.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ArticlePageExample" />
  :::
#code
```vue
<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Article Header -->
    <header class="mb-12">
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5 }"
      >
        <div class="flex items-center gap-2 mb-4">
          <UBadge
            :color="getCategoryColor(article.category)"
            variant="subtle"
          >
            {{ article.category }}
          </UBadge>
          <span class="text-gray-500 dark:text-gray-400">{{ article.date }}</span>
          <span class="text-gray-500 dark:text-gray-400">•</span>
          <span class="text-gray-500 dark:text-gray-400">{{ article.readTime }} min read</span>
        </div>
      </MInView>
      
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {{ article.title }}
        </h1>
      </MInView>
      
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {{ article.excerpt }}
        </p>
      </MInView>
      
      <MInView
        :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
        :transition="{ duration: 0.5, delay: 0.3 }"
        class="flex items-center"
      >
        <UAvatar
          :src="article.author.avatar"
          :alt="article.author.name"
          size="lg"
          class="mr-4"
        />
        <div>
          <p class="font-medium text-gray-900 dark:text-white">{{ article.author.name }}</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">{{ article.author.role }}</p>
        </div>
      </MInView>
    </header>
    
    <!-- Featured Image -->
    <MInView
      :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
      :transition="{ duration: 0.5, delay: 0.4 }"
      class="mb-12"
    >
      <img
        :src="article.featuredImage"
        :alt="article.title"
        class="w-full h-96 object-cover rounded-xl"
      >
    </MInView>
    
    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Main Content -->
      <main class="lg:w-3/4">
        <!-- Article Content -->
        <MAnimatedGroup
          :stagger-children="0.1"
          preset="fade"
          initial="hidden"
          animate="visible"
          class="prose prose-lg dark:prose-invert max-w-none"
        >
          <div v-html="article.content"></div>
        </MAnimatedGroup>
        
        <!-- Tags -->
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5 }"
          class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in article.tags"
              :key="tag"
              variant="soft"
              size="lg"
              class="px-3 py-1"
            >
              {{ tag }}
            </UBadge>
          </div>
        </MInView>
        
        <!-- Author Card -->
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5, delay: 0.1 }"
          class="mt-12"
        >
          <UCard>
            <div class="flex items-start">
              <UAvatar
                :src="article.author.avatar"
                :alt="article.author.name"
                size="xl"
                class="mr-6"
              />
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Written by {{ article.author.name }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  {{ article.author.bio }}
                </p>
                <div class="flex space-x-3">
                  <UButton
                    v-if="article.author.twitter"
                    :to="article.author.twitter"
                    color="gray"
                    variant="ghost"
                    icon="i-simple-icons-twitter"
                    size="sm"
                  />
                  <UButton
                    v-if="article.author.linkedin"
                    :to="article.author.linkedin"
                    color="gray"
                    variant="ghost"
                    icon="i-simple-icons-linkedin"
                    size="sm"
                  />
                  <UButton
                    v-if="article.author.github"
                    :to="article.author.github"
                    color="gray"
                    variant="ghost"
                    icon="i-simple-icons-github"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </MInView>
        
        <!-- Comments Section -->
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5, delay: 0.2 }"
          class="mt-12"
        >
          <div class="border-t border-gray-200 dark:border-gray-800 pt-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Comments ({{ comments.length }})
            </h3>
            
            <div class="space-y-6 mb-8">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="flex"
              >
                <UAvatar
                  :src="comment.author.avatar"
                  :alt="comment.author.name"
                  size="md"
                  class="mr-4"
                />
                <div class="flex-1">
                  <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-medium text-gray-900 dark:text-white">
                        {{ comment.author.name }}
                      </span>
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {{ formatDate(comment.date) }}
                      </span>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300">
                      {{ comment.content }}
                    </p>
                  </div>
                  <div class="mt-2 ml-2">
                    <UButton
                      color="gray"
                      variant="ghost"
                      size="xs"
                      icon="i-heroicons-arrow-up-tray"
                      label="Reply"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <UCard>
              <h4 class="font-bold text-gray-900 dark:text-white mb-4">
                Leave a comment
              </h4>
              <UTextarea
                v-model="newComment"
                placeholder="Share your thoughts..."
                :rows="4"
                class="mb-4"
              />
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <UCheckbox
                    v-model="subscribeToReplies"
                    label="Subscribe to replies"
                    class="mr-4"
                  />
                </div>
                <UButton
                  :disabled="!newComment.trim()"
                  @click="addComment"
                >
                  Post Comment
                </UButton>
              </div>
            </UCard>
          </div>
        </MInView>
      </main>
      
      <!-- Sidebar -->
      <aside class="lg:w-1/4">
        <!-- Table of Contents -->
        <MAnimatedGroup
          :stagger-children="0.05"
          preset="fade"
          initial="hidden"
          animate="visible"
          class="sticky top-8"
        >
          <UCard class="mb-8">
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Table of Contents
            </h3>
            <ul class="space-y-2">
              <li
                v-for="(heading, index) in article.headings"
                :key="index"
              >
                <a
                  :href="`#${heading.id}`"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  :class="{ 'font-medium text-primary-500 dark:text-primary-400': activeHeading === heading.id }"
                >
                  {{ heading.text }}
                </a>
              </li>
            </ul>
          </UCard>
          
          <!-- Related Articles -->
          <UCard>
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Related Articles
            </h3>
            <ul class="space-y-4">
              <li
                v-for="related in relatedArticles"
                :key="related.id"
              >
                <NuxtLink
                  :to="`/blog/${related.slug}`"
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
                    {{ related.date }}
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
const activeHeading = ref('')
const newComment = ref('')
const subscribeToReplies = ref(false)

const article = {
  id: 1,
  title: 'Getting Started with Vue 3 Composition API',
  excerpt: 'Learn how to leverage the Composition API in Vue 3 to build more maintainable and scalable applications.',
  category: 'Technology',
  date: 'May 15, 2023',
  readTime: 8,
  featuredImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  author: {
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Senior Frontend Developer',
    bio: 'Alex is a senior frontend developer with over 8 years of experience building web applications. He specializes in Vue.js and React.',
    twitter: 'https://twitter.com/example',
    linkedin: 'https://linkedin.com/in/example',
    github: 'https://github.com/example'
  },
  tags: ['Vue.js', 'JavaScript', 'Frontend', 'Composition API'],
  headings: [
    { id: 'introduction', text: 'Introduction' },
    { id: 'setup', text: 'Setting Up Your Project' },
    { id: 'reactive-data', text: 'Working with Reactive Data' },
    { id: 'computed-properties', text: 'Computed Properties and Watchers' },
    { id: 'lifecycle-hooks', text: 'Lifecycle Hooks' },
    { id: 'best-practices', text: 'Best Practices' },
    { id: 'conclusion', text: 'Conclusion' }
  ],
  content: `
    <h2 id="introduction">Introduction</h2>
    <p>The Vue 3 Composition API is a new way to organize and reuse logic in Vue components. It provides a more flexible alternative to the Options API, allowing developers to group related logic together and share it across components more easily.</p>
    
    <h2 id="setup">Setting Up Your Project</h2>
    <p>To get started with the Composition API, you'll need to have Vue 3 installed in your project. If you're starting a new project, you can use the Vue CLI:</p>
    <pre><code class="language-bash">npm install -g @vue/cli
vue create my-project
cd my-project
vue add vue-next</code></pre>
    
    <h2 id="reactive-data">Working with Reactive Data</h2>
    <p>One of the key features of the Composition API is the <code>ref</code> and <code>reactive</code> functions for creating reactive data. Here's how you can use them:</p>
    <pre><code class="language-javascript">import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const state = reactive({
      name: 'John',
      age: 30
    })
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      state,
      increment
    }
  }
}</code></pre>
    
    <h2 id="computed-properties">Computed Properties and Watchers</h2>
    <p>The Composition API also provides <code>computed</code> and <code>watch</code> functions for creating computed properties and watchers:</p>
    <pre><code class="language-javascript">import { ref, computed, watch } from 'vue'

export default {
  setup() {
    const firstName = ref('John')
    const lastName = ref('Doe')
    
    const fullName = computed(() => {
      return \`\${firstName.value} \${lastName.value}\`
    })
    
    watch(firstName, (newVal, oldVal) => {
      console.log(\`First name changed from \${oldVal} to \${newVal}\`)
    })
    
    return {
      firstName,
      lastName,
      fullName
    }
  }
}</code></pre>
    
    <h2 id="lifecycle-hooks">Lifecycle Hooks</h2>
    <p>Lifecycle hooks in the Composition API are prefixed with "on" and imported from Vue:</p>
    <pre><code class="language-javascript">import { onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('Component mounted!')
    })
    
    onUnmounted(() => {
      console.log('Component unmounted!')
    })
  }
}</code></pre>
    
    <h2 id="best-practices">Best Practices</h2>
    <p>When using the Composition API, consider these best practices:</p>
    <ul>
      <li>Group related logic together in composable functions</li>
      <li>Use descriptive names for refs and reactive objects</li>
      <li>Keep setup functions small and focused</li>
      <li>Extract reusable logic into separate modules</li>
    </ul>
    
    <h2 id="conclusion">Conclusion</h2>
    <p>The Vue 3 Composition API offers a powerful and flexible way to organize your Vue components. By following these guidelines and experimenting with the API, you'll be able to build more maintainable and scalable Vue applications.</p>
  `
}

const relatedArticles = [
  {
    id: 2,
    title: 'Advanced Vue Patterns',
    date: 'May 10, 2023',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'advanced-vue-patterns'
  },
  {
    id: 3,
    title: 'State Management in Vue 3',
    date: 'May 5, 2023',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'state-management-in-vue-3'
  },
  {
    id: 4,
    title: 'Building a Vue 3 Component Library',
    date: 'April 28, 2023',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'building-a-vue-3-component-library'
  }
]

const comments = ref([
  {
    id: 1,
    author: {
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    content: 'Great article! The Composition API has really changed how I structure my Vue components. Thanks for the clear examples.',
    date: '2023-05-16T10:30:00Z'
  },
  {
    id: 2,
    author: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    content: 'I\'ve been using the Composition API for a few months now, and I completely agree with your best practices section. Grouping related logic has made my code so much more maintainable.',
    date: '2023-05-16T14:15:00Z'
  }
])

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Technology': return 'blue'
    case 'Design': return 'purple'
    case 'Business': return 'green'
    case 'Lifestyle': return 'pink'
    case 'Travel': return 'amber'
    default: return 'gray'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const addComment = () => {
  if (!newComment.value.trim()) return
  
  comments.value.push({
    id: comments.value.length + 1,
    author: {
      name: 'Current User',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
    },
    content: newComment.value,
    date: new Date().toISOString()
  })
  
  newComment.value = ''
}
</script>