<template>
  <ComponentPlayground
    name="AiOrbFaceMouth"
    :controls="{
      mood: {
        kind: 'select',
        options: [
          { label: 'From state', value: '' },
          { label: 'Idle', value: 'idle' },
          { label: 'Happy', value: 'happy' },
          { label: 'Excited', value: 'excited' },
          { label: 'Thinking', value: 'thinking' },
          { label: 'Surprised', value: 'surprised' },
          { label: 'Sleeping', value: 'sleeping' },
          { label: 'Sad', value: 'sad' },
          { label: 'Confused', value: 'confused' },
          { label: 'Talking', value: 'talking' },
        ],
      },
      state: {
        kind: 'select',
        options: [
          { label: 'Idle', value: 'idle' },
          { label: 'Listening', value: 'listening' },
          { label: 'Thinking', value: 'thinking' },
          { label: 'Streaming', value: 'streaming' },
          { label: 'Done', value: 'done' },
          { label: 'Error', value: 'error' },
        ],
      },
    }"
    :defaults="{ mood: 'happy' }"
    :hide="['colors', 'expression']"
  />
</template>
