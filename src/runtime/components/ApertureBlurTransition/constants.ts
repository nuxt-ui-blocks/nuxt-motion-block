/**
 * Aperture blur transition.
 *
 * A single fragment shader draws an iris ring that opens from the centre of the
 * panel. The ring is a thin, noisy band (`exp(-d * d * 210)`) rather than a filled
 * disc, so the sweep reads as a lens opening instead of a circle growing, and the
 * two offsets on the radius give the edge the wobble of a real diaphragm.
 *
 * The ring is held at full strength until 58% of the sweep and then faded, which
 * is why the transition ends on a finished ring rather than on a dissolving one.
 */

/** Total sweep time, in milliseconds. */
export const APERTURE_BLUR_DEFAULT_DURATION_MS = 760

/**
 * Fade applied after the ring has crossed the frame.
 *
 * Shorter than the shared default: the ring is already faint by the time it
 * reaches the edges, and a long fade would keep a half-drawn overlay over the
 * settled content.
 */
export const APERTURE_BLUR_OUTRO_MS = 70

/**
 * Colour of the leading cover.
 *
 * The ring mixes champagne, rose and cyan, so the cover sits on the warm side of
 * that palette and is only ever seen for the length of one sweep.
 */
export const APERTURE_BLUR_COVER_COLOR = 'rgb(92 44 58)'

/**
 * CSS fallback for a context the browser will not give us.
 *
 * A radial band that scales outward over the sweep's duration. It cannot
 * reproduce the noisy edge or the grain, so the point is that the transition
 * still happens, still takes the requested time, and still fires `rest`.
 */
export const APERTURE_BLUR_FALLBACK_GRADIENT
  = 'radial-gradient(circle at 50% 50%, transparent 32%, rgb(255 87 158 / 80%) 42%, rgb(255 209 143 / 92%) 47%, rgb(159 235 255 / 74%) 52%, transparent 62%)'

/** Scale the fallback ring starts at, before it opens outward. */
export const APERTURE_BLUR_FALLBACK_START_SCALE = 0.4

/** Scale the fallback ring reaches at the end of the sweep. */
export const APERTURE_BLUR_FALLBACK_MAX_SCALE = 2.4

/**
 * The GLSL below reads these values, so they are declared above the string and
 * interpolated rather than repeated as literals inside it.
 */
export const APERTURE_BLUR_FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;
uniform float uAlpha;
#define PI 3.14159265359

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;
  float r = length(p);
  float a = atan(p.y, p.x);

  float progress = smoothstep(0.0, 1.0, uProgress);
  float radius = mix(0.05, 0.82, progress);
  float apertureNoise = sin(a * 8.0 + uTime * 0.9) * 0.018 + sin(a * 17.0 - uTime * 0.6) * 0.006;
  float d = r - radius - apertureNoise;

  float exitFade = smoothstep(0.94, 0.58, progress);
  float ring = exp(-d * d * 210.0) * exitFade;
  float innerGlow = smoothstep(radius + 0.18, radius - 0.02, r) * smoothstep(0.0, 0.34, progress) * exitFade;
  float outerFeather = smoothstep(radius + 0.22, radius - 0.04, r) * exitFade * 0.55;
  float grain = hash(floor(uv * uRes / 3.0) + floor(uTime * 18.0)) * 0.045;

  vec3 champagne = vec3(1.0, 0.82, 0.56);
  vec3 rose = vec3(1.0, 0.34, 0.62);
  vec3 cyan = vec3(0.62, 0.92, 1.0);
  vec3 color = mix(champagne, rose, smoothstep(-0.4, 0.4, sin(a * 2.0 + uTime * 0.7)));
  color = mix(color, cyan, ring * 0.38 + smoothstep(0.74, 1.0, progress) * 0.18);

  float highlight = ring * (0.82 + grain) + innerGlow * 0.18 + outerFeather * 0.08;
  float alpha = clamp(highlight * uAlpha, 0.0, 0.88);
  gl_FragColor = vec4(color * alpha + vec3(1.0) * ring * 0.22 * uAlpha, alpha);
}
`
