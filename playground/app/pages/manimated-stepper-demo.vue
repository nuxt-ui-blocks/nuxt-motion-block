<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedStepper"
      description="Stepper with directional slide transitions between steps."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Checkout
        </p>
        <p class="text-muted">
          Linear flow with controls. Moving forward slides in from the right, going back slides in from the left.
        </p>
      </template>
      <div class="space-y-6 p-1">
        <MAnimatedStepper
          v-model="checkoutStep"
          :items="checkoutItems"
        >
          <template #step-0>
            <div class="space-y-1">
              <p class="font-semibold text-highlighted">
                Contact
              </p>
              <p class="text-sm text-muted">
                We will only use this to send order updates.
              </p>
            </div>
          </template>
          <template #step-1>
            <div class="space-y-1">
              <p class="font-semibold text-highlighted">
                Shipping address
              </p>
              <p class="text-sm text-muted">
                Enter the address you want us to deliver to.
              </p>
            </div>
          </template>
          <template #step-2>
            <div class="space-y-1">
              <p class="font-semibold text-highlighted">
                Payment
              </p>
              <p class="text-sm text-muted">
                All transactions are encrypted end to end.
              </p>
            </div>
          </template>
          <template #step-3>
            <div class="space-y-1">
              <p class="font-semibold text-highlighted">
                Review
              </p>
              <p class="text-sm text-muted">
                Check everything once more before placing the order.
              </p>
            </div>
          </template>
        </MAnimatedStepper>

        <div class="flex items-center justify-between gap-4">
          <UButton
            icon="i-lucide-arrow-left"
            variant="outline"
            :disabled="checkoutStep === 0"
            @click="checkoutStep -= 1"
          >
            Back
          </UButton>
          <span class="text-sm text-muted tabular-nums">
            Step {{ checkoutStep + 1 }} of {{ checkoutItems.length }}
          </span>
          <UButton
            trailing-icon="i-lucide-arrow-right"
            :disabled="checkoutStep === checkoutItems.length - 1"
            @click="checkoutStep += 1"
          >
            Continue
          </UButton>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Setup guide
        </p>
        <p class="text-muted">
          Vertical orientation keeps each step label beside its content.
        </p>
      </template>
      <div class="p-1">
        <MAnimatedStepper
          v-model="setupStep"
          orientation="vertical"
          :items="setupItems"
        >
          <template #step-0>
            <p class="text-sm text-muted">
              Install the package and import the component.
            </p>
          </template>
          <template #step-1>
            <p class="text-sm text-muted">
              Wrap your content and point the model at a number.
            </p>
          </template>
          <template #step-2>
            <p class="text-sm text-muted">
              Change the number and the panel transitions on its own.
            </p>
          </template>
        </MAnimatedStepper>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Free navigation
        </p>
        <p class="text-muted">
          With <code class="text-default">linear</code> disabled you can jump to any step, and the slide still follows the direction of travel.
        </p>
      </template>
      <div class="p-1">
        <MAnimatedStepper
          v-model="freeStep"
          :linear="false"
          :items="freeItems"
        >
          <template #step-0>
            <p class="text-sm text-muted">
              Plan — choose the tier that matches your team.
            </p>
          </template>
          <template #step-1>
            <p class="text-sm text-muted">
              Build — wire the component into your dashboard.
            </p>
          </template>
          <template #step-2>
            <p class="text-sm text-muted">
              Ship — deploy and share it with your team.
            </p>
          </template>
        </MAnimatedStepper>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sizes and colors
        </p>
        <p class="text-muted">
          The stepper is a thin wrapper, so every prop and slot of UStepper still works.
        </p>
      </template>
      <div class="grid gap-8 p-1 sm:grid-cols-2">
        <div class="space-y-3">
          <p class="text-sm font-medium text-muted">
            Small · success
          </p>
          <MAnimatedStepper
            v-model="smallStep"
            size="sm"
            color="success"
            :items="sizeItems"
          />
        </div>
        <div class="space-y-3">
          <p class="text-sm font-medium text-muted">
            Large · warning
          </p>
          <MAnimatedStepper
            v-model="largeStep"
            size="lg"
            color="warning"
            :items="sizeItems"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Per-step slots
        </p>
        <p class="text-muted">
          Titles, descriptions and indicators all come from slots when an item needs custom content.
        </p>
      </template>
      <div class="space-y-6 p-1">
        <MAnimatedStepper
          v-model="customStep"
          :items="customItems"
        >
          <template #indicator="{ index }">
            <UIcon
              :name="index === 2 ? 'i-lucide-check' : 'i-lucide-circle'"
              class="size-4"
            />
          </template>
          <template #title="{ item }">
            <span class="font-semibold">{{ item.title }}</span>
          </template>
          <template #description="{ item }">
            <span class="text-xs text-muted">{{ item.description }}</span>
          </template>
          <template #step-0>
            <p class="text-sm text-muted">
              Slot based titles, descriptions and indicators are forwarded straight to UStepper.
            </p>
          </template>
          <template #step-1>
            <p class="text-sm text-muted">
              The final step swaps its indicator to a check icon.
            </p>
          </template>
          <template #step-2>
            <p class="text-sm text-muted">
              All three steps share one animated content panel.
            </p>
          </template>
        </MAnimatedStepper>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const checkoutStep = ref(0)
const setupStep = ref(1)
const freeStep = ref(0)
const smallStep = ref(1)
const largeStep = ref(0)
const customStep = ref(2)

const checkoutItems = [
  { label: 'Contact', description: 'Email' },
  { label: 'Shipping', description: 'Address' },
  { label: 'Payment', description: 'Card' },
  { label: 'Review', description: 'Confirm' },
]

const setupItems = [
  { label: 'Install', description: 'Add the dependency' },
  { label: 'Configure', description: 'Set your model' },
  { label: 'Animate', description: 'Change the value' },
]

const freeItems = [
  { label: 'Plan', description: 'Pick a tier' },
  { label: 'Build', description: 'Integrate' },
  { label: 'Ship', description: 'Deploy' },
]

const sizeItems = [
  { label: 'One' },
  { label: 'Two' },
  { label: 'Three' },
]

const customItems = [
  { label: 'Discover', description: 'Read the docs' },
  { label: 'Prototype', description: 'Build a small demo' },
  { label: 'Release', description: 'Ship to production' },
]
</script>
