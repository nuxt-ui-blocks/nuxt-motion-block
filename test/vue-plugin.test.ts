import { describe, it, expect, vi } from 'vitest'
import { createApp, h, nextTick } from 'vue'

import motionBlock from '../src/vue-plugin'
import { registry } from '../src/registry.generated'
import { useMotionBlockConfig } from '../src/runtime/utils/use-motion-block-config'

// Mock motion-v so jsdom doesn't need WebGL.
vi.mock('motion-v', () => ({
  Motion: {
    name: 'Motion',
    template: '<div><slot /></div>',
  },
  AnimatePresence: {
    name: 'AnimatePresence',
    template: '<slot />',
  },
  useReducedMotion: () => true,
}))

describe('Vue plugin', () => {
  it('registers all M* components globally with the M prefix', () => {
    const app = createApp({
      render: () => h('div'),
    })
    app.use(motionBlock)
    expect(app.component('MRetroGrid')).toBeTruthy()
    expect(app.component('MTextShimmer')).toBeTruthy()
    expect(app.component('MParallaxLayers')).toBeTruthy()
    expect(app.component('MCollisionBackgroundBeams')).toBeTruthy()
    expect(app.component('M3DCard')).toBeTruthy()
  })

  it('supports a custom prefix', () => {
    const app = createApp({
      render: () => h('div'),
    })
    app.use(motionBlock, { prefix: 'Motion' })
    expect(app.component('MotionRetroGrid')).toBeTruthy()
    expect(app.component('MotionRetroGrid')).not.toBe(app.component('MRetroGrid'))
  })

  it('registry covers every M* component registered by the docs (292 entries + nested)', () => {
    expect(registry.length).toBeGreaterThanOrEqual(312)
    for (const entry of registry) {
      expect(entry.name.startsWith('M')).toBe(true)
      expect(typeof entry.component).toBe('function')
    }
  })

  it('seeds ui overrides consumed by useMotionBlockUI', async () => {
    const app = createApp({
      render: () => h('div'),
    })
    app.use(motionBlock, { ui: { textShimmer: { root: 'from-app-use' } } })
    await nextTick()
    const config = useMotionBlockConfig()
    expect(config.ui.textShimmer?.root).toBe('from-app-use')
  })
})
