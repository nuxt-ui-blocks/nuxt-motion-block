<template>
  <svg
    aria-hidden="true"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ color }"
  >
    <defs>
      <pattern
        :id="patternId"
        :width="tileW"
        :height="tileH"
        patternUnits="userSpaceOnUse"
        :x="x"
        :y="y"
      >
        <template v-if="solidStroke">
          <polygon
            v-for="center in centers"
            :key="`${center[0]}-${center[1]}`"
            class="fill-none"
            :points="hexPoints(center[0], center[1], radius, direction)"
            :stroke-dasharray="strokeDasharray"
          />
        </template>
        <template v-else>
          <line
            v-for="edge in dashedEdges"
            :key="edge.key"
            class="fill-none"
            :x1="edge.a[0]"
            :y1="edge.a[1]"
            :x2="edge.b[0]"
            :y2="edge.b[1]"
            :stroke-dasharray="strokeDasharray"
          />
        </template>
      </pattern>
    </defs>

    <rect
      width="100%"
      height="100%"
      :fill="`url(#${patternId})`"
      stroke="none"
    />

    <svg
      v-if="highlights.length"
      aria-hidden="true"
      :x="x"
      :y="y"
      :class="ui.highlight({ class: uiProps.ui?.highlight })"
    >
      <polygon
        v-for="highlight in highlights"
        :key="highlight.key"
        :points="highlight.points"
        stroke-width="0"
      />
    </svg>
  </svg>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import hexagonPattern from '../theme/hexagon-pattern'

export interface HexagonPatternProps {
  /** Extra classes for the `<svg>`. */
  class?: string
  /** Colour of the outlines and the highlighted hexagons. */
  color?: string
  /** `horizontal` draws flat-top hexagons, `vertical` draws pointy-top ones. */
  direction?: 'horizontal' | 'vertical'
  /** Visible spacing between neighbouring hexagons, in pixels. */
  gap?: number
  /** `[col, row]` cells to fill on top of the repeating pattern. */
  hexagons?: Array<[number, number]>
  /** Radius of one hexagon, centre to vertex, in pixels. */
  radius?: number
  /** Dash pattern applied to the hexagon outlines. */
  strokeDasharray?: string
  ui?: Record<string, any>
  /** Horizontal offset of the pattern origin. */
  x?: number
  /** Vertical offset of the pattern origin. */
  y?: number
}

const props = withDefaults(defineProps<HexagonPatternProps>(), {
  class: undefined,
  color: 'var(--ui-border)',
  direction: 'horizontal',
  gap: 0,
  hexagons: () => [],
  radius: 40,
  strokeDasharray: '0',
  ui: undefined,
  x: -1,
  y: -1,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'hexagonPattern', props, theme: hexagonPattern })

/** `useId` keeps the pattern id stable between the server render and hydration. */
const patternId = `hex-${useId().replace(/[^\w-]/g, '')}`

type HexPoint = readonly [number, number]

/** The six corners of a hexagon, walking clockwise from `startAngle`. */
function hexVertexList(
  cx: number,
  cy: number,
  r: number,
  direction: 'horizontal' | 'vertical',
): HexPoint[] {
  const startAngle = direction === 'horizontal' ? 0 : 30
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((startAngle + i * 60) * Math.PI) / 180
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const
  })
}

function hexPoints(
  cx: number,
  cy: number,
  r: number,
  direction: 'horizontal' | 'vertical',
): string {
  return hexVertexList(cx, cy, r, direction)
    .map(([px, py]) => `${px},${py}`)
    .join(' ')
}

/**
 * Identifies an edge regardless of which hexagon reported it, so the two
 * hexagons sharing an edge only draw it once.
 */
function edgeLexKey(a: HexPoint, b: HexPoint): string {
  const [p, q] = a[0] < b[0] || (a[0] === b[0] && a[1] <= b[1]) ? [a, b] : [b, a]
  return `${p[0].toFixed(6)},${p[1].toFixed(6)}|${q[0].toFixed(6)},${q[1].toFixed(6)}`
}

function collectUniqueHexEdges(
  centers: [number, number][],
  r: number,
  direction: 'horizontal' | 'vertical',
): { a: HexPoint, b: HexPoint, key: string }[] {
  const seen = new Set<string>()
  const edges: { a: HexPoint, b: HexPoint, key: string }[] = []
  for (const [cx, cy] of centers) {
    const verts = hexVertexList(cx, cy, r, direction)
    for (let i = 0; i < 6; i++) {
      const a = verts[i]
      const b = verts[(i + 1) % 6]
      const key = edgeLexKey(a, b)
      if (!seen.has(key)) {
        seen.add(key)
        edges.push({ a, b, key })
      }
    }
  }
  return edges
}

