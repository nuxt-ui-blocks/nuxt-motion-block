<template>
  <motion.div
    :initial="{ opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ type: 'spring', stiffness: 260, damping: 28 }"
    :class="ui.wrapper({ class: [uiProps.ui?.wrapper, uiProps.class] })"
    v-bind="$attrs"
    @mouseenter="showSheen = true"
    @mouseleave="showSheen = false"
  >
    <div :class="ui.card({ class: uiProps.ui?.card })">
      <span
        aria-hidden="true"
        :class="ui.grain({ class: uiProps.ui?.grain })"
        :style="{ backgroundImage: noiseBackground }"
      />

      <span
        v-if="props.shine"
        aria-hidden="true"
        :class="ui.sheen({ class: [uiProps.ui?.sheen, showSheen ? 'opacity-100' : 'opacity-0'] })"
      />

      <span
        aria-hidden="true"
        :class="ui.edge({ class: uiProps.ui?.edge })"
      />

      <div :class="ui.body({ class: uiProps.ui?.body })">
        <div :class="ui.top({ class: uiProps.ui?.top })">
          <div :class="ui.media({ class: uiProps.ui?.media })">
            <svg
              aria-hidden="true"
              class="h-[26px] w-[34px] shrink-0"
              fill="none"
              viewBox="0 0 34 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  :id="chipGradientId"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="#f4e3ab"
                  />
                  <stop
                    offset="45%"
                    stop-color="#c9a544"
                  />
                  <stop
                    offset="100%"
                    stop-color="#8f6f22"
                  />
                </linearGradient>
              </defs>
              <rect
                :fill="`url(#${chipGradientId})`"
                height="25"
                rx="4.5"
                stroke="rgba(0, 0, 0, 0.22)"
                width="33"
                x="0.5"
                y="0.5"
              />
              <g
                stroke="rgba(0, 0, 0, 0.3)"
                stroke-width="1"
              >
                <path d="M0 8.5H11" />
                <path d="M0 17.5H11" />
                <path d="M23 8.5H34" />
                <path d="M23 17.5H34" />
                <path d="M11 3.5V22.5" />
                <path d="M23 3.5V22.5" />
                <path d="M11 13H23" />
              </g>
            </svg>

            <svg
              aria-hidden="true"
              class="h-4 w-4 shrink-0 text-white/60"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="1.7"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9a4 4 0 0 1 0 6" />
              <path d="M9.5 6.5a7 7 0 0 1 0 11" />
              <path d="M13 4a10 10 0 0 1 0 16" />
            </svg>
          </div>

          <span
            v-if="props.label"
            :class="ui.label({ class: uiProps.ui?.label })"
          >
            {{ props.label }}
          </span>
        </div>

        <div :class="ui.center({ class: uiProps.ui?.center })">
          <span
            v-if="props.balance"
            :class="ui.balance({ class: uiProps.ui?.balance })"
          >
            {{ props.balance }}
          </span>
          <span
            v-if="maskedCardNumber"
            :class="ui.cardNumber({ class: uiProps.ui?.cardNumber })"
          >
            {{ maskedCardNumber }}
          </span>
          <slot />
        </div>

        <div :class="ui.bottom({ class: uiProps.ui?.bottom })">
          <div :class="ui.meta({ class: uiProps.ui?.meta })">
            <span
              v-if="props.holder"
              class="block min-w-0"
            >
              <span :class="ui.metaLabel({ class: uiProps.ui?.metaLabel })">Card holder</span>
              <span :class="ui.metaValue({ class: uiProps.ui?.metaValue })">{{ props.holder }}</span>
            </span>
            <span
              v-if="props.expiry"
              class="block shrink-0"
            >
              <span :class="ui.metaLabel({ class: uiProps.ui?.metaLabel })">Valid thru</span>
              <span :class="ui.metaValue({ class: uiProps.ui?.metaValue })">{{ props.expiry }}</span>
            </span>
          </div>

          <span
            v-if="props.network"
            :class="ui.network({ class: uiProps.ui?.network })"
          >
            <svg
              v-if="props.network === 'visa'"
              aria-hidden="true"
              class="h-7 w-12"
              viewBox="0 0 48 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="0"
                y="16"
                fill="currentColor"
                font-family="ui-sans-serif, system-ui, sans-serif"
                font-size="18"
                font-style="italic"
                font-weight="700"
                letter-spacing="0.5"
              >VISA</text>
            </svg>

            <svg
              v-else-if="props.network === 'mastercard'"
              aria-hidden="true"
              class="h-7 w-11"
              viewBox="0 0 48 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="15"
                fill="#eb001b"
                r="12"
              />
              <circle
                cx="30"
                cy="15"
                fill="#f79e1b"
                r="12"
              />
              <path
                d="M24 5.5a12 12 0 0 0 0 19 12 12 0 0 0 0-19Z"
                fill="#ff5f00"
              />
            </svg>

            <svg
              v-else-if="props.network === 'amex'"
              aria-hidden="true"
              class="h-7 w-11"
              viewBox="0 0 48 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                fill="#2e77bc"
                height="30"
                rx="3"
                width="48"
              />
              <text
                x="24"
                y="19"
                fill="#fff"
                font-family="ui-sans-serif, system-ui, sans-serif"
                font-size="13"
                font-weight="700"
                text-anchor="middle"
              >AMEX</text>
            </svg>

            <svg
              v-else
              aria-hidden="true"
              class="h-7 w-11 text-white/70"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              viewBox="0 0 48 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                height="22"
                rx="3"
                width="40"
                x="4"
                y="4"
              />
              <path d="M4 12h40" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { computed, useId, ref } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import walletCard from '../theme/wallet-card'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: Record<string, any>
  balance?: string
  cardNumber?: string
  holder?: string
  expiry?: string
  label?: string
  network?: 'visa' | 'mastercard' | 'amex' | 'generic'
  shine?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  balance: undefined,
  cardNumber: undefined,
  holder: undefined,
  expiry: undefined,
  label: undefined,
  network: undefined,
  shine: true,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'walletCard',
  props,
  theme: walletCard,
})

const chipGradientId = `wallet-chip-${useId()}`

const noiseBackground = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'140\' height=\'140\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'

const showSheen = ref(false)

const maskedCardNumber = computed(() => {
  if (!props.cardNumber) return ''

  const digits = props.cardNumber.replace(/\s/g, '')
  const last4 = digits.slice(-4)

  return `•••• •••• •••• ${last4}`
})
</script>
