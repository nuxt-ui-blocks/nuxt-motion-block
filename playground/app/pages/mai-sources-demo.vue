<script setup lang="ts">
const sources = [
  { id: 'a', title: 'The paper this answer is based on', url: 'https://arxiv.org/abs/1706.03762' },
  { id: 'b', title: 'A blog post that gets the conclusion right and the reasoning wrong', url: 'https://www.example.com/blog/attention' },
  { id: 'c', title: 'The original 2014 paper', url: 'https://arxiv.org/abs/1409.0473' },
  { id: 'd', title: 'A replication with a larger batch', url: 'https://openreview.net/forum?id=xyz123' },
]

const withSnippets = [
  {
    id: 's1',
    title: 'Schrodinger, "Does the Wave-Mechanics Probability Distribution Represent Reality?"',
    url: 'https://example.com/schrodinger',
    snippet: 'Argues the configuration is real and the wave function is a statistical projection.',
  },
  {
    id: 's2',
    title: 'The 2015 commentary that popularised the reading',
    url: 'https://example.com/commentary',
    snippet: 'Where most summaries of the paper actually come from.',
  },
  {
    id: 's3',
    title: 'A rebuttal, mostly about notation',
    url: 'https://example.edu/rebuttal',
  },
]

const tooMany = [
  { id: 'm1', title: 'One', url: 'https://example.com/1' },
  { id: 'm2', title: 'Two', url: 'https://example.com/2' },
  { id: 'm3', title: 'Three', url: 'https://example.com/3' },
  { id: 'm4', title: 'Four', url: 'https://example.com/4' },
  { id: 'm5', title: 'Five', url: 'https://example.com/5' },
  { id: 'm6', title: 'Six', url: 'https://example.com/6' },
  { id: 'm7', title: 'Seven', url: 'https://example.com/7' },
]

const startOpen = ref(false)
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiSources"
      description="Provenance collapsed to a stack of overlapping favicons. Hovering fans the stack apart; opening moves each mark into its own row."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Hover to fan, click to open
        </p>
        <p class="text-muted">
          Four sources, so the stack shows three and counts the rest. Tab to it
          if you would rather not use a pointer.
        </p>
      </template>

      <div class="space-y-4">
        <MAiSources
          :sources="sources"
        />

        <div class="border-t border-border pt-4 text-sm text-muted-foreground">
          Default open on mount
          <MAiSources
            :default-open="true"
            :sources="sources"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Seven sources
        </p>
        <p class="text-muted">
          The stack caps at three; the rest are counted rather than drawn.
        </p>
      </template>

      <MAiSources :sources="tooMany" />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Snippets and custom labels
        </p>
        <p class="text-muted">
          A source with a snippet shows the snippet instead of the bare host,
          and the header label is a prop.
        </p>
      </template>

      <div class="space-y-4">
        <MAiSources
          label="Cited"
          :sources="withSnippets"
        />

        <MAiSources
          label="Read more"
          :sources="sources"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Supplied marks
        </p>
        <p class="text-muted">
          The mark is a slot, so a brand's own SVG can go straight in. Omitting
          it draws a neutral globe — an honest "unknown host" beats a
          fabricated one-letter badge.
        </p>
      </template>

      <div class="space-y-4">
        <MAiSources :sources="sources">
          <template #favicon="{ source }">
            <UIcon
              :name="source.id === 'a' ? 'i-lucide-file-text' : 'i-lucide-globe'"
              class="text-primary"
            />
          </template>
        </MAiSources>

        <MAiSources
          :default-open="startOpen"
          :sources="withSnippets"
        >
          <template #favicon>
            <span class="flex size-full items-center justify-center bg-primary text-[9px] font-bold text-primary-foreground">
              X
            </span>
          </template>
        </MAiSources>
      </div>
    </UCard>
  </div>
</template>
