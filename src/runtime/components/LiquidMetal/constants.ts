/**
 * Constants for `MLiquidMetal`.
 *
 * The material is a domain-warped fBm height field read as a normal, then lit by
 * a single key light plus a Fresnel rim. Every variant is the same shader with a
 * different (low, high, tint) triple, so switching variant is a uniform write.
 */

/** Variant names, in the order the shader's index branches expect. */
export const LIQUID_METAL_VARIANT_NAMES = ['chrome', 'gold', 'mercury', 'oil'] as const

export type LiquidMetalVariant = (typeof LIQUID_METAL_VARIANT_NAMES)[number]

export const LIQUID_METAL_VARIANTS: Record<LiquidMetalVariant, number> = {
  chrome: 0,
  gold: 1,
  mercury: 2,
  oil: 3,
}

export const LIQUID_METAL_DEFAULT_SPEED = 1
export const LIQUID_METAL_DEFAULT_DISTORTION = 1

/**
 * Distortion is clamped to this range in the shader.
 *
 * The upper bound is where the warp field folds onto itself; past it the normals
 * stop varying smoothly and the surface tears into visible seams.
 */
export const LIQUID_METAL_MAX_DISTORTION = 3

/**
 * Longest frame delta fed into the clock, in seconds.
 *
 * Without this, returning to a backgrounded tab would advance the flow by however
 * long the tab was hidden — the jump lands as a visible jerk on the first frame.
 */
export const LIQUID_METAL_MAX_FRAME_DELTA = 1 / 20

/** Pointer easing per frame. Low enough to feel weighted, high enough to track. */
export const LIQUID_METAL_POINTER_EASE = 0.08

/** Pointer travel in shader units at the far edge of the element. */
export const LIQUID_METAL_POINTER_RANGE = 2

/** Pointer origin, matching the shader's centred coordinate space. */
export const LIQUID_METAL_POINTER_CENTER = 0.5

/** Seconds for one full pass of the masked-text gradient. */
export const LIQUID_METAL_TEXT_SWEEP_SECONDS = 9

/** Gradient travel, in percent. Matches `TEXT_SWEEP_SECONDS` for a seamless loop. */
export const LIQUID_METAL_TEXT_SWEEP_RANGE = 100

/** How far the masked-text gradient shifts in response to the pointer. */
export const LIQUID_METAL_TEXT_POINTER_SHIFT = 18

/**
 * Gradient size for masked text.
 *
 * Widen past 100% so the sweep has a lead-in and tail-out instead of the stop
 * arriving exactly as the gradient edge does.
 */
export const LIQUID_METAL_TEXT_BACKGROUND_SIZE = '300% 100%'

/** Resting gradient position for masked text: the middle of the sweep range. */
export const LIQUID_METAL_TEXT_REST_POSITION = `${(LIQUID_METAL_TEXT_SWEEP_RANGE / 2).toFixed(0)}% 50%`

/**
 * Static CSS stand-ins used when WebGL2 is unavailable or motion is reduced.
 *
 * Hex is intentional: these mirror the shader's palettes, which theme tokens
 * cannot express. Each is a conic sweep, because a conic gradient is the closest
 * CSS primitive to a reflection off a curved surface — a linear one reads as a
 * flat banner, not as metal.
 */
export const LIQUID_METAL_FALLBACK_SURFACE: Record<LiquidMetalVariant, string> = {
  chrome: 'conic-gradient(from 210deg at 50% 50%, #0b0d10, #8f9aa8, #e9eef5, #6f7b8c, #cfd7e2, #14181d, #b9c3cf, #0b0d10)',
  gold: 'conic-gradient(from 210deg at 50% 50%, #3a2708, #b3832a, #f6dd8f, #8a5f16, #ffeeb5, #2a1c05, #d9a842, #3a2708)',
  mercury: 'conic-gradient(from 200deg at 50% 50%, #10141a, #7f8b99, #dbe4ee, #55606d, #ffffff, #1b2028, #a6b2c0, #10141a)',
  oil: 'conic-gradient(from 190deg at 50% 50%, #1b1035, #3f7fd6, #38d0c0, #b9e05f, #f2a03d, #e0509b, #6b3fd6, #1b1035)',
}

/**
 * Linear gradients for masked text.
 *
 * The sweep runs along the text's own axis, so a conic gradient would read as a
 * rotating disc behind the glyphs rather than as light travelling across them.
 */
