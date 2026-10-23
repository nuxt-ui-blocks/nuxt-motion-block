---
title: GitHub Stars Animation
description: A repository star count that counts up beside an overlapping stack of stargazer avatars.
---

A small piece of social proof for a README, a landing page or a project card.
Five avatars overlap into a stack, each one entering a beat after the last, and
the star count climbs from zero to the repository total over two seconds.

The component can fetch the numbers itself from a repository, or take
`stargazers` and `starCount` directly. Providing both skips the request
entirely, which is what the examples do, so a docs page or a test never depends
on the GitHub API being reachable.

## Usage

Pass a count and a list of stargazers with `login`, `avatar_url` and `html_url`.
The avatar stack is capped by `maxAvatars`.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="github-stars-animation-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center p-6">
    <MGitHubStarsAnimation
      :star-count="1284"
      :stargazers="stargazers"
    />
  </div>
</template>

<script setup lang="ts">
const stargazers = [
  {
    login: 'averycole',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/averycole',
  },
  {
    login: 'jordanlee',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/jordanlee',
  },
  {
    login: 'samrivera',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/samrivera',
  },
  {
    login: 'morganchen',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/morganchen',
  },
  {
    login: 'rileyng',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/rileyng',
  },
]
</script>
```

::

Leave out `starCount` and the component asks GitHub for the repository named by
`owner` and `repo` after mount. Nothing is fetched on the server, so the markup
is identical for every visitor. Supplying `starCount` alone skips the request
and leaves the avatar stack empty, which is the compact form.

## Customize

`showAvatars` drops the stack and leaves the count on its own. The count also
accepts a class through `countClassName`, which is handy when the widget is the
headline rather than a footnote.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="github-stars-animation-custom" />
  :::
#code
  <PlaygroundCode name="GitHubStarsAnimation" />
::

The fetch can be pointed at your own endpoint with `apiEndpoint`; it receives
`owner` and `repo` as query parameters and should answer with `{ stars,
stargazers }`. A failed request leaves the component empty instead of showing a
zero that is not true.

## Props

::component-props
  ::component-prop{name="starCount" type="number"}
  Star total. When provided, no request is made, even if `stargazers` is omitted.
  ::
  ::component-prop{name="stargazers" type="Stargazer[]"}
  Avatars to show. Each entry takes `login`, `avatar_url` and `html_url`. Only
  used as-is when `starCount` is also provided.
  ::
  ::component-prop{name="owner" type="string" default="'vuejs'"}
  Repository owner used when neither data prop is supplied.
  ::
  ::component-prop{name="repo" type="string" default="'core'"}
  Repository name used when neither data prop is supplied.
  ::
  ::component-prop{name="apiEndpoint" type="string"}
  Custom endpoint for the star data. Falls back to the GitHub API.
  ::
  ::component-prop{name="maxAvatars" type="number" default="5"}
  Maximum number of avatars in the stack.
  ::
  ::component-prop{name="showAvatars" type="boolean" default="true"}
  Hide the avatar stack and render only the count.
  ::
  ::component-prop{name="avatarClassName" type="string"}
  Extra classes for each avatar link.
  ::
  ::component-prop{name="countClassName" type="string"}
  Extra classes for the count row.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root.
  ::
::

## Accessibility

- Each avatar is a real link with an `aria-label` naming the profile, plus an
  `alt` of `<login>'s avatar`. The two never repeat silently in the same tab
  stop.
- Links open in a new tab with `rel="noopener noreferrer"`, so the original page
  keeps its opener state.
- The star icon is decorative; the count and the "star"/"stars" suffix are real
  text, so the number is never conveyed by an icon alone.
- Count-up is presentation only: it is not wrapped in a live region, so screen
  readers do not hear the same figure climbing for two seconds. They read the
  final value when they reach it.
- The count lands on the exact value at the end rather than a rounded one, and
  the plural switches at one.
- Under `prefers-reduced-motion` the counter jumps straight to the total and the
  avatar and count entrances are disabled.
- The loading skeleton is hidden from assistive technology; there is no live
  announcement for a state that usually resolves in a second.

## Performance

- Passing `starCount` avoids the network completely. Otherwise the request
  starts after mount and is aborted if the component unmounts.
- The countdown uses a single animation frame loop that cancels itself at the
  target and is cleared on unmount.
- Only the count text updates while the loop runs; the avatar list and layout do
  not re-render.
- Avatar and count entrances are CSS animations, and the count is laid out in
  tabular figures so the row does not jump as digits change.
- The avatar stack overlaps with negative margins, so it adds no measurement or
  wrapper per avatar.
