<template>
  <div class="min-h-screen bg-default p-8">
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          MTextEffect Demo
        </h1>
      </template>

      <div class="space-y-12">
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Blur Preset
          </h2>
          <MTextEffect
            children="Hello World"
            per="word"
            preset="blur"
          />
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Fade-in-Blur Preset
          </h2>
          <MTextEffect
            children="Animated Text motion"
            per="word"
            preset="fade-in-blur"
            :delay="0.3"
          />
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Scale Preset
          </h2>
          <MTextEffect
            children="Scale Up Animation"
            per="word"
            preset="scale"
          />
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Fade Preset
          </h2>
          <MTextEffect
            children="Simple Fade In"
            per="word"
            preset="fade"
          />
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Slide Preset
          </h2>
          <MTextEffect
            children="Rise in Effect"
            per="word"
            preset="slide"
          />
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Character-by-Character
          </h2>
          <MTextEffect
            children="Char by char"
            per="char"
            preset="fade-in-blur"
            :speed-reveal="2"
          />
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Line-by-Line
          </h2>
          <MTextEffect
            children="Line one&#10;Line two&#10;Line three"
            per="line"
            preset="slide"
          />
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MTextEffect
        </p>
      </template>
    </UCard>
  </div>
</template>
