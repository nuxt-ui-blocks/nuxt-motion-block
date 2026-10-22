<template>
  <div class="w-full max-w-md space-y-3">
    <MAiBranch
      v-model="selected"
      :branches="branches"
    />
    <p class="text-xs text-muted">
      Branch <span class="font-mono">{{ branches[selected]?.id }}</span> of {{ branches.length }}
    </p>
  </div>
</template>

<script setup lang="ts">
type Branch = { id: string, userMessage: string, aiResponse: string }

/**
 * Three real answers, not three rewordings. Branch navigation is only worth a
 * UI when the alternatives differ in what they do.
 */
const branches: Branch[] = [
  {
    id: 'terse',
    userMessage: 'Delete the stale branches.',
    aiResponse: 'Done - removed 4 branches. The backup ref `archive/2026-04` holds the commits for 30 days.',
  },
  {
    id: 'careful',
    userMessage: 'Delete the stale branches.',
    aiResponse: 'I can archive them to a backup ref first, then delete. That keeps the 18 commits recoverable for 30 days without leaving the branches in the list.',
  },
  {
    id: 'explain',
    userMessage: 'Delete the stale branches.',
    aiResponse: 'Nothing on them is reachable from `main`, so deleting only removes the labels. The commits stay in the reflog until gc runs, which is why the backup ref is the part that actually matters.',
  },
]

const selected = ref(0)
</script>
