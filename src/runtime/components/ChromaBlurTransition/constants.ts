/**
 * Chroma blur transition.
 *
 * A single fragment shader draws a diagonal curtain with a split colour fringe.
 * The curtain is one gaussian band over a diagonal field, and `chroma` is the
 * same band sampled twice, slightly either side of the centre — that offset pair
 * is what makes the edge read as a lens rather than as a blurred line.
 *
 * The band is held back by an entry fade over the first 16% of the sweep: at
 * progress zero the field has not been crossed yet, so without the fade the first
 * frame would be invisible.
 */

/** Total sweep time, in milliseconds. */
export const CHROMA_BLUR_DEFAULT_DURATION_MS = 1040

/**
 * Fade applied after the curtain has crossed the frame.
 *
 * The band is still visible at the far corner when progress reaches one, so the
 * fade is what removes it rather than the sweep running out of room.
 */
export const CHROMA_BLUR_OUTRO_MS = 90

/**
 * Fraction of the sweep over which the leading cover clears.
 *
 * Longer than the shared 22%: the curtain enters from one corner and the swap
 * should stay hidden until the band is properly inside the panel, or the new
 * content would appear beside a curtain that had barely started moving.
 */
export const CHROMA_BLUR_CONTENT_SWAP_RATIO = 0.3

/**
 * Colour of the leading cover.
 *
 * The curtain mixes brand pink, champagne and seafoam, so the cover sits on the
 * warm side of that palette and is only ever seen for the length of one sweep.
 */
export const CHROMA_BLUR_COVER_COLOR = 'rgb(88 34 56)'

/**
 * CSS fallback for a context the browser will not give us.
 *
 * A diagonal band that travels across the frame over the sweep's duration. It
 * cannot reproduce the split fringe or the grain, so the point is that the
 * transition still happens, still takes the requested time, and still fires
 * `rest`.
 */
export const CHROMA_BLUR_FALLBACK_GRADIENT
  = 'linear-gradient(112deg, transparent 28%, rgb(255 82 163 / 78%) 42%, rgb(255 209 143 / 88%) 49%, rgb(133 230 199 / 72%) 56%, transparent 70%)'

/**
 * Travel of the fallback band, as a percentage of its own width either side of
 * centre. Wide enough that the band enters and leaves the frame completely.
 */
export const CHROMA_BLUR_FALLBACK_TRAVEL_PERCENT = 120

/**
 * The GLSL below reads these values, so they are declared above the string and
 * interpolated rather than repeated as literals inside it.
 */
export const CHROMA_BLUR_FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;
uniform float uAlpha;
#define PI 3.14159265359

float hash(vec2 p){ return fract(sin(dot(p, vec2(41.0, 289.0))) * 45758.5453); }
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

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float p = smoothstep(0.0, 1.0, uProgress);
  float field = uv.x * 0.62 + uv.y * 0.38;
  float n = noise(uv * 10.0 + vec2(uTime * 0.28, -uTime * 0.18));
  float wave = sin((uv.y + n * 0.12) * 28.0 + uTime * 2.2) * 0.018;
  float front = p * 1.42 - 0.2;
  float d = field + wave - front;

  float curtain = exp(-d * d * 34.0);
  float softGrain = noise(uv * 34.0 + uTime * 0.18) * 0.055;
  float chroma = exp(-(d + 0.045) * (d + 0.045) * 52.0) + exp(-(d - 0.045) * (d - 0.045) * 52.0);
  float exitFade = smoothstep(1.0, 0.74, p);
  float entryFade = smoothstep(0.0, 0.16, p);

  vec3 brandPink = vec3(1.0, 0.32, 0.64);
  vec3 champagne = vec3(1.0, 0.82, 0.56);
  vec3 seafoam = vec3(0.52, 0.90, 0.78);
  vec3 porcelain = vec3(1.0, 0.97, 0.90);
  vec3 color = mix(brandPink, champagne, smoothstep(-0.18, 0.18, sin((uv.y + n) * PI * 2.0)));
  color = mix(color, seafoam, smoothstep(0.2, 1.0, chroma) * 0.34);
  color = mix(color, porcelain, 0.16);

  float alpha = (curtain * 0.72 + chroma * 0.18 + softGrain * curtain) * entryFade * exitFade * uAlpha;
  gl_FragColor = vec4(color * alpha, clamp(alpha, 0.0, 0.86));
}
`
