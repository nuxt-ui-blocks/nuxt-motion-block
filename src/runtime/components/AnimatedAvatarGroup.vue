<template>
  <UAvatarGroup
    v-bind="fallthroughAttrs"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="rootStyle"
    :size="props.size"
    :max="limit"
    :data-expand="props.expandOnHover ? 'true' : undefined"
    :data-overflow="hasOverflow ? 'true' : undefined"
    :data-overlap="props.overlap === undefined ? undefined : 'true'"
    role="group"
    :aria-label="ariaLabel"
    :ui="uiProps.ui"
  >
    <UAvatar
      v-for="(avatar, index) in props.avatars"
      :key="avatar.src ?? avatar.alt ?? index"
      v-bind="avatarAttrs(avatar)"
    >
      <slot
        v-if="$slots.default"
        :avatar="avatar"
        :index="index"
      />
    </UAvatar>
  </UAvatarGroup>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedAvatarGroup from '../theme/animated-avatar-group'

defineOptions({ inheritAttrs: false })

const SIZE_PX = {
  '3xs': 16,
  '2xs': 20,
  'xs': 24,
  'sm': 28,
  'md': 32,
  'lg': 36,
  'xl': 40,
  '2xl': 44,
  '3xl': 48,
} as const

const attrs = useAttrs()

const props = withDefaults(defineProps<{
  avatars?: AvatarData[]
  max?: number
  maxVisible?: number
  size?: AvatarGroupSize
  overlap?: number
  expandOnHover?: boolean
  staggerDelay?: number
  hoverScale?: number
  ui?: Record<string, any>
  class?: string
}>(), {
  avatars: () => [],
  max: undefined,
  maxVisible: 4,
  size: 'md',
  overlap: undefined,
  expandOnHover: true,
  staggerDelay: 0.03,
  hoverScale: 1.05,
  ui: () => ({}),
  class: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'animatedAvatarGroup', props, theme: animatedAvatarGroup })

const fallthroughAttrs = computed(() => {
  const { style, class: _class, ...rest } = attrs
  return rest
})

const limit = computed(() => {
  if (props.max === undefined) {
    return props.maxVisible
  }
  return props.max > 0 ? props.max : props.maxVisible
})

const visibleCount = computed(() => {
  const count = props.avatars.length
  return Math.min(count, Math.max(limit.value ?? count, 0))
})

const hasOverflow = computed(() => {
  return limit.value !== undefined && limit.value > 0 && props.avatars.length > visibleCount.value
})

const rootVars = computed(() => {
  const vars: Record<string, string> = {
    '--m-avatar-hover-scale': String(props.hoverScale),
    '--m-avatar-stagger': `${props.staggerDelay}s`,
    '--m-avatar-overflow-delay': `${visibleCount.value * props.staggerDelay}s`,
  }

  if (props.overlap !== undefined) {
    vars['--m-avatar-overlap'] = `${-(SIZE_PX[props.size] ?? SIZE_PX.md) * props.overlap}px`
  }

  return vars
})

const rootStyle = computed(() => [attrs.style, rootVars.value])

const ariaLabel = computed(() => {
  return (attrs['aria-label'] as string | undefined) ?? 'Avatar group'
})

function avatarAttrs(avatar: AvatarData) {
  const { href: _href, ...rest } = avatar
  return rest
}
</script>

<script lang="ts">
export type AvatarGroupSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export interface AvatarData {
  src?: string
  alt?: string
  icon?: string
  text?: string
  [key: string]: any
}
</script>

<style>
.m-avatar-group > [data-slot="base"] {
  transition:
    margin-inline-end 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
    scale 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.m-avatar-group[data-overlap="true"] > [data-slot="base"] {
  margin-inline-end: var(--m-avatar-overlap);
}

.m-avatar-group[data-overlap="true"] > [data-slot="base"]:last-child {
  margin-inline-end: 0;
}

.m-avatar-group > [data-slot="base"]:nth-last-child(1) { transition-delay: calc(var(--m-avatar-stagger) * 0); }
.m-avatar-group > [data-slot="base"]:nth-last-child(2) { transition-delay: calc(var(--m-avatar-stagger) * 1); }
.m-avatar-group > [data-slot="base"]:nth-last-child(3) { transition-delay: calc(var(--m-avatar-stagger) * 2); }
.m-avatar-group > [data-slot="base"]:nth-last-child(4) { transition-delay: calc(var(--m-avatar-stagger) * 3); }
.m-avatar-group > [data-slot="base"]:nth-last-child(5) { transition-delay: calc(var(--m-avatar-stagger) * 4); }
.m-avatar-group > [data-slot="base"]:nth-last-child(6) { transition-delay: calc(var(--m-avatar-stagger) * 5); }
.m-avatar-group > [data-slot="base"]:nth-last-child(7) { transition-delay: calc(var(--m-avatar-stagger) * 6); }
.m-avatar-group > [data-slot="base"]:nth-last-child(8) { transition-delay: calc(var(--m-avatar-stagger) * 7); }
.m-avatar-group > [data-slot="base"]:nth-last-child(9) { transition-delay: calc(var(--m-avatar-stagger) * 8); }
.m-avatar-group > [data-slot="base"]:nth-last-child(10) { transition-delay: calc(var(--m-avatar-stagger) * 9); }
.m-avatar-group > [data-slot="base"]:nth-last-child(n + 11) { transition-delay: calc(var(--m-avatar-stagger) * 10); }

.m-avatar-group[data-overflow="true"] > [data-slot="base"]:first-child {
  transition-delay: var(--m-avatar-overflow-delay);
}

@media (hover: hover) and (pointer: fine) {
  .m-avatar-group[data-expand="true"]:hover > [data-slot="base"] {
    margin-inline-end: 4px;
  }

  .m-avatar-group[data-expand="true"]:hover > [data-slot="base"]:last-child {
    margin-inline-end: 0;
  }

  .m-avatar-group[data-overflow="true"][data-expand="true"]:hover > [data-slot="base"]:not(:first-child) {
    scale: var(--m-avatar-hover-scale);
  }

  .m-avatar-group:not([data-overflow="true"])[data-expand="true"]:hover > [data-slot="base"] {
    scale: var(--m-avatar-hover-scale);
  }
}

@media (prefers-reduced-motion: reduce) {
  .m-avatar-group > [data-slot="base"] {
    transition: none;
  }

  .m-avatar-group[data-expand="true"]:hover > [data-slot="base"],
  .m-avatar-group[data-expand="true"]:hover > [data-slot="base"]:not(:first-child),
  .m-avatar-group[data-overflow="true"][data-expand="true"]:hover > [data-slot="base"]:not(:first-child),
  .m-avatar-group:not([data-overflow="true"])[data-expand="true"]:hover > [data-slot="base"] {
    scale: 1;
  }
}
</style>
