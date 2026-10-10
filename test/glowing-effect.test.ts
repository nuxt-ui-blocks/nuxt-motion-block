import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import GlowingEffect from '../src/runtime/components/GlowingEffect.vue'

vi.mock('motion-v', () => ({ animate: vi.fn() }))

function gradientStyle(wrapper: ReturnType<typeof mount>): string {
  const container = wrapper
    .findAll('div')
    .find(el => (el.attributes('style') || '').includes('--gradient'))
  return container?.attributes('style') ?? ''
}

describe('GlowingEffect', () => {
  it('builds the gradient from the default colors', () => {
    const wrapper = mount(GlowingEffect)
    const style = gradientStyle(wrapper)

    expect(style).toContain('--gradient')
    expect(style).toContain('#dd7bbb')
    expect(style).toContain('#dd7bbb00')
    expect(style).toContain('repeating-conic-gradient')
  })

  it('uses the passed colors prop for the gradient', () => {
    const wrapper = mount(GlowingEffect, {
      props: { colors: ['#112233', '#445566', '#778899', '#aabbcc'] },
    })
    const style = gradientStyle(wrapper)

    expect(style).toContain('#112233')
    expect(style).toContain('#11223300')
    expect(style).toContain('#aabbcc')
    expect(style).not.toContain('#dd7bbb')
  })

  it('only appends alpha to 6-digit hex colors and passes others through', () => {
    const wrapper = mount(GlowingEffect, {
      props: { colors: ['red', 'rgb(1, 2, 3)', 'hsl(0, 0%, 0%)', 'transparent'] },
    })
    const style = gradientStyle(wrapper)

    expect(style).toContain('red')
    expect(style).toContain('rgb(1, 2, 3)')
    expect(style).not.toContain('red00')
    expect(style).not.toContain('rgb(1, 2, 3)00')
  })

  it('uses the white variant gradient regardless of colors', () => {
    const wrapper = mount(GlowingEffect, { props: { variant: 'white' } })
    const style = gradientStyle(wrapper)

    expect(style).toContain('repeating-conic-gradient')
    expect(style).not.toContain('#dd7bbb')
  })
})
