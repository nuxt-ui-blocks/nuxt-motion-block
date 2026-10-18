/**
 * Shader reveal transition.
 *
 * Eight unrelated-looking reveals that share one fullscreen fragment shader. Each
 * branch writes a `mask` (how much of this pixel is covered) and a `glow` (a
 * bright leading edge), and the shared `paint` function turns those into
 * premultiplied output. Keeping the variants as branches over a `uVariant` uniform
 * rather than as separate shaders matters: a live variant control would otherwise
 * force a fresh shader compile on the exact frame the control changes.
 *
 * Ported from smoothui's `shader-reveal-transition`.
 */

/** Total sweep time, in milliseconds. */
export const SHADER_REVEAL_DEFAULT_DURATION_MS = 1080

/**
 * Alpha ceiling for a single covered pixel.
 *
 * The overlay deliberately stops short of fully opaque so the content underneath
 * stays faintly legible through the densest part of the sweep. Pushed to 1.0 it
 * would read as a flat panel wiping across rather than as a reveal passing over
 * live content.
 */
export const SHADER_REVEAL_MAX_ALPHA = 0.92

/**
 * Hold the reveal at full coverage before the closing fade.
 *
 * Without it the fade would begin the instant the last edge arrives, so the final
 * thing on screen is a dissolving shape instead of the finished reveal.
 */
export const SHADER_REVEAL_EXIT_FADE_START = 0.76

/**
 * Fade-in length, as a fraction of progress.
 *
 * Most variants begin with a near-zero mask — an empty gate, a radius of zero —
 * which would make the first frame invisible.
 */
export const SHADER_REVEAL_ENTRY_FADE_PROGRESS = 0.1

/**
 * `uVariant` index per variant name.
 *
 * Keys are sorted so the record's type reads alphabetically next to the union in
 * the SFC, and the numeric order follows the source's `Demo 1`..`Demo 8` comments,
 * which is what the shader's `if` chain branches on.
 */
export const SHADER_REVEAL_VARIANTS = {
  circle: 2,
  luma: 4,
  noise: 0,
  planetary: 5,
  push: 7,
  stripes: 6,
  wipe: 3,
  zoom: 1,
} as const

/** The eight variants, in shader-branch order. */
export const SHADER_REVEAL_VARIANT_NAMES = [
  'noise',
  'zoom',
  'circle',
  'wipe',
  'luma',
  'planetary',
  'stripes',
  'push',
] as const

/** Union of the eight variant names, for consumers building their own controls. */
export type ShaderRevealVariant = (typeof SHADER_REVEAL_VARIANT_NAMES)[number]

/**
 * Colour of the leading cover.
 *
 * Every shader variant mixes between a hot pink and a cool teal, so the cover sits
 * between the two and is only ever seen for the length of one sweep.
 */
export const SHADER_REVEAL_COVER_COLOR = 'rgb(64 16 48)'

/**
 * CSS fallback for a context the browser will not give us.
 *
 * A skewed gradient wipes across the frame over the sweep's duration. It cannot
 * reproduce a noise threshold or a spiral, so the point is that the transition
 * still happens, still takes the requested time, and still fires `rest`.
 */
export const SHADER_REVEAL_FALLBACK_GRADIENT
  = 'linear-gradient(105deg, rgb(255 26 140 / 92%) 0%, rgb(120 40 200 / 88%) 45%, rgb(30 214 240 / 92%) 100%)'

/**
 * Scale applied to the fallback gradient across the sweep.
 *
 * Wider than tall and skewed off-axis, so the fallback reads as a directional
 * wipe rather than as a straight crossfade.
 */
export const SHADER_REVEAL_FALLBACK_MAX_SCALE_X = 1.6

/**
 * The GLSL below reads these values, so they are declared above the string and
 * interpolated rather than repeated as literals inside it. GLSL has no shared
 * constant across shaders and a literal in a template string has no way to be
 * checked against its TypeScript twin.
 */
