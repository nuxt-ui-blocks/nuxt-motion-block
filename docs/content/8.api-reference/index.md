---
title: API Reference
description: Module options, the public composables and the machine-readable surface this site publishes.
---

The module's public surface is small on purpose. Everything else is Nuxt UI and Motion for Vue composed underneath.

## Module options

| Option | Type | Default | What it does |
| --- | --- | --- | --- |
| `prefix` | string | `'M'` | Component name prefix. `{ prefix: 'Motion' }` registers `<MotionRetroGrid>` instead of `<MRetroGrid>`. |

Set under `motionBlock` in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'motion-v/nuxt', 'nuxt-motion-block'],
  motionBlock: { prefix: 'M' },
})
```

## Composables

All auto-imported; see [Composables](/composables) for usage.

| Composable | Signature | What it does |
| --- | --- | --- |
| `useMotionBlockUI` | `({ name, props, theme }) => ({ props, ui })` | Merges a component's `tv` theme with your `app.config.ts` `ui.<name>` overrides, in Nuxt UI's precedence order. |
| `useThemeColor` | `(options?: { target?: HTMLElement \| (() => HTMLElement \| undefined), fallback?: string }) => Ref<string \| null>` | SSR-safe theme color resolution. Literals pass through; tokens become `var(--ui-*)` on the server. |
| `useCanvasCursor` | `(canvasRef: Ref<HTMLCanvasElement>, options?: { color?: string }) => void` | Wave-trail pointer effect; owns the frame loop and cancels it on unmount. |
| `useFluidCursor` | `(canvasRef: Ref<HTMLCanvasElement>, options?: { color?: string }) => void` | WebGL fluid simulation bound to a canvas. |

## Machine-readable surface

What this site publishes for agents:

- `/llms.txt` - the index of every page, one line each.
- `/llms-full.txt` - the full documentation concatenated as markdown.
- `/raw/<path>.md` - the source markdown for any page; the same content `/components/...` serves as HTML.
- `/sitemap.md` and `/sitemap.xml` - the site map in markdown and XML.
- `/openapi.json` - an OpenAPI description of this site's endpoints.

## Stdio MCP server

`npx nuxt-motion-block-mcp` runs the server locally; it exposes two read-only tools, `list-pages` and `get-page`. Setup for common agents is in [AI Agents](/getting-started/ai-agents).

## Next steps

- [Installation](/getting-started/installation)
- [Composables](/composables)
- [AI Agents](/getting-started/ai-agents)
