/**
 * Signed distance field blob transition.
 *
 * The overlay draws metaball-shaped regions rather than a hard edge: each shape
 * is a `length(p - c) - r` field, and `smin` blends two fields together with a
 * fillet instead of letting them intersect in a crease. The blend width `k` is
 * what makes two circles read as one blob rather than as two circles touching.
 */

/**
 * Hold the blob at full size for the last quarter of the sweep before it fades.
 *
 * Without it the fade starts the instant the blob finishes growing, and the last
 * thing the visitor sees is a shrinking edge rather than the finished shape.
 */
export const SDF_BLOB_EXIT_FADE_START = 0.72

/**
 * Cap on overlay alpha.
 *
 * The overlay covers the content, and anything approaching opaque would hide the
 * swap entirely — the visitor would see a solid panel that clears, rather than a
 * sweep that passes over changing content.
 */
export const SDF_BLOB_MAX_ALPHA = 0.9

/**
 * Fade-in length for the blob itself.
 *
 * The blob starts as a hairline point, so without this its first frame is
 * invisible and the sweep appears to start from nothing.
 */
export const SDF_BLOB_ENTRY_FADE_PROGRESS = 0.18

// The GLSL below reads these four values, so they are declared above the string
// and interpolated rather than repeated as literals inside it. GLSL has no
// shared constant across shaders and a literal in a template string has no way to
// be checked against its TypeScript twin.
export const SDF_BLOB_FRAGMENT_SHADER = `
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

float circleSdf(vec2 p, vec2 c, float r){ return length(p - c) - r; }
float smin(float a, float b, float k){
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;
  float progress = smoothstep(0.0, 1.0, uProgress);
  float grow = smoothstep(0.0, 0.86, progress);
  float exitFade = smoothstep(1.0, ${SDF_BLOB_EXIT_FADE_START}, progress);

  float wobble = noise(uv * 7.0 + uTime * 0.18) * 0.035;
  float ringNoise = noise(vec2(atan(p.y, p.x) * 2.0, uTime * 0.18)) * 0.075;
  float dCircle = circleSdf(p, vec2(0.0), 0.04 + grow * 0.64);
  float dWarped = circleSdf(p, vec2(0.0), 0.04 + grow * 0.62 + ringNoise * smoothstep(0.08, 0.96, progress));

  float m0 = circleSdf(p, vec2(-0.26, -0.08), 0.06 + grow * 0.42 + wobble);
  float m1 = circleSdf(p, vec2(0.24, 0.12), 0.06 + grow * 0.40 - wobble * 0.5);
  float dMerge = smin(m0, m1, 0.18);

  // Rotating a disc about the origin to find the nearest sector centre turns one
  // circle into a ring of lobes without needing an SDF per lobe.
  float angle = atan(p.y, p.x);
  float sector3 = 2.0 * PI / 3.0;
  float sector5 = 2.0 * PI / 5.0;
  float a3 = floor((angle + PI) / sector3 + 0.5) * sector3 - PI;
  float a5 = floor((angle + PI) / sector5 + 0.5) * sector5 - PI;
  float r0 = 0.17 + grow * 0.24;
  float r1 = 0.30 + grow * 0.18;
  float dR0 = circleSdf(p, vec2(cos(a3), sin(a3)) * r0, 0.04 + grow * 0.22 + wobble * 0.4);
  float dR1 = circleSdf(p, vec2(cos(a5), sin(a5)) * r1, 0.035 + grow * 0.18);
  float dRadial = smin(dR0, dR1, 0.14);

  float f0 = circleSdf(p, vec2(-0.28, -0.10), 0.08 + grow * 0.46 + wobble);
  float f1 = circleSdf(p, vec2(0.00, 0.16), 0.06 + grow * 0.42 - wobble * 0.5);
  float f2 = circleSdf(p, vec2(0.30, -0.06), 0.05 + grow * 0.40 + wobble * 0.6);
  float f3 = circleSdf(p, vec2(-0.02, -0.30), 0.04 + grow * 0.34);
  float dFinal = smin(smin(f0, f1, 0.18), smin(f2, f3, 0.16), 0.20);
  dFinal = smin(dFinal, dRadial, 0.16);

  float d = dFinal;
  if (uVariant < 0.5) {
    d = dCircle;
  } else if (uVariant < 1.5) {
    d = dWarped;
  } else if (uVariant < 2.5) {
    d = dMerge;
  } else if (uVariant < 3.5) {
    d = dRadial;
  }

  // exp(-d*d*k) peaks on the isosurface where d is 0 and falls off on both
  // sides, which draws the outline without ever testing d against a threshold.
  float edge = exp(-d * d * 160.0) * exitFade;
  float fill = smoothstep(0.08, -0.10, d) * smoothstep(0.0, ${SDF_BLOB_ENTRY_FADE_PROGRESS}, progress) * exitFade;

  // Re-seeding the cell hash from a quantised time steps the flecks in discrete
  // jumps. Continuous flicker would be a strobe at this frequency; stepping it
  // reads as debris being carried across the sweep.
  float cell = hash(floor((uv + noise(uv * 11.0) * 0.01) * uRes / 7.0) + floor(uTime * 10.0));
  float flecks = step(0.78, cell) * edge * 0.22 * smoothstep(1.5, 4.0, uVariant);

  vec3 rose = vec3(1.0, 0.23, 0.58);
  vec3 apricot = vec3(1.0, 0.70, 0.38);
  vec3 mint = vec3(0.42, 0.94, 0.78);
  vec3 color = mix(rose, apricot, smoothstep(-0.35, 0.35, p.x + noise(uv * 5.0) * 0.18));
  color = mix(color, mint, smoothstep(0.12, 0.7, p.y + grow * 0.16));

  float alpha = (fill * 0.24 + edge * 0.72 + flecks) * uAlpha;
  gl_FragColor = vec4(color * alpha + vec3(1.0) * edge * 0.18 * uAlpha, clamp(alpha, 0.0, ${SDF_BLOB_MAX_ALPHA}));
}
`

