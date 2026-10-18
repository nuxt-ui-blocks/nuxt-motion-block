<template>
  <div class="space-y-12">
    <UPageHeader
      title="GlowHoverCards"
      description="UCard with radial gradient glow that follows the cursor position."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Glow Hover Effect
        </p>
      </template>
      <MGlowHoverCards
        :items="cards"
        glow-color="var(--ui-primary)"
      >
        <template #default="{ card }">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-highlighted">
              {{ card.title }}
            </h3>
            <p class="text-sm text-muted">
              {{ card.description }}
            </p>
          </div>
        </template>
      </MGlowHoverCards>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom Glow Color
        </p>
      </template>
      <MGlowHoverCards
        :items="cards2"
        glow-color="#a855f7"
      >
        <template #default="{ card }">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <UIcon
                :name="card.icon"
                class="w-5 h-5 text-primary"
              />
            </div>
            <div>
              <h3 class="font-semibold text-highlighted">
                {{ card.title }}
              </h3>
              <p class="text-sm text-muted">
                {{ card.description }}
              </p>
            </div>
          </div>
        </template>
      </MGlowHoverCards>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const cards = [
  { title: 'Analytics', description: 'Track your metrics in real-time with detailed dashboards.' },
  { title: 'Automation', description: 'Set up workflows that run without manual intervention.' },
  { title: 'Integrations', description: 'Connect with 200+ services out of the box.' },
  { title: 'Security', description: 'Enterprise-grade encryption and compliance built in.' },
  { title: 'Performance', description: 'Sub-millisecond response times at any scale.' },
  { title: 'Support', description: '24/7 dedicated support with guaranteed SLAs.' },
]

const cards2 = [
  { icon: 'i-lucide-rocket', title: 'Deploy', description: 'One-click deployments to any platform.' },
  { icon: 'i-lucide-database', title: 'Storage', description: 'Scalable storage with automatic backups.' },
  { icon: 'i-lucide-shield', title: 'Auth', description: 'Built-in authentication and authorization.' },
]
</script>
