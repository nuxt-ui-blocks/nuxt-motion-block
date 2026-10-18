<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount, useAttrs, isRef } from 'vue'
import type { EmblaCarouselType } from 'embla-carousel'
import { Motion, useReducedMotion, type VariantType, type MotionStyle } from 'motion-v'
import { carouselOffset, carouselSlideTransform } from '../../utils/carousel'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  coverflow?: boolean
  rotation?: number
  depth?: number
  scaleStep?: number
  perspective?: number
  inverted?: boolean
}>(), {
  coverflow: true,
  rotation: 45,
  depth: 180,
  scaleStep: 0.15,
  perspective: 1200,
  inverted: false,
})

const emit = defineEmits<{ select: [index: number] }>()

const attrs = useAttrs()
const items = computed(() => (Array.isArray(attrs.items) ? attrs.items : []))
const loop = computed(() => !!attrs.loop)
const reducedMotion = useReducedMotion()

const carouselRef = ref()
const selectedIndex = ref(0)
let activeApi: EmblaCarouselType | null = null

function onSelect() {
  selectedIndex.value = activeApi?.selectedScrollSnap() ?? 0
  emit('select', selectedIndex.value)
}

function attachApi() {
  const rawApi = carouselRef.value?.emblaApi
  const next: EmblaCarouselType | undefined = isRef(rawApi) ? rawApi.value : rawApi
  if (!next || next === activeApi) {
    return
  }
  activeApi?.off('select', onSelect)
  activeApi?.off('reInit', onSelect)
  activeApi = next
  next.on('select', onSelect)
  next.on('reInit', onSelect)
  selectedIndex.value = next.selectedScrollSnap() ?? 0
}

watch(() => carouselRef.value?.emblaApi?.value ?? carouselRef.value?.emblaApi, attachApi, { flush: 'post' })

onBeforeUnmount(() => {
  activeApi?.off('select', onSelect)
  activeApi?.off('reInit', onSelect)
  activeApi = null
})

function getOffset(index: number) {
  return carouselOffset({
    index,
    selectedIndex: selectedIndex.value ?? 0,
    count: items.value.length,
    loop: loop.value,
  })
}

function itemStyle(index: number): MotionStyle {
  const offset = getOffset(index)
  const depthOffset = Math.min(Math.abs(offset), 3)
  return {
    transformStyle: 'preserve-3d',
    zIndex: 10 - depthOffset,
    willChange: 'transform',
  }
}

function itemAnimate(index: number): VariantType {
  const offset = getOffset(index)
  const abs = Math.min(Math.abs(offset), 3)
  if (reducedMotion.value) {
    return { opacity: offset === 0 ? 1 : 0, transition: { duration: 0 } }
  }
  const { rotateY, scale, z, transformPerspective } = carouselSlideTransform({
    offset,
    rotation: props.rotation,
    depth: props.depth,
    scaleStep: props.scaleStep,
    perspective: props.perspective,
    inverted: props.inverted,
  })
  return {
    opacity: abs > 3 ? 0 : 1,
    transformPerspective,
    rotateY: `${rotateY}deg`,
    scale,
    z,
    transition: { type: 'spring', stiffness: 90, damping: 18 },
  }
}
</script>

<template>
  <UCarousel
    ref="carouselRef"
    v-bind="$attrs"
  >
    <template #default="{ item, index }">
      <Motion
        v-if="props.coverflow"
        as="div"
        class="h-full w-full"
        :style="itemStyle(index)"
        :animate="itemAnimate(index)"
      >
        <slot
          :item="item as any"
          :index="index"
        />
      </Motion>
      <slot
        v-else
        :item="item as any"
        :index="index"
      />
    </template>
  </UCarousel>
</template>
