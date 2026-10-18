import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

import PriceFlow from '../src/runtime/components/PriceFlow.vue'

vi.mock('motion-v', () => {
  const AnimatePresence = defineComponent({
    name: 'AnimatePresence',
    inheritAttrs: false,
    setup: (_props, { slots }) => () => slots.default?.(),
  })
  const MotionSpan = defineComponent({
    name: 'MotionSpan',
    inheritAttrs: false,
    setup: (_props, { slots, attrs }) => () => h('span', { class: attrs.class }, slots.default?.()),
  })
  return { AnimatePresence, motion: { span: MotionSpan } }
})

describe('PriceFlow', () => {
  it('forwards native listeners to the root element', async () => {
    const onClick = vi.fn()
    const wrapper = mount(PriceFlow, {
      props: { value: 29.99 },
      attrs: { onClick },
    })

    await wrapper.trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('exposes the rounded value through aria-label', () => {
    const wrapper = mount(PriceFlow, { props: { value: 29.99, prefix: 'Total:' } })

    expect(wrapper.attributes('aria-label')).toBe('Total:$30')
  })
})
