<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { defineShortcuts } from '#imports'
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import pinnedList from '../theme/pinned-list'

interface PinnedListItem {
  id: string
  title: string
  meta?: string
  icon?: string
  pinned?: boolean
}

interface Props {
  items: PinnedListItem[]
  pinnedIds?: string[]
  maxPinned?: number
  emptyPinnedMessage?: string
  label?: string
  showDivider?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  maxPinned: 5,
  emptyPinnedMessage: 'Pin an item to keep it at the top.',
  label: 'Pinnable items',
  showDivider: true,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'pinnedList',
  props,
  theme: pinnedList,
})

const emit = defineEmits<{ 'update:pinned': [ids: string[]] }>()

const internalPinned = ref<string[]>(
  props.items.filter(i => i.pinned).map(i => i.id),
)

const isControlled = computed(() => props.pinnedIds !== undefined)
const pinned = computed(() => isControlled.value ? props.pinnedIds! : internalPinned.value)
const pinnedItems = computed(() => props.items.filter(i => pinned.value.includes(i.id)))
const unpinnedItems = computed(() => props.items.filter(i => !pinned.value.includes(i.id)))
const orderedItems = computed(() => [...pinnedItems.value, ...unpinnedItems.value])

const focusedIndex = ref(0)
const justPinnedId = ref<string | null>(null)

const setPinned = (next: string[]) => {
  if (!isControlled.value) internalPinned.value = next
  emit('update:pinned', next)
}

const togglePin = (id: string) => {
  if (pinned.value.includes(id)) {
    justPinnedId.value = null
    setPinned(pinned.value.filter(pid => pid !== id))
  }
  else {
    if (pinned.value.length >= props.maxPinned) return
    justPinnedId.value = id
    setPinned([...pinned.value, id])
  }
}

const toggleFocused = () => {
  const item = orderedItems.value[focusedIndex.value]
  if (item) togglePin(item.id)
}

watch(justPinnedId, (val) => {
  if (val) {
    setTimeout(() => {
      justPinnedId.value = null
    }, 420)
  }
})

const pinDisabled = computed(() => pinned.value.length >= props.maxPinned)

const moveFocus = (delta: number) => {
  const total = orderedItems.value.length
  if (total === 0) return
  focusedIndex.value = ((focusedIndex.value + delta) % total + total) % total
}

const focusFirst = () => {
  focusedIndex.value = 0
}
const focusLast = () => {
  focusedIndex.value = Math.max(0, orderedItems.value.length - 1)
}

defineShortcuts({
  arrowdown: () => moveFocus(1),
  arrowup: () => moveFocus(-1),
  p: () => toggleFocused(),
  home: () => focusFirst(),
  end: () => focusLast(),
})

defineExpose({ togglePin, focusedIndex, pinned, pinnedItems, unpinnedItems })
</script>