/**
 * Variant name to the float the shader branches on.
 *
 * A float rather than a string uniform because the shader is one program with a
 * chain of `if`s: recompiling per variant would mean a fresh compile on every
 * change to a live control, which is exactly the frame the change happens on.
 */
export const SDF_BLOB_VARIANTS = {
  circle: 0,
  final: 4,
  merge: 2,
  radial: 3,
  warped: 1,
} as const

/** Total sweep time, in milliseconds. */
export const SDF_BLOB_DEFAULT_DURATION_MS = 1120

/**
 * Progress over which the leading cover clears.
 *
 * A Vue slot cannot be snapshotted the way the React original holds its previous
 * children, so the slot's content is already the new content on the first frame
 * of the sweep. The blob's edge is thin at low progress, which means that swap
 * would otherwise be visible before the overlay covers it. An opaque cover behind
 * the canvas absorbs the seam: fully opaque on frame one, clearing while the blob
 * is still wide enough to read as a shape.
 *
 * Kept short deliberately, and shorter than the shared default, because a longer
 * cover would show as a flat colour panel rather than as the edge of a blob.
 * See `utils/transition-cover` for the mechanism this feeds.
 */
export const SDF_BLOB_COVER_CLEAR_PROGRESS = 0.16

/** Colour of the leading cover, matching the shader's rose/apricot mid-tone. */
export const SDF_BLOB_COVER_COLOR = 'rgb(253 132 154)'

/**
 * CSS fallback for a context the browser will not give us.
 *
 * The same leading-cover idea, expressed as a scale-and-fade so the component
 * still reads as a blob transition rather than as a plain crossfade. The blob is
 * a radial gradient rather than an SDF, which is the point: this path has to
 * preserve the effect's timing and colour, not its edge.
 */
export const SDF_BLOB_FALLBACK_MAX_SCALE = 2.6
