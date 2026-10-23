<template>
  <ComponentPlayground
    name="ContributionGraph"
    :defaults="{ year, data, showLegend: true, showTooltips: true, class: 'mx-auto' }"
    :controls="{
      year: { label: 'Year', kind: 'number', min: 2020, max: 2030, step: 1 },
      data: { label: 'Data (JSON)', kind: 'json' },
      showLegend: { label: 'Legend', kind: 'boolean' },
      showTooltips: { label: 'Tooltips', kind: 'boolean' },
    }"
  />
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

function pad(value: number) {
  return `${value}`.padStart(2, '0')
}

const data = Array.from({ length: 60 }, (_, index) => {
  const date = new Date(year, 0, 1 + index * 6)
  const count = (index * 7) % 13

  return {
    count,
    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    level: count === 0 ? 0 : Math.min(4, Math.ceil(count / 4)),
  }
})
</script>
