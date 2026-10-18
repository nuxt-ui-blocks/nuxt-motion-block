export interface CarouselOffsetOptions {
  index: number
  selectedIndex: number
  count: number
  loop?: boolean
}

export function carouselOffset({ index, selectedIndex, count, loop = false }: CarouselOffsetOptions): number {
  if (!count) {
    return 0
  }
  let offset = index - selectedIndex
  if (loop && count > 1) {
    const half = Math.floor(count / 2)
    offset = ((offset + half) % count + count) % count - half
  }
  return offset
}

export interface CarouselSlideTransformOptions {
  offset: number
  rotation: number
  depth: number
  scaleStep: number
  perspective: number
  inverted?: boolean
}

export interface CarouselSlideTransform {
  rotateY: number
  scale: number
  z: number
  transformPerspective: number
}

export function carouselSlideTransform({
  offset,
  rotation,
  depth,
  scaleStep,
  perspective,
  inverted = false,
}: CarouselSlideTransformOptions): CarouselSlideTransform {
  const abs = Math.min(Math.abs(offset), 3)
  return {
    rotateY: (inverted ? offset : -offset) * rotation,
    scale: Math.max(1 - abs * scaleStep, 0.4),
    z: -abs * depth,
    transformPerspective: perspective,
  }
}
