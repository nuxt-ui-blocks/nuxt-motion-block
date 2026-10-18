<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-2">
      AnimatedTooltip Demo
    </h1>
    <p class="text-muted mb-6">
      UTooltip extended with motion-v spring scale + fade entrance animation.
    </p>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Basic Tooltips
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MAnimatedTooltip text="This is a tooltip">
            <UButton
              label="Hover me"
              color="primary"
            />
          </MAnimatedTooltip>
          <MAnimatedTooltip text="Another tooltip">
            <UButton
              label="And me"
              color="secondary"
            />
          </MAnimatedTooltip>
          <MAnimatedTooltip text="Info tooltip">
            <UButton
              label="Info"
              color="info"
              variant="outline"
            />
          </MAnimatedTooltip>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Positions
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MAnimatedTooltip
            text="Top tooltip"
            :content="{ side: 'top', sideOffset: 8 }"
          >
            <UButton
              label="Top"
              variant="outline"
            />
          </MAnimatedTooltip>
          <MAnimatedTooltip
            text="Bottom tooltip"
            :content="{ side: 'bottom', sideOffset: 8 }"
          >
            <UButton
              label="Bottom"
              variant="outline"
            />
          </MAnimatedTooltip>
          <MAnimatedTooltip
            text="Left tooltip"
            :content="{ side: 'left', sideOffset: 8 }"
          >
            <UButton
              label="Left"
              variant="outline"
            />
          </MAnimatedTooltip>
          <MAnimatedTooltip
            text="Right tooltip"
            :content="{ side: 'right', sideOffset: 8 }"
          >
            <UButton
              label="Right"
              variant="outline"
            />
          </MAnimatedTooltip>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            With Icons
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MAnimatedTooltip text="Home">
            <UButton
              icon="i-lucide-home"
              color="neutral"
              variant="ghost"
            />
          </MAnimatedTooltip>
          <MAnimatedTooltip text="Search">
            <UButton
              icon="i-lucide-search"
              color="neutral"
              variant="ghost"
            />
          </MAnimatedTooltip>
          <MAnimatedTooltip text="Settings">
            <UButton
              icon="i-lucide-settings"
              color="neutral"
              variant="ghost"
            />
          </MAnimatedTooltip>
          <MAnimatedTooltip text="Notifications">
            <UButton
              icon="i-lucide-bell"
              color="neutral"
              variant="ghost"
            />
          </MAnimatedTooltip>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            With Arrow
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MAnimatedTooltip
            text="Tooltip with arrow"
            :arrow="true"
          >
            <UButton
              label="With Arrow"
              variant="outline"
            />
          </MAnimatedTooltip>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            On Disabled Element
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MAnimatedTooltip text="This action is currently unavailable">
            <UButton
              label="Disabled"
              color="primary"
              disabled
            />
          </MAnimatedTooltip>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
