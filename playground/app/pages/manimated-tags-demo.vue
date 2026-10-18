<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      AnimatedTags Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Basic Tags
          </h2>
          <p class="text-sm text-muted mt-1">
            Tags spring in when added and shrink out when removed
          </p>
        </template>
        <div class="max-w-sm space-y-4">
          <MAnimatedTags
            v-model="basicTags"
            placeholder="Add a tag..."
          />
          <p class="text-sm text-muted">
            Tags: {{ basicTags.join(', ') || '(none)' }}
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Pre-filled Tags
          </h2>
          <p class="text-sm text-muted mt-1">
            Start with existing tags
          </p>
        </template>
        <div class="max-w-sm space-y-4">
          <MAnimatedTags
            v-model="prefilledTags"
            placeholder="Add more..."
          />
          <p class="text-sm text-muted">
            Tags: {{ prefilledTags.join(', ') }}
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Max Tags
          </h2>
          <p class="text-sm text-muted mt-1">
            Limit the number of tags
          </p>
        </template>
        <div class="max-w-sm space-y-4">
          <MAnimatedTags
            v-model="maxTags"
            :max="3"
            placeholder="Max 3 tags..."
          />
          <p class="text-sm text-muted">
            Tags: {{ maxTags.join(', ') || '(none)' }} ({{ maxTags.length }}/3)
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Sizes
          </h2>
          <p class="text-sm text-muted mt-1">
            Different input sizes
          </p>
        </template>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-muted mb-1">
              Small
            </p>
            <MAnimatedTags
              v-model="sizeTags"
              size="sm"
              placeholder="Small tags..."
            />
          </div>
          <div>
            <p class="text-xs text-muted mb-1">
              Default
            </p>
            <MAnimatedTags
              v-model="sizeTags"
              placeholder="Default tags..."
            />
          </div>
          <div>
            <p class="text-xs text-muted mb-1">
              Large
            </p>
            <MAnimatedTags
              v-model="sizeTags"
              size="lg"
              placeholder="Large tags..."
            />
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Interactive Demo
          </h2>
          <p class="text-sm text-muted mt-1">
            Add and remove tags with animation
          </p>
        </template>
        <div class="max-w-sm space-y-4">
          <MAnimatedTags
            v-model="interactiveTags"
            placeholder="Type and press enter..."
          />
          <div class="flex gap-2">
            <UButton
              label="Add 'vue'"
              size="xs"
              color="primary"
              @click="addTag('vue')"
            />
            <UButton
              label="Add 'nuxt'"
              size="xs"
              color="success"
              @click="addTag('nuxt')"
            />
            <UButton
              label="Add 'motion'"
              size="xs"
              color="warning"
              @click="addTag('motion')"
            />
            <UButton
              label="Clear all"
              size="xs"
              color="error"
              variant="outline"
              @click="interactiveTags = []"
            />
          </div>
          <p class="text-sm text-muted">
            Count: {{ interactiveTags.length }}
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const basicTags = ref<string[]>([])
const prefilledTags = ref(['vue', 'nuxt', 'typescript'])
const maxTags = ref<string[]>([])
const sizeTags = ref<string[]>(['sample'])
const interactiveTags = ref<string[]>(['starter'])

function addTag(tag: string) {
  if (!interactiveTags.value.includes(tag)) {
    interactiveTags.value = [...interactiveTags.value, tag]
  }
}
</script>
