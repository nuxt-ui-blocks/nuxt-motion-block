<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      CodeBlock Demo
    </h1>

    <div class="space-y-8">
      <!-- Vue Code -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Vue Component
          </h2>
        </template>
        <MCodeBlock
          :code="vueCode"
          language="vue"
          theme="github-dark"
          show-line-numbers
        />
      </UCard>

      <!-- TypeScript Code -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            TypeScript
          </h2>
        </template>
        <MCodeBlock
          :code="tsCode"
          language="typescript"
          theme="dracula"
        />
      </UCard>

      <!-- CSS Code -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            CSS
          </h2>
        </template>
        <MCodeBlock
          :code="cssCode"
          language="css"
          theme="nord"
        />
      </UCard>

      <!-- Inline (no line numbers) -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Without Line Numbers
          </h2>
        </template>
        <MCodeBlock
          :code="shortCode"
          language="javascript"
          theme="github-dark"
        />
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// The `vueCode` sample below embeds a literal closing script tag, escaped as
// `<\/script>` so the HTML parser does not end this block early. That escape is
// load-bearing, hence the disable.
/* eslint-disable no-useless-escape */
const vueCode = `<script setup lang="ts">
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'

const count = ref(0)
const increment = () => count.value++
<\/script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    class="counter"
  >
    <button @click="increment">
      Count: {{ count }}
    </button>
  </motion.div>
</template>`

const tsCode = `interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`)
  if (!response.ok) {
    throw new Error('User not found')
  }
  return response.json()
}

const user = await fetchUser('123')`

const cssCode = `.card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}`

const shortCode = `const greeting = (name: string) => {
  return \`Hello, \${name}!\`
}

console.log(greeting('World'))`
</script>
