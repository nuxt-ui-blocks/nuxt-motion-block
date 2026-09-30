import type { AiUIMessage } from '../types/ai'

/**
 * The plain text of a turn.
 *
 * Mirrors what Nuxt UI's own helper does, in three lines, so the module keeps
 * working whether or not the AI SDK is installed and whether or not its types
 * resolve. Only `text` parts count: a reasoning trace or a file attachment is
 * not what a reader means by "the message".
 */
export const getAiMessageText = (message: Pick<AiUIMessage, 'parts'>): string =>
  message.parts
    .filter(part => part.type === 'text' && typeof part.text === 'string')
    .map(part => part.text)
    .join('')