export const SHADER_REVEAL_FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;
uniform float uAlpha;
uniform float uVariant;
#define PI 3.14159265359

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float parabola(float x, float k){ return pow(4.0 * x * (1.0 - x), k); }
mat2 rot(float a){ float s = sin(a); float c = cos(a); return mat2(c, -s, s, c); }

vec4 paint(vec2 uv, float mask, vec3 color, float glow){
  float exitFade = smoothstep(1.0, ${SHADER_REVEAL_EXIT_FADE_START}, uProgress);
  float entryFade = smoothstep(0.0, ${SHADER_REVEAL_ENTRY_FADE_PROGRESS}, uProgress);
  float alpha = clamp((mask * 0.76 + glow * 0.24) * entryFade * exitFade * uAlpha, 0.0, ${SHADER_REVEAL_MAX_ALPHA});
  return vec4(color * alpha + vec3(1.0) * glow * 0.16 * uAlpha, alpha);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;
  float progress = smoothstep(0.0, 1.0, uProgress);

  float mask = 0.0;
  float glow = 0.0;
  vec3 color = mix(vec3(1.0, 0.20, 0.58), vec3(0.12, 0.86, 1.0), uv.x);

  if (uVariant < 0.5) {
    // Variant 0 - turbulent noise threshold. Chunky, organic gate.
    float n1 = noise(uv * vec2(18.0, 12.0) + uTime * 0.42);
    float n2 = noise(uv * vec2(52.0, 44.0) - uTime * 0.18);
    float threshold = progress * 1.35 - 0.18;
    float gate = smoothstep(threshold - 0.18, threshold + 0.18, uv.x * 0.62 + uv.y * 0.28 + n1 * 0.34 + n2 * 0.08);
    mask = pow(gate * (1.0 - gate) * 4.0, 0.74) + step(0.74, n2) * gate * 0.22;
    glow = exp(-pow(uv.x + n1 * 0.26 - progress, 2.0) * 26.0);
    color = mix(vec3(1.0, 0.10, 0.55), vec3(0.18, 1.0, 0.78), n1);
  } else if (uVariant < 1.5) {
    // Variant 1 - zoom mix. Large central lens, not a sweep.
    float yGate = smoothstep(0.0, 1.0, progress * 2.15 + uv.y - 1.08);
    vec2 z = (uv - 0.5) * mix(1.75, 0.35, yGate) + 0.5;
    float lens = 1.0 - smoothstep(0.12, 0.78, length((z - 0.5) * aspect));
    float seam = exp(-pow(yGate - 0.5, 2.0) * 20.0);
    mask = (lens * 0.72 + seam * 0.42) * parabola(progress, 0.42);
    glow = seam * 0.9 + lens * 0.25;
    color = mix(vec3(1.0, 0.80, 0.34), vec3(0.70, 0.92, 1.0), yGate);
  } else if (uVariant < 2.5) {
    // Variant 2 - noisy circular reveal.
    float n = noise(uv * 9.0 + uTime * 0.25);
    float radius = progress * 1.08 + n * 0.045;
    float d = length(p) - radius * 0.72;
    mask = exp(-d * d * 42.0) + smoothstep(0.08, -0.12, d) * 0.18;
    glow = exp(-d * d * 140.0);
    color = mix(vec3(1.0, 0.22, 0.58), vec3(1.0, 0.75, 0.32), atan(p.y, p.x) / PI * 0.5 + 0.5);
  } else if (uVariant < 3.5) {
    // Variant 3 - displacement wipe. Narrow noisy blade.
    float n = noise(uv * vec2(12.0, 26.0) + vec2(uTime * 0.26, -uTime * 0.12));
    float blade = progress * 1.32 - 0.16 + n * 0.11;
    float edge = blade - uv.x;
    float front = exp(-edge * edge * 120.0);
    float fillSide = smoothstep(-0.03, 0.16, edge) * 0.18;
    mask = front * 0.92 + fillSide;
    glow = front;
    color = mix(vec3(0.12, 0.92, 1.0), vec3(1.0, 1.0, 1.0), front * 0.38);
  } else if (uVariant < 4.5) {
    // Variant 4 - luminance displacement. Horizontal ribbons pulled vertically.
    float lum = noise(uv * 5.0 + vec2(0.0, uTime * 0.22));
    float displacedY = uv.y + progress * (lum - 0.5) * 0.55;
    float ribbons = sin(displacedY * 58.0 + uTime * 1.25) * 0.5 + 0.5;
    float fine = sin(displacedY * 132.0 - uTime * 1.8) * 0.5 + 0.5;
    float window = smoothstep(0.03, 0.5, progress) * smoothstep(1.0, 0.72, progress);
    mask = (smoothstep(0.58, 0.92, ribbons) * 0.74 + smoothstep(0.76, 0.98, fine) * 0.22) * window;
    glow = smoothstep(0.84, 1.0, ribbons) * window;
    color = mix(vec3(1.0, 0.68, 0.22), vec3(1.0, 0.20, 0.62), lum);
  } else if (uVariant < 5.5) {
    // Variant 5 - planetary rotated displacement. Spiral vortex.
    vec2 disp = vec2(noise(uv * 5.5 + uTime * 0.12), noise(uv * 5.5 + 4.2 - uTime * 0.10)) - 0.5;
    vec2 q = rot(PI * 0.25) * (p + disp * 0.44 * parabola(progress, 0.55));
    float ang = atan(q.y, q.x);
    float rr = length(q);
    float arms = sin(ang * 5.0 + rr * 18.0 - uTime * 1.8);
    float core = 1.0 - smoothstep(0.0, 0.42, rr);
    mask = (smoothstep(0.08, 0.92, arms) * 0.72 + core * 0.38) * parabola(progress, 0.58);
    glow = exp(-abs(arms) * 1.5) * parabola(progress, 0.85);
    color = mix(vec3(0.10, 0.88, 1.0), vec3(1.0, 0.66, 0.18), rr + core * 0.35);
  } else if (uVariant < 6.5) {
    // Variant 6 - divided UV stripe displacement. Barcode shutter.
    vec2 divided = fract(uv * vec2(42.0, 1.0));
    float stripeCore = step(0.18, divided.x) * step(divided.x, 0.62);
    float diagonal = uv.x + uv.y * 0.18 + divided.x * 0.06;
    float sweep = smoothstep(-0.10, 1.12, progress * 1.32 - diagonal + 0.18);
    float shutter = stripeCore * sweep * smoothstep(0.04, 0.56, progress) * smoothstep(1.0, 0.78, progress);
    mask = shutter * 0.92;
    glow = stripeCore * exp(-pow(progress - uv.x, 2.0) * 30.0) * 0.86;
    color = mix(vec3(1.0, 0.15, 0.55), vec3(0.12, 0.88, 1.0), divided.x);
  } else {
    // Variant 7 - noise push/pull. Vertical flow with directional pressure.
    float hn = noise(uv * uRes / 115.0 + uTime * 0.12);
    vec2 centerDir = normalize(vec2(0.5) - uv + 0.001);
    float pull = centerDir.y * (1.0 + hn * 0.7) * parabola(progress, 0.62);
    float bands = sin((uv.y + pull * 0.52) * 28.0 + hn * 5.0);
    float pressure = smoothstep(-0.22, 0.96, bands) * parabola(progress, 0.62);
    float verticalGlow = exp(-pow(uv.y - (0.5 + pull * 0.22), 2.0) * 18.0);
    mask = pressure * 0.78 + verticalGlow * 0.22;
    glow = verticalGlow * pressure;
    color = mix(vec3(0.48, 1.0, 0.74), vec3(1.0, 0.22, 0.58), hn);
  }

  gl_FragColor = paint(uv, mask, color, glow);
}
`
