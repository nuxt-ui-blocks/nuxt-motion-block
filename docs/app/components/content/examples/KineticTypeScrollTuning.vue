<template>
  <div class="space-y-6">
    <div class="rounded-xl border border-default p-6">
      <p class="mb-3 text-sm font-medium text-highlighted">
        Gentle
      </p>
      <MKineticTypeScroll
        :words="['Gentle', 'crest', 'values']"
        :stagger="0.2"
        :scale-range="[1, 1.08]"
        :lift-range="[0, -6]"
        :tracking-range="[0, 1]"
        :dim-range="[0.75, 1]"
        class="text-3xl font-semibold"
      />
    </div>

    <div class="rounded-xl border border-default p-6">
      <p class="mb-3 text-sm font-medium text-highlighted">
        Dramatic
      </p>
      <MKineticTypeScroll
        :words="['Dramatic', 'crest', 'values']"
        :stagger="0.08"
        :offset="['start 0.95', 'end 0.4']"
        :scale-range="[0.85, 1.3]"
        :lift-range="[0, -20]"
        :tracking-range="[-1, 4]"
        :dim-range="[0.25, 1]"
        :weight-range="[300, 900]"
        class="text-3xl font-semibold"
      />
    </div>
  </div>
</template>
