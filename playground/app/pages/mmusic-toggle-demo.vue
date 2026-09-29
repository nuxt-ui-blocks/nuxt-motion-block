<template>
  <div class="space-y-12">
    <UPageHeader
      title="MusicToggle"
      description="Port of smoothui's music-toggle. A vinyl record that spins while playing, wrapped in a progress ring, a keyboard seek target and a mirrored waveform."
    />

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Uncontrolled with a progress slider
        </p>
      </template>

      <div class="flex flex-col gap-4">
        <p class="text-muted text-sm">
          The component owns its own playing state here. The range input is the
          caller's <code>progress</code>; the seek target on the ring is driven by
          the keyboard and reports through the <code>:on-seek</code> prop, which
          the slider mirrors back.
        </p>

        <MMusicToggle
          :on-playing-change="onPlayingChange"
          :on-seek="onSeek"
          :progress="progress"
          :title="'Midnight Drive'"
          artist="Nova Kinetic"
          default-playing
        />

        <div class="flex flex-wrap items-center gap-4">
          <input
            v-model.number="progress"
            class="accent-primary"
            max="1"
            min="0"
            step="0.01"
            type="range"
          >
          <code>progress = {{ progress.toFixed(2) }}</code>
        </div>

        <p class="text-muted text-xs">
          Tab to the ring, then use <code>←</code>/<code>→</code>,
          <code>Home</code> or <code>End</code>. The ring's
          <code>aria-valuenow</code> reads
          <code>{{ Math.round(progress * 100) }}%</code>.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Without <code>onSeek</code>
        </p>
      </template>

      <div class="flex flex-col gap-3">
        <p class="text-muted text-sm">
          The reference sets <code>tabindex="-1"</code> and ignores arrow keys
          when the caller passes no <code>onSeek</code>, so the ring is not a tab
          stop. Both cards below sit at that same spot in the tab order.
        </p>
        <MMusicToggle
          :progress="0.42"
          artist="No Seek Handler"
          title="Keyboard Locked"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Controlled with <code>v-model:playing</code>
        </p>
      </template>

      <div class="flex flex-col gap-4">
        <p class="text-muted text-sm">
          Passing <code>playing</code> switches the component into controlled
          mode: its own toggle stops mutating internal state and the parent owns
          it. The button still reports the next value through
          <code>@update:playing</code> and the <code>:on-playing-change</code> prop.
        </p>

        <MMusicToggle
          v-model:playing="controlledPlaying"
          :progress="0.68"
          :size="128"
          cover="https://i.pravatar.cc/300?u=a042581f4e29026704d"
          title="Sonder"
          artist="Hollow Coast"
        />

        <UButton
          size="sm"
          variant="soft"
          @click="controlledPlaying = !controlledPlaying"
        >
          Parent: {{ controlledPlaying ? 'pause' : 'play' }}
        </UButton>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Cover, gradient fallback and size
        </p>
      </template>

      <div class="flex flex-col gap-3">
        <p class="text-muted text-sm">
          A <code>cover</code> fills the disc; without one it falls back to the
          brand gradient from the reference. The wrapper is square, so the record
          and its ring scale with <code>size</code>.
        </p>
        <div class="flex flex-wrap items-start gap-10">
          <MMusicToggle
            id="music-toggle-attrs-probe"
            data-attrs-probe="passed-through"
            :progress="0.15"
            :size="64"
            artist="Gradient"
            title="size: 64"
          />
          <MMusicToggle
            :progress="0.5"
            cover="https://i.pravatar.cc/300?u=a04258a2462d826712d"
            title="With cover art"
            artist="default size"
          />
          <MMusicToggle
            :progress="1"
            :size="144"
            artist="Large"
            title="size: 144"
          />
        </div>
        <p class="text-muted text-xs">
          The first one is also the <code>$attrs</code> probe: it carries an
          <code>id</code> and a <code>data-attrs-probe</code> attribute that the
          component does not declare, and both land on its root element. Query it
          with <code>document.getElementById('music-toggle-attrs-probe')</code>.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Owning an <code>&lt;audio&gt;</code> element
        </p>
      </template>

      <div class="flex flex-col gap-3">
        <p class="text-muted text-sm">
          Passing <code>src</code> makes the component own the media element:
          a change to <code>playing</code> calls <code>audio.play()</code> or
          <code>audio.pause()</code>, exactly as the reference's effect does. The
          source below is a 0.1s silent WAV data uri so the state is observable
          without shipping a media file. Nothing plays on mount — the reference
          skips its effect's first run, which the non-immediate watcher here
          reproduces.
        </p>

        <MMusicToggle
          data-demo-audio-probe=""
          :src="SILENT_WAV"
          :progress="audioProgress"
          title="Owned audio element"
          artist="0.1s silent wav"
        />

        <p
          ref="audioReadout"
          data-demo-audio
          class="font-mono text-xs text-muted"
        >
          polling…
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          <code>:on-playing-change</code> emissions
        </p>
      </template>

      <p class="mb-3 text-muted text-sm">
        Unlike the figma comment, this component only reports a change when the
        state actually flips — there is no mount-time emission.
      </p>
      <div
        data-demo-log
        class="max-h-40 min-h-10 overflow-y-auto rounded-lg bg-elevated p-3 font-mono text-xs"
      >
        <p
          v-if="log.length === 0"
          class="text-muted"
        >
          no emissions yet
        </p>
        <p
          v-for="entry in log"
          :key="entry.id"
          class="text-muted"
        >
          #{{ entry.id }} → <code>{{ entry.value }}</code>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

// 0.1s of 8-bit mono silence at 8kHz, inlined so the demo needs no media file.
const SILENT_WAV = 'data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA=='

const progress = ref(0.35)
const controlledPlaying = ref(true)
const audioProgress = ref(0.25)
const log = ref<{ id: number, value: boolean }[]>([])

const audioReadout = ref<HTMLElement>()

// Polled straight into the DOM node so the live `<audio>` state is visible on the
// page without re-rendering it. The `data-demo-audio-probe` attribute reaches the
// component's root through `$attrs`, which is also the fallthrough proof.
if (import.meta.client) {
  const timer = setInterval(() => {
    const readout = audioReadout.value
    if (!readout) {
      return
    }

    const audio = readout.ownerDocument
      .querySelector<HTMLAudioElement>('[data-demo-audio-probe] audio')

    readout.textContent = audio
      ? `audio.paused = ${audio.paused} · audio.currentTime = ${audio.currentTime.toFixed(2)}s · src is a data uri = ${audio.src.startsWith('data:audio/wav')}`
      : 'no <audio> element rendered'
  }, 120)

  onBeforeUnmount(() => clearInterval(timer))
}

let nextId = 0

function onSeek(value: number) {
  progress.value = value
}

function onPlayingChange(value: boolean) {
  nextId += 1
  log.value = [{ id: nextId, value }, ...log.value]
}
</script>
