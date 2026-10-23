---
title: Components
description: Explore all the components available in Nuxt Motion Block.
---

Nuxt Motion Block ships 180+ components across seventeen categories, from a chat transcript to a card that leans toward the pointer. Every page follows the same shape — usage, customization, props, UI slots, accessibility and performance — so once you have read one, the rest read the same way. The sidebar lists every page; this page is the map.

## Categories

### 3D

- [3D Card](/components/3d/3d-card) — a card with perspective that responds to pointer movement.
- [Book](/components/3d/book) — a jacket, a spine and a page block drawn with CSS 3D.

### AI

Twenty pieces for assistant interfaces, from the transcript down to the character:

- [AI Messages](/components/ai/ai-messages) — a transcript of chat turns, with the module's six AI states mapped onto Nuxt UI's four.
- [AI Message](/components/ai/ai-message) — a single turn: avatar, bubble, actions.
- [AI Reasoning](/components/ai/ai-reasoning) — thinking collapsed behind a one-line summary with a measured duration.
- [AI Tool Call](/components/ai/ai-tool-call) and [AI Task List](/components/ai/ai-task-list) — an invocation with a status ring, and the plan around it.
- [AI Sources](/components/ai/ai-sources) and [AI Citation](/components/ai/ai-citation) — the evidence: a fan of favicons and the inline reference.
- [AI Prompt Input](/components/ai/ai-prompt-input) — attachments, a live counter, and a submit button that becomes stop.
- [AI Orb Face Mouth](/components/ai/ai-orb-face-mouth) — the character: nine moods, gaze, and a mouth that talks over any of them.
- [AI Conversation](/components/ai/ai-conversation) — a thread that follows the bottom only while you are already there, and offers a way back when you leave.
- [AI Branch](/components/ai/ai-branch) — several answers to one question, swapped one at a time under an anchor that never moves.
- [AI Approval](/components/ai/ai-approval) — the card an agent puts up before it acts, where the chosen option fills the card and the rest collapse away.
- [AI Artifact](/components/ai/ai-artifact) — a generated artifact whose preview and source swap along a shared axis instead of cross-fading.
- [AI Context Meter](/components/ai/ai-context-meter) — a ring that shows how full the context window is, changing hue at the thresholds and never changing size.
- [AI Suggestions](/components/ai/ai-suggestions) — prompt chips that radiate in from the middle of the row, so no chip reads as the important one.

### Backgrounds

- [Animated Background](/components/backgrounds/animated-background) — a field that follows interactive elements.
- [Background Beams](/components/backgrounds/background-beams) — light beams that converge on a focal point.
- [Aurora Background](/components/backgrounds/aurora-background) — a slow aurora wash behind content.
- [Vortex](/components/backgrounds/vortex) and [Meteors](/components/backgrounds/meteors) — motion you can leave running behind a hero.

### Buttons

- [Magnetic Button](/components/buttons/magnetic-button) — the button leans toward the cursor.
- [Button Copy](/components/buttons/button-copy) — copy that confirms itself.
- [Theme Toggle](/components/buttons/theme-toggle) and [Music Toggle](/components/buttons/music-toggle) — small switches with the motion built in.

### Cards

- [Draggable Card](/components/cards/draggable-card) — a card you can pick up and throw, with spring physics.
- [Evervault Card](/components/cards/ever-vault-card) — a gradient that follows the cursor across the surface.
- [Wallet Card](/components/cards/wallet-card) — gradient, grain, EMV chip, contactless glyph and a hover sheen.
- [Stacked Cards](/components/cards/card-stack) — a stack that rotates itself.
- [Glass Card](/components/cards/glass-card) and [Glass Panel](/components/cards/glass-panel) — frosted surfaces with the blur done properly.
- [Mac Terminal](/components/cards/mac-terminal) — a window that types a scripted shell session.
- [Photo Stack](/components/cards/photo-stack) - a draggable deck that throws the top card to the back.
- [Tilt Card](/components/cards/tilt-card) - a surface that leans toward the pointer, with a glare and depth parallax.

### Carousels

- [Carousel](/components/carousels/carousel) — embla-backed, with the controls themed.
- [Coverflow Carousel](/components/carousels/coverflow-carousel) — covers recede on either side.
- [Reviews Carousel](/components/carousels/reviews-carousel) — testimonials on a loop.

### Directional

- [Direction Aware Hover](/components/directional/direction-aware-hover) — the hover response comes from the side the pointer entered.

### Effects

