<template>
  <div class="p-4 md:p-6 max-w-7xl mx-auto">
    <!-- Animated Header Section -->
    <MAnimatedGroup
      :stagger-children="0.1"
      preset="slide"
      initial="hidden"
      animate="visible"
      class="mb-6"
    >
      <div class="mb-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your platform users and permissions
        </p>
      </div>
    </MAnimatedGroup>
    <!-- Stats Section with Animated Numbers -->
    <MAnimatedGroup
      :stagger-children="0.1"
      preset="fade"
      initial="hidden"
      animate="visible"
      class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-20"
    >
      <UCard class="transition-all duration-300 hover:shadow-lg">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
            <UIcon
              name="i-heroicons-user-group"
              class="w-6 h-6 text-blue-600 dark:text-blue-400"
            />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Total Users
            </p>
            <MAnimatedNumber
              :value="userStats.total"
              class="text-2xl font-bold"
            />
          </div>
        </div>
      </UCard>

      <UCard class="transition-all duration-300 hover:shadow-lg">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 mr-4">
            <UIcon
              name="i-heroicons-check-circle"
              class="w-6 h-6 text-green-600 dark:text-green-400"
            />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Active Users
            </p>
            <MAnimatedNumber
              :value="userStats.active"
              class="text-2xl font-bold"
            />
          </div>
        </div>
      </UCard>

      <UCard class="transition-all duration-300 hover:shadow-lg">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 mr-4">
            <UIcon
              name="i-heroicons-clock"
              class="w-6 h-6 text-amber-600 dark:text-amber-400"
            />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Pending Invites
            </p>
            <MAnimatedNumber
              :value="userStats.pending"
              class="text-2xl font-bold"
            />
          </div>
        </div>
      </UCard>
    </MAnimatedGroup>

    <!-- Controls with Enhanced Animations -->
    <MAnimatedGroup
      :stagger-children="0.05"
      preset="slide"
      initial="hidden"
      animate="visible"
      class="flex flex-col lg:flex-row gap-4 mb-6 justify-end"
    >
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Search users..."
          icon="i-heroicons-magnifying-glass"
          size="lg"
          class="transition-all duration-300 hover:ring-2 hover:ring-primary-500"
        />
      </div>
      <div>
        <USelectMenu
          v-model="roleFilter"
          :items="roleOptions"
          value-key="value"
          placeholder="Filter by role"
          size="lg"
          class="min-w-40 transition-all duration-300"
        />
      </div>
      <div>
        <UButton
          icon="i-heroicons-plus"
          color="primary"
          size="lg"
          class="transition-all duration-300 hover:scale-105"
          @click="openAddUserModal"
        >
          Add User
        </UButton>
      </div>
    </MAnimatedGroup>

    <!-- Users Table with Enhanced Animations -->
    <UCard class="transition-all duration-300 hover:shadow-lg">
      <template #header>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 class="font-semibold text-lg">
            Users
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ filteredUsers.length }} users
            </span>
          </div>
        </div>
      </template>

      <UTable
        :data="paginatedUsers"
        :columns="columns"
        :loading="loading"
        class="transition-all duration-300"
      >
        <template #name-cell="{ row }">
          <MAnimatedGroup
            preset="fade"
            initial="hidden"
            animate="visible"
            :stagger-children="0.05"
            class="flex items-center"
          >
            <div class="mr-3">
              <UAvatar
                :src="row.original.avatar"
                :alt="row.original.name"
                size="sm"
                class="transition-all duration-300 hover:scale-110"
              />
            </div>
            <div>
              <p class="font-medium">
                {{ row.original.name }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ row.original.email }}
              </p>
            </div>
          </MAnimatedGroup>
        </template>

        <template #role-cell="{ row }">
          <UBadge
            :color="getRoleColor(row.original.role)"
            variant="subtle"
            class="transition-all duration-300 hover:scale-105"
          >
            {{ row.original.role }}
          </UBadge>
        </template>

        <template #status-cell="{ row }">
          <div class="flex items-center">
            <div
              class="w-2 h-2 rounded-full mr-2 transition-all duration-300"
              :class="row.original.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'"
            />
            <span>{{ row.original.status }}</span>
          </div>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex gap-2">
            <MAnimatedGroup
              :stagger-children="0.05"
              preset="slide"
              initial="hidden"
              animate="visible"
            >
              <UButton
                v-for="(action, index) in row.original.actions"
                :key="index"
                :icon="action.icon"
                :color="action.color as any"
                :variant="action.variant as any"
                size="xs"
                class="ml-1 first:ml-0 transition-all duration-300 hover:scale-110"
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
              class="w-20 transition-all duration-300"
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
              show-first
              show-last
              class="transition-all duration-300"
            />
          </div>
        </div>
      </template>
    </UCard>

    <!-- Add User Modal -->
    <UModal v-model:open="showAddUserModal">
      <template #content>
        <UCard class="max-w-2xl">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                Add New User
              </h3>
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                @click="showAddUserModal = false"
              />
            </div>
          </template>

          <UForm
            id="user-form"
            :state="newUser"
            @submit="onAddUser"
          >
            <div class="flex flex-col gap-4 w-full">
              <UFormGroup
                label="Name"
                name="name"
                required
              >
                <UInput
                  v-model="newUser.name"
                  placeholder="Enter user name"
                  autocomplete="name"
                  class="w-full"
                />
              </UFormGroup>

              <UFormGroup
                label="Email"
                name="email"
                required
              >
                <UInput
                  v-model="newUser.email"
                  type="email"
                  placeholder="Enter user email"
                  autocomplete="email"
                  class="w-full"
                />
              </UFormGroup>

              <UFormGroup
                label="Role"
                name="role"
                required
              >
                <USelectMenu
                  v-model="newUser.role"
                  :items="roleOptions.filter(option => option.value !== '')"
                  placeholder="Select role"
                  value-key="value"
                  class="w-full"
                />
              </UFormGroup>

              <UFormGroup
                label="Avatar URL"
                name="avatar"
              >
                <UInput
                  v-model="newUser.avatar"
                  placeholder="Enter avatar URL"
                  type="url"
                  class="w-full"
                />
              </UFormGroup>
            </div>
          </UForm>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton
                color="neutral"
                variant="ghost"
                @click="showAddUserModal = false"
              >
                Cancel
              </UButton>
              <UButton
                color="primary"
                type="submit"
                :loading="addingUser"
              >
                Add User
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  status: string
  lastActive: string
  actions: Array<{
    label: string
    icon: string
    color: string
    variant: string
  }>
}

