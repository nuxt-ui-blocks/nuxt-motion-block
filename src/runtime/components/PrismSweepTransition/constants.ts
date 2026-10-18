/**
 * Prism sweep transition.
 *
 * A faceted caustic band travels across the frame and the content behind it is
 * swapped while the band is still mid-draw. Everything the band does — which
 * edge it enters from, how wide it is, what colours it refracts — is a uniform,
 * so a live direction or tone control never forces a shader recompile on the
 * exact frame it moves.
 *
 * Ported from smoothui's `prism-sweep-transition`.
 */

/** Total sweep time, in milliseconds. */
export const PRISM_SWEEP_DEFAULT_DURATION_MS = 1240

/**
 * Duration of the closing fade, in milliseconds.
 *
 * Shorter than the shared default: the band has already left the frame by the
 * time the sweep ends, so the fade only has to clear whatever glow it dropped
 * on the way out.
 */
export const PRISM_SWEEP_OUTRO_MS = 82

/**
 * Travel at which the source swaps the children it is covering.
 *
 * The React original holds its previous children in state and replaces them
 * when the band crosses this point. A Vue slot updates immediately instead, so
 * the same value marks where the leading cover finishes clearing — the panel
 * stands in for the old content right up to the moment the source would have
 * dropped it.
 */
export const PRISM_SWEEP_CONTENT_SWAP_RATIO = 0.52

/**
 * Distance the CSS fallback band travels past each edge, in percent.
 *
 * Wide enough that the band starts fully off-frame and ends fully off-frame,
 * whatever the frame's aspect ratio, so the fallback sweeps rather than sticks.
 */
export const PRISM_SWEEP_FALLBACK_TRAVEL_PERCENT = 130

/**
 * Vertex shader.
 *
 * Reads the shared attribute name `a` rather than the source's `position`,
 * because `createWebGLProgram` binds the quad to `a` for every component. The
 * varying carries UVs into the fragment stage, where the band is drawn.
 */
export const PRISM_SWEEP_VERTEX_SHADER = `
attribute vec2 a;
varying vec2 vUv;

void main() {
  vUv = a * 0.5 + 0.5;
  gl_Position = vec4(a, 0.0, 1.0);
}
`

export const PRISM_SWEEP_FRAGMENT_SHADER = `
precision mediump float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uClock;
uniform float uTravel;
uniform float uOpacity;
uniform float uAxis;
uniform float uForward;
uniform float uSpan;
uniform float uSoftness;
uniform float uBend;
uniform float uFacet;
uniform float uBloom;
uniform vec3 uInk;
uniform vec3 uPearl;
uniform vec3 uWarm;
uniform vec3 uCool;

float saturate(float value) {
  return clamp(value, 0.0, 1.0);
}

float triangleWave(float value) {
  return abs(fract(value) * 2.0 - 1.0);
}

float softRidge(float distance, float width) {
  return exp(-distance * distance / max(width, 0.0001));
}

void main() {
  vec2 uv = vUv;
  vec2 pixel = 1.0 / max(uResolution, vec2(1.0));

  float mainAxis = mix(uv.x, uv.y, uAxis);
  float crossAxis = mix(uv.y, uv.x, uAxis);
  mainAxis = mix(mainAxis, 1.0 - mainAxis, step(0.0, -uForward));

  float time = uClock * 0.42;
  float drift =
      sin(crossAxis * 7.0 + time * 1.8) * 0.024
    + sin(crossAxis * 17.0 - time * 1.1 + 1.6) * 0.010
    + sin((mainAxis + crossAxis) * 11.0 + time * 0.7) * 0.006;
  drift *= uBend;

  float travel = -0.34 + uTravel * 1.68;
  float d = mainAxis - travel - drift;
  float ad = abs(d);

  float field = 1.0 - smoothstep(uSpan, uSpan + uSoftness, ad);
  float inner = 1.0 - smoothstep(uSpan * 0.28, uSpan, ad);
  float frontRidge = softRidge(d - uSpan * 0.34, 0.0017 + pixel.x * 16.0);
  float backRidge = softRidge(d + uSpan * 0.54, 0.0035 + pixel.y * 14.0) * 0.55;

  float facetGrid = triangleWave(crossAxis * uFacet + mainAxis * 2.1 + time * 0.35);
  float facetCuts = smoothstep(0.18, 0.92, facetGrid);
  float diagonal = triangleWave((crossAxis - mainAxis * 0.36) * (uFacet * 0.44) - time * 0.2);
  float caustic = pow(1.0 - diagonal, 4.0) * 0.42 + pow(facetCuts, 2.2) * 0.22;

  float glass = saturate(field * (0.5 + inner * 0.42) + frontRidge * 0.52 + backRidge * 0.2);
  float gateIn = smoothstep(0.02, 0.14, uTravel);
  float gateOut = 1.0 - smoothstep(0.9, 1.0, uTravel);
  float envelope = gateIn * gateOut;

  vec3 base = mix(uCool, uWarm, saturate(crossAxis * 0.82 + drift * 4.5));
  vec3 prism = mix(base, uPearl, inner * 0.36 + frontRidge * 0.5);
  prism = mix(prism, uInk, smoothstep(0.55, 0.0, ad) * 0.1);
  prism += caustic * uBloom * mix(uWarm, uPearl, 0.38);
  prism += frontRidge * uBloom * mix(uWarm, uCool, 0.22) * 0.72;
  prism += backRidge * uBloom * uCool * 0.7;

  float vignette = smoothstep(0.0, 0.025, crossAxis) * smoothstep(1.0, 0.975, crossAxis);
  float alpha = saturate(glass * 0.64 + frontRidge * 0.24 + backRidge * 0.14);
  alpha *= uOpacity * envelope * vignette;

  gl_FragColor = vec4(prism * alpha, alpha);
}
`

