<script setup lang="ts">
import { computed, reactive, ref, useId, watch } from 'vue'

export interface UserData {
  /** Avatar image URL. */
  avatar: string
  /** Account email, editable in the profile form. */
  email: string
  /** Display name, editable in the profile form. */
  name: string
}

export interface AccountOrder {
  /** Display date for the order. */
  date: string
  /** Order reference, also used as the list key. */
  id: string
  /** Fulfilment progress from 0 to 100. */
  progress: number
  /** Current fulfilment stage. */
  status: 'processing' | 'shipped' | 'delivered'
}

export interface UserAccountAvatarProps {
  /** Extra classes for the root wrapper. */
  class?: string
  /** Render the popover in place instead of portalling it to the body. */
  inline?: boolean
  /** Orders listed under the account menu. */
  orders?: AccountOrder[]
  /** Account shown in the menu. */
  user: UserData
}

const props = withDefaults(defineProps<UserAccountAvatarProps>(), {
  class: undefined,
  inline: false,
  orders: () => [
    { date: '2023-03-15', id: 'ORD001', progress: 100, status: 'delivered' },
    { date: '2023-03-20', id: 'ORD002', progress: 66, status: 'shipped' },
  ],
})

const emit = defineEmits<{
  'order-view': [orderId: string]
  'profile-save': [user: UserData]
}>()

type Section = 'profile' | 'orders'

const idPrefix = useId()

const open = ref(false)
const activeSection = ref<Section | null>(null)
const userData = ref<UserData>({ ...props.user })

const form = reactive({
  name: props.user.name,
  email: props.user.email,
})

const STATUS_TONE: Record<AccountOrder['status'], string> = {
  processing: 'bg-info',
  shipped: 'bg-warning',
  delivered: 'bg-success',
}

const profileOpen = computed(() => activeSection.value === 'profile')
const ordersOpen = computed(() => activeSection.value === 'orders')

function toggleSection(section: Section) {
  activeSection.value = activeSection.value === section ? null : section
}

function syncForm() {
  form.name = userData.value.name
  form.email = userData.value.email
}

function saveProfile() {
  const nextUser: UserData = {
    ...userData.value,
    name: form.name,
    email: form.email,
  }

  userData.value = nextUser
  emit('profile-save', nextUser)
  activeSection.value = null
}

function viewOrder(order: AccountOrder) {
  emit('order-view', order.id)
}

function progress(order: AccountOrder) {
  return Math.min(100, Math.max(0, order.progress))
}

watch(activeSection, (section) => {
  if (section === 'profile') {
    syncForm()
  }
})

watch(
  () => props.user,
  (next) => {
    userData.value = { ...next }

    if (profileOpen.value) {
      syncForm()
    }
  },
  { deep: true },
)
</script>

