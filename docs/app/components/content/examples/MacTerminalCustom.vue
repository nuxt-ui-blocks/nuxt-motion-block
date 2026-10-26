<template>
  <ComponentPlayground
    name="MacTerminal"
    :defaults="{
      title: '~/projects/terminal',
      theme: 'dark',
      prompt: '➜ ~',
      typingSpeed: 24,
      maxHeight: 240,
      showTrafficLights: true,
      autoPlay: true,
      loop: true,
      lines: [
        { id: 'one', type: 'command', text: 'pnpm test' },
        { id: 'two', type: 'success', text: '✓ 42 tests passed' },
        { id: 'three', type: 'command', text: 'pnpm build' },
        { id: 'four', type: 'output', text: 'Building client and server bundles…' },
        { id: 'five', type: 'comment', text: 'Ready in 2.4s' },
      ],
      class: 'w-full max-w-xl',
    }"
    :controls="{
      lines: { label: 'Session (JSON)', kind: 'json' },
      title: { label: 'Title', kind: 'string' },
      theme: {
        label: 'Theme',
        kind: 'select',
        options: [
          { label: 'Dark', value: 'dark' },
          { label: 'Light', value: 'light' },
          { label: 'Auto', value: 'auto' },
        ],
      },
      prompt: { label: 'Prompt', kind: 'string' },
      typingSpeed: { label: 'Typing speed (cps)', kind: 'number', min: 4, max: 80, step: 1 },
      maxHeight: { label: 'Max height (px)', kind: 'number', min: 160, max: 480, step: 20 },
      showTrafficLights: { label: 'Traffic lights', kind: 'boolean' },
      autoPlay: { label: 'Autoplay', kind: 'boolean' },
      loop: { label: 'Loop', kind: 'boolean' },
    }"
  />
</template>
