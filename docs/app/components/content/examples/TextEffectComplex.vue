<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <div class="rounded-2xl border border-default bg-default p-6">
      <p class="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
        {{ per }} · {{ preset }}
      </p>
      <MTextEffect
        :key="run"
        :children="copy"
        :per="per"
        :preset="preset"
        as="span"
        class="text-xl font-semibold text-default"
        :speed-reveal="1.4"
      />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="per"
        :items="perOptions"
      />
      <USelect
        v-model="preset"
        :items="presetOptions"
      />
    </div>

    <UButton
      label="Replay"
      icon="i-lucide-rotate-ccw"
      variant="outline"
      class="justify-center"
      @click="run++"
    />
  </div>
</template>

<script setup lang="ts">
const copy = 'Split the string, then stagger the reveal.'
const run = ref(0)
const per = ref<'word' | 'char' | 'line'>('char')
const preset = ref<'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'>('blur')

const perOptions = ['char', 'word', 'line']
const presetOptions = ['blur', 'fade-in-blur', 'scale', 'fade', 'slide']
</script>
