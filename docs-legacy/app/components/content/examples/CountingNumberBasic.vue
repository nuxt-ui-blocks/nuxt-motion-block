<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <UIcon
            name="i-lucide-bar-chart-3"
            class="w-5 h-5 text-blue-600 dark:text-blue-400"
          />
          <span class="text-blue-700 dark:text-blue-300 font-medium">Growth Metrics</span>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Community Impact
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Real-time statistics showing the growth and impact of our platform
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-users"
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <MCountingNumber
              :to="communityMembers"
              :duration="2000"
            />
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-3">
            Community Members
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+12.5% this month</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-code"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <MCountingNumber
              :to="linesOfCode"
              :duration="2500"
            />
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-3">
            Lines of Code
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+8.3% this quarter</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-star"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <MCountingNumber
              :to="githubStars"
              :duration="3000"
            />
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-3">
            GitHub Stars
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+15.2% this year</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-globe"
                class="w-8 h-8 text-orange-600 dark:text-orange-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <MCountingNumber
              :to="countries"
              :duration="2000"
            />
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-3">
            Countries
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+3 new this month</span>
          </div>
        </UCard>
      </div>

      <UCard class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Growth Trends
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Historical data and growth patterns
            </p>
          </div>
          <div class="flex gap-2 mt-4 md:mt-0">
            <UButton
              size="sm"
              :color="timeRange === '7d' ? 'primary' : 'gray'"
              variant="solid"
              @click="setTimeRange('7d')"
            >
              7D
            </UButton>
            <UButton
              size="sm"
              :color="timeRange === '30d' ? 'primary' : 'gray'"
              variant="solid"
              @click="setTimeRange('30d')"
            >
              30D
            </UButton>
            <UButton
              size="sm"
              :color="timeRange === '90d' ? 'primary' : 'gray'"
              variant="solid"
              @click="setTimeRange('90d')"
            >
              90D
            </UButton>
          </div>
        </div>

        <div class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-center">
            <UIcon
              name="i-lucide-trending-up"
              class="w-12 h-12 text-gray-400 mx-auto mb-3"
            />
            <p class="text-gray-500 dark:text-gray-400">
              Interactive growth chart
            </p>
            <p class="text-sm text-gray-400 mt-1">
              Visualization would appear here
            </p>
          </div>
        </div>
      </UCard>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3"
          @click="refreshStats"
        >
          <UIcon
            name="i-lucide-refresh-cw"
            class="w-5 h-5 mr-2"
          />
          Refresh Statistics
        </UButton>
        <UButton
          size="lg"
          variant="outline"
          class="px-8 py-3"
          @click="exportData"
        >
          <UIcon
            name="i-lucide-download"
            class="w-5 h-5 mr-2"
          />
          Export Data
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const communityMembers = ref(12500)
const linesOfCode = ref(3500)
const githubStars = ref(420)
const countries = ref(78)
const timeRange = ref('30d')

const refreshStats = () => {
  // Simulate data refresh with random variations
  communityMembers.value = Math.floor(12000 + Math.random() * 1000)
  linesOfCode.value = Math.floor(3400 + Math.random() * 200)
  githubStars.value = Math.floor(400 + Math.random() * 50)
  countries.value = Math.floor(75 + Math.random() * 5)
}

const exportData = () => {
  // In a real implementation, this would export data
  alert('Exporting community statistics...')
}

const setTimeRange = (range) => {
  timeRange.value = range
  // In a real implementation, this would fetch data for the selected time range
  console.log('Time range set to:', range)
}

// Simulate real-time updates
onMounted(() => {
  setInterval(() => {
    refreshStats()
  }, 15000) // Update every 15 seconds
})
</script>
