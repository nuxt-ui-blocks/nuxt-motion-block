<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { cn } from '../utils/merge'
import { colorToRgb, resolveColor } from '../utils/theme-color'

export type PixelBrushCanvasBrush = 'pencil' | 'eraser' | 'fill' | 'line' | 'rect'

export interface PixelBrushCanvasProps {
  /** Active brush tool. Uncontrolled when omitted. */
  brush?: PixelBrushCanvasBrush
  /** Extra classes for the root wrapper. */
  class?: string
  /** Index into `palette` for the active paint colour. Uncontrolled when omitted. */
  color?: number
  /** Draw gridlines between pixel cells. */
  grid?: boolean
  /** Height of the art grid, in pixel cells rather than CSS pixels. */
  height?: number
  /** Initial artwork as rows of palette indices. Negative values mean empty. */
  initial?: number[][]
  /** Available paint colours, as any CSS colour string. */
  palette?: string[]
  /** Size of a single pixel cell, in CSS pixels. */
  pixelSize?: number
  /** Render the built-in colour and brush palette below the canvas. */
  showTools?: boolean
  /** Width of the art grid, in pixel cells rather than CSS pixels. */
  width?: number
}

interface Cell {
  x: number
  y: number
}

interface BoundingBox {
  maxX: number
  maxY: number
  minX: number
  minY: number
}

interface BrushOption {
  label: string
  shortcut?: string
  value: PixelBrushCanvasBrush
}

const MAX_DEVICE_PIXEL_RATIO = 2
const MAX_UNDO_STEPS = 50
const GRID_LINE_WIDTH = 1
/** The 1px border plus 8px padding on each side of the canvas frame. */
const FRAME_CHROME = 2 + 8 * 2
const EMPTY_CELL_VALUE = 0
const GRID_LINE_COLOR = 'rgba(120, 120, 120, 0.35)'
/** Separator for the palette key: a unit separator survives colours with spaces. */
const PALETTE_SEPARATOR = '\u001F'

const BRUSH_OPTIONS: BrushOption[] = [
  { label: 'Pencil', shortcut: 'B', value: 'pencil' },
  { label: 'Eraser', shortcut: 'E', value: 'eraser' },
  { label: 'Fill', shortcut: 'G', value: 'fill' },
  { label: 'Line', value: 'line' },
  { label: 'Rectangle', value: 'rect' },
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

/**
 * Theme tokens make poor spoken labels, so `var(--ui-primary)` is announced as
 * "primary". Any other CSS colour is read as written.
 */
const colourLabel = (color: string): string =>
  color.match(/^var\(--ui-([a-z-]+)\)$/)?.[1] ?? color

const createInitialPixels = (
  gridWidth: number,
  gridHeight: number,
  initial?: number[][],
): Uint8Array => {
  const pixels = new Uint8Array(gridWidth * gridHeight)
  if (!initial) return pixels
  for (let y = 0; y < gridHeight; y++) {
    const row = initial[y]
    if (!row) continue
    for (let x = 0; x < gridWidth; x++) {
      const value = row[x]
      if (value === undefined || value < 0) continue
      pixels[y * gridWidth + x] = value + 1
    }
  }
  return pixels
}

const drawCell = (
  ctx: CanvasRenderingContext2D,
  pixels: Uint8Array,
  gridWidth: number,
  x: number,
  y: number,
  cellSize: number,
  palette: string[],
  showGrid: boolean,
) => {
  const value = pixels[y * gridWidth + x]
  const left = x * cellSize
  const top = y * cellSize
  ctx.clearRect(left, top, cellSize, cellSize)
  if (value !== EMPTY_CELL_VALUE) {
    ctx.fillStyle = palette[value - 1] ?? palette[0] ?? '#000000'
    ctx.fillRect(left, top, cellSize, cellSize)
  }
  if (showGrid) {
    ctx.strokeStyle = GRID_LINE_COLOR
    ctx.lineWidth = GRID_LINE_WIDTH
    ctx.strokeRect(left + 0.5, top + 0.5, cellSize - 1, cellSize - 1)
  }
}

const drawRegion = (
  ctx: CanvasRenderingContext2D,
  pixels: Uint8Array,
  gridWidth: number,
  gridHeight: number,
  cellSize: number,
  palette: string[],
  showGrid: boolean,
  box: BoundingBox,
) => {
  const startX = Math.max(0, box.minX)
  const startY = Math.max(0, box.minY)
  const endX = Math.min(gridWidth - 1, box.maxX)
  const endY = Math.min(gridHeight - 1, box.maxY)
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      drawCell(ctx, pixels, gridWidth, x, y, cellSize, palette, showGrid)
    }
  }
}

