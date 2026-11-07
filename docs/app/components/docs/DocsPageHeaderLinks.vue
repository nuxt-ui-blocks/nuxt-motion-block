<!--
  Overrides the Docus `DocsPageHeaderLinks` layer component.
  This site is a static deploy, so the HTTP `/mcp` endpoint Docus registers
  has no handler — the upstream dropdown items ("Copy MCP Server URL" / "Add MCP
  Server" pointing at `/mcp` and `/mcp/deeplink`) were dead ends here. They are
  replaced with the stdio equivalent from content/1.getting-started/5.ai-agents.md.
  Keep in sync with that page's command (`npx nuxt-motion-block-mcp`).
-->
<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { joinURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

const route = useRoute()
const toast = useToast()
const runtimeConfig = useRuntimeConfig()
const appBaseURL = runtimeConfig.app?.baseURL || '/'
const rawPrefix = (runtimeConfig.public.agentDiscovery as { rawPrefix?: string } | undefined)?.rawPrefix || '/raw'
const stdioCommand = 'npx nuxt-motion-block-mcp'
const aiAgentsPath = '/getting-started/ai-agents'

const { copy, copied } = useClipboard()
const { t } = useDocusI18n()

const rawPath = computed(() => `${joinURL(rawPrefix, route.path)}.md`)
const markdownLink = computed(() => `${window?.location?.origin}${joinURL(appBaseURL, rawPath.value)}`)
const items = computed(() => [
  [{
    label: t('docs.copy.link'),
    icon: 'i-lucide-link',
    onSelect() {
      copy(markdownLink.value)
    },
  },
  {
    label: t('docs.copy.view'),
    icon: 'i-simple-icons:markdown',
    target: '_blank',
    to: markdownLink.value,
  },
  {
    label: t('docs.copy.gpt'),
    icon: 'i-simple-icons:openai',
    target: '_blank',
    to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`,
  },
  {
    label: t('docs.copy.claude'),
    icon: 'i-simple-icons:anthropic',
    target: '_blank',
    to: `https://claude.ai/new?q=${encodeURIComponent(`Read ${markdownLink.value} so I can ask questions about it.`)}`,
  }],
  [
    {
      label: 'Copy MCP Command',
      icon: 'i-lucide-terminal',
      onSelect() {
        copy(stdioCommand)
        toast.add({
          title: 'Copied to clipboard',
          icon: 'i-lucide-check-circle',
        })
      },
    },
    {
      label: 'Add MCP Server',
      icon: 'i-lucide-book-open',
      to: joinURL(appBaseURL, aiAgentsPath),
    },
  ],
])

async function copyPage() {
  const page = await $fetch<string>(rawPath.value)
  copy(page)
}
</script>

<template>
  <UFieldGroup size="sm">
    <UButton
      :label="t('docs.copy.page')"
      :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
      color="neutral"
      variant="soft"
      :ui="{
        leadingIcon: 'text-neutral size-3.5',
      }"
      @click="copyPage"
    />

    <UDropdownMenu
      size="sm"
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8,
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        color="neutral"
        variant="soft"
        :aria-label="t('docs.copy.more')"
        class="border-l border-muted"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
