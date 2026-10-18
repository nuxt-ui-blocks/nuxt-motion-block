<template>
  <motion.div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :initial="cardInitial"
    :while-in-view="cardWhileInView"
    :transition="cardTransition"
    :in-view-options="IN_VIEW"
  >
    <UCard
      v-bind="$attrs"
      role="article"
      :aria-label="`${props.title} - ${props.currency}${props.price}`"
      :ui="cardUi"
    >
      <div :class="ui.media({ class: uiProps.ui?.media })">
        <img
          :src="props.image"
          :alt="props.title"
          :draggable="false"
          :class="[
            ui.image({ class: uiProps.ui?.image }),
            !shouldReduceMotion && 'transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
            isHoverDevice && !shouldReduceMotion && 'group-hover:scale-105',
          ]"
        >

        <div
          data-slot="overlay"
          :class="[
            ui.overlay({ class: uiProps.ui?.overlay }),
            isHoverDevice && 'group-hover:opacity-100',
          ]"
        />

        <motion.span
          v-if="props.badge"
          role="status"
          :class="ui.badgeWrapper({ class: uiProps.ui?.badgeWrapper })"
          :initial="badgeInitial"
          :animate="badgeAnimate"
          :transition="badgeTransition"
        >
          <UBadge
            :label="props.badge"
            :color="badgeColor"
            variant="solid"
            size="xs"
            :class="ui.badge({ class: uiProps.ui?.badge })"
          />
        </motion.span>

        <motion.button
          type="button"
          :aria-label="isWishlisted
            ? `Remove ${props.title} from wishlist`
            : `Add ${props.title} to wishlist`"
          :class="[
            ui.wishlistButton({ class: uiProps.ui?.wishlistButton }),
            isHoverDevice ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
          ]"
          :while-press="tapTransition"
          @click="handleWishlist"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            :class="[ui.wishlistIcon({ class: uiProps.ui?.wishlistIcon }), isWishlisted ? 'text-error' : 'text-highlighted']"
            :fill="isWishlisted ? 'currentColor' : 'none'"
            stroke="currentColor"
            :stroke-width="isWishlisted ? 0 : 2"
          >
            <path
              :d="HEART_PATH"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      <div :class="ui.content({ class: uiProps.ui?.content })">
        <h3 :class="ui.title({ class: uiProps.ui?.title })">
          {{ props.title }}
        </h3>

        <div
          v-if="props.rating !== undefined"
          :aria-label="`${props.rating} out of 5 stars`"
          :class="ui.rating({ class: uiProps.ui?.rating })"
        >
          <template
            v-for="star in stars"
            :key="star.index"
          >
            <svg
              v-if="star.half"
              aria-hidden="true"
              viewBox="0 0 24 24"
              :class="ui.starHalf({ class: uiProps.ui?.starHalf })"
            >
              <defs>
                <linearGradient :id="halfStarId(star.index)">
                  <stop
                    offset="50%"
                    stop-color="currentColor"
                  />
                  <stop
                    offset="50%"
                    stop-color="transparent"
                  />
                </linearGradient>
              </defs>
              <path
                :d="STAR_PATH"
                :fill="`url(#${halfStarId(star.index)})`"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </svg>
            <svg
              v-else
              aria-hidden="true"
              viewBox="0 0 24 24"
              :class="[ui.star({ class: uiProps.ui?.star }), star.filled ? 'text-warning' : 'text-muted/30']"
              :fill="star.filled ? 'currentColor' : 'none'"
              stroke="currentColor"
              :stroke-width="star.filled ? 0 : 1.5"
            >
              <path
                :d="STAR_PATH"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </template>
          <span :class="ui.ratingValue({ class: uiProps.ui?.ratingValue })">{{ props.rating }}</span>
        </div>

        <div :class="ui.priceRow({ class: uiProps.ui?.priceRow })">
          <span :class="ui.price({ class: uiProps.ui?.price })">
            {{ props.currency }}{{ props.price }}
          </span>
          <template v-if="hasDiscount">
            <span :class="ui.priceOld({ class: uiProps.ui?.priceOld })">
              {{ props.currency }}{{ props.originalPrice }}
            </span>
            <span :class="ui.discount({ class: uiProps.ui?.discount })">
              -{{ discountPercent }}%
            </span>
          </template>
        </div>

        <div :class="ui.footer({ class: uiProps.ui?.footer })">
          <UButton
            block
            :disabled="isAdded"
            :color="isAdded ? 'success' : 'primary'"
            :ui="buttonUi"
            :aria-label="`Add ${props.title} to cart`"
            @click="handleAddToCart"
          >
            <AnimatePresence
              :initial="false"
              mode="wait"
            >
              <motion.span
                v-if="isAdded"
                key="added"
                :class="ui.buttonLabel({ class: uiProps.ui?.buttonLabel })"
                :initial="{ opacity: 0, transform: 'scale(0.8)' }"
                :animate="{ opacity: 1, transform: 'scale(1)' }"
                :exit="{ opacity: 0, transform: 'scale(0.8)' }"
                :transition="iconTransition"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  class="size-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    :d="CHECK_PATH"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Added
              </motion.span>
              <motion.span
                v-else
                key="cart"
                :class="ui.buttonLabel({ class: uiProps.ui?.buttonLabel })"
                :initial="{ opacity: 0, transform: 'scale(0.8)' }"
                :animate="{ opacity: 1, transform: 'scale(1)' }"
                :exit="{ opacity: 0, transform: 'scale(0.8)' }"
                :transition="iconTransition"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  class="size-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    :d="CART_PATH"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Add to Cart
              </motion.span>
            </AnimatePresence>
          </UButton>
        </div>
      </div>
    </UCard>
  </motion.div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import productCard from '../theme/product-card'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: Record<string, any>
  badge?: string
  currency?: string
  image: string
  onAddToCart?: () => void
  onWishlist?: () => void
  originalPrice?: number
  price: number
  rating?: number
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  badge: undefined,
  class: undefined,
  currency: '$',
  originalPrice: undefined,
  rating: undefined,
  ui: undefined,
  onAddToCart: undefined,
  onWishlist: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'productCard',
  props,
  theme: productCard,
})

