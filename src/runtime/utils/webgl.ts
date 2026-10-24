/**
 * Shared WebGL plumbing for the shader-backed components.
 *
 * Every shader component in this module repeats the same four steps — acquire a
 * context, compile a program, bind a full-screen quad, then keep a render loop
 * alive and tear it all down on unmount. That sequence is fiddly enough (each
 * step has a null case that has to be handled rather than ignored) that keeping
 * four private copies of it would mean four places to fix a context-loss bug.
 *
 * Nothing here touches the DOM, so the module is safe to import during SSR. The
 * context is only ever acquired from a function the caller invokes on mount.
 */

/** Device pixel ratio ceiling. Beyond 2x the fill cost doubles for no visible gain. */
export const WEBGL_MAX_DPR = 2

/** Uniform declaration shared by the WebGL1 shaders. */
export const WEBGL_VERTEX_SHADER = 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }'

/** Two triangles as a strip, covering clip space. Cheaper than six triangle vertices. */
export const WEBGL_QUAD_STRIP = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])

/** Two triangles as a list, for shaders that interpolate UVs from the attribute. */
export const WEBGL_QUAD_TRIANGLES = new Float32Array([
  -1, -1, 1, -1, -1, 1,
  -1, 1, 1, -1, 1, 1,
])

/**
 * Context attributes for a translucent overlay.
 *
 * `premultipliedAlpha` is on and the blend func is premultiplied
 * (`ONE`, `ONE_MINUS_SRC_ALPHA`), so the fragment shaders emit colour already
 * multiplied by their own alpha. Emitting straight alpha with these settings
 * would double-multiply the colour channel and wash the overlay out.
 */
export const WEBGL_ALPHA_ATTRIBUTES: WebGLContextAttributes = {
  alpha: true,
  antialias: false,
  depth: false,
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  stencil: false,
}

/** Context attributes for an opaque surface that fills its box. */
export const WEBGL_OPAQUE_ATTRIBUTES: WebGLContextAttributes = {
  alpha: false,
  antialias: false,
  powerPreference: 'low-power',
}

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

export function easeOutCubic(value: number): number {
  return 1 - (1 - value) ** 3
}

export function easeOutQuart(value: number): number {
  return 1 - (1 - value) ** 4
}

export function easeInOutCubic(value: number): number {
  return value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2
}

/** Alpha ramp used for the short fade that clears an overlay once its sweep is done. */
export function easeOutSmoothstep(value: number): number {
  const clamped = clamp01(value)
  return clamped * clamped * (3 - 2 * clamped)
}

/**
 * A linked program with its full-screen quad already bound.
 *
 * Named `Handle` rather than `WebGLProgram` so it does not collide with the
 * DOM's own `WebGLProgram` — the GL object is `handle.program`.
 */
export interface WebGLProgramHandle {
  /**
   * The canvas the context was created from. Carried on the handle because
   * `gl.canvas` is typed as `HTMLCanvasElement | OffscreenCanvas`, and the sizing
   * helpers need the DOM canvas's `getBoundingClientRect`.
   */
  canvas: HTMLCanvasElement
  gl: WebGLRenderingContext | WebGL2RenderingContext
  program: WebGLProgram
  buffer: WebGLBuffer | null
  attribute: number
  draw: (mode?: number) => void
  destroy: () => void
}

function compileShader(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  type: number,
  source: string,
): globalThis.WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // The shader is deleted before returning so a compile failure on a
    // misconfigured variant does not leak one GL object per mount.
    gl.deleteShader(shader)
    return null
  }

  return shader
}

/**
 * Compiles, links and binds a full-screen quad in one step.
 *
 * Returns `null` when the context is missing or the program will not compile or
 * link — a caller that gets `null` must fall back to non-WebGL output rather
 * than assume a working context.
 */
