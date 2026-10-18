<template>
  <div class="w-full max-w-lg rounded-2xl border border-default p-5">
    <MAiReasoning :is-streaming="streaming">
      The user asked why the audit needs a flag. Blast radius first: the audit
      walks every theme token, so a cold landing produces a long tail of visual
      diffs. Then the alternative — a flag adds one branch and one flag to read
      later, and nothing here is dangerous without review. So: flag first, remove
      it once the diffs are clean.
    </MAiReasoning>

    <div class="mt-4 flex items-center gap-3">
      <UButton
        :label="streaming ? 'Finish thinking' : 'Start thinking'"
        size="sm"
        variant="soft"
        @click="streaming = !streaming"
      />
      <span class="text-xs text-muted">
        isStreaming = {{ streaming }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const streaming = ref(true)
</script>
