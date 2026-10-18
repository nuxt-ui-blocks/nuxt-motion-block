import { describe, it, expect } from 'vitest'
import { carouselOffset, carouselSlideTransform } from '../src/runtime/utils/carousel'

const BASE = { rotation: 45, depth: 180, scaleStep: 0.15, perspective: 1200 }

describe('carouselOffset', () => {
  it('is zero when there are no items', () => {
    expect(carouselOffset({ index: 3, selectedIndex: 0, count: 0 })).toBe(0)
  })

  it('measures the signed distance from the selected slide', () => {
    expect(carouselOffset({ index: 2, selectedIndex: 0, count: 5 })).toBe(2)
    expect(carouselOffset({ index: 0, selectedIndex: 2, count: 5 })).toBe(-2)
  })

  it('wraps to the short way around when looping', () => {
    expect(carouselOffset({ index: 4, selectedIndex: 0, count: 5, loop: true })).toBe(-1)
    expect(carouselOffset({ index: 0, selectedIndex: 4, count: 5, loop: true })).toBe(1)
  })

  it('ignores loop when there is only one slide', () => {
    expect(carouselOffset({ index: 0, selectedIndex: 0, count: 1, loop: true })).toBe(0)
  })
})

describe('carouselSlideTransform', () => {
  it('leaves the selected slide flat and full size', () => {
    const t = carouselSlideTransform({ ...BASE, offset: 0 })
    expect(t.rotateY).toBeCloseTo(0)
    expect(t.scale).toBe(1)
    expect(t.z).toBeCloseTo(0)
    expect(t.transformPerspective).toBe(1200)
  })

  it('rotates, scales and pushes neighbours back in a normal fan', () => {
    expect(carouselSlideTransform({ ...BASE, offset: 1 })).toMatchObject({ rotateY: -45, scale: 0.85, z: -180 })
    expect(carouselSlideTransform({ ...BASE, offset: 2 })).toMatchObject({ rotateY: -90, scale: 0.7, z: -360 })
    expect(carouselSlideTransform({ ...BASE, offset: 3 })).toMatchObject({ rotateY: -135, scale: 0.55, z: -540 })
  })

  it('mirrors the fan when inverted', () => {
    expect(carouselSlideTransform({ ...BASE, offset: 1, inverted: true }).rotateY).toBe(45)
    expect(carouselSlideTransform({ ...BASE, offset: -1, inverted: true }).rotateY).toBe(-45)
    expect(carouselSlideTransform({ ...BASE, offset: 3, inverted: true }).rotateY).toBe(135)
  })

  it('keeps the selected slide flat when inverted', () => {
    expect(carouselSlideTransform({ ...BASE, offset: 0, inverted: true }).rotateY).toBe(0)
  })

  it('flattens offsets past three so distant slides stack at the back', () => {
    const far = carouselSlideTransform({ ...BASE, offset: 5 })
    expect(far.scale).toBe(0.55)
    expect(far.z).toBe(-540)
    expect(far.rotateY).toBe(-225)
  })

  it('never shrinks a slide past the 0.4 floor', () => {
    expect(carouselSlideTransform({ ...BASE, scaleStep: 0.3, offset: 3 }).scale).toBe(0.4)
  })

  it('carries the perspective through to every slide', () => {
    expect(carouselSlideTransform({ ...BASE, offset: 2 }).transformPerspective).toBe(1200)
  })
})
