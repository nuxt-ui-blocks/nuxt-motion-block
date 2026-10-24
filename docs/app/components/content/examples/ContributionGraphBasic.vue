<template>
  <div class="flex w-full justify-center py-4">
    <MContributionGraph
      :data="contributions"
      :year="year"
      class="max-w-full"
    />
  </div>
</template>

<script setup lang="ts">
type Contribution = {
  count: number
  date: string
  level: number
}

const year = new Date().getFullYear()

function pad(value: number) {
  return `${value}`.padStart(2, '0')
}

function toKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const contributions: Contribution[] = []
const cursor = new Date(year, 0, 1)
let index = 0

while (cursor.getFullYear() === year) {
  const wave = Math.sin(index / 9) + Math.sin(index / 23)
  const count = wave > 0.4 ? Math.round((wave - 0.4) * 18) : 0

  contributions.push({
    count,
    date: toKey(cursor),
    level: count === 0 ? 0 : Math.min(4, Math.ceil(count / 4)),
  })

  cursor.setDate(cursor.getDate() + 1)
  index += 1
}
</script>
