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
  },
}

export type CodeBlockTheme = typeof defaultTheme

export type CodeBlockConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'codeBlock', 'ui'>

export default defaultTheme