/** Iterative (stack-based) flood fill, so a large region cannot blow the call stack. */
const floodFillIterative = (
  pixels: Uint8Array,
  gridWidth: number,
  gridHeight: number,
  startX: number,
  startY: number,
  newValue: number,
): BoundingBox | null => {
  const targetValue = pixels[startY * gridWidth + startX]
  if (targetValue === newValue) return null
  const stack: Cell[] = [{ x: startX, y: startY }]
  const box: BoundingBox = { maxX: startX, maxY: startY, minX: startX, minY: startY }
  while (stack.length > 0) {
    const cell = stack.pop()
    if (!cell) break
    const { x, y } = cell
    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) continue
    if (pixels[y * gridWidth + x] !== targetValue) continue
    pixels[y * gridWidth + x] = newValue
    box.minX = Math.min(box.minX, x)
    box.maxX = Math.max(box.maxX, x)
    box.minY = Math.min(box.minY, y)
    box.maxY = Math.max(box.maxY, y)
    stack.push({ x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 })
  }
  return box
}

/** Bresenham line rasterisation, bounded by the known maximum step count. */
const getLineCells = (start: Cell, end: Cell): Cell[] => {
  const cells: Cell[] = []
  const dx = Math.abs(end.x - start.x)
  const dy = Math.abs(end.y - start.y)
  const stepX = end.x >= start.x ? 1 : -1
  const stepY = end.y >= start.y ? 1 : -1
  const maxSteps = Math.max(dx, dy) + 1
  let { x, y } = start
  let error = dx - dy
  for (let step = 0; step < maxSteps; step++) {
    cells.push({ x, y })
    if (x === end.x && y === end.y) break
    const doubledError = error * 2
    if (doubledError > -dy) {
      error -= dy
      x += stepX
    }
    if (doubledError < dx) {
      error += dx
      y += stepY
    }
  }
  return cells
}

const getRectOutlineCells = (start: Cell, end: Cell): Cell[] => {
  const minX = Math.min(start.x, end.x)
  const maxX = Math.max(start.x, end.x)
  const minY = Math.min(start.y, end.y)
  const maxY = Math.max(start.y, end.y)
  const cells: Cell[] = []
  for (let x = minX; x <= maxX; x++) {
    cells.push({ x, y: minY })
    if (maxY !== minY) cells.push({ x, y: maxY })
  }
  for (let y = minY; y <= maxY; y++) {
    cells.push({ x: minX, y })
    if (maxX !== minX) cells.push({ x: maxX, y })
  }
  return cells
}

const getCellFromPoint = (
  clientX: number,
  clientY: number,
  rect: DOMRect,
  gridWidth: number,
  gridHeight: number,
  cellSize: number,
): Cell => {
  const scaleX = rect.width / (gridWidth * cellSize) || 1
  const scaleY = rect.height / (gridHeight * cellSize) || 1
  const rawX = (clientX - rect.left) / scaleX
  const rawY = (clientY - rect.top) / scaleY
  return {
    x: clamp(Math.floor(rawX / cellSize), 0, gridWidth - 1),
    y: clamp(Math.floor(rawY / cellSize), 0, gridHeight - 1),
  }
}

const props = withDefaults(defineProps<PixelBrushCanvasProps>(), {
  brush: undefined,
  class: undefined,
  color: undefined,
  grid: false,
  height: 16,
  initial: undefined,
  palette: () => [
    '#1f2937',
    '#ef4444',
    '#f97316',
    '#facc15',
    '#22c55e',
    '#0ea5e9',
    '#6366f1',
    '#ec4899',
    '#ffffff',
  ],
  pixelSize: 20,
  showTools: true,
  width: 16,
})

