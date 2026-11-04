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

const orbitDot = `<div style="width:2.25rem;height:2.25rem;border-radius:9999px;display:flex;align-items:center;justify-content:center;background:color-mix(in oklab, var(--ui-primary) 18%, transparent);color:var(--ui-primary);font-size:.7rem;font-weight:700">M</div>`

const phoneScreenSlot = `<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;padding:1.5rem;text-align:center;background:linear-gradient(to bottom, #171717, #262626);color:#fff">
  <span style="font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;opacity:.5">Motion Block</span>
  <p style="font-size:1rem;font-weight:600">Everything in your pocket</p>
  <p style="font-size:.7rem;opacity:.6">Drop any content into the screen</p>
</div>`

const browserScreenSlot = `<div style="width:20rem;height:14rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;text-align:center">
  <p style="font-size:1rem;font-weight:600">nuxt.com</p>
  <p style="font-size:.75rem;opacity:.65">The page inside is your slot</p>
</div>`

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
  'JobListing': {
    jobs: [
      {
        company: 'Northwind',
        title: 'Senior product designer',
        salary: '$140k – $170k',
        location: 'Berlin',
        remote: 'Hybrid',
        postedAt: '2d ago',
        description: 'Own the end-to-end design of our scheduling product, from the first sketch to the component library the team ships with.',
      },
      {
        company: 'Lumen Labs',
        title: 'Front-end engineer',
        salary: '$120k – $150k',
        location: 'Lisbon',
        remote: 'Yes',
        postedAt: '5d ago',
        description: 'Build the interface for a real-time analytics tool used by small studios. Vue, TypeScript and a lot of careful CSS.',
      },
      {
        company: 'Harbor Studio',
        title: 'Motion designer',
        salary: '$95k – $120k',
        location: 'Copenhagen',
        remote: 'No',
        postedAt: '1w ago',
        description: 'Shape how our brand moves across product and film, from the first prototype to the final easing curve.',
      },
    ],
  },
  'UserAccountAvatar': {
    user: {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces',
      name: 'Maya Chen',
      email: 'maya@northwind.studio',
    },
    orders: [
      { id: 'ORD-2041', date: '2026-09-28', progress: 100, status: 'delivered' },
      { id: 'ORD-2088', date: '2026-10-04', progress: 66, status: 'shipped' },
    ],
  },
  'SwapPanel': {
    amount: '1',
    from: {
      name: 'Ether',
      symbol: 'ETH',
      balance: 4.28,
      icon: 'i-lucide-gem',
    },
    to: {
      name: 'USD Coin',
      symbol: 'USDC',
      balance: 1240.5,
      icon: 'i-lucide-circle-dollar-sign',
    },
    quote: {
      output: 3240,
      rate: 3240,
      fee: 2.4,
      priceImpact: 0.0012,
    },
    slippage: 0.005,
    status: 'ready',
  },
  'CardSwipeDeck': {
    items: [
      { id: 'one', content: 'One — a card that follows the pointer.' },
      { id: 'two', content: 'Two — throw it past the threshold.' },
      { id: 'three', content: 'Three — the stack moves forward.' },
      { id: 'four', content: 'Four — the last one fires empty.' },
    ],
    labels: { left: 'Nope', right: 'Like' },
    threshold: 110,
    rotationFactor: 18,
    stackOffset: 14,
    stackSize: 3,
    disabled: false,
  },
  'ScrollableCardStack': {
    items: [
      {
        id: 'ana',
        name: 'Ana Ruiz',
        handle: '@anaruiz',
        href: 'https://example.com/people/ana-ruiz',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop',
        imageAlt: 'A studio desk with a notebook and a warm lamp',
      },
      {
        id: 'ben',
        name: 'Ben Osei',
        handle: '@bosei',
        href: 'https://example.com/people/ben-osei',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
        imageAlt: 'A speaker on stage in front of a full auditorium',
      },
      {
        id: 'cleo',
        name: 'Cleo Park',
        handle: '@cleopark',
        href: 'https://example.com/people/cleo-park',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
        imageAlt: 'A long communal table in a bright restaurant',
      },
    ],
    cardHeight: 384,
    perspective: 1000,
    transitionDuration: 180,
  },
  'VectorEditorToolbar': {
    tools: [
      {
        id: 'select',
        label: 'Select',
        icon: 'i-lucide-mouse-pointer',
        shortcut: 'V',
      },
      {
        id: 'shape',
        label: 'Shape',
        icon: 'i-lucide-square',
        items: [
          { id: 'rectangle', label: 'Rectangle', icon: 'i-lucide-square', shortcut: 'R' },
          { id: 'ellipse', label: 'Ellipse', icon: 'i-lucide-circle', shortcut: 'O' },
          { id: 'polygon', label: 'Polygon', icon: 'i-lucide-triangle', shortcut: 'Y' },
          { id: 'line', label: 'Line', icon: 'i-lucide-minus', shortcut: 'L' },
        ],
      },
      {
        id: 'pen',
        label: 'Pen',
        icon: 'i-lucide-pencil',
        items: [
          { id: 'pen', label: 'Pen', icon: 'i-lucide-pen-tool', shortcut: 'P' },
          { id: 'brush', label: 'Brush', icon: 'i-lucide-paintbrush', shortcut: 'B' },
          { id: 'eraser', label: 'Eraser', icon: 'i-lucide-eraser', shortcut: 'E' },
        ],
      },
      {
        id: 'text',
        label: 'Text',
        icon: 'i-lucide-type',
        shortcut: 'T',
      },
      {
        id: 'hand',
        label: 'Hand',
        icon: 'i-lucide-hand',
        shortcut: 'H',
      },
      {
        id: 'zoom',
        label: 'Zoom',
        icon: 'i-lucide-search',
        shortcut: 'Z',
      },
    ],
    defaultTool: 'select',
    orientation: 'horizontal',
    floating: false,
    shortcutsEnabled: false,
    ariaLabel: 'Vector editor tools',
  },
  'DitherImage': {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80&auto=format&fit=crop',
    alt: 'Sunlight falling through a green forest',
    width: 420,
    height: 260,
    pixelSize: 4,
    levels: 2,
    algorithm: 'bayer',
  },
  'Form': {
    fields: [
      { name: 'name', label: 'Name', placeholder: 'Ada Lovelace' },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'ada@example.com',
        description: 'Only used to reply to this message.',
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'What are you building?',
        rows: 3,
      },
    ],
    modelValue: { name: '', email: '', message: '' },
    errors: {},
    submitLabel: 'Send message',
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
  'AnimatedGridPattern': {
    __slot: effectCopy,
  },
  'FlickeringGrid': {
    __slot: effectCopy,
  },
  'InteractiveGridPattern': {
    __slot: effectCopy,
  },
  'RetroGrid': {
    __slot: effectCopy,
  },
  'BentoCard': {
    name: 'Analytics',
    description: 'Every session, charted the moment it happens.',
    icon: 'i-lucide-chart-line',
  },
  'MagicCard': {
    __slot: cardSlot,
  },
  'ShineBorder': {
    __slot: cardSlot,
  },
  'OrbitingCircles': {
    __slot: orbitDot,
  },
  'Particles': {
    __slot: effectCopy,
    quantity: 120,
  },
  'IconCloud': {
    images: [
      'https://cdn.simpleicons.org/vuedotjs/42b883',
      'https://cdn.simpleicons.org/nuxt/00DC82',
      'https://cdn.simpleicons.org/typescript/3178C6',
      'https://cdn.simpleicons.org/tailwindcss/06B6D4',
      'https://cdn.simpleicons.org/vite/646CFF',
      'https://cdn.simpleicons.org/eslint/4B32C3',
      'https://cdn.simpleicons.org/prettier/F7B93E',
      'https://cdn.simpleicons.org/pnpm/F69220',
      'https://cdn.simpleicons.org/git/F05032',
      'https://cdn.simpleicons.org/github/ffffff',
      'https://cdn.simpleicons.org/nodedotjs/5FA04E',
      'https://cdn.simpleicons.org/vercel/ffffff',
    ],
  },
  'TextAnimate': {
    text: 'Interfaces that move with intent.',
  },
  'Globe': {
    data: [
      { lat: 40.71, lng: -74.01, size: 0.06, label: 'New York' },
      { lat: 51.51, lng: -0.13, size: 0.06, label: 'London' },
      { lat: 35.68, lng: 139.69, size: 0.06, label: 'Tokyo' },
      { lat: -33.87, lng: 151.21, size: 0.06, label: 'Sydney' },
    ],
    arcs: [
      { from: [40.71, -74.01], to: [51.51, -0.13] },
      { from: [35.68, 139.69], to: [-33.87, 151.21] },
    ],
  },
  'ShimmerButton': {
    __slot: 'Ship it',
  },
  'ShinyButton': {
    __slot: 'Hover for the shine',
  },
  'RainbowButton': {
    __slot: 'Gradient border',
  },
  'PulsatingButton': {
    __slot: 'Live now',
  },
  'RippleButton': {
    __slot: 'Click anywhere',
  },
  'InteractiveHoverButton': {
    __slot: 'Get started',
  },
  'IPhone15Pro': {
    __slot: phoneScreenSlot,
  },
  'Safari': {
    __slot: browserScreenSlot,
  },
  'Android': {
    __slot: phoneScreenSlot,
  },
  'CircularProgress': {
    value: 68,
    caption: 'Storage',
  },
  'CodeComparison': {
    before: 'const total = items.filter(item => item.active).map(item => item.price)\nconst tax = total.reduce((sum, price) => sum + price * 0.2, 0)\nconst receipt = { total, tax, paid: total + tax, currency: \'USD\' }',
    after: 'const total = items.filter(({ active }) => active).map(({ price }) => price)\nconst tax = total.reduce((sum, price) => sum + price * 0.2, 0)\nconst receipt = { total, tax, paid: total + tax, currency: \'USD\' }',
    beforeLabel: 'Before',
    afterLabel: 'After',
  },
  'ComicText': {
    text: 'Wham!',
  },
  'StripedPattern': {
    angle: 45,
    width: 1,
    gap: 12,
  },
  'SparklesText': {
    text: 'Sparkles',
    count: 12,
    size: 16,
  },
  'Marquee': {
    duration: 22,
    gap: 12,
    pauseOnHover: true,
    repeat: 6,
    reverse: false,
    vertical: false,
    __slot: `<span style="display:inline-flex;align-items:center;gap:.5rem;padding:.65rem 1.1rem;border:1px solid var(--ui-border);border-radius:.6rem;background:var(--ui-bg-elevated);font-size:.85rem;white-space:nowrap">
  <span style="width:.375rem;height:.375rem;border-radius:9999px;background:var(--ui-primary)"></span>Motion
</span>`,
  },
  'ZoomableImage': {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'A snow-covered mountain ridge at sunrise',
    class: 'h-64 w-full rounded-xl',
  },
  'ScratchToReveal': {
    width: 320,
    height: 200,
    brushSize: 24,
    threshold: 45,
    __slot: `<div style="text-align:center">
  <p style="font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;opacity:.6">You won</p>
  <p style="font-size:1.75rem;font-weight:700;margin-top:.25rem">20% off</p>
  <p style="font-size:.75rem;opacity:.6;margin-top:.25rem">Code SCRATCH20</p>
</div>`,
  },
  'LightRays': {
    color: '#7dd3fc',
    count: 24,
    speed: 1,
    spread: 0.85,
    length: 1.15,
    fade: 0.55,
    origin: 'top-center',
    pulsate: true,
    followMouse: false,
    class: 'h-72 w-full rounded-xl bg-neutral-950',
    __slot: `<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;text-align:center">
  <p style="font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.5)">Stage light</p>
  <p style="font-size:1.6rem;font-weight:600;color:#fff">Shine from above</p>
</div>`,
  },
  'TextHighlighter': {
    text: 'move with intent',
    duration: 0.7,
    delay: 0.1,
  },
  'CoolMode': {
    emoji: '🎉',
    particleCount: 12,
    disabled: false,
    __slot: `<button style="padding:.7rem 1.6rem;border-radius:.6rem;background:var(--ui-primary);color:var(--ui-bg);font-weight:600;font-size:.9rem;border:none;cursor:pointer">Click me</button>`,
  },
  'Lens': {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    alt: 'A snow-covered mountain ridge at sunrise',
    zoom: 2.4,
    size: 180,
    class: 'h-64 w-full rounded-xl',
  },
  'VideoText': {
    src: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    text: 'Motion',
    fontSize: 'clamp(3rem, 13vw, 9rem)',
    blend: 'multiply',
    autoplay: true,
    loop: true,
    class: 'h-64 w-full rounded-xl',
  },
  'WarpBackground': {
    color: '#6366f1',
    gridColor: '#ffffff',
    lines: 22,
    beams: 4,
    speed: 1,
    horizon: 0.55,
    glow: 0.6,
    class: 'h-72 w-full rounded-xl bg-neutral-950',
    __slot: `<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;text-align:center">
  <p style="font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.5)">Warp speed</p>
  <p style="font-size:1.6rem;font-weight:600;color:#fff">Into the horizon</p>
</div>`,
  },
  'HexagonPattern': {
    radius: 40,
    gap: 0,
    direction: 'horizontal',
    strokeDasharray: '0',
    hexagons: [[1, 1], [4, 4], [2, 2], [3, 4], [5, 4], [8, 2], [6, 3], [8, 5], [10, 10]],
  },
  'NoiseTexture': {
    frequency: 0.4,
    octaves: 6,
    slope: 0.15,
    noiseOpacity: 0.6,
    class: '[mask-image:radial-gradient(260px_circle_at_center,white,transparent)]',
  },
  'LineShadowText': {
    text: 'Line Shadow',
    shadowColor: 'black',
  },
  'DottedMap': {
    width: 150,
    height: 75,
    mapSamples: 5000,
    dotRadius: 0.22,
    pulse: true,
    markers: [
      { lat: 37.5665, lng: 126.978, size: 2.4, label: 'Seoul' },
      { lat: 40.7128, lng: -74.006, size: 2.4, label: 'New York' },
    ],
    class: 'h-64 w-full',
  },

  // ─── Required content props ─────────────────────────────────────────────
  // These render nothing without a value, so the preview is empty without a seed.
  'Book': {
    title: 'The Shape of Motion',
    color: '#e5a00d',
    width: 196,
  },
  'AiResponse': {
    text: 'Behind a flag [1]. The audit walks every theme token, so a cold landing means a long tail of unreviewed diffs [2].',
    citations: [
      { id: 'c-1', index: 1, title: 'Theme token audit runbook', url: 'https://example.com' },
      { id: 'c-2', index: 2, title: 'Release checklist, internal' },
    ],
  },
  'AiSources': {
    defaultOpen: true,
    sources: [
      {
        id: 's-1',
        snippet: 'Component: add / update / delete a source',
        title: 'Add a search source',
        url: 'https://ui.nuxt.com/docs/components/chat',
      },
      {
        id: 's-2',
        snippet: 'How retrieval-augmented generation is wired into the answer',
        title: 'Retrieval notes',
        url: 'https://ai-sdk.dev/docs',
      },
      {
        id: 's-3',
        snippet: 'Release checklist, internal',
        title: 'Shipping checklist',
        url: 'https://example.com',
      },
      {
        id: 's-4',
        title: 'Token naming convention',
        url: 'https://nuxt.com/docs',
      },
    ],
  },
  'PhotoStack': {
    photos: [
      {
        id: 'mara',
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=520&fit=crop',
        alt: 'Mara Okonkwo',
        name: 'Mara Okonkwo',
        role: 'Design engineer',
      },
      {
        id: 'noa',
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=520&fit=crop',
        alt: 'Noa Bergström',
        name: 'Noa Bergström',
        role: 'Frontend lead',
      },
      {
        id: 'ines',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=520&fit=crop',
        alt: 'Ines Duarte',
        name: 'Ines Duarte',
        role: 'Solo founder',
      },
    ],
  },
  'MacTerminal': {
    title: 'nuxt-motion-block — zsh',
    maxHeight: 320,
    lines: [
      { id: 'install', type: 'command', text: 'pnpm add nuxt-motion-block' },
      { id: 'install-done', type: 'success', text: '✓ Packages installed in 4.2s' },
      { id: 'dev', type: 'command', text: 'pnpm dev', delay: 350 },
      { id: 'dev-ready', type: 'output', text: 'Nuxt 4.5.2  ready in 640 ms' },
      { id: 'dev-local', type: 'comment', text: 'Local:    http://localhost:3000/' },
      { id: 'test', type: 'command', text: 'pnpm test', delay: 350 },
      { id: 'test-done', type: 'success', text: '✓ 42 tests passed in 1.8s' },
      { id: 'lint', type: 'command', text: 'pnpm lint', delay: 350 },
    ],
  },
  'SocialHoverCard': {
    placement: 'bottom',
    profile: {
      id: 'mara-fjeld',
      name: 'Mara Fjeld',
      handle: 'marafjeld',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      banner: 'https://picsum.photos/seed/mara-banner/640/160',
      bio: 'Design engineer building open-source motion components.',
      url: 'https://example.com/mara',
      verified: true,
    },
  },
  'AsciiRender': {
    source: { type: 'image', src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80' },
    alt: 'Snow-covered mountain ridge under a pale sky',
    columns: 90,
    fontSize: 8,
  },
  'AnimatedStepper': {
    items: [
      {
        title: 'Account',
        description: 'Email and password',
        icon: 'i-lucide-user',
        content: 'Create the account your team will sign in with. Password rules are checked as you type.',
      },
      {
        title: 'Workspace',
        description: 'Name and region',
        icon: 'i-lucide-building',
        content: 'Pick a region close to your users. You can move a workspace later without downtime.',
      },
      {
        title: 'Invite',
        description: 'Bring teammates in',
        icon: 'i-lucide-users',
        content: 'Invite teammates by email. Invites expire after seven days.',
      },
    ],
  },
  'FaviconSearch': {
    results: [
      { id: 'vue', title: 'Vue.js', description: 'The progressive JavaScript framework', url: 'https://vuejs.org' },
      { id: 'nuxt', title: 'Nuxt', description: 'The full-stack Vue framework', url: 'https://nuxt.com' },
      { id: 'motion', title: 'Motion for Vue', description: 'A production-ready animation library', url: 'https://motion.dev' },
      { id: 'ui', title: 'Nuxt UI', description: 'A UI library for Nuxt applications', url: 'https://ui.nuxt.com' },
    ],
  },
  'FloatInput': {
    icon: 'i-lucide-mail',
    label: 'Email address',
    placeholder: 'you@example.com',
  },
  'BasicToast': {
    message: 'Animations synced to the theme.',
    type: 'success',
  },
  'DynamicGroup': {
    items: [
      { id: 1, name: 'Ana Ruiz', src: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 2, name: 'Ben Osei', src: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 3, name: 'Cleo Park', src: 'https://randomuser.me/api/portraits/women/68.jpg' },
      { id: 4, name: 'Dmitri Ilves', src: 'https://randomuser.me/api/portraits/men/75.jpg' },
      { id: 5, name: 'Elin Haugen', src: 'https://randomuser.me/api/portraits/women/90.jpg' },
      { id: 6, name: 'Farid Nazari', src: 'https://randomuser.me/api/portraits/men/11.jpg' },
    ],
  },
  'EmojiReaction': {
    reactions: [
      { count: 12, emoji: '👍', id: 'thumbs-up', label: 'Thumbs up', reacted: false },
      { count: 4, emoji: '🎉', id: 'party-popper', label: 'Party popper', reacted: false },
      { count: 9, emoji: '🚀', id: 'rocket', label: 'Rocket', reacted: true },
    ],
  },
  'HoverExpand': {
    items: [
      {
        id: 'lakeside',
        title: 'Lakeside',
        description: 'Still water at first light',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=700&fit=crop',
        alt: 'A lake between mountains at sunrise',
      },
      {
        id: 'desert',
        title: 'Desert',
        description: 'Dunes after the wind',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=700&fit=crop',
        alt: 'Rippled sand dunes',
      },
      {
        id: 'forest',
        title: 'Forest',
        description: 'Fog between the trunks',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=700&fit=crop',
        alt: 'Sunlight through a dense forest',
      },
      {
        id: 'coast',
        title: 'Coast',
        description: 'Low tide on black rock',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&fit=crop',
        alt: 'A sandy beach meeting turquoise water',
      },
    ],
  },
  'HoverImageList': {
    items: [
      {
        id: 'nuxt',
        title: 'Nuxt',
        meta: 'The full-stack Vue framework',
        href: 'https://nuxt.com',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop',
        alt: 'Code on a dark screen',
      },
      {
        id: 'motion',
        title: 'Motion for Vue',
        meta: 'A production-ready animation library',
        href: 'https://motion.dev',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop',
        alt: 'Retro computer hardware',
      },
      {
        id: 'nuxt-ui',
        title: 'Nuxt UI',
        meta: 'A UI library for Nuxt applications',
        href: 'https://ui.nuxt.com',
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=600&fit=crop',
        alt: 'A designer working on an interface',
      },
    ],
  },
  'NotificationBadge': {
    count: 3,
    tooltip: '3 unread messages',
    __slot: `<button type="button" style="display:inline-flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:9999px;border:1px solid var(--ui-border);background:var(--ui-bg);cursor:pointer"><span style="font-size:1.1rem">🔔</span></button>`,
  },
  'Phototab': {
    defaultTab: 'Coast',
    height: 420,
    tabs: [
      { name: 'Mountains', icon: 'i-lucide-mountain', image: 'https://picsum.photos/seed/mountains/800/800' },
      { name: 'Coast', icon: 'i-lucide-waves', image: 'https://picsum.photos/seed/coast/800/800' },
      { name: 'Forest', icon: 'i-lucide-trees', image: 'https://picsum.photos/seed/forest/800/800' },
      { name: 'City', icon: 'i-lucide-building-2', image: 'https://picsum.photos/seed/city/800/800' },
    ],
  },
  'Breadcrumb': {
    items: [
      { label: 'Docs', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'Navigation', href: '#' },
      { label: 'Breadcrumb' },
    ],
  },
  'ExpandableNavbar': {
    items: [
      { label: 'Products', to: '#', icon: 'i-lucide-box' },
      { label: 'Pricing', to: '#', icon: 'i-lucide-tag' },
      { label: 'Docs', to: '#', icon: 'i-lucide-book-open' },
    ],
  },
  'FileTree': {
    defaultExpanded: ['src', 'src/components'],
    showLines: true,
    items: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 'src/components',
            name: 'components',
            type: 'folder',
            children: [
              { id: 'src/components/button', name: 'Button.vue', type: 'file' },
              { id: 'src/components/card', name: 'Card.vue', type: 'file' },
              { id: 'src/components/file-tree', name: 'FileTree.vue', type: 'file', badge: 'modified' },
            ],
          },
          { id: 'src/app', name: 'App.vue', type: 'file' },
          { id: 'src/main', name: 'main.ts', type: 'file' },
        ],
      },
      {
        id: 'docs',
        name: 'docs',
        type: 'folder',
        children: [{ id: 'docs/readme', name: 'README.md', type: 'file' }],
      },
      { id: 'package', name: 'package.json', type: 'file' },
    ],
  },
  'FloatingNavbar': {
    links: [
      { label: 'Features', to: '#' },
      { label: 'Pricing', to: '#' },
      { label: 'Docs', to: '#' },
    ],
  },
  'ToolbarExpandable': {
    items: [
      { id: 'ada', label: 'Ada', icon: 'i-lucide-user', content: 'Analytical engine notes' },
      { id: 'linus', label: 'Linus', icon: 'i-lucide-terminal', content: 'Kernel patch series' },
      { id: 'grace', label: 'Grace', icon: 'i-lucide-ship', content: 'Compiler design notes' },
    ],
  },
  'Pagination': {
    totalPages: 8,
  },
  'KineticTypeScroll': {
    words: ['Scroll', 'to', 'set', 'the', 'phrase', 'in', 'motion'],
  },
  'ScrollImageReveal': {
    src: 'https://picsum.photos/seed/motion-reveal/900/600',
    alt: 'A misty mountain ridge at sunrise',
    mask: 'circle',
  },
  'ScrollVelocity': {
    texts: ['Fast Scroll', 'Medium Speed', 'Slow Motion'],
  },
  'SvgDrawOnScroll': {
    paths: [
      'M12 78 C 26 40, 40 62, 50 38 C 60 14, 74 44, 88 22',
      'M14 22 L 50 50 L 86 22',
      'M50 8 L 50 92',
      'M10 50 L 90 50',
    ],
    viewBox: '0 0 100 100',
  },
  'AnimatedAvatarGroup': {
    avatars: [
      { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Ana Ruiz' },
      { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Ben Osei' },
      { src: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Cleo Park' },
      { src: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Dmitri Ilves' },
      { src: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Elin Haugen' },
      { src: 'https://randomuser.me/api/portraits/men/11.jpg', alt: 'Farid Nazari' },
    ],
  },
  'AnimatedList': {
    items: [
      { id: 1, label: 'Deploy', text: 'Production build shipped' },
      { id: 2, label: 'Signup', text: 'New account created' },
      { id: 3, label: 'Payment', text: 'Invoice #1042 paid' },
      { id: 4, label: 'Alert', text: 'CPU usage above 80%' },
    ],
  },
  'AnimatedNumber': {
    value: 128,
  },
  'BlurOutUp': {
    text: 'Every line arrives softly',
  },
  'BottomUpLetters': {
    text: 'Stagger the letters',
  },
  'DepthParallaxWords': {
    text: 'Words at three depths',
  },
  'FadeThrough': {
    phrases: [
      'One line at a time.',
      'No overlap, no jitter.',
      'Quiet by default.',
    ],
  },
  'FocusBlurResolve': {
    text: 'The headline comes into focus',
  },
  'GravityLetters': {
    text: 'Gravity takes the letters',
  },
  'KineticCenterBuild': {
    phrases: [
      'Built one word at a time.',
      'Centred, then locked.',
      'Never a layout jump.',
    ],
  },
  'LineByLineSlide': {
    text: 'Every line slides in from the side',
  },
  'MaskRevealUp': {
    text: 'Every line rises\nout of its own mask',
  },
  'MicroScaleFade': {
    text: 'Quiet micro motion',
  },
  'PerCharacterRise': {
    text: 'Character by character',
  },
  'PerWordCrossfade': {
    text: 'Word by word',
  },
  'PerspectiveText3D': {
    text: 'Text on the horizon',
  },
  'ScaleDownFade': {
    text: 'Shrink into place',
  },
  'ScrollRevealParagraph': {
    paragraph: 'This paragraph reveals itself line by line as you scroll past it, ending exactly where the reader lands.',
  },
  'SharedAxis': {
    phrases: [
      'product tours.',
      'data dashboards.',
      'release notes.',
    ],
    axis: 'x',
  },
  'ShimmerSweep': {
    text: 'A light sweeps across',
  },
  'ShineText': {
    text: 'Shines on cue',
  },
  'ShortSlideDown': {
    phrases: ['Ship it', 'Then sleep on it', 'Ship it on Friday'],
  },
  'ShortSlideRight': {
    phrases: ['Ship it', 'Measure it', 'Ship it again'],
  },
  'SoftBlurIn': {
    text: 'Soft blur into focus',
  },
  'SpinningText': {
    children: 'Nuxt Motion · Nuxt Motion · Nuxt Motion · Nuxt Motion · ',
  },
  'SpringScaleIn': {
    text: 'Springs into place',
  },
  'StaggerFromCenter': {
    text: 'Outward from the middle',
  },
  'StaggerFromEdges': {
    text: 'Inward from both edges',
  },
  'TextGlitchNew': {
    text: 'Signal interrupted',
  },
  'TopDownLetters': {
    text: 'Letters drop in',
  },
  'WaveText': {
    text: 'Every letter rides the wave',
  },
  'TextLoop': {
    items: ['Modern', 'Innovative', 'Beautiful', 'Interactive'],
  },
  'TypingText': {
    text: 'Deterministic typing, every frame.',
  },
  'WordRotate': {
    words: ['design', 'build', 'create'],
  },
  'TransitionPanel': {
    activeIndex: 0,
    __slot: `<div style="padding:2rem 1.5rem;min-height:12rem;border-radius:1rem;border:1px solid var(--ui-border);background:var(--ui-bg)"><p style="font-weight:600;margin:0 0 .5rem">Panel one</p><p style="opacity:.7;font-size:.9rem">Change the panel index to cycle the screens.</p></div>`,
  },

  // ─── Slot-driven components ─────────────────────────────────────────────
  // Raw HTML injected into the default slot so the panel preview renders content.
  'TextGradient': {
    __slot: `<span style="font-size:2rem;font-weight:700">Motion in the margins</span>`,
  },
  'MorphToggle': {
    __slot: `<span style="font-size:1rem">Toggle me</span>`,
  },
  'AnimatedBackground': {
    __slot: `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;height:100%;padding:1rem;text-align:center">
  <p style="font-weight:700;font-size:1.1rem;margin:0">The background moves, the copy does not</p>
  <p style="font-size:.8rem;opacity:.7;margin:0">Switch tabs to move the gradient.</p>
</div>`,
  },
  'BackgroundLines': {
    __slot: `<div style="padding:2.5rem 1.5rem;text-align:center;max-width:20rem">
  <p style="font-weight:700;font-size:1.2rem;margin:0 0 .4rem">Lines that point somewhere</p>
  <p style="font-size:.85rem;opacity:.72;margin:0">SVG curves trace across the backdrop and pull your eye toward the action.</p>
</div>`,
  },
  'DrawingCursor': {
    __slot: `<div style="width:100%;height:12rem;display:flex;align-items:center;justify-content:center;border:1px dashed var(--ui-border-accented);border-radius:1rem">
  <p style="font-size:.85rem;opacity:.65;margin:0">Move the cursor to draw</p>
</div>`,
  },
  'EmbossSurface': {
    __slot: `<div style="padding:2rem 1.5rem;text-align:center">
  <p style="font-weight:700;font-size:1.2rem;margin:0 0 .3rem">Pressed into the glass</p>
  <p style="font-size:.85rem;opacity:.7;margin:0">The light follows the angle of the panel.</p>
</div>`,
  },
  'GooeyFilter': {
    __slot: `<div style="display:flex;gap:.6rem;align-items:center;justify-content:center;height:10rem">
  <div style="width:3.5rem;height:3.5rem;border-radius:9999px;background:var(--ui-primary)"></div>
  <div style="width:3.5rem;height:3.5rem;border-radius:9999px;background:var(--ui-secondary)"></div>
  <div style="width:3.5rem;height:3.5rem;border-radius:9999px;background:var(--ui-primary)"></div>
</div>`,
  },
  'AnimatedTooltip': {
    __slot: `<button type="button" style="padding:.45rem 1.1rem;border-radius:.6rem;border:1px solid var(--ui-border);background:var(--ui-bg);cursor:pointer;font-weight:500">Hover me</button>`,
    text: 'Spring-loaded hint with an arrow and kbd hints',
  },
  'CountBadge': {
    count: 4,
    __slot: `<button type="button" style="display:inline-flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:9999px;border:1px solid var(--ui-border);background:var(--ui-bg);cursor:pointer"><span style="font-size:1.1rem">🔔</span></button>`,
  },
  'Dock': {
    __slot: `<button type="button" style="width:3.5rem;height:3.5rem;border-radius:9999px;border:1px solid var(--ui-border);background:var(--ui-bg);cursor:pointer;font-size:1.1rem">🏠</button><button type="button" style="width:3.5rem;height:3.5rem;border-radius:9999px;border:1px solid var(--ui-border);background:var(--ui-bg);cursor:pointer;font-size:1.1rem">✉️</button><button type="button" style="width:3.5rem;height:3.5rem;border-radius:9999px;border:1px solid var(--ui-border);background:var(--ui-bg);cursor:pointer;font-size:1.1rem">⚙️</button>`,
  },
  'Drawer': {
    __slot: `<button type="button" style="padding:.55rem 1.1rem;border-radius:.6rem;border:0;cursor:pointer;font-weight:500;background:var(--ui-primary);color:var(--ui-bg)">Open drawer</button>`,
  },
  'ContentSkeleton': {
    __slot: `<div style="display:flex;flex-direction:column;gap:.6rem;padding:1rem;width:16rem">
  <div style="height:1rem;width:80%;border-radius:.4rem;background:var(--ui-border-accented)"></div>
  <div style="height:1rem;width:100%;border-radius:.4rem;background:var(--ui-border-accented)"></div>
  <div style="height:1rem;width:60%;border-radius:.4rem;background:var(--ui-border-accented)"></div>
</div>`,
  },
  'InView': {
    once: false,
    __slot: `<div style="padding:2rem;text-align:center;font-weight:600">Scroll me — I fade and rise into view</div>`,
  },
  'InfiniteSlider': {
    __slot: `<div style="display:flex;gap:1rem;padding:.5rem 0"><div style="padding:.5rem 1.25rem;border:1px solid var(--ui-border);border-radius:9999px;white-space:nowrap">Alpha</div><div style="padding:.5rem 1.25rem;border:1px solid var(--ui-border);border-radius:9999px;white-space:nowrap">Beta</div><div style="padding:.5rem 1.25rem;border:1px solid var(--ui-border);border-radius:9999px;white-space:nowrap">Gamma</div><div style="padding:.5rem 1.25rem;border:1px solid var(--ui-border);border-radius:9999px;white-space:nowrap">Delta</div></div>`,
  },
  'PrismSweepTransition': {
    __slot: `<div style="padding:2rem 1.5rem;min-height:12rem;display:flex;align-items:center;justify-content:center;border-radius:1rem;background:linear-gradient(135deg,#302b63,#0f0c29);color:#fff;font-weight:700;font-size:1.3rem">Slide the key</div>`,
  },
  'SdfBlobTransition': {
    __slot: `<div style="padding:2rem 1.5rem;min-height:12rem;display:flex;align-items:center;justify-content:center;border-radius:1rem;background:#111827;color:#a5f3fc;font-weight:700;font-size:1.3rem">Blob reveals</div>`,
  },
  'ShaderRevealTransition': {
    __slot: `<div style="padding:2rem 1.5rem;min-height:12rem;display:flex;align-items:center;justify-content:center;border-radius:1rem;background:#0b1020;color:#c4b5fd;font-weight:700;font-size:1.3rem">Reveal</div>`,
  },
  'ToolbarDynamic': {
    __slot: `<button type="button" style="display:inline-flex;align-items:center;gap:.4rem;padding:.45rem .9rem;border:0;border-radius:.6rem;cursor:pointer;background:var(--ui-primary);color:var(--ui-bg);font-weight:600"><span>✏️</span><span>Edit</span></button><button type="button" style="display:inline-flex;align-items:center;gap:.4rem;padding:.45rem .9rem;border:0;border-radius:.6rem;cursor:pointer;background:transparent;color:var(--ui-text);font-weight:600"><span>📋</span><span>Copy</span></button>`,
  },

  // ─── Text components that default to an empty string ──────────────────────
  'TextEffect': {
    children: 'Words arrive one by one.',
  },
  'TextGlitch': {
    text: 'Frag glitch',
  },
  'TextMorph': {
    text: 'Morphing text',
  },
  'TextReveal': {
    text: 'Revealed line by line',
  },
  'TextRoll': {
    children: 'Rolling over',
  },
  'TextScramble': {
    text: 'Unlock the vault',
  },
  'TextShimmerWave': {
    text: 'Waves of shimmer',
  },

  'CodeBlock': {
    code: `const answer = 42\n`,
    language: 'js',
  },
}
