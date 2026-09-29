<template>
  <motion.div
    :while-hover="{ scale: 1.02, y: -4 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
    class="will-change-transform"
  >
    <UCard>
      <div class="flex items-start gap-3">
        <UAvatar
          :src="avatar"
          :alt="author"
          size="md"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-highlighted truncate">{{ author }}</span>
            <span class="text-sm text-muted truncate">{{ handle }}</span>
            <span
              v-if="time"
              class="text-xs text-muted ml-auto whitespace-nowrap"
            >{{ time }}</span>
          </div>
          <p class="mt-2 text-sm leading-relaxed">
            {{ content }}
          </p>
          <div class="flex items-center gap-4 mt-3 text-sm text-muted">
            <span class="inline-flex items-center gap-1">
              <UIcon
                name="i-lucide-heart"
                class="w-4 h-4"
              />
              {{ likes }}
            </span>
            <span class="inline-flex items-center gap-1">
              <UIcon
                name="i-lucide-repeat"
                class="w-4 h-4"
              />
              {{ retweets }}
            </span>
          </div>
        </div>
      </div>
    </UCard>
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

withDefaults(defineProps<{
  author?: string
  handle?: string
  content?: string
  avatar?: string
  time?: string
  likes?: number
  retweets?: number
}>(), {
  author: '',
  handle: '',
  content: '',
  avatar: '',
  time: '',
  likes: 0,
  retweets: 0,
})
</script>
