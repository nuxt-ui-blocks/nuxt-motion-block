<script lang="ts">
import { defineComponent, h, useSlots, computed, type PropType, type VNode, Comment, Text, Fragment } from 'vue'
import { Motion } from 'motion-v'
import type { Variant } from 'motion-v'
import { useAccessibility } from '../composables/useAccessibility'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedGroup from '../theme/animated-group'

// Defines a type for a variants object that holds multiple animation states.
type Variants = Record<string, Variant>

export type PresetType
  = | 'fade'
    | 'slide'
    | 'scale'
    | 'blur'
    | 'blur-slide'
    | 'zoom'
    | 'flip'
    | 'bounce'
    | 'rotate'
    | 'swing'

/**
 * Where the stagger radiates from.
 *
 * `start` keeps the original container-level `staggerChildren` transition, so
 * existing demos behave exactly as before. `center` and `edges` cannot be
 * expressed with a container transition — a container stagger is linear by
 * definition — so those modes hand each child its own positive delay instead.
 */
export type StaggerFrom
  = | 'start'
    | 'center'
    | 'edges'

export default defineComponent({
  name: 'AnimatedGroup',
  props: {
    class: String,
    ui: {
      type: Object as PropType<Record<string, any>>,
      default: undefined,
    },
    variants: Object as PropType<{ container?: Variants, item?: Variants }>,
    preset: String as PropType<PresetType>,
    as: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div',
    },
    asChild: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div',
    },
    initial: {
      type: String,
      default: 'hidden',
    },
    animate: {
      type: String,
      default: 'visible',
    },
    staggerChildren: {
      type: Number,
      default: 0.1,
    },
    staggerDirection: {
      type: Number,
      default: 1,
    },
    staggerFrom: {
      type: String as PropType<StaggerFrom>,
      default: 'start',
    },
  },
  setup(props) {
    const slots = useSlots()

    const { props: uiProps, ui } = useMotionBlockUI({
      name: 'animatedGroup',
      props,
      theme: animatedGroup,
    })

    const defaultContainerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    }

    const defaultItemVariants: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }

    const presetVariants: Record<PresetType, Variants> = {
      'fade': {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
      'slide': {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      },
      'scale': {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
      },
      'blur': {
        hidden: { filter: 'blur(4px)', opacity: 0 },
        visible: { filter: 'blur(0px)', opacity: 1 },
      },
      'blur-slide': {
        hidden: { filter: 'blur(4px)', y: 20, opacity: 0 },
        visible: { filter: 'blur(0px)', y: 0, opacity: 1 },
      },
      'zoom': {
        hidden: { scale: 0.5, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        },
      },
      'flip': {
        hidden: { rotateX: -90, opacity: 0 },
        visible: {
          rotateX: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        },
      },
      'bounce': {
        hidden: { y: -50, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 400, damping: 10 },
        },
      },
      'rotate': {
        hidden: { rotate: -180, opacity: 0 },
        visible: {
          rotate: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 200, damping: 15 },
        },
      },
      'swing': {
        hidden: { rotate: -10, opacity: 0 },
        visible: {
          rotate: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 300, damping: 8 },
        },
      },
    }

    const addDefaultVariants = (variants: Variants | undefined) => {
      if (!variants) return defaultItemVariants
      return {
        hidden: { ...defaultItemVariants.hidden, ...(variants.hidden || {}) },
        visible: { ...defaultItemVariants.visible, ...(variants.visible || {}) },
      }
    }

    const containerVariants = computed(() => {
      const baseVariants = props.variants?.container || defaultContainerVariants
      // Ensure both hidden and visible states exist with proper stagger in transition

      // Properly merge transition properties to preserve existing transitions while adding stagger
      const baseTransition: any = (baseVariants.visible && typeof baseVariants.visible === 'object' && (baseVariants.visible as any).transition)
        ? (baseVariants.visible as any).transition
        : {}

      const result: Variants = {
        // Always include hidden state
        hidden: baseVariants.hidden || {},
        visible: {
          ...(baseVariants.visible || {}),
          transition: {
            ...baseTransition,
            staggerChildren:
              props.staggerFrom === 'start' ? props.staggerChildren : 0,
            staggerDirection: props.staggerDirection,
          },
        },
      }

      return result
    })

    const itemVariants = computed(() => {
      if (props.variants?.item)
        return addDefaultVariants(props.variants.item)
      const preset = props.preset ? presetVariants[props.preset] : undefined
      return preset ? addDefaultVariants(preset) : defaultItemVariants
    })

    const { prefersReducedMotion } = useAccessibility()

    // Reduced motion lands the group directly on its final state rather than
    // animating into it, so the content is still present, just static.
    const initialState = computed(() =>
      prefersReducedMotion.value ? props.animate : props.initial,
    )

    const usesPerChildStagger = computed(
      () => props.staggerFrom !== 'start' && !prefersReducedMotion.value,
    )

    /**
     * Delay for one child in a non-linear stagger mode.
     *
     * Distances are measured from the origin and multiplied by
     * `staggerChildren`, which keeps every delay positive — a negative delay
     * gets clamped against `duration` in motion-v, so symmetric pairs would
     * stop landing together. The ripple still reads as one wave travelling out
     * from the middle, or in from both edges at once.
     */
    function childDelay(index: number, count: number): number {
      const step = Math.max(props.staggerChildren, 0)
      if (step === 0 || count <= 1) {
        return 0
      }
      if (props.staggerFrom === 'center') {
        return Math.abs(index - (count - 1) / 2) * step
      }
      // 'edges' leads from both ends, so the centre is the last to arrive.
      return Math.min(index, count - 1 - index) * step
    }

    /** A copy of the item variants carrying this child's delay. */
    function withDelay(variants: Variants, delay: number): Variants {
      const visible
        = variants.visible && typeof variants.visible === 'object'
          ? (variants.visible as Record<string, unknown>)
          : {}
      const transition = (visible.transition as object | undefined) ?? {}
      return {
        ...variants,
        visible: { ...visible, transition: { ...transition, delay } },
      }
    }

    // Helper function to flatten children and extract only the actual items
    function flattenChildren(nodes: VNode[]): VNode[] {
      const flattened: VNode[] = []
      for (const node of nodes) {
        // Skip comments and empty text nodes
        if (node.type === Comment) {
          continue
        }
        if (node.type === Text && (node.children as string).trim() === '') {
          continue
        }

        // If it's a Fragment, flatten its children
        if (node.type === Fragment) {
          flattened.push(...flattenChildren(node.children as VNode[]))
        }
        // If it's a regular element with children that are arrays (like v-for), flatten them
        else if (node.children && Array.isArray(node.children)) {
          // Check if this is a wrapper element (like a div containing multiple items)
          // We'll assume that if a node has multiple children that aren't text/comments,
          // it's a wrapper and we should flatten its children
          const nonTextChildren = node.children.filter(child =>
            child && (typeof child !== 'string' || child.trim() !== ''),
          )

          // If it has multiple non-text children, it's likely a wrapper
          if (nonTextChildren.length > 1) {
            // Flatten the children directly
            flattened.push(...flattenChildren(node.children as VNode[]))
          }
          else {
            // Otherwise, keep the node as is
            flattened.push(node)
          }
        }
        // Otherwise, keep the node as is
        else {
          flattened.push(node)
        }
      }
      return flattened
    }

    return () => {
      const children = flattenChildren(slots.default ? slots.default() : [])

      // Create motion children with proper stagger handling
      const motionChildren = children.map((child, index) => {
        const variants = usesPerChildStagger.value
          ? withDelay(itemVariants.value, childDelay(index, children.length))
          : itemVariants.value

        return h(
          // @ts-ignore
          Motion,
          {
            as: props.asChild,
            variants,
          },
          () => [child],
        )
      })

      return h(
        // @ts-ignore
        Motion,
        {
          as: props.as,
          class: ui.value.root({ class: [uiProps.ui?.root, uiProps.class] }),
          initial: initialState.value,
          animate: props.animate,
          variants: containerVariants.value,
        },
        () => motionChildren,
      )
    }
  },
})
</script>