- [Spotlight](/components/effects/spotlight) — light that tracks the cursor.
- [Border Beam](/components/effects/border-beam) and [Tracing Beam](/components/effects/tracing-beam) — a highlight that travels along an edge.
- [Siri Orb](/components/effects/siri-orb) — an ambient orb that reacts to audio amplitude and assistant state.
- [Liquid Metal](/components/effects/liquid-metal) — a WebGL2 surface that flows like chrome, gold or mercury.
- [Gooey Filter](/components/effects/gooey-filter) — an SVG filter that melts overlapping shapes into one silhouette.
- [Pixelated Canvas](/components/effects/pixelated-canvas) and [ASCII Render](/components/effects/ascii-render) — an image redrawn as cells or characters.

### Forms

- [Animated Input](/components/forms/animated-input) — a field whose focus state moves.
- [Animated Toggle](/components/forms/animated-toggle) and [Checkbox](/components/forms/checkbox) — switches with real state changes, not colour swaps.
- [Morph Toggle](/components/forms/morph-toggle) — a switch whose thumb squares off while off and rolls into a circle.
- [Animated File Upload](/components/forms/animated-file-upload) — drop zone, progress, done.
- [Animated Stepper](/components/forms/animated-stepper) — a multi-step flow that animates between steps.
- [Animated OTP Input](/components/forms/animated-otp-input) — six boxes and a shake on failure.
- [Country Picker](/components/forms/country-picker) and [Favicon Search](/components/forms/favicon-search) — searchable pickers with real listbox behaviour.
- [Scrubber](/components/forms/scrubber) and [Social Selector](/components/forms/social-selector) — a bounded slider and a row of network toggles.
- [Digit Roll](/components/forms/digit-roll) — a number field whose digits roll, with scrubbing and keyboard stepping.
- [Float Input](/components/forms/float-input) — a label that rises into the border as the field fills.

### Interactive

- [Dock](/components/interactive/dock) — the macOS dock, magnification included.
- [Dynamic Island](/components/interactive/dynamic-island) — a pill that morphs between five system views.
- [Motion Dialog](/components/interactive/animated-dialog), [Drawer](/components/interactive/drawer) and [Rich Popover](/components/interactive/rich-popover) — overlays that animate from where they belong.
- [Drag and Drop](/components/interactive/drag-and-drop) — sortable lists with a spring handoff.
- [Unlock Face ID](/components/interactive/unlock-face-id) — a scan that blurs content until it succeeds.
- [Code Block](/components/interactive/code-block) — Shiki highlighting with a copy button.
- [Fluid Hover Highlight](/components/interactive/fluid-hover-highlight) - one plate that travels between the rows the pointer or the keyboard lands on.
- [Hover Expand](/components/interactive/hover-expand) and [Hover Image List](/components/interactive/hover-image-list) - panels that trade width on hover, and a link list with a trailing preview.
- [Phototab](/components/interactive/phototab) - a square photo panel behind an icon tab bar that slides in on hover.
- [Image Metadata Preview](/components/interactive/image-metadata-preview) - a photo whose metadata panel rises from the bottom as the image lifts clear.
- [Count Badge](/components/interactive/count-badge) - notification counts, presence dots and pings on the same anchor.
- [GitHub Stars Animation](/components/interactive/github-stars-animation) - a star count that climbs beside a stack of stargazer avatars.
- [Interactive Image Selector](/components/interactive/interactive-image-selector) - a photo grid that switches into a selection mode with a floating share and delete bar.
- [Time Machine Stack](/components/interactive/time-machine-stack) - a 3D stack of panels you page through with the wheel, a drag or the arrow keys.
- [Job Listing](/components/interactive/job-listing) - a list of open roles that opens each posting into a focused detail panel.
- [Folder Reveal](/components/interactive/folder-reveal) — a folder with a tab and a front flap, whose cards fan out of the gap.
- [Inline Testimonials](/components/interactive/inline-testimonials) — quotes opened from the name cited inside the sentence.
- [Morph Surface](/components/interactive/morph-surface) — a dock that grows into the composer it opens, without pushing the page down.
- [Power Off Slide](/components/interactive/power-off-slide) — a destructive action behind a handle that has to travel the length of the track.
- [Contribution Graph](/components/interactive/contribution-graph) — a year of activity as a keyboard-reachable heatmap.

### Layout

- [Animated Group](/components/layout/animated-group) — coordinated enter and exit for a set of children.
- [Collision](/components/layout/collision) — beams and an explosion where elements meet.
- [Breakpoint Indicator](/components/layout/breakpoint-indicator) — the active Tailwind breakpoint and live viewport size.

