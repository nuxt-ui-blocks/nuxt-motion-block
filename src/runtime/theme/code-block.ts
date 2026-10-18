import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative group',
    container: 'relative overflow-hidden rounded-lg border border-default bg-[#0d1117] text-sm',
    header: 'flex items-center justify-between px-4 py-2 border-b border-default',
    language: 'text-xs text-gray-400 font-mono',
    copyButton: 'text-gray-400 hover:text-white transition-colors',
    copy: 'text-xs',
    copied: 'text-xs text-green-400',
    lineNumbers: 'absolute left-0 top-0 bottom-0 w-12 flex flex-col items-end pr-3 pt-4 text-gray-600 text-xs font-mono select-none border-r border-default',
    lineNumber: 'leading-6',
    body: 'code-body',
    diffBody: 'overflow-x-auto py-1 font-mono text-xs leading-relaxed',
    diffLine: 'flex gap-3 px-3',
    diffLineNumber: 'w-6 shrink-0 select-none text-right tabular-nums text-muted',
    diffLinePrefix: 'w-2 shrink-0 select-none',
    diffLineContent: 'whitespace-pre text-default',
  },
  variants: {
    kind: {
      added: {
        diffLine: 'bg-[oklch(72%_0.17_150_/_0.12)]',
        diffLinePrefix: 'text-[oklch(52%_0.17_150)]',
      },
      removed: {
        diffLine: 'bg-[oklch(63%_0.21_25_/_0.1)]',
        diffLinePrefix: 'text-error',
      },
      context: {
        diffLinePrefix: 'text-muted',
      },
    },
  },
}

export type CodeBlockTheme = typeof defaultTheme

export type CodeBlockConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'codeBlock', 'ui'>

export default defaultTheme
