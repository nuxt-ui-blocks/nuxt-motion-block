import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useMotionBlockUI } from '../src/runtime/composables/useMotionBlockUI'
import { codeBlock, dynamicIsland } from '../src/runtime/theme'
import { appConfig } from './stubs/imports'

function withSetup<T>(composable: () => T): { result: T, unmount: () => void } {
  let result!: T
  const wrapper = mount(defineComponent({
    setup() {
      result = composable()
      return () => h('div')
    },
  }))
  return { result, unmount: () => wrapper.unmount() }
}

describe('useMotionBlockUI', () => {
  beforeEach(() => {
    appConfig.value = { ui: {} }
  })

  it('returns the raw props when no app.config entry exists', () => {
    const { result, unmount } = withSetup(() => useMotionBlockUI({
      name: 'dynamicIsland',
      props: { class: 'my-class', ui: { root: 'custom-root' } } as any,
      theme: dynamicIsland,
    }))

    expect(result.props.class).toBe('my-class')
    expect(result.props.ui).toEqual({ root: 'custom-root' })
    unmount()
  })

  it('resolves theme slots and merges the passed class', () => {
    const { result, unmount } = withSetup(() => useMotionBlockUI({
      name: 'dynamicIsland',
      props: {} as any,
      theme: dynamicIsland,
    }))

    const root = result.ui.value.root({ class: 'x' })
    expect(root).toContain('h-[200px]')
    expect(root).toContain('x')
    unmount()
  })

  it('applies tv variants', () => {
    const { result, unmount } = withSetup(() => useMotionBlockUI({
      name: 'codeBlock',
      props: {} as any,
      theme: codeBlock,
    }))

    const line = result.ui.value.diffLine({ kind: 'added', class: 'y' })
    expect(line).toContain('flex gap-3 px-3')
    expect(line).toContain('bg-[oklch(72%_0.17_150_/_0.12)]')
    expect(line).toContain('y')
    unmount()
  })

  it('extends the theme with app.config.ui overrides', () => {
    appConfig.value = { ui: { dynamicIsland: { slots: { root: 'bg-red-500' } } } }
    const { result, unmount } = withSetup(() => useMotionBlockUI({
      name: 'dynamicIsland',
      props: {} as any,
      theme: dynamicIsland,
    }))

    const root = result.ui.value.root({ class: 'x' })
    expect(root).toContain('bg-red-500')
    expect(root).toContain('h-[200px]')
    unmount()
  })
})