const emit = defineEmits<{
  'change': [pixels: Uint8Array]
  'update:brush': [brush: PixelBrushCanvasBrush]
  'update:color': [color: number]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const wrapperRef = ref<HTMLDivElement | null>(null)
const currentColor = ref(props.color ?? 0)
const currentBrush = ref<PixelBrushCanvasBrush>(props.brush ?? 'pencil')
const cursor = ref<Cell>({ x: 0, y: 0 })
const announcement = ref('')
const isFocused = ref(false)

const isBrushControlled = computed(() => props.brush !== undefined)
const isColorControlled = computed(() => props.color !== undefined)
const canvasWidth = computed(() => props.width * props.pixelSize)
const canvasHeight = computed(() => props.height * props.pixelSize)
/**
 * The tool row is pinned to the frame's outer width so the palette wraps under
 * the canvas instead of widening the whole component past it.
 */
const toolsWidth = computed(() => canvasWidth.value + FRAME_CHROME)

let pixels = createInitialPixels(props.width, props.height, props.initial)
let resolvedPalette: string[] = [...props.palette]
let undoStack: Uint8Array[] = []
let isPainting = false
let lastPainted: Cell | null = null
let dragStart: Cell | null = null
let anchor: Cell | null = null

/**
 * `fillStyle` cannot resolve CSS custom properties, so every palette entry is
 * read off the live element and normalised to sRGB before the first paint.
 */
function resolvePalette(): string[] {
  const target = wrapperRef.value ?? undefined
  return props.palette.map((color) => {
    const resolved = resolveColor(color, { target })
    if (!resolved) return color
    const rgb = colorToRgb(resolved, target)
    return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : resolved
  })
}

function notifyChange(): void {
  emit('change', pixels.slice())
}

function pushUndoSnapshot(): void {
  if (undoStack.length >= MAX_UNDO_STEPS) undoStack.shift()
  undoStack.push(pixels.slice())
}

function redrawRegion(box: BoundingBox): void {
  const ctx = canvasRef.value?.getContext('2d')
  if (!ctx) return
  drawRegion(
    ctx,
    pixels,
    props.width,
    props.height,
    props.pixelSize,
    resolvedPalette,
    props.grid,
    box,
  )
}

function redrawAll(): void {
  redrawRegion({
    maxX: props.width - 1,
    maxY: props.height - 1,
    minX: 0,
    minY: 0,
  })
}

/** Sizes the backing store to the CSS box at a capped device pixel ratio. */
function syncBackingStore(): void {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)
  const width = Math.round(canvasWidth.value * dpr)
  const height = Math.round(canvasHeight.value * dpr)
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  redrawAll()
}

function describeValue(value: number): string {
  return value === EMPTY_CELL_VALUE ? 'empty' : `palette entry ${value}`
}

function announceFocusedCell(x: number, y: number): void {
  const value = pixels[y * props.width + x]
  announcement.value = `Column ${x + 1}, row ${y + 1}. Colour: ${describeValue(value)}.`
}

function setCellValue(x: number, y: number, value: number): boolean {
  if (pixels[y * props.width + x] === value) return false
  pixels[y * props.width + x] = value
  redrawRegion({ maxX: x, maxY: y, minX: x, minY: y })
  return true
}

function commitCells(cells: Cell[], value: number): void {
  pushUndoSnapshot()
  let changed = false
  const box: BoundingBox = { maxX: -1, maxY: -1, minX: props.width, minY: props.height }
  for (const cell of cells) {
    if (cell.x < 0 || cell.x >= props.width || cell.y < 0 || cell.y >= props.height) continue
    if (pixels[cell.y * props.width + cell.x] === value) continue
    pixels[cell.y * props.width + cell.x] = value
    changed = true
    box.minX = Math.min(box.minX, cell.x)
    box.minY = Math.min(box.minY, cell.y)
    box.maxX = Math.max(box.maxX, cell.x)
    box.maxY = Math.max(box.maxY, cell.y)
  }
  if (changed) {
    redrawRegion(box)
    notifyChange()
  }
  else {
    undoStack.pop()
  }
}

function applyFillAt(x: number, y: number): void {
  pushUndoSnapshot()
  const box = floodFillIterative(
    pixels,
    props.width,
    props.height,
    x,
    y,
    currentColor.value + 1,
  )
  if (box) {
    redrawRegion(box)
    notifyChange()
  }
  else {
    undoStack.pop()
  }
}

function clear(): void {
  pushUndoSnapshot()
  pixels.fill(EMPTY_CELL_VALUE)
  redrawAll()
  notifyChange()
}

function undo(): void {
  const snapshot = undoStack.pop()
  if (!snapshot) return
  pixels = snapshot
  redrawAll()
  notifyChange()
}

function selectBrush(next: PixelBrushCanvasBrush): void {
  if (!isBrushControlled.value) currentBrush.value = next
  anchor = null
  emit('update:brush', next)
}

function selectColor(index: number): void {
  if (!isColorControlled.value) currentColor.value = index
  emit('update:color', index)
}

function activeValue(): number {
  return currentBrush.value === 'eraser' ? EMPTY_CELL_VALUE : currentColor.value + 1
}

