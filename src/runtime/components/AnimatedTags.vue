<template>
  <UInputTags
    v-bind="$attrs"
    :model-value="modelValue"
    :ui="tagsUi"
    @update:model-value="handleUpdate"
  >
    <div
      ref="chipsRef"
      class="contents"
      aria-hidden="true"
    >
      <AnimatePresence>
        <motion.div
          v-for="(tag, index) in renderedTags"
          :key="String(tag)"
          layout
          :initial="shouldReduce ? REDUCED_INITIAL : INITIAL"
          :animate="shouldReduce ? REDUCED_ANIMATE : ANIMATE"
          :exit="shouldReduce ? REDUCED_EXIT : EXIT"
          :transition="shouldReduce ? REDUCED_TRANSITION : SPRING"
          :data-state="index === activeIndex ? 'active' : 'inactive'"
          class="group inline-flex cursor-pointer items-center gap-0.5 rounded-sm px-1.5 py-0.5 font-medium ring ring-inset ring-accented bg-elevated text-default transition-colors data-[state=active]:bg-accented"
          @click="removeTag(tag)"
        >
          <span>{{ tag }}</span>
          <UIcon
            name="i-lucide-circle-x"
            class="inline-flex size-3.5 shrink-0 items-center justify-center rounded-xs text-dimmed transition-colors duration-200 hover:bg-accented/75 hover:text-default"
          />
        </motion.div>
      </AnimatePresence>
    </div>
    <template
      v-for="(_, name) in forwardedSlots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData ?? {}"
      />
    </template>
  </UInputTags>
</template>

<script setup lang="ts">
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, unref, useSlots, watch } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue?: string[]
  ui?: Record<string, any>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const REDUCED_TRANSITION = { duration: 0 }
const SPRING = { bounce: 0, duration: 0.25, type: 'spring' as const }
const REDUCED_INITIAL = { opacity: 1 }
const REDUCED_ANIMATE = { opacity: 1 }
const REDUCED_EXIT = { opacity: 0, transition: { duration: 0 } }
const INITIAL = { filter: 'blur(4px)', opacity: 0, y: 20 }
const ANIMATE = { filter: 'blur(0px)', opacity: 1, y: 0 }
const EXIT = { filter: 'blur(4px)', opacity: 0, y: 20 }

const slots = useSlots()
const chipsRef = ref<HTMLElement | null>(null)
const activeIndex = ref(-1)
const renderedTags = ref<string[]>([...(props.modelValue ?? [])])

const reduce = useReducedMotion()
const isMounted = ref(false)
const shouldReduce = computed(() => isMounted.value && Boolean(unref(reduce)))

const forwardedSlots = computed(() =>
  Object.fromEntries(Object.entries(slots).filter(([name]) => name !== 'default')),
)

const tagsUi = computed(() => ({
  ...props.ui,
  item: [
    props.ui?.item,
    'absolute start-0 top-0 size-px overflow-hidden border-0 p-0 opacity-0',
  ],
  input: [props.ui?.input, 'order-last min-w-0'],
}))

function isSameTags(a: string[], b: string[] | undefined) {
  if (!b || a.length !== b.length) return false
  return a.every((tag, index) => tag === b[index])
}

function handleUpdate(value: string[]) {
  renderedTags.value = [...value]
  if (!isSameTags(value, props.modelValue)) {
    emit('update:modelValue', [...value])
  }
}

function removeTag(tag: string) {
  const index = renderedTags.value.indexOf(tag)
  if (index === -1) return
  const next = [...renderedTags.value]
  next.splice(index, 1)
  handleUpdate(next)
}

function syncActiveIndex() {
  const root = chipsRef.value?.parentElement
  if (!root) return
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-slot="item"]'))
  activeIndex.value = items.findIndex(item => item.dataset.state === 'active')
}

let observer: MutationObserver | undefined

onMounted(() => {
  isMounted.value = true
  const root = chipsRef.value?.parentElement
  if (!root) return
  observer = new MutationObserver(syncActiveIndex)
  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-state'],
    childList: true,
    subtree: true,
  })
  syncActiveIndex()
})

onBeforeUnmount(() => observer?.disconnect())

watch(
  () => props.modelValue,
  (value) => {
    if (value && !isSameTags(renderedTags.value, value)) {
      renderedTags.value = [...value]
    }
    nextTick(syncActiveIndex)
  },
)

watch(renderedTags, () => nextTick(syncActiveIndex))
</script>