export const LIQUID_METAL_TEXT_SURFACE: Record<LiquidMetalVariant, string> = {
  chrome: 'linear-gradient(100deg, #4a545f 0%, #e9eef5 16%, #8f9aa8 32%, #ffffff 46%, #6f7b8c 62%, #dfe6ef 78%, #3c454f 100%)',
  gold: 'linear-gradient(100deg, #7a5410 0%, #f6dd8f 16%, #b3832a 32%, #fff6d0 46%, #8a5f16 62%, #edc862 78%, #6a460b 100%)',
  mercury: 'linear-gradient(100deg, #55606d 0%, #dbe4ee 16%, #8f9aa8 32%, #ffffff 46%, #6b7684 62%, #cfd9e5 78%, #454f5b 100%)',
  oil: 'linear-gradient(100deg, #3f7fd6 0%, #38d0c0 16%, #b9e05f 32%, #f2a03d 46%, #e0509b 62%, #6b3fd6 78%, #3f7fd6 100%)',
}

/**
 * WebGL2-only.
 *
 * The shader declares `#version 300 es`, uses an `out` variable and `mat2`
 * literals. A WebGL1 context cannot compile it, so `createWebGLProgram` returns
 * `null` there and the component takes its fallback path — which is the correct
 * outcome, not an error to surface.
 */
export const LIQUID_METAL_VERTEX_SHADER = `#version 300 es
in vec2 a;
void main(){ gl_Position = vec4(a, 0.0, 1.0); }`

export const LIQUID_METAL_FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform float uTime;
uniform float uDistortion;
uniform float uVariant;
uniform vec2 uPointer;

float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

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

float fbm(vec2 p){
  float value = 0.0;
  float amplitude = 0.5;
  mat2 turn = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++){
    value += amplitude * noise(p);
    p = turn * p;
    amplitude *= 0.5;
  }
  return value;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (uv - 0.5) * aspect * 2.2;
  vec2 push = uPointer * 0.55;
  float warp = clamp(uDistortion, 0.0, 3.0);

  vec2 q = vec2(fbm(p + push), fbm(p + vec2(5.2, 1.3) - push));
  vec2 flow = p + warp * 3.2 * q;
  vec2 r = vec2(
    fbm(flow + vec2(1.7, 9.2) + uTime * 0.17),
    fbm(flow + vec2(8.3, 2.8) - uTime * 0.13)
  );

  vec2 base = p + warp * 2.8 * r;
  float eps = 0.006;
  float h = fbm(base);
  float hx = fbm(base + vec2(eps, 0.0));
  float hy = fbm(base + vec2(0.0, eps));
  vec3 n = normalize(vec3((h - hx) / eps * 0.05, (h - hy) / eps * 0.05, 1.0));

  vec3 view = normalize(vec3((uv - 0.5) * aspect, 1.0));
  vec3 refl = reflect(view, n);
  float f = clamp(refl.y * 0.5 + 0.5, 0.0, 1.0);
  float sideways = clamp(refl.x * 0.5 + 0.5, 0.0, 1.0);

  vec3 lo = vec3(0.04, 0.05, 0.07);
  vec3 hi = vec3(0.90, 0.94, 0.99);
  vec3 tint = vec3(0.58, 0.68, 0.85);

  if (uVariant > 0.5 && uVariant < 1.5) {
    lo = vec3(0.16, 0.10, 0.02);
    hi = vec3(1.00, 0.90, 0.62);
    tint = vec3(0.82, 0.58, 0.14);
  } else if (uVariant > 1.5 && uVariant < 2.5) {
    lo = vec3(0.06, 0.08, 0.10);
    hi = vec3(1.00, 1.00, 1.00);
    tint = vec3(0.50, 0.58, 0.68);
  } else if (uVariant > 2.5) {
    lo = vec3(0.05, 0.03, 0.14);
    hi = vec3(0.85, 0.92, 1.00);
    tint = vec3(0.35, 0.55, 0.90);
  }

  vec3 col = mix(lo, hi, smoothstep(0.04, 0.96, f));
  col = mix(col, tint, pow(sideways, 2.0) * 0.55);

  float spec = pow(max(dot(n, normalize(vec3(0.35, 0.75, 0.55))), 0.0), 42.0);
  float fresnel = pow(1.0 - clamp(n.z, 0.0, 1.0), 3.0);
  col += spec * 0.85 + fresnel * 0.20;

  if (uVariant > 2.5) {
    vec3 sheen = 0.5 + 0.5 * cos(6.28318 * (f + h * 0.75 + vec3(0.0, 0.33, 0.67)));
    col = mix(col, sheen, 0.72);
  }

  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`
