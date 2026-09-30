/**
 * Structural stand-ins for the AI SDK's chat types.
 *
 * `ai` is an *optional* peer dependency of `@nuxt/ui`, so it is not guaranteed to
 * be installed. Nuxt UI's own `Chat*` components type their message props against
 * it, which means those particular types quietly degrade to `any` here (the
 * runtime is never missing — only the type is). Declaring the shape these
 * components actually rely on keeps the AI components type-safe without dragging
 * the AI SDK into every install of this module.
 *
 * Everything is deliberately open: `type` and `state` stay plain strings so a
 * part the SDK adds later cannot break a consumer's build.
 */

/** Who authored a turn. */
export type AiMessageRole = 'system' | 'user' | 'assistant'

/**
 * One piece of a turn.
 *
 * `type` discriminates the part (`text`, `reasoning`, `file`, `source`,
 * `step-start`, `tool-*`, `dynamic-tool`, …) and `state` carries the lifecycle of
 * the parts that have one.
 */
export interface AiMessagePart {
  type: string
  state?: string
  text?: string
}

/**
 * A single turn, shaped like the AI SDK's `UIMessage`.
 *
 * This is the minimum `ChatMessage`, `ChatTool`, and `ChatReasoning` need; any
 * extra keys the SDK puts on a message are preserved by assigning through
 * `metadata` or by spreading onto a `Record` cast.
 */
export interface AiUIMessage {
  id: string
  role: AiMessageRole
  parts: AiMessagePart[]
  metadata?: unknown
}

/**
 * The conversation's lifecycle, matching the `status` that `ChatPromptSubmit`
 * accepts.
 *
 * `ready` means the surface can accept input, `submitted` means the turn is in
 * flight but nothing has arrived yet, `streaming` means tokens are arriving, and
 * `error` means the turn failed.
 */
export type AiChatStatus = 'ready' | 'submitted' | 'streaming' | 'error'

/**
 * How a tool call is progressing.
 *
 * Deliberately kept as its own four-value vocabulary rather than collapsed into
 * `ChatStatus`, because a tool call outlives and runs independently of any single
 * conversation state. The component derives the booleans `ChatTool` speaks.
 */
export type AIToolCallStatus = 'pending' | 'running' | 'success' | 'error'

/** Direction a reader leaned on a message. */
export type AiMessageVote = 'up' | 'down'

/**
 * One button in a message's action row.
 *
 * This is the module's own vocabulary rather than Nuxt UI's `ButtonProps` so that
 * the animated row can stay a plain list of icon buttons — the point of the
 * component is the choreography, and a `UButton` per action would fight it.
 */
export interface AiMessageAction {
  key: string
  icon: string
  label: string
  /** Marks a toggle that is currently on, e.g. a vote that has been cast. */
  active?: boolean
  onClick: () => void
}
