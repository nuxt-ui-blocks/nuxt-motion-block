<template>
  <MBentoGrid
    :cols="3"
    class="auto-rows-[13rem]"
  >
    <MBentoCard
      name="Analytics"
      description="Every session, charted the moment it happens."
      icon="i-lucide-chart-line"
      :col-span="2"
    >
      <template #background>
        <div class="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
      </template>
      <template #cta>
        <UButton
          variant="link"
          trailing-icon="i-lucide-arrow-right"
          size="sm"
        >
          Open dashboard
        </UButton>
      </template>
    </MBentoCard>

    <MBentoCard
      name="Alerts"
      description="Ping the team the second a metric slips."
      icon="i-lucide-bell"
    />

    <MBentoCard
      name="Retention"
      description="Cohorts that stay, month after month."
      icon="i-lucide-repeat"
      :col-span="2"
    >
      <template #background>
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
      </template>
    </MBentoCard>

    <MBentoCard
      name="Exports"
      description="Every table, one click away."
      icon="i-lucide-download"
    />
  </MBentoGrid>
</template>