// Reactive state
const searchQuery = ref('')
const roleFilter = ref<string>('')
const page = ref(1)
const rowsPerPage = ref(10)
const loading = ref(false)
const showAddUserModal = ref(false)
const addingUser = ref(false)

// New user form data
const newUser = ref({
  name: '',
  email: '',
  avatar: '',
  role: '',
})

// Role options for filtering and selection
const roleOptions = [
  { label: 'All Roles', value: '' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Editor', value: 'Editor' },
  { label: 'Viewer', value: 'Viewer' },
  { label: 'Guest', value: 'Guest' },
]

// Define columns with proper typing
const columns: TableColumn<User>[] = [
  {
    accessorKey: 'name',
    header: 'User',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'lastActive',
    header: 'Last Active',
  },
  {
    id: 'actions',
    header: 'Actions',
  },
]

// Sample user data
const users = ref<User[]>([
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
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
    ],
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
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
    ],
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
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
    ],
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
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
    ],
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
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
    ],
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
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
    ],
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
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
    ],
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
      { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
    ],
  },
])

// User statistics with animated numbers
const userStats = ref({
  total: 1248,
  active: 987,
  pending: 24,
})

// Computed properties for filtering and pagination
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      || user.email.toLowerCase().includes(searchQuery.value.toLowerCase())

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

// Helper functions
const getRoleColor = (role: string) => {
  switch (role) {
    case 'Admin': return 'error'
    case 'Editor': return 'primary'
    case 'Viewer': return 'success'
    case 'Guest': return 'warning'
    default: return 'neutral'
  }
}

// Modal functions
const openAddUserModal = () => {
  // Reset form
  newUser.value = {
    name: '',
    email: '',
    avatar: '',
    role: '',
  }
  showAddUserModal.value = true
}

// Form submission handler
const onAddUser = (event: SubmitEvent) => {
  event.preventDefault()
  addUser()
}

// Add user function
const addUser = () => {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.role) {
    return
  }

  addingUser.value = true

  // Simulate API call
  setTimeout(() => {
    const newUserObj: User = {
      id: users.value.length + 1,
      name: newUser.value.name,
      email: newUser.value.email,
      avatar: newUser.value.avatar || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      role: newUser.value.role,
      status: 'Active',
      lastActive: 'Just now',
      actions: [
        { label: 'Edit', icon: 'i-heroicons-pencil', color: 'primary', variant: 'ghost' },
        { label: 'Delete', icon: 'i-heroicons-trash', color: 'error', variant: 'ghost' },
      ],
    }

    users.value.unshift(newUserObj)

    // Update stats
    userStats.value.total += 1
    userStats.value.active += 1

    // Close modal and reset form
    showAddUserModal.value = false
    addingUser.value = false
  }, 800)
}
</script>