const shouldReduceMotion = useReducedMotion()
const starId = useId()
const isHoverDevice = useHoverCapable()
const isAdded = ref(false)
const isWishlisted = ref(false)

let addedTimer: ReturnType<typeof setTimeout> | undefined

const SPRING = { bounce: 0.1, duration: 0.25, type: 'spring' } as const
const SPRING_BOUNCY = { bounce: 0.2, duration: 0.3, type: 'spring' } as const
const INSTANT = { duration: 0 } as const
const ICON_MORPH = { duration: 0.15 } as const
const IN_VIEW = { margin: '-50px', once: true } as const

const STAR_PATH = 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
const CART_PATH = 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
const HEART_PATH = 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
const CHECK_PATH = 'M5 13l4 4L19 7'

const cardInitial = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 1 }
    : { opacity: 0, transform: 'translateY(20px) scale(0.97)' })
const cardWhileInView = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 1 }
    : { opacity: 1, transform: 'translateY(0px) scale(1)' })
const cardTransition = computed(() => (shouldReduceMotion.value ? INSTANT : SPRING))
const badgeInitial = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 1 }
    : { opacity: 0, transform: 'scale(0.6)' })
const badgeAnimate = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 1 }
    : { opacity: 1, transform: 'scale(1)' })
const badgeTransition = computed(() => (shouldReduceMotion.value ? INSTANT : SPRING_BOUNCY))
const iconTransition = computed(() => (shouldReduceMotion.value ? INSTANT : ICON_MORPH))
const tapTransition = computed(() =>
  shouldReduceMotion.value
    ? undefined
    : { scale: 0.85, transition: { duration: 0.1 } })

const cardUi = computed(() => ({
  root: [
    'relative flex w-full flex-col overflow-hidden rounded-2xl border border-default bg-default shadow-sm ring-0 transition-shadow duration-300',
    isHoverDevice.value ? 'hover:shadow-black/5 hover:shadow-xl' : '',
  ],
  // Must neutralise Nuxt UI's own `p-4 sm:p-6` on the card body, otherwise the body insets the image
  // wrapper by 24px at the `sm` breakpoint and the image stops being full-bleed against the root's
  // `overflow-hidden rounded-2xl`. The inner content div carries its own `p-4`, as in the reference,
  // so zero body padding is what keeps the image flush and the corners clipped.
  body: 'flex flex-1 flex-col divide-y-0 p-0 sm:p-0',
}))

// The added state is a `disabled` button, so `UButton`'s own `disabled:opacity-75` already dims it —
// the reference relies on the same thing via its `disabled` prop. Only the colour and the pinned
// hover fill need restating: `color="success"` supplies `disabled:bg-success` and `active:bg-success/75`
// but no text colour, so `text-inverted` is still required on top of it.
const buttonUi = computed(() => ({
  base: isAdded.value
    ? 'w-full justify-center gap-2 text-inverted hover:bg-success'
    : 'w-full justify-center gap-2',
}))

const badgeColor = computed(() => {
  const value = (props.badge ?? '').toLowerCase()
  if (value === 'sale') {
    return 'error'
  }
  if (value === 'new') {
    return 'success'
  }
  return 'primary'
})

const hasDiscount = computed(() => props.originalPrice !== undefined && props.originalPrice > props.price)
const discountPercent = computed(() => hasDiscount.value
  ? Math.round(((props.originalPrice! - props.price) / props.originalPrice!) * 100)
  : 0)

const stars = computed(() => {
  if (props.rating === undefined) {
    return []
  }
  const fullStars = Math.floor(props.rating)
  const fraction = props.rating - fullStars
  const hasHalf = fraction >= 0.25 && fraction < 0.75
  const roundedUp = fraction >= 0.75

  return Array.from({ length: 5 }, (_, index) => ({
    index,
    filled: index < fullStars || (roundedUp && index === fullStars),
    half: hasHalf && index === fullStars,
  }))
})

function halfStarId(index: number) {
  return `half-star-${starId}-${index}`
}

function handleWishlist() {
  isWishlisted.value = !isWishlisted.value
  props.onWishlist?.()
}

function handleAddToCart() {
  isAdded.value = true
  props.onAddToCart?.()
  if (addedTimer) {
    clearTimeout(addedTimer)
  }
  addedTimer = setTimeout(() => {
    isAdded.value = false
  }, 2000)
}

onBeforeUnmount(() => {
  if (addedTimer) {
    clearTimeout(addedTimer)
  }
})
</script>
