<template>
  <motion.div
    :while-hover="{ scale: 1.02, y: -4 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <UCard>
      <div :class="ui.body({ class: uiProps.ui?.body })">
        <UAvatar
          :src="avatar"
          :alt="author"
          size="md"
        />
        <div :class="ui.content({ class: uiProps.ui?.content })">
          <div :class="ui.header({ class: uiProps.ui?.header })">
            <span :class="ui.author({ class: uiProps.ui?.author })">{{ author }}</span>
            <span :class="ui.handle({ class: uiProps.ui?.handle })">{{ handle }}</span>
            <span
              v-if="time"
              :class="ui.time({ class: uiProps.ui?.time })"
            >{{ time }}</span>
          </div>
          <p :class="ui.text({ class: uiProps.ui?.text })">
            {{ content }}
          </p>
          <div :class="ui.meta({ class: uiProps.ui?.meta })">
            <span :class="ui.stat({ class: uiProps.ui?.stat })">
              <UIcon
                name="i-lucide-heart"
                :class="ui.statIcon({ class: uiProps.ui?.statIcon })"
              />
              {{ likes }}
            </span>
            <span :class="ui.stat({ class: uiProps.ui?.stat })">
              <UIcon
                name="i-lucide-repeat"
                :class="ui.statIcon({ class: uiProps.ui?.statIcon })"
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
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import tweetCard from '../theme/tweet-card'

const props = withDefaults(defineProps<{
  author?: string
  handle?: string
  content?: string
  avatar?: string
  time?: string
  likes?: number
  retweets?: number
  class?: string
  ui?: Record<string, any>
}>(), {
  author: '',
  handle: '',
  content: '',
  avatar: '',
  time: '',
  likes: 0,
  retweets: 0,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'tweetCard',
  props,
  theme: tweetCard,
})
</script>