### Loaders

- [Motion Loader](/components/loaders/motion-loader) — an indeterminate spinner with weight.
- [Grid Loader](/components/loaders/grid-loader) — a grid that fills and empties in sequence.
- [Page Preloader](/components/loaders/page-preloader) — a first-paint cover that gets out of the way.
- [AI Loader](/components/loaders/ai-loader) — three waiting indicators on one shared cycle.
- [Content Skeleton](/components/loaders/content-skeleton) — a pulse layer shaped by the content it stands in for.

### Movement

- [Cursor](/components/movement/cursor) - a custom cursor with trailing effects.
- [Cursor Follow](/components/movement/cursor-follow) - a dot that becomes a label over anything marked with `data-cursor-text`.
- [Magnetic](/components/movement/magnetic) — elements pulled toward the pointer.
- [Tilt](/components/movement/tilt) — 3D tilt from cursor position.
- [Force Dot](/components/movement/force-dot) — a dot with physics of its own.
- [Magnetic Field](/components/movement/magnetic-field) — a group where each marked element leans toward the pointer on its own spring.

### Navigation

- [Expandable Navbar](/components/navigation/expandable-navbar) — a bar that opens in place.
- [Floating Navbar](/components/navigation/floating-navbar) — a bar that detaches from the top edge.
- [Adaptive Toolbar](/components/navigation/toolbar-dynamic) and [Collapsible Toolbar](/components/navigation/toolbar-expandable) — an icon rail that grows into an action bar.
- [Breadcrumb](/components/navigation/breadcrumb), [Pagination](/components/navigation/pagination) and [File Tree](/components/navigation/file-tree) — trails, page ranges and a tree that unfolds.

### Scroll

- [In View](/components/scroll/in-view) — trigger work when an element enters the viewport.
- [Scroll Progress](/components/scroll/scroll-progress) — a bar tied to document position.
- [Scroll Velocity](/components/scroll/scroll-velocity) — speed, not position, drives the effect.
- [Kinetic Type Scroll](/components/scroll/kinetic-type-scroll) — each word lifts on its own window of scroll.
- [Infinite Slider](/components/scroll/infinite-slider) — a loop that never shows its seam.

### Text

- [Text Reveal](/components/text/text-reveal) — content uncovered in a chosen direction.
- [Text Shimmer](/components/text/text-shimmer) and [Text Shimmer Wave](/components/text/text-shimmer-wave) — a highlight that passes through the glyphs.
- [Text Scramble](/components/text/text-scramble) and [Text Morph](/components/text/text-morph) — characters resolving into the real string.
- [Typing Text](/components/text/typing-text) and [Word Rotate](/components/text/word-rotate) — the two classic rotation patterns.
- [Animated Number](/components/text/animated-number), [Counting Number](/components/text/counting-number) and [Sliding Number](/components/text/sliding-number) — digits that move instead of swap.
- [Number Flow](/components/text/number-flow) — a fixed-width counter whose digits roll in the direction of the change.
- [Ransom Note](/components/text/ransom-note) — a string cut into scraps of mismatched type.
- [Shared Axis](/components/text/shared-axis) — one phrase replaces another along a horizontal, vertical or depth axis.
- [Blur Out Up](/components/text/blur-out-up), [Depth Parallax Words](/components/text/depth-parallax-words) and [Per Character Rise](/components/text/per-character-rise) — entrances at three units: word, phrase, letter.
- [Scale Down Fade](/components/text/scale-down-fade) and [Shimmer Sweep](/components/text/shimmer-sweep) — a single line settling, large or soft.
- [Fade Through](/components/text/fade-through) and [Kinetic Center Build](/components/text/kinetic-center-build) — phrase rotation, quiet and loud.
- [Scroll Reveal Paragraph](/components/text/scroll-reveal-paragraph) — prose that fills in as it travels up the viewport.
- [Gravity Letters](/components/text/gravity-letters) — glyphs that fall, bounce and spring back into the line.

### Transitions

- [Transition Panel](/components/transitions/transition-panel) — swap panels without a jump cut.
- [Prism Sweep Transition](/components/transitions/prism-sweep-transition), [SDF Blob Transition](/components/transitions/sdf-blob-transition) and [Shader Reveal Transition](/components/transitions/shader-reveal-transition) — shader-driven reveals between two states.

## Related

The hooks behind these components live under [Composables](/composables) — `useMotionBlockUI` for theming, `useThemeColor` for canvas work, and the cursor helpers. For install and prefix configuration, see [Usage](/getting-started/usage).