export function createWebGLProgram(
  canvas: HTMLCanvasElement,
  {
    attributes,
    fragment,
    triangleStrip = true,
    vertex = WEBGL_VERTEX_SHADER,
  }: {
    attributes: WebGLContextAttributes
    fragment: string
    triangleStrip?: boolean
    vertex?: string
  },
): WebGLProgramHandle | null {
  // WebGL2-only shaders ask for `webgl2` first and fall back, so one call site
  // can accept either context type when the shader itself does not care.
  const gl = (canvas.getContext('webgl2', attributes)
    ?? canvas.getContext('webgl', attributes)) as WebGLRenderingContext | WebGL2RenderingContext | null

  if (!gl) return null

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertex)
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment)
  const program = gl.createProgram()

  if (!(vertexShader && fragmentShader && program)) {
    if (vertexShader) gl.deleteShader(vertexShader)
    if (fragmentShader) gl.deleteShader(fragmentShader)
    if (program) gl.deleteProgram(program)
    return null
  }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  // The shaders are attached to the program now, so the shader objects are no
  // longer needed and the driver frees its own copy on delete.
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }

  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, triangleStrip ? WEBGL_QUAD_STRIP : WEBGL_QUAD_TRIANGLES, gl.STATIC_DRAW)

  const attribute = gl.getAttribLocation(program, 'a')
  gl.enableVertexAttribArray(attribute)
  gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

  const mode = triangleStrip ? gl.TRIANGLE_STRIP : gl.TRIANGLES
  const count = triangleStrip ? 4 : 6

  return {
    canvas,
    gl,
    program,
    buffer,
    attribute,
    draw: (drawMode = mode) => {
      resizeWebGLCanvas(canvas, gl)
      gl.drawArrays(drawMode, 0, count)
    },
    destroy: () => {
      if (buffer) gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      // Dropping every GL object is not enough — the browser caps live contexts
      // per page (commonly 16) and a dropped context is not reclaimed until it
      // is explicitly lost.
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}

/**
 * Matches the drawing buffer to the canvas' laid-out size.
 *
 * `getBoundingClientRect` is a layout read, so calling it every frame forces a
 * synchronous style recalculation. That is cheap only because the value is
 * compared before the buffer is resized: the read still happens, but resizing
 * the buffer is the expensive half.
 */
export function resizeWebGLCanvas(
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext | WebGL2RenderingContext,
): void {
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, WEBGL_MAX_DPR)
  const width = Math.max(1, Math.round(rect.width * dpr))
  const height = Math.max(1, Math.round(rect.height * dpr))

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }

  gl.viewport(0, 0, width, height)
}

export interface WebGLRenderLoop {
  /** Starts the loop. A second call while running is a no-op. */
  start: () => void
  /** Stops the loop. Safe to call when not running. */
  stop: () => void
  /** Draws a single frame without starting the loop. */
  drawOnce: () => void
  destroy: () => void
}

/**
 * A `requestAnimationFrame` loop that draws on every tick and can be paused.
 *
 * The loop stops itself while the document is hidden. A background tab gets no
 * frames from the browser anyway, so the pending callbacks would just sit in the
 * queue, and on return the first visible frame lands a frame or more late.
 *
 * Reduced motion is deliberately *not* handled here. Whether a given surface
 * should animate at all is a per-component decision, and it is made from the
 * `useReducedMotion` ref rather than read from a media query inside a generic
 * helper.
 */
export function createWebGLRenderLoop(draw: () => void): WebGLRenderLoop {
  let frame = 0
  let running = false
  let destroyed = false

  const tick = () => {
    if (!running || destroyed) return
    draw()
    frame = requestAnimationFrame(tick)
  }

  const start = () => {
    if (destroyed || running || typeof window === 'undefined') return
    running = true
    frame = requestAnimationFrame(tick)
  }

  const stop = () => {
    running = false
    if (frame) cancelAnimationFrame(frame)
    frame = 0
  }

  const onVisibilityChange = () => {
    if (document.hidden) {
      stop()
      return
    }
    start()
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', onVisibilityChange)
  }

  // One frame is drawn up front so the surface is painted before the loop starts.
  // A paused or reduced-motion component still has to show something, and drawing
  // here means `start()` is free to be a no-op without leaving the canvas blank.
  draw()

  return {
    start,
    stop,
    drawOnce: draw,
    destroy: () => {
      destroyed = true
      stop()
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisibilityChange)
      }
    },
  }
}