<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <ul
      :aria-label="label"
      :class="ui.list({ class: uiProps.ui?.list })"
    >
      <AnimatePresence :initial="false">
        <motion.li
          v-if="pinnedItems.length === 0"
          key="empty-pinned"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.15 }"
          :class="ui.item({ class: uiProps.ui?.item })"
        >
          <UBadge
            variant="soft"
            color="neutral"
            :class="ui.emptyBadge({ class: uiProps.ui?.emptyBadge })"
          >
            {{ emptyPinnedMessage }}
          </UBadge>
        </motion.li>
      </AnimatePresence>

      <AnimatePresence :initial="false">
        <motion.li
          v-for="(item, groupIndex) in pinnedItems"
          :key="item.id"
          layout
          :transition="{ type: 'spring', bounce: 0.3, duration: 0.4, delay: groupIndex * 0.025 }"
          :class="ui.item({ class: uiProps.ui?.item })"
        >
          <motion.div
            :class="ui.pinnedInner({ class: uiProps.ui?.pinnedInner })"
            :animate="justPinnedId === item.id ? { scale: [1, 0.985, 0.997, 1] } : { scale: 1 }"
            :transition="{ duration: 0.34 }"
          >
            <motion.span
              :class="ui.rail({ class: uiProps.ui?.rail })"
              style="top: 50%; transform: translateY(-50%)"
              :animate="{ opacity: 1, scaleY: 1 }"
              :initial="{ opacity: 0, scaleY: 0.2 }"
              :transition="{ bounce: 0.32, duration: 0.2, type: 'spring' }"
            >
              <div :class="ui.railFill({ class: uiProps.ui?.railFill })" />
            </motion.span>

            <UButton
              variant="subtle"
              color="neutral"
              :padded="true"
              block
              role="button"
              :aria-pressed="true"
              :aria-label="`Unpin ${item.title}`"
              :class="[ui.pinnedButton({ class: uiProps.ui?.pinnedButton }), focusedIndex === orderedItems.indexOf(item) ? 'ring-2 ring-primary' : '']"
              @click="togglePin(item.id)"
            >
              <template #leading>
                <UIcon
                  v-if="item.icon"
                  :name="item.icon"
                  :class="ui.pinIcon({ class: uiProps.ui?.pinIcon })"
                />
              </template>
              <div :class="ui.content({ class: uiProps.ui?.content })">
                <p :class="ui.title({ class: uiProps.ui?.title })">
                  {{ item.title }}
                </p>
                <p
                  v-if="item.meta"
                  :class="ui.meta({ class: uiProps.ui?.meta })"
                >
                  {{ item.meta }}
                </p>
              </div>
              <template #trailing>
                <motion.span
                  :class="ui.pinGlyph({ class: uiProps.ui?.pinGlyph })"
                  :animate="{ rotate: 45 }"
                  :initial="{ rotate: 0 }"
                  :transition="{ bounce: 0.32, duration: 0.2, type: 'spring' }"
                >
                  <svg
                    :class="ui.pinGlyphIcon({ class: uiProps.ui?.pinGlyphIcon })"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                  </svg>
                </motion.span>
              </template>
            </UButton>
          </motion.div>
        </motion.li>
      </AnimatePresence>

      <li
        v-if="showDivider && pinnedItems.length > 0 && unpinnedItems.length > 0"
        aria-hidden="true"
        :class="ui.divider({ class: uiProps.ui?.divider })"
      />

      <AnimatePresence :initial="false">
        <motion.li
          v-for="(item, groupIndex) in unpinnedItems"
          :key="item.id"
          layout
          :transition="{ type: 'spring', bounce: 0.3, duration: 0.4, delay: (pinnedItems.length + groupIndex) * 0.025 }"
          :class="ui.item({ class: uiProps.ui?.item })"
        >
          <UButton
            variant="ghost"
            color="neutral"
            :padded="true"
            block
            :disabled="pinDisabled"
            role="button"
            :aria-pressed="false"
            :aria-label="`Pin ${item.title}`"
            :class="[ui.unpinnedButton({ class: uiProps.ui?.unpinnedButton }), focusedIndex === orderedItems.indexOf(item) ? 'ring-2 ring-primary' : '']"
            @click="!pinDisabled && togglePin(item.id)"
          >
            <template #leading>
              <UIcon
                v-if="item.icon"
                :name="item.icon"
                :class="ui.unpinIcon({ class: uiProps.ui?.unpinIcon })"
              />
            </template>
            <div :class="ui.content({ class: uiProps.ui?.content })">
              <p :class="ui.title({ class: uiProps.ui?.title })">
                {{ item.title }}
              </p>
              <p
                v-if="item.meta"
                :class="ui.meta({ class: uiProps.ui?.meta })"
              >
                {{ item.meta }}
              </p>
            </div>
            <template #trailing>
              <svg
                :class="ui.unpinGlyph({ class: uiProps.ui?.unpinGlyph })"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 17v5M9 11l-3 3h12l-3-3M15 4l-3 3-3-3" />
              </svg>
            </template>
          </UButton>
        </motion.li>
      </AnimatePresence>
    </ul>
  </div>
</template>
