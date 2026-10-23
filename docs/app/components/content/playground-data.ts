/**
 * Per-component starter data for the docs `ComponentPlayground`.
 *
 * The playground seeds its control panel from a component's prop defaults, but
 * many components default collection props to `[]` (and let the component fall
 * back to internal constants). That leaves the panel showing an empty shell
 * with nothing to manipulate. Values here are layered *under* any explicit
 * `:defaults` on the `<ComponentPlayground>` usage, so an example can always
 * override them.
 *
 * Two reserved keys are understood by the playground:
 * - `__slot` — raw HTML injected into the component's default slot (rendered
 *   with `v-html`, so it must be plain HTML only — no Vue components/icons).
 * - `__code` — snippet-only default-slot markup. Feeds the copy-ready code
 *   block but is never rendered; use it when the slot needs real Vue children
 *   (e.g. `ImageComparison`) that the example component already provides.
 * - any other `__`-prefixed key is treated as control-only and not bound.
 *
 * Keep entries minimal and real — mirror the component's own internal defaults
 * or its `*Basic.vue` example rather than inventing new ones.
 */

const cardSlot = `<div style="padding:1.5rem 2rem;text-align:center;max-width:16rem">
  <p style="font-weight:600;font-size:1.05rem">Motion primitive</p>
  <p style="font-size:.8rem;opacity:.65;margin-top:.35rem">Hover, drag or scroll to interact</p>
</div>`

const buttonSlot = `<button type="button" style="padding:.55rem 1.1rem;border-radius:.6rem;border:0;cursor:pointer;font-weight:500;background:var(--ui-primary);color:var(--ui-bg)">Click me</button>`

const boxSlot = `<div style="width:14rem;height:8rem;border-radius:1rem;display:flex;align-items:center;justify-content:center;background:color-mix(in oklab, var(--ui-primary) 14%, transparent);color:var(--ui-text)">Content</div>`

const effectCopy = `<div style="padding:1.5rem 2rem;text-align:center;max-width:22rem">
  <p style="font-weight:700;font-size:1.35rem">Backdrop effect</p>
  <p style="font-size:.85rem;opacity:.7;margin-top:.4rem">Drop this behind any content</p>
</div>`

const sceneCopy = `<div style="padding:2rem;text-align:center;max-width:24rem">
  <p style="font-weight:700;font-size:1.6rem">Build in motion</p>
  <p style="font-size:.9rem;opacity:.72;margin-top:.5rem">Layered effects stay out of the way until you need them</p>
</div>`

const vaultCopy = `<div style="display:flex;flex-direction:column;align-items:center;gap:.25rem;padding:1rem">
  <span style="font-size:.75rem;font-weight:600">Vault</span>
  <span style="font-size:.65rem;opacity:.7">Tap to unlock</span>
</div>`

const cursorDot = `<div style="width:.85rem;height:.85rem;border-radius:9999px;background:color-mix(in oklab, var(--ui-primary) 70%, transparent)"></div>`

const squareStrip = `<div style="display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;padding:1rem">
  ${[1, 2, 3, 4, 5, 6].map(n => `<div style="width:2.5rem;height:2.5rem;border-radius:.55rem;display:flex;align-items:center;justify-content:center;background:var(--ui-primary);color:var(--ui-bg);font-weight:700">${n}</div>`).join('')}
</div>`

const beamCopy = `<div style="max-width:36rem;margin:0 auto;padding:2.5rem 1.25rem;display:flex;flex-direction:column;gap:2rem">
  ${['Section one', 'Section two', 'Section three'].map((title, index) => `<div><p style="font-size:1.2rem;font-weight:700;margin-bottom:.4rem">${title}</p><p style="font-size:.9rem;opacity:.75">The beam tracks the scroll position of this column, drawing a gradient line down the left edge as you move through item ${index + 1} of the content.</p></div>`).join('')}
</div>`

const imageComparisonCode = `<MImageComparisonImage
  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"
  alt="Mountain before editing"
  position="left"
  class="object-cover"
/>
<MImageComparisonImage
  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
  alt="Mountain after editing"
  position="right"
  class="object-cover"
/>
<MImageComparisonSlider>
  <div class="flex size-9 items-center justify-center rounded-full bg-default shadow-xl">
    <UIcon name="i-lucide-move-horizontal" class="size-4" />
  </div>
</MImageComparisonSlider>`

