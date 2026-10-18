<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MDynamicGroup
      :items="items"
      direction="grid"
      :columns="3"
      key-field="name"
      @remove="onRemove"
    >
      <template #default="{ item, remove }">
        <div class="flex items-center justify-between gap-2 rounded-xl border border-default bg-default px-3 py-2">
          <div class="flex min-w-0 items-center gap-2">
            <UAvatar
              size="xs"
              :src="item.src"
              :alt="item.name"
            />
            <span class="truncate text-sm text-default">{{ item.name }}</span>
          </div>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            :aria-label="`Remove ${item.name}`"
            @click.stop="remove()"
          />
        </div>
      </template>
    </MDynamicGroup>

    <UButton
      label="Add member"
      icon="i-lucide-user-plus"
      variant="outline"
      class="justify-center"
      @click="addMember"
    />
  </div>
</template>

<script setup lang="ts">
interface Member {
  id: number
  name: string
  src: string
}

const pool: Member[] = [
  { id: 1, name: 'Ana Ruiz', src: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Ben Osei', src: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Cleo Park', src: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 4, name: 'Dmitri Ilves', src: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { id: 5, name: 'Elin Haugen', src: 'https://randomuser.me/api/portraits/women/90.jpg' },
  { id: 6, name: 'Farid Nazari', src: 'https://randomuser.me/api/portraits/men/11.jpg' },
]

const items = ref<Member[]>(pool.slice(0, 4))

function onRemove(index: number) {
  items.value = items.value.filter((_, i) => i !== index)
}

function addMember() {
  const next = pool.find(member => !items.value.some(item => item.id === member.id))
  if (!next) return
  items.value = [...items.value, next]
}
</script>
