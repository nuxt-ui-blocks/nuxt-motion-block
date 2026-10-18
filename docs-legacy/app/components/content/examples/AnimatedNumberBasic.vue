<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <UIcon
            name="i-lucide-bar-chart-3"
            class="w-5 h-5 text-blue-600 dark:text-blue-400"
          />
          <span class="text-blue-700 dark:text-blue-300 font-medium">Performance Dashboard</span>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Real-time Metrics
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Live analytics and performance indicators that update in real-time to help you make informed decisions
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
            <MAnimatedNumber
              :value="activeUsers"
              :spring-options="{ stiffness: 100, damping: 10 }"
            />
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-3">
            Active Users
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+12.5% from last month</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-zap"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <MAnimatedNumber
              :value="uptime"
              :spring-options="{ stiffness: 100, damping: 10 }"
            />
            <span class="text-2xl">%</span>
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-3">
            System Uptime
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-check-circle"
              class="w-4 h-4 mr-1"
            />
            <span>99.99% SLA</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-package"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <MAnimatedNumber
              :value="projects"
              :spring-options="{ stiffness: 100, damping: 10 }"
            />+
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-3">
            Projects Delivered
          </div>
          <div class="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400">
            <UIcon
              name="i-lucide-trending-up"
              class="w-4 h-4 mr-1"
            />
            <span>+8.2% from last quarter</span>
          </div>
        </UCard>

        <UCard class="text-center hover:shadow-lg transition-shadow">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <UIcon
                name="i-lucide-life-buoy"
                class="w-8 h-8 text-orange-600 dark:text-orange-400"
              />
            </div>
          </div>
          <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            <MAnimatedNumber
              :value="responseTime"
              :spring-options="{ stiffness: 100, damping: 10 }"
            />
            <span class="text-2xl">ms</span>
          </div>
          <div class="text-gray-600 dark:text-gray-400 mb-3">
            Avg. Response Time
          </div>
          <div class="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
            <UIcon
              name="i-lucide-trending-down"
              class="w-4 h-4 mr-1"
            />
            <span>-15% from last week</span>
          </div>
        </UCard>
      </div>

      <UCard class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Performance Trends
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
              name="i-lucide-bar-chart-3"
              class="w-12 h-12 text-gray-400 mx-auto mb-3"
            />
            <p class="text-gray-500 dark:text-gray-400">
              Performance chart visualization
            </p>
            <p class="text-sm text-gray-400 mt-1">
              Interactive chart would appear here
            </p>
          </div>
        </div>
      </UCard>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3"
          @click="refreshData"
        >
          <UIcon
            name="i-lucide-refresh-cw"
            class="w-5 h-5 mr-2"
          />
          Refresh Data
        </UButton>
        <UButton
          size="lg"
          variant="outline"
          class="px-8 py-3"
          @click="exportReport"
        >
          <UIcon
            name="i-lucide-download"
            class="w-5 h-5 mr-2"
          />
          Export Report
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeUsers = ref(15420)
const uptime = ref(99.9)
const projects = ref(542)
const responseTime = ref(124)
const timeRange = ref('30d')

const refreshData = () => {
  // Simulate data refresh with random variations
  activeUsers.value = Math.floor(15000 + Math.random() * 1000)
  uptime.value = Number.parseFloat((99.8 + Math.random() * 0.2).toFixed(2))
  projects.value = 500 + Math.floor(Math.random() * 50)
  responseTime.value = Math.floor(100 + Math.random() * 50)
}

const exportReport = () => {
  // In a real implementation, this would export a PDF or CSV report
  alert('Exporting performance report...')
}

const setTimeRange = (range) => {
  timeRange.value = range
  // In a real implementation, this would fetch data for the selected time range
  console.log('Time range set to:', range)
}

// Simulate real-time updates
onMounted(() => {
  setInterval(() => {
    refreshData()
  }, 10000) // Update every 10 seconds
})
</script>
