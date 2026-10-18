import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useThemeColor } from '../src/runtime/composables/useThemeColor'
import { colorMode } from './stubs/imports'

const mocks = vi.hoisted(() => ({
  resolveThemeColor: vi.fn(),
}))

vi.mock('../src/runtime/utils/theme-color', () => ({
  resolveThemeColor: mocks.resolveThemeColor,
}))

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

describe('useThemeColor', () => {
  beforeEach(() => {
    colorMode.value = 'light'
    mocks.resolveThemeColor.mockReset()
    mocks.resolveThemeColor.mockReturnValue('#00dc82')
  })

  it('resolves the token on mount', () => {
    const { result, unmount } = withSetup(() => useThemeColor('primary', { fallback: '#000' }))

    expect(mocks.resolveThemeColor).toHaveBeenCalledWith('primary', { fallback: '#000' })
    expect(result.value).toBe('#00dc82')
    unmount()
  })

  it('re-resolves when the colour mode changes', async () => {
    const { result, unmount } = withSetup(() => useThemeColor('primary'))

    expect(result.value).toBe('#00dc82')

    mocks.resolveThemeColor.mockReturnValue('#ffffff')
    colorMode.value = 'dark'
    await nextTick()

    expect(result.value).toBe('#ffffff')
    expect(mocks.resolveThemeColor).toHaveBeenCalledTimes(3)
    unmount()
  })

  it('stops resolving after unmount', async () => {
    const { result, unmount } = withSetup(() => useThemeColor('primary'))
    unmount()

    mocks.resolveThemeColor.mockReturnValue('#ffffff')
    colorMode.value = 'dark'
    await nextTick()

    expect(result.value).toBe('#00dc82')
  })
})