/**
 * Axis and sign per direction name.
 *
 * The shader flips its own main axis rather than taking a rotation, so a
 * direction is two floats: which screen axis the band travels along, and
 * whether the band enters from the low or the high end of it.
 */
export const PRISM_SWEEP_DIRECTIONS = {
  down: { axis: 1, forward: -1 },
  left: { axis: 0, forward: 1 },
  right: { axis: 0, forward: -1 },
  up: { axis: 1, forward: 1 },
} as const

/** Palette and field behaviour per tone. */
export interface PrismSweepToneConfig {
  /** How far the band's edge wanders off its axis. */
  bend: number
  /** How strongly the caustics add light rather than occlude it. */
  bloom: number
  /** Colour the band trails behind it, as red/green/blue in 0..1. */
  cool: readonly [number, number, number]
  /** Frequency of the facet pattern cut across the band. */
  facet: number
  /** Darkest colour in the palette: the shadow inside the glass. */
  ink: readonly [number, number, number]
  /** Highlight colour at the band's core, as red/green/blue in 0..1. */
  pearl: readonly [number, number, number]
  /** Softness of the band's edge falloff, in axis units. */
  softness: number
  /** Half-width of the band, in axis units. */
  span: number
  /** Colour the band leads with, as red/green/blue in 0..1. */
  warm: readonly [number, number, number]
}

export const PRISM_SWEEP_TONES = {
  aperture: {
    bend: 0.42,
    bloom: 0.86,
    cool: [0.92, 0.78, 0.66],
    facet: 9.5,
    ink: [0.24, 0.16, 0.12],
    pearl: [1, 0.96, 0.88],
    softness: 0.076,
    span: 0.17,
    warm: [1, 0.62, 0.38],
  },
  beam: {
    bend: 0.12,
    bloom: 1.08,
    cool: [0.86, 0.72, 0.5],
    facet: 18,
    ink: [0.2, 0.13, 0.07],
    pearl: [1, 0.9, 0.68],
    softness: 0.038,
    span: 0.092,
    warm: [1, 0.48, 0.18],
  },
  chroma: {
    bend: 0.9,
    bloom: 0.78,
    cool: [0.38, 0.86, 0.84],
    facet: 13.5,
    ink: [0.18, 0.16, 0.3],
    pearl: [0.96, 0.88, 1],
    softness: 0.082,
    span: 0.15,
    warm: [1, 0.34, 0.72],
  },
  prism: {
    bend: 0.76,
    bloom: 0.58,
    cool: [0.28, 0.78, 0.86],
    facet: 12,
    ink: [0.2, 0.16, 0.26],
    pearl: [0.94, 0.82, 0.9],
    softness: 0.07,
    span: 0.14,
    warm: [0.98, 0.28, 0.58],
  },
} as const

/**
 * The source's travel curve: a cubic-ish ease-out with a longer tail than
 * `easeOutQuart`.
 *
 * Kept rather than swapped for the shared curve because it is what decides when
 * the band appears to accelerate off the edge, and that is the whole character
 * of the effect.
 */
export function easePrismTravel(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress))
  return 1 - (1 - clamped) ** 3.35
}

/**
 * `[r, g, b]` in 0..1 to an `rgb()` string.
 *
 * Used for the leading cover and the CSS fallback gradient, both of which are
 * painted from the same tone palette the shader reads as uniforms — a cover
 * that disagreed with the band sweeping over it would read as two effects.
 */
export function prismSweepRgb([r, g, b]: readonly [number, number, number]): string {
  return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`
}
