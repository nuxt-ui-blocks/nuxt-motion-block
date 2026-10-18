<template>
  <div class="p-8 max-w-lg mx-auto">
    <div class="text-center mb-12">
      <h3 class="text-3xl font-bold mb-3 text-highlighted">
        Performance Metrics
      </h3>
      <p class="text-muted text-lg">
        Real-time statistics with smooth sliding animations
      </p>
    </div>

    <div class="space-y-8">
      <div class="bg-default rounded-xl shadow-xl p-6 border border-default">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h4 class="font-bold text-highlighted">
              Response Time
            </h4>
            <p class="text-sm text-muted">
              Milliseconds
            </p>
          </div>
          <UBadge
            color="primary"
            variant="soft"
          >
            ms
          </UBadge>
        </div>
        <div class="text-5xl font-bold text-highlighted">
          <MSlidingNumber :value="responseTime" />
        </div>
        <div class="mt-2 h-2 bg-accented rounded-full overflow-hidden">
          <div
            class="h-full bg-primary rounded-full"
            :style="{ width: `${Math.min(100, responseTime / 5)}%` }"
          />
        </div>
      </div>

      <div class="bg-default rounded-xl shadow-xl p-6 border border-default">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h4 class="font-bold text-highlighted">
              Uptime
            </h4>
            <p class="text-sm text-muted">
              Service availability
            </p>
          </div>
          <UBadge
            color="green"
            variant="soft"
          >
            %
          </UBadge>
        </div>
        <div class="text-5xl font-bold text-highlighted">
          <MSlidingNumber
            :value="uptime"
            :precision="1"
          />
        </div>
        <div class="mt-2 h-2 bg-accented rounded-full overflow-hidden">
          <div
            class="h-full bg-green-500 rounded-full"
            :style="{ width: `${uptime}%` }"
          />
        </div>
      </div>

      <div class="bg-default rounded-xl shadow-xl p-6 border border-default">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h4 class="font-bold text-highlighted">
              Monthly actives
            </h4>
            <p class="text-sm text-muted">
              Current online
            </p>
          </div>
        </div>
        <div class="text-5xl font-bold text-highlighted">
          <MSlidingNumber :value="activeUsers" />
        </div>
        <div class="mt-2 h-2 bg-accented rounded-full overflow-hidden">
          <div
            class="h-full bg-primary/70 rounded-full"
            :style="{ width: `${Math.min(100, activeUsers / 2000 * 100)}%` }"
          />
        </div>
      </div>
    </div>

    <div class="mt-10 flex flex-col sm:flex-row gap-4">
      <UButton
        color="primary"
        variant="solid"
        size="lg"
        block
        @click="updateMetrics"
      >
        <UIcon
          name="i-lucide-refresh-cw"
          class="w-5 h-5 mr-2"
        />
        Refresh Data
      </UButton>
      <UButton
        color="neutral"
        variant="outline"
        size="lg"
        block
        @click="resetMetrics"
      >
        <UIcon
          name="i-lucide-rotate-ccw"
          class="w-5 h-5 mr-2"
        />
        Reset
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const responseTime = ref(124)
const uptime = ref(99.9)
const activeUsers = ref(1248)

const updateMetrics = () => {
  responseTime.value = Math.floor(Math.random() * 200) + 50
  uptime.value = 99.5 + (Math.random() * 0.4)
  activeUsers.value = Math.floor(Math.random() * 2000) + 500
}

const resetMetrics = () => {
  responseTime.value = 124
  uptime.value = 99.9
  activeUsers.value = 1248
}
</script>
