import { describe, it, expect } from 'vitest'
import { registry } from '../src/registry.generated'

describe('registry generation', () => {
  it('covers every M* component name shown in the docs', () => {
    const names = new Set(registry.map(r => r.name))
    // Flat
    expect(names).toContain('MRetroGrid')
    expect(names).toContain('MTextShimmer')
    // Directory-as-namespace
    expect(names).toContain('MParallaxLayers')
    expect(names).toContain('MCollisionBackgroundBeams')
    expect(names).toContain('M3DCard')
    expect(names).toContain('MAiOrb')
    // Arc-unique: 312 registered SFCs
    expect(registry.length).toBe(312)
  })

  it('registers every entry with the M prefix', () => {
    for (const entry of registry) {
      expect(entry.name.startsWith('M')).toBe(true)
      expect(typeof entry.component).toBe('function')
    }
  })

  it('has no duplicate names', () => {
    const names = registry.map(r => r.name)
    expect(new Set(names).size).toBe(names.length)
  })
})