function handlePointerDown(event: PointerEvent): void {
  const canvas = event.currentTarget as HTMLCanvasElement
  const rect = canvas.getBoundingClientRect()
  const cell = getCellFromPoint(
    event.clientX,
    event.clientY,
    rect,
    props.width,
    props.height,
    props.pixelSize,
  )
  wrapperRef.value?.focus()
  cursor.value = cell

  if (currentBrush.value === 'pencil' || currentBrush.value === 'eraser') {
    canvas.setPointerCapture(event.pointerId)
    isPainting = true
    lastPainted = null
    pushUndoSnapshot()
    if (setCellValue(cell.x, cell.y, activeValue())) {
      notifyChange()
    }
    else {
      undoStack.pop()
    }
    lastPainted = cell
  }
  else if (currentBrush.value === 'fill') {
    applyFillAt(cell.x, cell.y)
  }
  else {
    dragStart = cell
  }
  announceFocusedCell(cell.x, cell.y)
}

function handlePointerMove(event: PointerEvent): void {
  if (!isPainting) return
  const canvas = event.currentTarget as HTMLCanvasElement
  const rect = canvas.getBoundingClientRect()
  const cell = getCellFromPoint(
    event.clientX,
    event.clientY,
    rect,
    props.width,
    props.height,
    props.pixelSize,
  )
  const last = lastPainted
  if (last && last.x === cell.x && last.y === cell.y) return
  if (setCellValue(cell.x, cell.y, activeValue())) notifyChange()
  lastPainted = cell
  cursor.value = cell
}

function handlePointerUp(event: PointerEvent): void {
  const canvas = event.currentTarget as HTMLCanvasElement
  if (isPainting) {
    isPainting = false
    lastPainted = null
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId)
    }
    return
  }
  const start = dragStart
  if (start && (currentBrush.value === 'line' || currentBrush.value === 'rect')) {
    const rect = canvas.getBoundingClientRect()
    const end = getCellFromPoint(
      event.clientX,
      event.clientY,
      rect,
      props.width,
      props.height,
      props.pixelSize,
    )
    const cells
      = currentBrush.value === 'line' ? getLineCells(start, end) : getRectOutlineCells(start, end)
    commitCells(cells, currentColor.value + 1)
    announceFocusedCell(end.x, end.y)
  }
  dragStart = null
}

function moveCursor(dx: number, dy: number): void {
  const nextX = clamp(cursor.value.x + dx, 0, props.width - 1)
  const nextY = clamp(cursor.value.y + dy, 0, props.height - 1)
  cursor.value = { x: nextX, y: nextY }
  announceFocusedCell(nextX, nextY)
}

function paintAtCursor(): void {
  const { x, y } = cursor.value
  if (currentBrush.value === 'pencil' || currentBrush.value === 'eraser') {
    pushUndoSnapshot()
    if (setCellValue(x, y, activeValue())) {
      notifyChange()
    }
    else {
      undoStack.pop()
    }
    announceFocusedCell(x, y)
  }
  else if (currentBrush.value === 'fill') {
    applyFillAt(x, y)
    announceFocusedCell(x, y)
  }
  else if (!anchor) {
    anchor = { x, y }
    announcement.value = `Anchor set at column ${x + 1}, row ${y + 1}. Move and press space again to finish.`
  }
  else {
    const cells
      = currentBrush.value === 'line' ? getLineCells(anchor, { x, y }) : getRectOutlineCells(anchor, { x, y })
    commitCells(cells, currentColor.value + 1)
    anchor = null
    announceFocusedCell(x, y)
  }
}

function handleKeyDown(event: KeyboardEvent): void {
  const isUndoShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z'
  if (isUndoShortcut) {
    event.preventDefault()
    undo()
    return
  }
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      moveCursor(0, -1)
      return
    case 'ArrowDown':
      event.preventDefault()
      moveCursor(0, 1)
      return
    case 'ArrowLeft':
      event.preventDefault()
      moveCursor(-1, 0)
      return
    case 'ArrowRight':
      event.preventDefault()
      moveCursor(1, 0)
      return
    case ' ':
    case 'Spacebar':
      event.preventDefault()
      paintAtCursor()
      return
    default:
      break
  }
  const lowerKey = event.key.toLowerCase()
  if (lowerKey === 'e') selectBrush('eraser')
  else if (lowerKey === 'b') selectBrush('pencil')
  else if (lowerKey === 'g') selectBrush('fill')
}

watch(
  () => [props.width, props.height],
  () => {
    pixels = createInitialPixels(props.width, props.height, props.initial)
    undoStack = []
    if (canvasRef.value) syncBackingStore()
  },
)

watch(
  () => props.initial,
  () => {
    pixels = createInitialPixels(props.width, props.height, props.initial)
    undoStack = []
    if (canvasRef.value) syncBackingStore()
  },
  { deep: true },
)