function isSolidStrokeDasharray(strokeDasharray: string): boolean {
  const t = strokeDasharray.trim()
  return t === '' || t === 'none' || t === '0'
}

function getHexSpacing(
  r: number,
  direction: 'horizontal' | 'vertical',
  gap: number,
): { colStep: number, rowStep: number, tileW: number, tileH: number } {
  const sqrt3 = Math.sqrt(3)

  // `gap` should match the visible edge-to-edge spacing, so it is added along
  // the shared-edge normal rather than directly on the raw x/y axes.
  if (direction === 'horizontal') {
    const colStep = (3 * r) / 2 + (sqrt3 * gap) / 2
    const rowStep = sqrt3 * r + gap

    return { colStep, rowStep, tileW: colStep * 2, tileH: rowStep }
  }

  const colStep = sqrt3 * r + gap
  const rowStep = (3 * r) / 2 + (sqrt3 * gap) / 2

  return { colStep, rowStep, tileW: colStep, tileH: rowStep * 2 }
}

/**
 * Builds one repeatable tile and copies any hexagon that straddles an edge so
 * the seams stay continuous when the pattern repeats.
 */
function getTileGeometry(
  r: number,
  direction: 'horizontal' | 'vertical',
  gap: number,
): { tileW: number, tileH: number, centers: [number, number][] } {
  const { colStep, rowStep, tileW, tileH } = getHexSpacing(r, direction, gap)

  const canonical: [number, number][] = direction === 'horizontal'
    ? [[colStep / 2, rowStep / 2], [(colStep * 3) / 2, rowStep]]
    : [[colStep / 2, rowStep / 2], [colStep, (rowStep * 3) / 2]]

  const centers: [number, number][] = []
  for (const [cx, cy] of canonical) {
    centers.push([cx, cy])
    if (cy - r < 0) centers.push([cx, cy + tileH])
    if (cy + r > tileH) centers.push([cx, cy - tileH])
    if (cx - r < 0) centers.push([cx + tileW, cy])
    if (cx + r > tileW) centers.push([cx - tileW, cy])
    if (cy - r < 0 && cx - r < 0) centers.push([cx + tileW, cy + tileH])
    if (cy - r < 0 && cx + r > tileW) centers.push([cx - tileW, cy + tileH])
    if (cy + r > tileH && cx - r < 0) centers.push([cx + tileW, cy - tileH])
    if (cy + r > tileH && cx + r > tileW) centers.push([cx - tileW, cy - tileH])
  }

  return { tileW, tileH, centers }
}

/** Centre of the hexagon at `[col, row]` in the pattern's own grid. */
function hexCenter(
  col: number,
  row: number,
  r: number,
  direction: 'horizontal' | 'vertical',
  gap: number,
): [number, number] {
  const { colStep, rowStep } = getHexSpacing(r, direction, gap)

  if (direction === 'horizontal') {
    const x = col * colStep + colStep / 2
    const y = row * rowStep + rowStep / 2 + (col % 2 !== 0 ? rowStep / 2 : 0)
    return [x, y]
  }

  const x = col * colStep + colStep / 2 + (row % 2 !== 0 ? colStep / 2 : 0)
  const y = row * rowStep + rowStep / 2
  return [x, y]
}

const geometry = computed(() => getTileGeometry(props.radius, props.direction, props.gap))

const tileW = computed(() => geometry.value.tileW)
const tileH = computed(() => geometry.value.tileH)
const centers = computed(() => geometry.value.centers)

const solidStroke = computed(() => isSolidStrokeDasharray(props.strokeDasharray))

/**
 * Dashed outlines cannot be drawn per hexagon: overlapping dashes would restart
 * at every shared edge. Drawing the deduplicated edges instead keeps the dash
 * rhythm continuous across the whole surface.
 */
const dashedEdges = computed(() => solidStroke.value
  ? []
  : collectUniqueHexEdges(centers.value, props.radius, props.direction))

const highlights = computed(() => props.hexagons.map(([col, row]) => {
  const [cx, cy] = hexCenter(col, row, props.radius, props.direction, props.gap)
  return {
    key: `${col}-${row}`,
    points: hexPoints(cx, cy, props.radius - 1, props.direction),
  }
}))
</script>
