---
title: Analytics Dashboard
description: A modern analytics dashboard with animated statistics, interactive charts, and real-time data visualization.
navigation:
  icon: i-heroicons-chart-bar
---

# Analytics Dashboard

A modern analytics dashboard with animated statistics, interactive charts, and real-time data visualization. Perfect for admin panels and business intelligence applications.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="AnalyticsDashboardExample" />
  :::
#code
```vue
<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400">Monitor your key metrics and performance indicators</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Revenue Card -->
      <UCard class="overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <MAnimatedNumber
                :value="stats.revenue"
                class="text-2xl font-bold mt-1"
                :spring-options="{ stiffness: 300, damping: 30 }"
              />
            </div>
            <div class="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
              <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <UIcon name="i-heroicons-arrow-trending-up" class="w-4 h-4 text-green-500 mr-1" />
            <span class="text-green-600 dark:text-green-400 font-medium">12.5%</span>
            <span class="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
          </div>
        </div>
      </UCard>

      <!-- Users Card -->
      <UCard class="overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
              <MAnimatedNumber
                :value="stats.users"
                class="text-2xl font-bold mt-1"
                :spring-options="{ stiffness: 300, damping: 30 }"
              />
            </div>
            <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <UIcon name="i-heroicons-users" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <UIcon name="i-heroicons-arrow-trending-up" class="w-4 h-4 text-green-500 mr-1" />
            <span class="text-green-600 dark:text-green-400 font-medium">8.2%</span>
            <span class="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
          </div>
        </div>
      </UCard>

      <!-- Orders Card -->
      <UCard class="overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Orders</p>
              <MAnimatedNumber
                :value="stats.orders"
                class="text-2xl font-bold mt-1"
                :spring-options="{ stiffness: 300, damping: 30 }"
              />
            </div>
            <div class="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <UIcon name="i-heroicons-arrow-trending-down" class="w-4 h-4 text-red-500 mr-1" />
            <span class="text-red-600 dark:text-red-400 font-medium">2.1%</span>
            <span class="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
          </div>
        </div>
      </UCard>

      <!-- Conversion Card -->
      <UCard class="overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</p>
              <MAnimatedNumber
                :value="stats.conversion"
                class="text-2xl font-bold mt-1"
                :format="(value) => `${value.toFixed(1)}%`"
                :spring-options="{ stiffness: 300, damping: 30 }"
              />
            </div>
            <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm">
            <UIcon name="i-heroicons-arrow-trending-up" class="w-4 h-4 text-green-500 mr-1" />
            <span class="text-green-600 dark:text-green-400 font-medium">4.3%</span>
            <span class="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Revenue Chart -->
      <UCard class="lg:col-span-2">
        <template #header>
          <h3 class="font-semibold">Revenue Overview</h3>
        </template>
        <div class="h-80">
          <MBackgroundLines
            :lines="chartLines"
            :animate="true"
            class="h-full w-full"
          />
        </div>
      </UCard>

      <!-- Traffic Sources -->
      <UCard>
        <template #header>
          <h3 class="font-semibold">Traffic Sources</h3>
        </template>
        <div class="space-y-4">
          <div v-for="(source, index) in trafficSources" :key="index" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-3" :class="`bg-${source.color}-500`"></div>
              <span class="text-gray-700 dark:text-gray-300">{{ source.name }}</span>
            </div>
            <MAnimatedNumber
              :value="source.percentage"
              class="font-medium"
              :format="(value) => `${value.toFixed(1)}%`"
            />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Recent Activity -->
    <UCard>
      <template #header>
        <h3 class="font-semibold">Recent Activity</h3>
      </template>
      <div class="divide-y divide-gray-200 dark:divide-gray-800">
        <MAnimatedGroup
          :stagger-children="0.1"
          preset="slide"
          initial="hidden"
          animate="visible"
        >
          <div
            v-for="(activity, index) in recentActivities"
            :key="index"
            class="py-4 flex items-start"
          >
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <UIcon :name="activity.icon" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description }}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </MAnimatedGroup>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const stats = ref({
  revenue: 42568,
  users: 12458,
  orders: 1240,
  conversion: 4.8
})

const chartLines = ref([
  { x: 0, y: 10, color: 'from-blue-500', toColor: 'to-transparent' },
  { x: 20, y: 30, color: 'from-blue-500', toColor: 'to-transparent' },
  { x: 40, y: 25, color: 'from-blue-500', toColor: 'to-transparent' },
  { x: 60, y: 45, color: 'from-blue-500', toColor: 'to-transparent' },
  { x: 80, y: 35, color: 'from-blue-500', toColor: 'to-transparent' },
  { x: 100, y: 60, color: 'from-blue-500', toColor: 'to-transparent' },
])

const trafficSources = ref([
  { name: 'Direct', percentage: 45.2, color: 'blue' },
  { name: 'Social', percentage: 22.8, color: 'green' },
  { name: 'Email', percentage: 18.5, color: 'amber' },
  { name: 'Organic', percentage: 13.5, color: 'purple' }
])

const recentActivities = ref([
  {
    title: 'New order received',
    description: 'Order #12345 for $245.00',
    time: '2 minutes ago',
    icon: 'i-heroicons-shopping-cart'
  },
  {
    title: 'User registered',
    description: 'John Doe joined the platform',
    time: '15 minutes ago',
    icon: 'i-heroicons-user-plus'
  },
  {
    title: 'Payment processed',
    description: 'Monthly subscription payment',
    time: '1 hour ago',
    icon: 'i-heroicons-credit-card'
  },
  {
    title: 'New message',
    description: 'You have a new message from support',
    time: '3 hours ago',
    icon: 'i-heroicons-envelope'
  }
])
</script>
```
::