<template>
  <div :class="['inline-block', props.class]">
    <UPopover
      v-model:open="open"
      :content="{
        side: 'bottom',
        align: 'end',
        sideOffset: 8,
        collisionPadding: 8,
      }"
      :portal="!props.inline"
      :ui="{
        content: 'w-64 max-h-[70vh] overflow-y-auto p-0 rounded-xl',
      }"
    >
      <button
        type="button"
        :aria-label="`Account menu for ${userData.name}`"
        class="rounded-full ring-offset-2 ring-offset-default transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <img
          :alt="`${userData.name} avatar`"
          :src="userData.avatar"
          class="size-12 rounded-full border border-default object-cover"
          draggable="false"
          height="48"
          width="48"
        >
      </button>

      <template #content>
        <div class="flex flex-col divide-y divide-default">
          <div>
            <UButton
              type="button"
              variant="ghost"
              color="neutral"
              class="w-full justify-start rounded-lg px-3 py-2.5 font-medium"
              :class="
                profileOpen
                  ? 'bg-primary text-inverted hover:bg-primary/90'
                  : 'text-highlighted'
              "
              icon="i-lucide-user"
              @click="toggleSection('profile')"
            >
              Edit Profile
            </UButton>

            <div
              class="section-grid grid transition-[grid-template-rows] duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
              :class="profileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div
                class="section-inner overflow-hidden"
                :aria-hidden="!profileOpen"
                :inert="!profileOpen"
                :class="
                  profileOpen ? 'opacity-100 blur-none' : 'opacity-0 blur-[10px]'
                "
              >
                <form
                  class="flex flex-col gap-3 p-4"
                  @submit.prevent="saveProfile"
                >
                  <div class="flex flex-col gap-1.5">
                    <label
                      :for="`${idPrefix}-name`"
                      class="text-xs font-medium text-muted"
                    >
                      Name
                    </label>
                    <input
                      :id="`${idPrefix}-name`"
                      v-model="form.name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      class="rounded-md border border-default bg-default px-3 py-2 text-sm text-highlighted outline-none transition-colors placeholder:text-muted focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                    >
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label
                      :for="`${idPrefix}-email`"
                      class="text-xs font-medium text-muted"
                    >
                      Email
                    </label>
                    <input
                      :id="`${idPrefix}-email`"
                      v-model="form.email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      class="rounded-md border border-default bg-default px-3 py-2 text-sm text-highlighted outline-none transition-colors placeholder:text-muted focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                    >
                  </div>

                  <UButton
                    type="submit"
                    block
                    class="mt-2"
                  >
                    Save Changes
                  </UButton>
                </form>
              </div>
            </div>
          </div>

          <div>
            <UButton
              type="button"
              variant="ghost"
              color="neutral"
              class="w-full justify-start rounded-lg px-3 py-2.5 font-medium"
              :class="
                ordersOpen
                  ? 'bg-primary text-inverted hover:bg-primary/90'
                  : 'text-highlighted'
              "
              icon="i-lucide-package"
              @click="toggleSection('orders')"
            >
              Last Orders
            </UButton>

            <div
              class="section-grid grid transition-[grid-template-rows] duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
              :class="ordersOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div
                class="section-inner overflow-hidden"
                :aria-hidden="!ordersOpen"
                :inert="!ordersOpen"
                :class="
                  ordersOpen ? 'opacity-100 blur-none' : 'opacity-0 blur-[10px]'
                "
              >
                <div class="flex flex-col gap-3 p-4">
                  <div
                    v-for="order in props.orders"
                    :key="order.id"
                    class="flex flex-col gap-3 rounded-lg border border-default bg-elevated/40 p-3 transition-colors hover:bg-elevated/60"
                  >
                    <div class="flex items-center justify-between">
                      <div class="text-sm font-semibold text-highlighted">
                        {{ order.id }}
                      </div>
                      <div class="text-xs text-muted">
                        {{ order.date }}
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <div class="flex-1 space-y-2">
                        <div class="flex items-center justify-between text-xs">
                          <span class="font-medium text-highlighted capitalize">
                            {{ order.status }}
                          </span>
                          <span class="text-muted">{{ progress(order) }}%</span>
                        </div>
                        <div
                          class="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                          :aria-label="`Order ${order.id} progress`"
                          :aria-valuemax="100"
                          :aria-valuemin="0"
                          :aria-valuenow="progress(order)"
                          role="progressbar"
                        >
                          <div
                            :class="[
                              'order-bar h-full origin-left rounded-full',
                              STATUS_TONE[order.status] ?? 'bg-primary',
                            ]"
                            :style="{
                              transform: `scaleX(${progress(order) / 100})`,
                            }"
                          />
                        </div>
                      </div>

                      <UButton
                        type="button"
                        variant="ghost"
                        color="neutral"
                        size="xs"
                        icon="i-lucide-eye"
                        :aria-label="`View order ${order.id}`"
                        @click="viewOrder(order)"
                      />
                    </div>
                  </div>

                  <p
                    v-if="!props.orders.length"
                    class="text-xs text-muted"
                  >
                    No orders yet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>
.section-inner {
  transition:
    opacity 250ms cubic-bezier(0.23, 1, 0.32, 1),
    filter 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

.order-bar {
  animation: order-grow 600ms cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes order-grow {
  from {
    transform: scaleX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-grid {
    transition: none;
  }

  .section-inner {
    transition: none;
  }

  .order-bar {
    animation: none;
  }
}
</style>
