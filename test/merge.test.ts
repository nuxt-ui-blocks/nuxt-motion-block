import { describe, it, expect } from 'vitest'

import { cn } from '../src/runtime/utils/merge'

describe('cn', () => {
  it('resolves conflicting default Tailwind classes, later wins', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('px-4', 'px-2')).toBe('px-2')
    expect(cn('font-medium', 'font-bold')).toBe('font-bold')
    expect(cn('w-10', 'w-full')).toBe('w-full')
  })

  it('resolves Nuxt UI semantic color tokens', () => {
    expect(cn('bg-muted', 'bg-default')).toBe('bg-default')
    expect(cn('text-highlighted', 'text-muted')).toBe('text-muted')
  })

  it('filters falsy, boolean-guarded and conditionally-present values', () => {
    const show = false
    expect(cn('px-2', undefined, null, false, '', 'py-2')).toBe('px-2 py-2')
    expect(cn(show && 'hidden', 'block')).toBe('block')
  })

  it('accepts nested arrays and object maps', () => {
    const condensed = true
    expect(cn(['px-2', condensed && 'py-2'], { 'bg-red-500': true, 'bg-blue-500': false })).toBe('px-2 py-2 bg-red-500')
  })

  it('passes through unknown/semantic marker classes untouched', () => {
    expect(cn('m-accordion', 'px-2')).toBe('m-accordion px-2')
  })
})
