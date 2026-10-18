---
title: User Management Table
description: An interactive user management table with animated actions, search functionality, and bulk operations.
navigation:
  icon: i-heroicons-user-group
---

# User Management Table

An interactive user management table with animated actions, search functionality, and bulk operations. Perfect for admin panels and user management systems.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="UserManagementExample" />
  :::
#code
```vue
<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
      <p class="text-gray-600 dark:text-gray-400">Manage your platform users and permissions</p>
    </div>

    <!-- Controls -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Search users..."
          icon="i-heroicons-magnifying-glass"
          size="lg"
        />
      </div>
      <USelectMenu
        v-model="roleFilter"
        :items="roleOptions"
        placeholder="Filter by role"
        size="lg"
      />
      <UButton
        icon="i-heroicons-plus"
        color="primary"
        size="lg"
      >
        Add User
      </UButton>
    </div>

    <!-- Users Table -->
    <UCard>
      <template #header>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 class="font-semibold">Users</h3>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ filteredUsers.length }} users
            </span>
            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="filteredUsers.length"
              :ui="{ wrapper: 'flex items-center gap-1' }"
            />
          </div>
        </div>
      </template>

      <UTable
        :rows="paginatedUsers"
        :columns="columns"
        :loading="loading"
        class="w-full"
      >
        <template #name-data="{ row }">
          <div class="flex items-center">
            <UAvatar
              :src="row.avatar"
              :alt="row.name"
              size="sm"
              class="mr-3"
            />
            <div>
              <p class="font-medium">{{ row.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ row.email }}</p>
            </div>
          </div>
        </template>

        <template #role-data="{ row }">
          <UBadge
            :color="getRoleColor(row.role)"
            variant="subtle"
          >
            {{ row.role }}
          </UBadge>
        </template>

        <template #status-data="{ row }">
          <div class="flex items-center">
            <div class="w-2 h-2 rounded-full mr-2" :class="row.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'"></div>
            <span>{{ row.status }}</span>
          </div>
        </template>

        <template #actions-data="{ row }">
          <div class="flex gap-2">
            <MAnimatedGroup
              :stagger-children="0.05"
              preset="slide"
              initial="hidden"
              animate="visible"
            >
              <UButton
                v-for="(action, index) in row.actions"
                :key="index"
                :icon="action.icon"
                :color="action.color"
                :variant="action.variant"
                size="xs"
                class="ml-1 first:ml-0"
              >
                {{ action.label }}
              </UButton>
            </MAnimatedGroup>
          </div>
        </template>
      </UTable>

      <template #footer>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">Rows per page:</span>
            <USelect
              v-model="rowsPerPage"
              :items="[5, 10, 20, 50]"
              size="xs"
              class="w-20"
            />
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredUsers.length) }} of {{ filteredUsers.length }} results
            </span>
            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="filteredUsers.length"
              :ui="{ wrapper: 'flex items-center gap-1' }"
            />
          </div>
        </div>
      </template>
    </UCard>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
            <UIcon name="i-heroicons-user-group" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
            <MAnimatedNumber
              :value="userStats.total"
              class="text-2xl font-bold"
            />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 mr-4">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
            <MAnimatedNumber
              :value="userStats.active"
              class="text-2xl font-bold"
            />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 mr-4">
            <UIcon name="i-heroicons-clock" class="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Pending Invites</p>
            <MAnimatedNumber
              :value="userStats.pending"
              class="text-2xl font-bold"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const roleFilter = ref('')
const page = ref(1)
const rowsPerPage = ref(10)
const loading = ref(false)

const roleOptions = [
  { label: 'All Roles', value: '' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Editor', value: 'Editor' },
  { label: 'Viewer', value: 'Viewer' },
  { label: 'Guest', value: 'Guest' }
]

const columns = [
  { key: 'name', label: 'User' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastActive', label: 'Last Active' },
  { key: 'actions', label: 'Actions' }
]

const users = ref([
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 hours ago',
    actions: [
      { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'red', variant: 'ghost' }
    ]
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Editor',
    status: 'Active',
    lastActive: '5 hours ago',
    actions: [
      { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'red', variant: 'ghost' }
    ]
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'Viewer',
    status: 'Active',
    lastActive: '1 day ago',
    actions: [
      { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'red', variant: 'ghost' }
    ]
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'Editor',
    status: 'Inactive',
    lastActive: '3 days ago',
    actions: [
      { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'red', variant: 'ghost' }
    ]
  },
  {
    id: 5,
    name: 'James Wilson',
    email: 'james.w@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    role: 'Guest',
    status: 'Active',
    lastActive: 'Just now',
    actions: [
      { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'red', variant: 'ghost' }
    ]
  },
  {
    id: 6,
    name: 'Olivia Brown',
    email: 'olivia.b@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    role: 'Admin',
    status: 'Active',
    lastActive: '1 hour ago',
    actions: [
      { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'red', variant: 'ghost' }
    ]
  },
  {
    id: 7,
    name: 'Daniel Taylor',
    email: 'daniel.t@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    role: 'Viewer',
    status: 'Inactive',
    lastActive: '1 week ago',
    actions: [
      { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'red', variant: 'ghost' }
    ]
  },
  {
    id: 8,
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    role: 'Editor',
    status: 'Active',
    lastActive: '3 hours ago',
    actions: [
      { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'red', variant: 'ghost' }
    ]
  }
])

const userStats = ref({
  total: 1248,
  active: 987,
  pending: 24
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    
    return matchesSearch && matchesRole
  })
})

const pageCount = computed(() => Math.ceil(filteredUsers.value.length / rowsPerPage.value))

const startIndex = computed(() => (page.value - 1) * rowsPerPage.value)
const endIndex = computed(() => startIndex.value + rowsPerPage.value)

const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(startIndex.value, endIndex.value)
})

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Admin': return 'red'
    case 'Editor': return 'blue'
    case 'Viewer': return 'green'
    case 'Guest': return 'amber'
    default: return 'gray'
  }
}
</script>