watch(
  () => props.pixelSize,
  () => {
    if (canvasRef.value) syncBackingStore()
  },
)

watch(
  () => props.grid,
  () => redrawAll(),
)

watch(
  () => props.palette.join(PALETTE_SEPARATOR),
  () => {
    resolvedPalette = resolvePalette()
    redrawAll()
  },
)

watch(
  () => props.brush,
  (value) => {
    if (value !== undefined) currentBrush.value = value
  },
)

watch(
  () => props.color,
  (value) => {
    if (value !== undefined) currentColor.value = value
  },
)

onMounted(() => {
  resolvedPalette = resolvePalette()
  syncBackingStore()
})

defineExpose({
  clear,
  getPixels: () => pixels.slice(),
  toDataURL: () => canvasRef.value?.toDataURL() ?? '',
  undo,
})
</script>

<template>
  <div :class="cn('inline-flex flex-col gap-3', props.class)">
    <div class="inline-block rounded-lg border border-default bg-muted/40 p-2">
      <div
        ref="wrapperRef"
        aria-label="Pixel art drawing canvas"
        class="relative inline-block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
        role="application"
        tabindex="0"
        @blur="isFocused = false"
        @focus="isFocused = true"
        @keydown="handleKeyDown"
      >
        <canvas
          ref="canvasRef"
          class="block touch-none rounded-sm"
          :style="{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }"
          @pointerdown="handlePointerDown"
          @pointerleave="handlePointerUp"
          @pointermove="handlePointerMove"
          @pointerup="handlePointerUp"
        />
        <div
          v-if="isFocused"
          aria-hidden="true"
          class="pointer-events-none absolute border-2 border-primary"
          :style="{
            height: `${props.pixelSize}px`,
            left: `${cursor.x * props.pixelSize}px`,
            top: `${cursor.y * props.pixelSize}px`,
            width: `${props.pixelSize}px`,
          }"
        />
        <span
          aria-live="polite"
          class="sr-only"
        >{{ announcement }}</span>
      </div>
    </div>

    <div
      v-if="props.showTools"
      class="flex flex-wrap items-center gap-3"
      :style="{ width: `${toolsWidth}px` }"
    >
      <fieldset
        aria-label="Colour palette"
        class="m-0 flex items-center gap-1.5 border-0 p-0"
      >
        <button
          v-for="(hex, index) in props.palette"
          :key="`${hex}-${index}`"
          type="button"
          :aria-label="`Select colour ${index + 1}: ${colourLabel(hex)}`"
          :aria-pressed="index === currentColor"
          class="relative flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.16)]"
          :style="{ backgroundColor: hex }"
          @click="selectColor(index)"
        >
          <span
            v-if="index === currentColor"
            aria-hidden="true"
            class="pixel-swatch-ring absolute inset-0 rounded-full ring-2 ring-inverted ring-offset-2 ring-offset-default"
          />
        </button>
      </fieldset>

      <fieldset
        aria-label="Brush tools"
        class="relative m-0 flex flex-wrap items-center gap-0.5 rounded-lg border-0 bg-inverted/5 p-1 dark:bg-inverted/10"
      >
        <button
          v-for="option in BRUSH_OPTIONS"
          :key="option.value"
          type="button"
          :aria-label="option.shortcut ? `${option.label} tool (shortcut ${option.shortcut})` : `${option.label} tool`"
          :aria-pressed="option.value === currentBrush"
          class="relative cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-default"
          :class="option.value === currentBrush ? 'text-highlighted' : 'text-muted hover:text-highlighted'"
          @click="selectBrush(option.value)"
        >
          <span
            v-if="option.value === currentBrush"
            aria-hidden="true"
            class="pixel-tool-chip absolute inset-0 rounded-md bg-default shadow-[0_0_0_1px_rgb(0_0_0/0.07),0_1px_2px_rgb(0_0_0/0.08)] dark:bg-inverted/15 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.10)]"
          />
          <span class="relative">{{ option.label }}</span>
        </button>
      </fieldset>
    </div>
  </div>
</template>

<style scoped>
@keyframes pixel-swatch-ring-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.pixel-swatch-ring {
  animation: pixel-swatch-ring-in 250ms cubic-bezier(0.2, 0.9, 0.3, 1.2);
}

@keyframes pixel-tool-chip-in {
  from {
    opacity: 0;
    transform: scale(0.92);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.pixel-tool-chip {
  animation: pixel-tool-chip-in 180ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .pixel-swatch-ring,
  .pixel-tool-chip {
    animation: none;
  }
}
</style>
