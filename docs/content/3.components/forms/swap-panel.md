---
title: Swap Panel
description: A token swap form with a quoted output, countdown ring and a state-aware action button.
---

A compact swap ticket. You type an amount in the pay field, the receive field
shows the quoted output, and a round button between the rows flips the pair.
Under the rows the rate, fee, price impact and slippage sit in one quiet line,
with a ring counting down the life of the quote.

The panel is controlled where it matters: `amount` works with `v-model:amount`,
and every control emits the intent (flip, choose a token, submit) rather than
owns the swap. That keeps quote fetching and submission inside your app while
the layout, formatting and states stay here.

## Usage

Pass the two tokens, the list they can be picked from, and a quote. With
`status` left at `idle`, the button reads **Review swap**.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="swap-panel-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center p-6">
    <MSwapPanel
      v-model:amount="amount"
      :from="from"
      :to="to"
      :quote="quote"
      :status="status"
      :tokens="tokens"
      @flip="flip"
      @select-token="selectToken"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Token {
  balance: number
  icon: string
  name: string
  symbol: string
}

const amount = ref('1')
const pair = ref<[string, string]>(['ETH', 'USDC'])
const expiresAt = ref(Date.now() + 45_000)

const tokens: Token[] = [
  { name: 'Ether', symbol: 'ETH', balance: 4.28, icon: 'i-lucide-gem' },
  { name: 'USD Coin', symbol: 'USDC', balance: 1240.5, icon: 'i-lucide-circle-dollar-sign' },
  { name: 'Dai', symbol: 'DAI', balance: 860, icon: 'i-lucide-landmark' },
  { name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: 0.42, icon: 'i-lucide-bitcoin' },
]

const prices: Record<string, number> = {
  ETH: 3240,
  USDC: 1,
  DAI: 1,
  WBTC: 68_000,
}

function tokenFor(symbol: string) {
  return tokens.find(token => token.symbol === symbol) ?? tokens[0]!
}

const from = computed(() => tokenFor(pair.value[0]))
const to = computed(() => tokenFor(pair.value[1]))
const rate = computed(() => (prices[from.value.symbol] ?? 1) / (prices[to.value.symbol] ?? 1))

const quote = computed(() => {
  const value = Number(amount.value)

  if (!amount.value || Number.isNaN(value)) {
    return undefined
  }

  return {
    output: value * rate.value,
    rate: rate.value,
    fee: value * 0.0008,
    priceImpact: 0.0012,
    expiresAt: expiresAt.value,
  }
})

const status = computed(() => (amount.value ? 'ready' : 'idle'))

watch(amount, () => {
  expiresAt.value = Date.now() + 45_000
})

function flip() {
  pair.value = [pair.value[1], pair.value[0]]
}

function selectToken(side: 'from' | 'to', token?: Token) {
  if (!token) {
    return
  }

  const next: [string, string] = [pair.value[0], pair.value[1]]

  if (side === 'from') {
    if (token.symbol === next[1]) {
      next[1] = next[0]
    }
    next[0] = token.symbol
  }
  else {
    if (token.symbol === next[0]) {
      next[0] = next[1]
    }
    next[1] = token.symbol
  }

  pair.value = next
  expiresAt.value = Date.now() + 45_000
}
</script>
```
::

`quote.rate` is the price of one `from` token in `to` tokens, and `quote.output`
is the absolute receive amount. `fee` is expressed in the receive token.
`priceImpact` and `slippage` are fractions, so `0.005` renders as 0.5%.

`tokens` turns each chip into a Nuxt UI dropdown menu. Leave it out and the
chips go back to emitting `select-token` so you can open your own picker.

## Customize

Use `error` for a balance problem and `status` for the lifecycle. While
`quoting` the receive row sweeps a shimmer; while `submitting` the button spins
and disables; `error` turns the button into **Try again**.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="swap-panel-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-3 p-6">
    <MSwapPanel
      v-model:amount="amount"
      :error="error"
      :from="from"
      :quote="quote"
      :slippage="0.005"
      :status="status"
      :to="to"
      :tokens="tokens"
      @flip="flip"
      @select-token="selectToken"
      @submit="submit"
    />

    <p class="text-sm text-muted">
      {{ note }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

type Status = 'idle' | 'quoting' | 'ready' | 'submitting' | 'error'

const amount = ref('500')
const status = ref<Status>('ready')
const note = ref('Balance, slippage and errors update as you type.')
const isUsdc = ref(true)

const eth = {
  name: 'Ether',
  symbol: 'ETH',
  balance: 4.28,
  icon: 'i-lucide-gem',
}
const usdc = {
  name: 'USD Coin',
  symbol: 'USDC',
  balance: 1240.5,
  icon: 'i-lucide-circle-dollar-sign',
}

const tokens = [eth, usdc]

const from = computed(() => (isUsdc.value ? usdc : eth))
const to = computed(() => (isUsdc.value ? eth : usdc))

const error = computed(() => {
  const value = Number(amount.value)

  if (!amount.value) {
    return undefined
  }

  if (Number.isNaN(value)) {
    return 'Enter a valid amount.'
  }

  return value > from.value.balance
    ? `Amount exceeds your ${from.value.symbol} balance.`
    : undefined
})

const rate = computed(() => (isUsdc.value ? 1 / 3240 : 3240))
const expiresAt = ref(Date.now() + 30_000)

const quote = computed(() => {
  const value = Number(amount.value)

  if (!amount.value || Number.isNaN(value)) {
    return undefined
  }

  return {
    output: value * rate.value,
    rate: rate.value,
    fee: value * 0.0004,
    priceImpact: 0.004,
    expiresAt: expiresAt.value,
  }
})

watch(error, (message) => {
  if (message) {
    status.value = 'error'
  }
  else if (status.value === 'error') {
    status.value = 'ready'
  }
})

watch(amount, () => {
  expiresAt.value = Date.now() + 30_000
})

function selectToken(side: 'from' | 'to', token?: { symbol: string }) {
  if (!token) {
    return
  }

  isUsdc.value = side === 'from'
    ? token.symbol === 'USDC'
    : token.symbol === 'ETH'
  note.value = `${token.symbol} selected for the ${side === 'from' ? 'pay' : 'receive'} side.`
  expiresAt.value = Date.now() + 30_000
}

let timer: ReturnType<typeof setTimeout> | undefined

function submit() {
  if (error.value) {
    return
  }

  status.value = 'quoting'
  note.value = 'Fetching a fresh quote…'

  timer = setTimeout(() => {
    status.value = 'submitting'
    note.value = 'Submitting the swap…'

    timer = setTimeout(() => {
      status.value = 'ready'
      note.value = 'Swap submitted. Quote refreshed.'
    }, 1000)
  }, 600)
}

function flip() {
  isUsdc.value = !isUsdc.value
  note.value = 'Tokens flipped.'
}

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>
```
::

