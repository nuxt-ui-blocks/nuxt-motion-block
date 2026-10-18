import type { ComponentConfig } from '@nuxt/ui'

const BLOB = 'absolute [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]'

const defaultTheme = {
  slots: {
    root: 'h-full w-full overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
    content: '',
    gradients: 'gradients-container h-full w-full blur-lg',
    first: `${BLOB} [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat] [transform-origin:center_center] animate-first opacity-100`,
    second: `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-400px)] animate-second opacity-100`,
    third: `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [transform-origin:calc(50%+400px)] animate-third opacity-100`,
    fourth: `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-200px)] animate-fourth opacity-70`,
    fifth: `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100`,
    pointer: 'absolute [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] opacity-70',
  },
  variants: {
    safari: {
      true: {
        gradients: 'blur-2xl',
      },
      false: {
        gradients: '[filter:url(#blurMe)_blur(40px)]',
      },
    },
  },
}

export type BackgroundGradientAnimationTheme = typeof defaultTheme

export type BackgroundGradientAnimationConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'backgroundGradientAnimation', 'ui'>

export default defaultTheme
