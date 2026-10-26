<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'

export interface Stargazer {
  /** Avatar image URL. */
  avatar_url: string
  /** Public profile URL. */
  html_url: string
  /** GitHub username. */
  login: string
}

export interface GitHubStarsAnimationProps {
  /** Custom endpoint that returns `{ stars, stargazers }`. */
  apiEndpoint?: string
  /** Extra classes for each avatar link. */
  avatarClassName?: string
  /** Extra classes for the root. */
  class?: string
  /** Extra classes for the star count. */
  countClassName?: string
  /** Maximum number of avatars to show. */
  maxAvatars?: number
  /** Repository owner used when no data is provided. */
  owner?: string
  /** Repository name used when no data is provided. */
  repo?: string
  /** Hide the avatar stack and show only the count. */
  showAvatars?: boolean
  /** Star count. When provided with `stargazers`, no request is made. */
  starCount?: number
  /** Stargazers. When provided with `starCount`, no request is made. */
  stargazers?: Stargazer[]
}

const props = withDefaults(defineProps<GitHubStarsAnimationProps>(), {
  apiEndpoint: undefined,
  avatarClassName: undefined,
  class: undefined,
  countClassName: undefined,
  maxAvatars: 5,
  owner: 'vuejs',
  repo: 'core',
  showAvatars: true,
  starCount: undefined,
  stargazers: undefined,
})

/** How long the counter takes to reach the final value. */
const COUNTDOWN_DURATION = 2000

const shouldReduceMotion = useReducedMotion()
const stargazers = ref<Stargazer[]>(props.stargazers ?? [])
const starCount = ref(props.starCount ?? 0)
const displayCount = ref(0)
const isLoading = ref(props.starCount === undefined)
const error = ref(false)
const isMounted = ref(false)

let frame = 0
let controller: AbortController | undefined

const visibleAvatars = computed(() => stargazers.value.slice(0, props.maxAvatars))
/** A supplied count is authoritative, so no request is needed for it. */
const hasProvidedCount = computed(() => props.starCount !== undefined)

function stopCountdown() {
  if (frame) {
    cancelAnimationFrame(frame)
    frame = 0
  }
}

function startCountdown() {
  stopCountdown()

  if (shouldReduceMotion.value) {
    displayCount.value = starCount.value
    return
  }

  if (starCount.value <= 0) {
    displayCount.value = 0
    return
  }

  const from = displayCount.value
  const to = starCount.value
  const start = performance.now()

  const tick = (now: number) => {
    const progress = Math.min((now - start) / COUNTDOWN_DURATION, 1)
    const eased = 1 - (1 - progress) ** 3
    displayCount.value = Math.floor(from + (to - from) * eased)

    if (progress < 1) {
      frame = requestAnimationFrame(tick)
    }
    else {
      displayCount.value = to
      frame = 0
    }
  }

  frame = requestAnimationFrame(tick)
}

async function load() {
  if (hasProvidedCount.value) {
    stargazers.value = props.stargazers ?? []
    starCount.value = props.starCount ?? 0
    isLoading.value = false
    return
  }

  controller?.abort()
  const current = new AbortController()
  controller = current
  isLoading.value = true
  error.value = false

  try {
    if (props.apiEndpoint) {
      const query = new URLSearchParams({ owner: props.owner, repo: props.repo })
      const response = await fetch(`${props.apiEndpoint}?${query}`, {
        signal: current.signal,
      })

      if (response.ok) {
        const data = await response.json()
        stargazers.value = (data.stargazers ?? []).slice(0, props.maxAvatars)
        starCount.value = data.stars ?? 0
        return
      }
    }

    const headers = { Accept: 'application/vnd.github.v3+json' }
    const [repoResponse, stargazersResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${props.owner}/${props.repo}`, { headers, signal: current.signal }),
      fetch(`https://api.github.com/repos/${props.owner}/${props.repo}/stargazers?per_page=${props.maxAvatars}`, {
        headers,
        signal: current.signal,
      }),
    ])

    if (repoResponse.ok) {
      const data = await repoResponse.json()
      starCount.value = data.stargazers_count ?? 0
    }

    if (stargazersResponse.ok) {
      const data = (await stargazersResponse.json()) as Stargazer[]
      stargazers.value = data.slice(0, props.maxAvatars)
    }
  }
  catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      return
    }

    error.value = true
  }
  finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  isMounted.value = true

  if (!hasProvidedCount.value) {
    await load()
  }

  startCountdown()
})

watch([starCount, shouldReduceMotion], () => {
  if (isMounted.value) {
    startCountdown()
  }
})

onBeforeUnmount(() => {
  stopCountdown()
  controller?.abort()
})
</script>

<template>
  <div
    v-if="isLoading"
    :class="['flex items-center gap-3 text-muted', props.class]"
  >
    <div class="size-10 animate-pulse rounded-full bg-elevated motion-reduce:animate-none" />
    <div class="h-6 w-20 animate-pulse rounded bg-elevated motion-reduce:animate-none" />
  </div>

  <div
    v-else-if="!(error && starCount === 0)"
    :class="['flex items-center gap-3', props.class]"
  >
    <div
      v-if="props.showAvatars && visibleAvatars.length > 0"
      class="relative flex items-center"
    >
      <a
        v-for="(stargazer, index) in visibleAvatars"
        :key="stargazer.login"
        :aria-label="`${stargazer.login}'s GitHub profile`"
        :class="[
          'star-avatar relative z-10 size-10 overflow-hidden rounded-full border-2 border-default bg-default transition-transform hover:z-20 hover:scale-110 motion-reduce:hover:scale-100',
          props.avatarClassName,
        ]"
        :href="stargazer.html_url"
        :style="{ '--index': index, 'marginLeft': index > 0 ? '-8px' : '0' }"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          :alt="`${stargazer.login}'s avatar`"
          class="size-full object-cover"
          draggable="false"
          :src="stargazer.avatar_url"
        >
      </a>
    </div>

    <div :class="['star-count flex items-center gap-1.5 font-medium text-highlighted', props.countClassName]">
      <UIcon
        class="size-4 shrink-0 fill-current"
        name="i-lucide-star"
      />
      <span class="tabular-nums">{{ displayCount.toLocaleString() }}</span>
      <span class="text-sm text-muted">{{ displayCount === 1 ? 'star' : 'stars' }}</span>
    </div>
  </div>
</template>

<style scoped>
.star-avatar {
  animation: star-avatar-in 300ms cubic-bezier(0.215, 0.61, 0.355, 1) both;
  animation-delay: calc(var(--index) * 50ms);
}

@keyframes star-avatar-in {
  from {
    opacity: 0;
    translate: -20px 0;
    scale: 0.8;
  }

  to {
    opacity: 1;
    translate: 0 0;
    scale: 1;
  }
}

.star-count {
  animation: star-count-in 300ms cubic-bezier(0.215, 0.61, 0.355, 1) both;
}

@keyframes star-count-in {
  from {
    opacity: 0;
    scale: 0.9;
  }

  to {
    opacity: 1;
    scale: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .star-avatar,
  .star-count {
    animation: none;
  }
}
</style>