The quote ring only starts after mount, so a server-rendered panel does not
commit a timestamp it cannot match on the client. It updates every 100ms, stops
at zero and is cleaned up on unmount. The output figure animates in when the
number changes; the amount itself is never reformatted while you type.

## Props

::component-props
  ::component-prop{name="from" type="SwapToken"}
  Token being paid. Takes `name`, `symbol` and optional `balance` and `icon`.
  ::
  ::component-prop{name="to" type="SwapToken"}
  Token being received.
  ::
  ::component-prop{name="tokens" type="SwapToken[]"}
  Tokens offered by the built-in chip menus. Omit it to emit `select-token` and
  open your own picker.
  ::
  ::component-prop{name="amount" type="string"}
  Controlled pay amount. Leave it out to let the panel keep the value.
  ::
  ::component-prop{name="quote" type="SwapQuote"}
  Current quote with `output` and `rate`, plus optional `fee`, `priceImpact`
  and `expiresAt` in epoch milliseconds.
  ::
  ::component-prop{name="status" type="'idle' | 'quoting' | 'ready' | 'submitting' | 'error'" default="idle"}
  Drives the shimmer, the button label and the disabled state.
  ::
  ::component-prop{name="error" type="string"}
  Error copy shown below the panel in a live alert.
  ::
  ::component-prop{name="slippage" type="number"}
  Maximum slippage as a fraction, shown in the quote line.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root.
  ::
::

## Events

::component-props
  ::component-prop{name="update:amount" type="(value: string) => void"}
  Fired on each keystroke and when **Max** fills the pay balance.
  ::
  ::component-prop{name="flip" type="() => void"}
  Fired by the round button between the rows. Swap `from` and `to` in response.
  ::
  ::component-prop{name="select-token" type="(side: 'from' | 'to', token?: SwapToken) => void"}
  Fired by the chip menus with the chosen token, or by the chips alone when
  `tokens` is omitted.
  ::
  ::component-prop{name="submit" type="() => void"}
  Fired by the action button. The panel does not submit anything itself.
  ::
::

## Accessibility

- The pay field has a real `<label>` bound to its input and uses
  `inputmode="decimal"`, so mobile keyboards show digits without forbidding a
  decimal separator.
- The receive value is a polite live region labelled **You receive**, so a new
  quote is announced without moving focus out of the pay field.
- Token chips are menu triggers built on `UDropdownMenu`. They expose
  `aria-haspopup`, `aria-expanded` and labels such as "Change pay token,
  currently ETH", and the menu keeps arrow keys, typeahead, `Escape` and focus
  return working without custom key handling.
- The selected token is marked with a check in the menu and reads
  "*Selected*" in its description, so the state is announced as well as drawn.
- The flip control is a button with the label "Flip pay and receive tokens".
  Only its icon rotates, so the hit area and focus ring stay still.
- A quoting shimmer is replaced by a static tint under `prefers-reduced-motion`.
  The busy state is also carried by the button label and disabled attribute, not
  by the shimmer alone.
- The submit button disables while quoting or submitting and shows **Swapping…**
  with a spinner while the request is in flight.
- Errors use `role="alert"` and a written message; the red text is not the only
  signal.
- The countdown ring is `aria-hidden` and paired with hidden text that reads
  "Quote expires in N seconds". The ring is not the only way to know the quote
  is ageing.
- All formatting uses `Intl.NumberFormat`, so amounts and percentages follow
  the chosen locale rather than hard-coded separators.

## Performance

- The receive figure is a keyed span with a CSS entrance animation; a new value
  replaces the old node and animates once, with no measuring or layout reads.
- The quoting shimmer is a single compositor-friendly `translateX` animation
  and is removed entirely in reduced-motion mode.
- The countdown interval runs only after mount, only while `quote.expiresAt`
  exists, updates one ref every 100ms, stops itself at zero and is cleared on
  unmount. No timestamp is rendered during SSR.
- Number formatters are created once at module scope, not per render or per
  keystroke.
- The picker delegates positioning, portals and keyboard handling to Nuxt UI,
  so no extra listbox state or scroll listeners live in the panel.
- The panel keeps no quote cache and performs no requests; typing emits the
  value and the parent decides how to quote it.
