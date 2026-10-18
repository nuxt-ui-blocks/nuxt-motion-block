<script setup lang="ts">
import { computed, ref } from 'vue'

let idCounter = 0

function makeItem(label: string, icon?: string) {
  idCounter += 1
  return { id: `demo-${idCounter}`, label, icon }
}

const fruit = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry', 'Fig', 'Grape', 'Honeydew']
const notifications = [
  makeItem('Ana pushed 3 commits to main', 'i-lucide-git-commit-horizontal'),
  makeItem('Deployment finished in 42s', 'i-lucide-rocket'),
  makeItem('Priya commented on #218', 'i-lucide-message-square'),
  makeItem('Nightly build passed', 'i-lucide-circle-check'),
  makeItem('New pull request opened', 'i-lucide-git-pull-request'),
  makeItem('Backup snapshot stored', 'i-lucide-database'),
  makeItem('2 dependabot updates', 'i-lucide-package'),
  makeItem('Weekly digest is ready', 'i-lucide-mail'),
]

const receded = ref(notifications.slice(0, 8))
const upward = ref(notifications.slice(0, 8))
const live = ref(notifications.slice())
const clicked = ref<string | null>(null)
const clickable = ref(notifications.slice(0, 4))
const slotted = ref(notifications.slice(0, 4))

const recededCount = computed(() => receded.value.length)

function addRandom() {
  const name = fruit[Math.floor(Math.random() * fruit.length)] ?? 'Item'
  receded.value = [...receded.value, makeItem(name)]
}

function removeLast() {
  receded.value = receded.value.slice(0, -1)
}
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedList"
      description="An activity feed that recedes with depth, staggers each new row in, and re-orders the remaining rows with a layout animation."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Recede by depth
        </p>
        <p class="text-muted">
          The newest row is fully opaque and each row behind it steps down 18% in opacity and 5% in scale, down to a floor of 35% / 85%. Only the last five rows are shown.
        </p>
      </template>

      <MAnimatedList
        v-model:items="receded"
        :max-visible="5"
        class="mb-4"
      />

      <div class="flex flex-wrap items-center gap-2">
        <UButton
          icon="i-lucide-plus"
          label="Add random"
          @click="addRandom"
        />
        <UButton
          icon="i-lucide-minus"
          label="Remove last"
          color="neutral"
          variant="outline"
          :disabled="recededCount === 0"
          @click="removeLast"
        />
        <UButton
          icon="i-lucide-trash-2"
          label="Clear"
          color="error"
          variant="soft"
          :disabled="recededCount === 0"
          @click="receded = []"
        />
        <span class="text-muted text-sm">
          Count: {{ recededCount }}
        </span>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Direction up and no recede
        </p>
        <p class="text-muted">
          Rows enter from below instead of above, and <code>recede</code> is off so every row stays at full strength.
        </p>
      </template>
      <MAnimatedList
        v-model:items="upward"
        direction="up"
        :recede="false"
        :max-visible="6"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Live feed
        </p>
        <p class="text-muted">
          One row arrives every 1.2s and the newest one recedes the rest. Hover the list to pause it.
        </p>
      </template>
      <MAnimatedList
        v-model:items="live"
        feed
        :feed-interval="1200"
        :max-visible="5"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Clickable rows
        </p>
        <p class="text-muted">
          Passing <code>on-item-click</code> turns each row into a click target. Last clicked: {{ clicked ?? 'none' }}
        </p>
      </template>
      <MAnimatedList
        v-model:items="clickable"
        :max-visible="4"
        :on-item-click="(item: any) => { clicked = String(item.label) }"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom row slot
        </p>
        <p class="text-muted">
          The default slot replaces the built-in row, so <code>on-item-click</code> no longer applies.
        </p>
      </template>
      <MAnimatedList
        v-model:items="slotted"
        :max-visible="4"
      >
        <template #default="{ item, index, remove }: { item: any, index: number, remove: (index: number) => void }">
          <UCard :ui="{ body: 'px-3 py-2' }">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <UIcon
                  :name="item.icon"
                  class="size-5 text-primary"
                />
                <span>{{ item.label }}</span>
              </div>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="xs"
                :aria-label="`Remove ${item.label}`"
                @click.stop="remove(index)"
              />
            </div>
          </UCard>
        </template>
      </MAnimatedList>
    </UCard>
  </div>
</template>
