<script setup lang="ts">
interface Stat {
  value?: number
  text?: string
  suffix?: string
  label: string
}

const stats: Stat[] = [
  { value: 292, label: 'components, all typed' },
  { value: 800, suffix: '+', label: 'working examples' },
  { value: 17, label: 'families to steal from' },
  { text: 'MIT', label: 'no strings attached' },
]
</script>

<template>
  <dl class="grid grid-cols-2 gap-y-10 border-y border-default py-10 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-default">
    <div
      v-for="(stat, index) in stats"
      :key="stat.label"
      class="flex flex-col gap-1 px-0 sm:px-6 sm:first:pl-0 sm:last:pr-0"
    >
      <dt class="order-2 mt-2 text-sm text-muted">
        {{ stat.label }}
      </dt>
      <dd class="order-1 font-serif text-5xl leading-none tracking-tight text-highlighted tabular-nums sm:text-6xl">
        <MCountingNumber
          v-if="typeof stat.value === 'number'"
          :to="stat.value"
          :duration="1.4"
          :delay="index * 100"
          once
        />
        <span v-else>{{ stat.text }}</span>
        <span
          v-if="stat.suffix"
          class="text-primary"
        >{{ stat.suffix }}</span>
      </dd>
    </div>
  </dl>
</template>
