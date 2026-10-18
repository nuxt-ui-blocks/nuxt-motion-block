<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Project Management
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Drag and drop tasks to organize your workflow and prioritize effectively
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">
            To Do
          </h3>
          <UBadge
            color="primary"
            variant="soft"
          >
            {{ todoItems.length }}
          </UBadge>
        </div>
        <MDragAndDrop
          v-model:items="todoItems"
          layout="list"
          :animation-duration="0.3"
          group="tasks"
          @change="handleItemsChange"
        >
          <template #default="{ item }">
            <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-3 cursor-grab active:cursor-grabbing">
              <div class="flex items-start">
                <UIcon
                  name="i-lucide-grip-vertical"
                  class="w-4 h-4 text-gray-400 mt-1 mr-2 flex-shrink-0"
                />
                <div class="flex-1">
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ item.name }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ item.description }}
                  </div>
                  <div class="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <UIcon
                      name="i-lucide-calendar"
                      class="w-3 h-3 mr-1"
                    />
                    {{ item.dueDate }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </MDragAndDrop>
      </div>

      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">
            In Progress
          </h3>
          <UBadge
            color="warning"
            variant="soft"
          >
            {{ inProgressItems.length }}
          </UBadge>
        </div>
        <MDragAndDrop
          v-model:items="inProgressItems"
          layout="list"
          :animation-duration="0.3"
          group="tasks"
          @change="handleItemsChange"
        >
          <template #default="{ item }">
            <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-3 cursor-grab active:cursor-grabbing">
              <div class="flex items-start">
                <UIcon
                  name="i-lucide-grip-vertical"
                  class="w-4 h-4 text-gray-400 mt-1 mr-2 flex-shrink-0"
                />
                <div class="flex-1">
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ item.name }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ item.description }}
                  </div>
                  <div class="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <UIcon
                      name="i-lucide-calendar"
                      class="w-3 h-3 mr-1"
                    />
                    {{ item.dueDate }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </MDragAndDrop>
      </div>

      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">
            Completed
          </h3>
          <UBadge
            color="success"
            variant="soft"
          >
            {{ completedItems.length }}
          </UBadge>
        </div>
        <MDragAndDrop
          v-model:items="completedItems"
          layout="list"
          :animation-duration="0.3"
          group="tasks"
          @change="handleItemsChange"
        >
          <template #default="{ item }">
            <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-3 cursor-grab active:cursor-grabbing">
              <div class="flex items-start">
                <UIcon
                  name="i-lucide-grip-vertical"
                  class="w-4 h-4 text-gray-400 mt-1 mr-2 flex-shrink-0"
                />
                <div class="flex-1">
                  <div class="font-medium text-gray-900 dark:text-white line-through">
                    {{ item.name }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-through">
                    {{ item.description }}
                  </div>
                  <div class="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <UIcon
                      name="i-lucide-calendar"
                      class="w-3 h-3 mr-1"
                    />
                    {{ item.dueDate }}
                  </div>
                </div>
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-5 h-5 text-green-500 flex-shrink-0"
                />
              </div>
            </div>
          </template>
        </MDragAndDrop>
      </div>
    </div>

    <div class="mt-6 text-center">
      <UButton
        color="primary"
        variant="outline"
        @click="addNewTask"
      >
        <UIcon
          name="i-lucide-plus"
          class="w-4 h-4 mr-2"
        />
        Add New Task
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Task {
  id: number | string
  name: string
  description: string
  dueDate: string
  [key: string]: any
}

const todoItems = ref<Task[]>([
  { id: 1, name: 'Design Homepage', description: 'Create wireframes and mockups', dueDate: 'Tomorrow' },
  { id: 2, name: 'Setup Project', description: 'Initialize repository and dependencies', dueDate: 'Today' },
  { id: 3, name: 'Write Documentation', description: 'Create user guides and API docs', dueDate: 'Next Week' },
])

const inProgressItems = ref<Task[]>([
  { id: 4, name: 'Implement Auth', description: 'User authentication system', dueDate: '2 days' },
])

const completedItems = ref<Task[]>([
  { id: 5, name: 'Research', description: 'Market analysis and competitor review', dueDate: 'Completed' },
])

const handleItemsChange = (newItems) => {
  console.log('Items reordered:', newItems)
}

const addNewTask = () => {
  const newTask: Task = {
    id: Date.now(),
    name: 'New Task',
    description: 'Task description',
    dueDate: 'Soon',
  }
  todoItems.value.push(newTask)
}
</script>