export const playgroundData: Record<string, Record<string, any>> = {
  // ─── AI ──────────────────────────────────────────────────────────────────
  'Accordion': {
    items: [
      { label: 'How do I install the module?', value: 'install', content: 'Add nuxt-motion-block to your modules array, then drop any M-prefixed component straight into your template.' },
      { label: 'Does the animation survive SSR?', value: 'ssr', content: 'Yes. Panels stay mounted when closed by default, so opening is a pure height spring and the content is preserved the whole time.' },
      { label: 'Can I change the open and close curve?', value: 'ui', content: 'The panel height runs on a motion-v spring. You can tune it or swap it for an easing through the accordion ui theme.' },
    ],
  },
  'AgentAvatar': {
    seed: 'atlas',
  },
  'AiApproval': {
    question: 'Delete the stale branches?',
    options: [
      { id: 'keep', label: 'Keep them', detail: 'No change' },
      { id: 'archive', label: 'Archive to a backup ref', detail: '4 branches' },
      { id: 'delete', label: 'Delete everything', detail: '18 commits', destructive: true },
    ],
  },
  'AiBranch': {
    branches: [
      {
        id: 'terse',
        userMessage: 'Delete the stale branches.',
        aiResponse: 'Done - removed 4 branches. The backup ref `archive/2026-04` holds the commits for 30 days.',
      },
      {
        id: 'careful',
        userMessage: 'Delete the stale branches.',
        aiResponse: 'I can archive them to a backup ref first, then delete. That keeps the 18 commits recoverable for 30 days.',
      },
      {
        id: 'explain',
        userMessage: 'Delete the stale branches.',
        aiResponse: 'Nothing on them is reachable from `main`, so deleting only removes the labels. The commits stay in the reflog until gc runs.',
      },
    ],
  },
  'AiCitation': {
    label: '1',
    title: 'Spring defaults',
    url: 'https://example.com',
    description: 'The easing and stiffness values that every component in this kit falls back to when you do not pass your own.',
  },
  'AiContextMeter': {
    used: 108_000,
    limit: 128_000,
    breakdown: [
      { label: 'Conversation', tokens: 59_400 },
      { label: 'Retrieved documents', tokens: 32_400 },
      { label: 'System prompt', tokens: 16_200 },
    ],
  },
  'AiConversation': {
    class: 'h-72 rounded-xl border border-default bg-default',
    __slot: `<div style="padding:16px;display:flex;flex-direction:column;gap:14px;font-size:14px;line-height:1.6">
<p style="margin:0">The audit is done. Every theme token resolves, except two in the sidebar.</p>
<p style="margin:0">Which two?</p>
<p style="margin:0">The category icons. They are referenced as icon names the collection cannot resolve.</p>
<p style="margin:0">Pre-existing?</p>
<p style="margin:0">Yes. They are on the components index, not on any page you added.</p>
<p style="margin:0">Then leave them and note it.</p>
<p style="margin:0">Noted. The rest of the run is clean: 182 pages, no drifted snippets, no missing examples.</p>
</div>`,
  },
  'AiDiff': {
    title: 'src/runtime/composables/useAiState.ts',
    lines: [
      { content: 'export type AIState =', kind: 'context', number: 4 },
      { content: '  | \'idle\'', kind: 'removed', number: 5 },
      { content: '  | \'listening\'', kind: 'removed', number: 6 },
      { content: '  | \'thinking\'', kind: 'context', number: 7 },
      { content: '  | \'streaming\'', kind: 'added', number: 8 },
      { content: '  | \'done\'', kind: 'context', number: 9 },
      { content: '  | \'error\'', kind: 'context', number: 10 },
    ],
  },
  'AiMessage': {
    id: 'turn-1',
    role: 'assistant',
    parts: [
      { type: 'reasoning', text: 'Check blast radius, then pick a default.' },
      { type: 'text', text: 'Behind a flag. The audit walks every theme token, so landing it cold means a long tail of visual diffs nobody has reviewed yet.' },
    ],
  },
  'AiMessages': {
    state: 'done',
    messages: [
      { id: 'm-1', role: 'user', parts: [{ type: 'text', text: 'Why does the token audit need a flag?' }] },
      { id: 'm-2', role: 'assistant', parts: [{ type: 'text', text: 'It walks every theme token, so landing it cold produces a long tail of visual diffs that nobody has reviewed yet.' }] },
    ],
  },
  'AiReasoning': {
    duration: 4.2,
    __slot: `<p>The user asked why the audit needs a flag. Blast radius first: the audit walks every theme token, so a cold landing produces a long tail of visual diffs. Then the alternative — a flag adds one branch and one flag to read later, and nothing here is dangerous without review. So: flag first, remove it once the diffs are clean.</p>`,
  },
  'AiSuggestions': {
    label: 'Follow-ups',
    suggestions: [
      { id: 's-1', label: 'Tighten the intro' },
      { id: 's-2', label: 'Add a benchmark' },
      { id: 's-3', label: 'Compare with the old API' },
      { id: 's-4', label: 'Find the breaking change' },
    ],
  },
  'AiTaskList': {
    label: 'Audit theme tokens',
    tasks: [
      { id: 't-1', label: 'Read every component source', status: 'done' },
      { id: 't-2', label: 'Walk the theme tokens', status: 'running', children: [
        { id: 't-2a', label: 'colors', note: '18/18', status: 'done' },
        { id: 't-2b', label: 'spacing', note: '12/12', status: 'done' },
        { id: 't-2c', label: 'typography', note: '7/9', status: 'running' },
        { id: 't-2d', label: 'motion tokens', note: '2/6', status: 'pending' },
      ] },
      { id: 't-3', label: 'Diff the rendered output', note: '3 screenshots', status: 'pending' },
      { id: 't-4', label: 'Post the report to the PR', status: 'failed' },
    ],
  },
  'AiToolCall': {
    name: 'search_docs',
    status: 'success',
    summary: '4 results',
  },

  // ─── Overlays / dialogs ──────────────────────────────────────────────────
  'AnimatedDialog': {
    __slot: buttonSlot,
    defaultOpen: true,
    title: 'Motion dialog',
    description: 'This dialog opens with smooth motion-v animations.',
    content: 'Everything inside animates in sequence when the dialog mounts.',
  },
  'MorphingPopover': {
    __slot: buttonSlot,
    defaultOpen: true,
    content: 'The popover morphs smoothly from the trigger into its content.',
  },
  'RichPopover': {
    __slot: buttonSlot,
  },
  'VideoModal': {
    __slot: `<button type="button" style="padding:.55rem 1.1rem;border-radius:.6rem;border:0;cursor:pointer;font-weight:500;background:var(--ui-primary);color:var(--ui-bg)">Watch the tour</button>`,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://picsum.photos/seed/video-modal-poster/800/450',
  },

  // ─── Text / inputs / loaders ─────────────────────────────────────────────
  'AnimatedInput': {
    label: 'Email',
    placeholder: 'you@example.com',
  },
  'AnimatedProgressBar': {
    value: 65,
    label: 'Uploading',
  },
  'AnimatedTags': {
    modelValue: ['Motion', 'Nuxt UI', 'TypeScript'],
  },
  'ButtonCopy': {
    text: 'npm install nuxt-motion-block',
  },
  'GridLoader': {
    sequence: [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  },
  'PagePreloader': {
    loading: true,
    progress: 65,
  },
  'PixelatedCanvas': {
    src: 'https://picsum.photos/seed/pixelated/400/500',
  },
  'PriceFlow': {
    value: 1299,
  },

  // ─── Data tables / lists ─────────────────────────────────────────────────
  'AppDownloadStack': {
    apps: [
      { id: 1, name: 'Safari', icon: 'i-lucide-compass' },
      { id: 2, name: 'Photos', icon: 'i-lucide-image' },
      { id: 3, name: 'Podcasts', icon: 'i-lucide-mic' },
      { id: 4, name: 'Calendar', icon: 'i-lucide-calendar-days' },
    ],
  },
  'AppleInvites': {
    events: [
      { id: 1, title: 'Product Launch', subtitle: 'Announcing our latest release', location: 'Online', badge: 'Invite', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop' },
      { id: 2, title: 'Design Meetup', subtitle: 'Share ideas with the community', location: 'San Francisco, CA', badge: 'Group', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop' },
      { id: 3, title: 'Team Dinner', subtitle: 'Celebrating a great quarter', location: 'New York, NY', badge: 'Social', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop' },
    ],
  },
  'BasicDropdown': {
    items: [
      { id: '1', label: 'Option 1', icon: 'i-lucide-circle' },
      { id: '2', label: 'Option 2', icon: 'i-lucide-square' },
      { id: '3', label: 'Option 3', icon: 'i-lucide-triangle' },
    ],
  },
  'DitherChart': {
    data: [
      { name: 'Mon', points: [
        { label: '6am', value: 42 }, { label: 'Noon', value: 118 },
        { label: '6pm', value: 96 }, { label: 'Midnight', value: 31 },
      ] },
      { name: 'Tue', points: [
        { label: '6am', value: 58 }, { label: 'Noon', value: 142 },
        { label: '6pm', value: 121 }, { label: 'Midnight', value: 47 },
      ] },
    ],
  },
  'DragAndDrop': {
    items: [
      { id: 'design-tokens', label: 'Style tokens', owner: 'Ana' },
      { id: 'component-audit', label: 'Component audit', owner: 'Ben' },
      { id: 'motion-guidelines', label: 'Motion guidelines', owner: 'Chidi' },
      { id: 'accessibility-pass', label: 'Accessibility pass', owner: 'Dara' },
      { id: 'docs-rewrite', label: 'Docs rewrite', owner: 'Eli' },
    ],
  },
  'ExpandableCards': {
    items: [
      { title: 'What is Nuxt?', content: 'Nuxt is an open source framework that makes web development intuitive and powerful.' },
      { title: 'What is Nuxt Motion Block?', content: 'A collection of ready-to-use animated components built with motion-v and Nuxt.' },
      { title: 'Is it free to use?', content: 'Yes, Nuxt Motion Block is open source and free to use in your personal and commercial projects.' },
    ],
  },
  'FocusCards': {
    cards: [
      { id: 1, title: 'Mountain Adventure', description: 'Experience breathtaking mountain landscapes and challenging trails.', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', category: 'Nature', author: 'Alex Explorer' },
      { id: 2, title: 'Ocean Sunset', description: 'Stunning ocean views with vibrant sunset colors over the horizon.', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', category: 'Seascape', author: 'Sam Photographer' },
      { id: 3, title: 'Forest Path', description: 'A peaceful walking trail through ancient woodland.', src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80', category: 'Wildlife', author: 'Jordan Naturalist' },
    ],
  },
  'GlowHoverCards': {
    items: [
      { title: 'Streaming ingest', description: 'Events land in the warehouse in under a second.', icon: 'i-lucide-zap' },
      { title: 'Columnar store', description: 'Point queries over a trillion rows stay sub-second.', icon: 'i-lucide-database' },
      { title: 'Row policies', description: 'One policy engine, enforced per request.', icon: 'i-lucide-shield-check' },
    ],
  },
  'OrbitalImageWheel': {
    items: [
      { id: 'ridge', alt: 'Ridge', image: 'https://picsum.photos/seed/orbital-1/120/120' },
      { id: 'tide', alt: 'Tide', image: 'https://picsum.photos/seed/orbital-2/120/120' },
      { id: 'salt', alt: 'Salt', image: 'https://picsum.photos/seed/orbital-3/120/120' },
      { id: 'birch', alt: 'Birch', image: 'https://picsum.photos/seed/orbital-4/120/120' },
      { id: 'glacier', alt: 'Glacier', image: 'https://picsum.photos/seed/orbital-5/120/120' },
      { id: 'arch', alt: 'Arch', image: 'https://picsum.photos/seed/orbital-6/120/120' },
    ],
  },
  'ParallaxLayers': {
    layers: [
      { id: 'sky', depth: 0 },
      { id: 'hills', depth: 0.5 },
      { id: 'foreground', depth: 1 },
    ],
  },
  'PinnedList': {
    pinnedIds: ['nuxt', 'ui'],
    items: [
      { id: 'nuxt', title: 'Nuxt', meta: 'The Intuitive Vue Framework', icon: 'i-lucide-nuxt' },
      { id: 'ui', title: 'Nuxt UI', meta: 'A UI Library for Modern Web Apps', icon: 'i-lucide-layout-grid' },
      { id: 'content', title: 'Nuxt Content', meta: 'File-based CMS', icon: 'i-lucide-file-text' },
      { id: 'devtools', title: 'Nuxt DevTools', meta: 'Enhance your development experience', icon: 'i-lucide-wrench' },
      { id: 'image', title: 'Nuxt Image', meta: 'Optimized images for Nuxt', icon: 'i-lucide-image' },
    ],
  },
  'RadioGroup': {
    items: [
      { value: 'edge', label: 'Edge', description: 'Closest to your visitors' },
      { value: 'regional', label: 'Regional', description: 'Single data centre' },
      { value: 'self', label: 'Self-hosted', description: 'Your own hardware' },
    ],
  },
  'ReviewsCarousel': {
    reviews: [
      { author: 'Amara Osei', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', content: 'We replaced three tools with this one. The onboarding alone paid for the migration in the first month.' },
      { author: 'Tomas Lindqvist', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', content: 'The transitions are the part nobody asked for and everybody mentions. Nothing feels sluggish, even on a laptop.' },
      { author: 'Priya Raman', rating: 4, avatar: 'https://randomuser.me/api/portraits/women/68.jpg', content: 'Docs are honest about the limits, which is rare. Took an afternoon to get a production feel out of it.' },
    ],
  },
  'TweetCard': {
    author: 'Devon Achebe',
    handle: 'devon',
    time: '2h',
    likes: 1842,
    retweets: 316,
    content: 'Spent the afternoon removing a backdrop-filter from a card. The layout shift I was chasing was never the blur — it was the repaint the blur forced on every scroll frame.',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
  },

  // ─── Carousels / stacks ──────────────────────────────────────────────────
  'CardStack': {
    items: [
      { id: 1, title: 'Project Alpha', content: 'A revolutionary new product that changes everything.', name: 'Sam Rivera', designation: 'Lead Developer', avatar: 'https://i.pravatar.cc/200?img=12' },
      { id: 2, title: 'Project Beta', content: 'An innovative solution for modern businesses.', name: 'Sam Designer', designation: 'Senior Designer', avatar: 'https://i.pravatar.cc/200?img=15' },
      { id: 3, title: 'Project Gamma', content: 'A cutting-edge platform for the future.', name: 'Jordan Manager', designation: 'Project Manager', avatar: 'https://i.pravatar.cc/200?img=33' },
      { id: 4, title: 'Project Delta', content: 'A breakthrough technology that transforms industries.', name: 'Taylor Innovator', designation: 'Chief Innovation Officer', avatar: 'https://i.pravatar.cc/200?img=52' },
    ],
  },
  'Carousel': {
    items: [
      { title: 'Iceland', tag: 'North', image: 'https://picsum.photos/seed/carousel-1/800/600' },
      { title: 'Kyoto', tag: 'East', image: 'https://picsum.photos/seed/carousel-2/800/600' },
      { title: 'Patagonia', tag: 'South', image: 'https://picsum.photos/seed/carousel-3/800/600' },
      { title: 'Dolomites', tag: 'Alps', image: 'https://picsum.photos/seed/carousel-4/800/600' },
      { title: 'Namibia', tag: 'Desert', image: 'https://picsum.photos/seed/carousel-5/800/600' },
    ],
    loop: true,
    __slot: `<div style="width:22rem;height:14rem;border-radius:1rem;background:linear-gradient(135deg,var(--ui-primary),var(--ui-secondary))"></div>`,
  },
  'CoverflowCarousel': {
    items: [
      { id: 'reykjavik', alt: 'Reykjavik skyline', image: 'https://picsum.photos/seed/cover-1/560/440' },
      { id: 'kyoto', alt: 'Kyoto alley', image: 'https://picsum.photos/seed/cover-2/560/440' },
      { id: 'lofoten', alt: 'Lofoten islands', image: 'https://picsum.photos/seed/cover-3/560/440' },
      { id: 'oaxaca', alt: 'Oaxaca street', image: 'https://picsum.photos/seed/cover-4/560/440' },
      { id: 'queensland', alt: 'Queensland coast', image: 'https://picsum.photos/seed/cover-5/560/440' },
    ],
  },

  // ─── Cards / panels (default-slot HTML) ──────────────────────────────────
  'BorderBeam': {
    __slot: boxSlot,
  },
  'ClipCornersButton': {
    __slot: buttonSlot,
  },
  'DirectionAwareHover': {
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
  },
  'DirectionAwareHoverNew': {
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
  },
  'DraggableCard': {
    __slot: cardSlot,
  },
  'EverVaultCard': {
    __slot: cardSlot,
  },
  'GlareCard': {
    __slot: cardSlot,
  },
  'GitHubStarsAnimation': {
    starCount: 1284,
    stargazers: [
      { login: 'averycole', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces', html_url: 'https://github.com/averycole' },
      { login: 'jordanlee', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces', html_url: 'https://github.com/jordanlee' },
      { login: 'samrivera', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces', html_url: 'https://github.com/samrivera' },
      { login: 'morganchen', avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces', html_url: 'https://github.com/morganchen' },
      { login: 'rileyng', avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=faces', html_url: 'https://github.com/rileyng' },
    ],
  },
  'InteractiveImageSelector': {
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop' },
      { id: 2, src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop' },
      { id: 3, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' },
      { id: 4, src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=400&fit=crop' },
      { id: 5, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop' },
      { id: 6, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop' },
    ],
    selectedImages: [],
  },
  'TimeMachineStack': {
    items: [
      { id: 'studio', year: 2026, title: 'The studio', description: 'A small team, a short list of clients, one shared room.' },
      { id: 'archive', year: 2024, title: 'The archive', description: 'Every project we shipped, filed by year and season.' },
      { id: 'workshop', year: 2022, title: 'The workshop', description: 'Prototypes that never left the building, kept anyway.' },
      { id: 'origin', year: 2019, title: 'The origin', description: 'Two desks, a borrowed projector and a first invoice.' },
    ],
  },
  'TiltCard': {
    __slot: boxSlot,
  },
  'GlassCard': {
    __slot: cardSlot,
  },
  'GlassPanel': {
    __slot: cardSlot,
  },
  'GlowingStarsCard': {
    __slot: cardSlot,
  },
  'HolographicFoil': {
    __slot: boxSlot,
  },
  'LampContainer': {
    __slot: `<h2 style="font-size:1.5rem;font-weight:600;text-align:center">Build interfaces that move</h2>`,
  },
  'LiquidMetal': {
    __slot: `<div style="font-size:2rem;font-weight:800;letter-spacing:.05em">METAL</div>`,
  },
  'Magnetic': {
    __slot: boxSlot,
  },
  'MagneticButton': {
    __slot: buttonSlot,
  },
  'MailCard': {
    title: 'Design review',
    preview: 'The motion tokens landed. Take a look before we ship.',
    __slot: `<p style="font-size:.85rem;opacity:.7">Opened just now</p>`,
  },
  'MaskContainer': {
    show: true,
    icon: 'i-lucide-sparkles',
    label: 'Reveal',
    __slot: boxSlot,
  },
  'SmoothButton': {
    __slot: buttonSlot,
  },
  'Squircle': {
    __slot: boxSlot,
  },
  'SvgClipMask': {
    __slot: `<div style="width:12rem;height:12rem;background:linear-gradient(135deg,var(--ui-primary),var(--ui-secondary))"></div>`,
  },
  'SwitchboardCard': {
    flipped: false,
  },
  '3DCard': {
    __slot: cardSlot,
  },
  'Tilt': {
    __slot: cardSlot,
  },
  'WalletCard': {
    label: 'Everyday',
    balance: '$2,450.00',
    cardNumber: '4242424242424242',
    holder: 'Ava Chen',
    expiry: '08/29',
    network: 'visa',
    __slot: `<p style="font-size:.75rem;opacity:.75">Active · Next payment in 12 days</p>`,
  },
  'WobbleCard': {
    __slot: cardSlot,
  },

  // ─── Commerce ────────────────────────────────────────────────────────────
  'ProductCard': {
    title: 'Studio Headphones',
    price: 249,
    originalPrice: 329,
    currency: '$',
    badge: 'sale',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },

  // ─── Text ────────────────────────────────────────────────────────────────
  'RansomNote': {
    palette: ['#f7f1e3', '#fdf6e3', '#f1e4c3', '#e9dcc0', '#fbeee0', '#eee2cf'],
    fonts: [
      'Georgia, \'Times New Roman\', serif',
      '\'Courier New\', Courier, monospace',
      'Impact, \'Arial Narrow Bold\', sans-serif',
      '\'Brush Script MT\', cursive',
      'Verdana, Geneva, sans-serif',
    ],
  },

  // ─── Effect / backdrop playgrounds ───────────────────────────────────────
  // Background and overlay primitives draw their surface on their own. These
  // entries give the ones with a default slot something to sit behind, and seed
  // the collection props whose component defaults are richer than the control
  // panel can infer.
  'AnimatedGroup': {
    __slot: squareStrip,
  },
  'AuroraBackground': {
    __slot: effectCopy,
  },
  'BackgroundGradientAnimation': {
    __slot: effectCopy,
  },
  'BackgroundRippleEffect': {
    rows: 6,
    cols: 12,
    cellSize: 30,
  },
  'BorderTrail': {
    size: 40,
  },
  'BoxesCore': {
    rows: 20,
    cols: 15,
  },
  'CollisionBackgroundBeams': {
    __slot: sceneCopy,
  },
  'Cursor': {
    attachToParent: true,
    __slot: cursorDot,
  },
  'DivGrid': {
    rows: 8,
    cols: 12,
    cellSize: 20,
    fillColor: 'primary',
    borderColor: 'border',
  },
  'DynamicIsland': {
    view: 'idle',
  },
  'ExposureSlider': {
    label: 'Exposure',
  },
  'FigmaComment': {
    authorName: 'Arjun Mehta',
    avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
    message: 'What happens if we adjust this to handle light and dark mode?',
    timestamp: '2 min ago',
  },
  'FolderReveal': {
    label: 'Releases',
    items: [
      { id: '2-4', label: 'v2.4' },
      { id: '2-3', label: 'v2.3' },
      { id: '2-2', label: 'v2.2' },
      { id: '2-1', label: 'v2.1' },
    ],
  },
  'ImageComparison': {
    class: 'h-96 w-full rounded-xl overflow-hidden shadow-xl',
    __code: imageComparisonCode,
  },
  'InlineTestimonials': {
    text: 'The migration shipped on a Friday, which nobody wanted. {{maya}} rewrote the scheduler over two nights and {{theo}} caught the timezone bug that would have doubled every billing cycle.',
    testimonials: [
      {
        id: 'maya',
        name: 'Maya Okafor',
        role: 'Staff engineer, Platform',
        rating: 5,
        quote: 'The scariest part was not the migration itself, it was that nobody could tell me what still depended on the old scheduler.',
      },
      {
        id: 'theo',
        name: 'Theo Lindqvist',
        role: 'Backend engineer',
        rating: 4,
        quote: 'I only found the offset bug because a fixture used a negative UTC offset. Every production record looked perfect.',
      },
    ],
  },
  'MorphSurface': {
    label: 'Ask AI',
    placeholder: 'Summarise this thread…',
  },
  'MusicToggle': {
    title: 'Night Ride',
    artist: 'Nova Kinetic',
    cover: 'https://picsum.photos/seed/midnight-drive/400/400',
  },
  'PowerOffSlide': {
    label: 'Slide to power off',
    duration: 2000,
  },
  'TracingBeam': {
    __slot: beamCopy,
  },
  'UnlockFaceId': {
    __slot: vaultCopy,
  },
  'Vortex': {
    __slot: sceneCopy,
  },
}
