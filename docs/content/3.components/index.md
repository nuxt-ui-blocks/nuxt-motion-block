---
title: Components
description: All 292 components in Nuxt Motion Block, grouped by family with a one-line summary of each.
---

Nuxt Motion Block ships 292 components across seventeen families — from a chat transcript to a card that leans toward the pointer. Every page follows the same shape — usage, theming, props, UI slots, accessibility and performance — so once you have read one, the rest read the same way. The sidebar lists them too; this page is the map.

## Categories

### 3D

- [3D Card](/components/3d/3d-card) — Interactive 3D card with perspective effects that respond to mouse movement.
- [Book](/components/3d/book) — A 3D book cover built from CSS perspective transforms, with a spine, page block and a hover tilt.
- [Globe](/components/3d/globe) — An autorotating, interactive globe rendered in WebGL.

### AI

- [Agent Avatar](/components/ai/agent-avatar) — A deterministic, animated pixel avatar generated from a string seed.
- [AI Approval](/components/ai/ai-approval) — The card an agent puts up before it acts, where the chosen option fills the card and the rest collapse away.
- [AI Artifact](/components/ai/ai-artifact) — A generated artifact whose preview and source swap along a shared axis instead of cross-fading.
- [AI Branch](/components/ai/ai-branch) — Several answers to the same question, swapped one at a time under an anchor that never moves.
- [AI Citation](/components/ai/ai-citation) — An inline citation pill that previews its source on hover or focus.
- [AI Context Meter](/components/ai/ai-context-meter) — A ring that shows how full the context window is, changing hue at the thresholds and never changing size.
- [AI Conversation](/components/ai/ai-conversation) — A thread that follows the bottom only while you are already there, and offers a way back when you leave.
- [AI Diff](/components/ai/ai-diff) — A reviewable code patch with a staggered wipe, a verdict flash, and accept or reject.
- [AI Message](/components/ai/ai-message) — One chat turn — role, part-driven content, a copy action and your own actions.
- [AI Messages](/components/ai/ai-messages) — A transcript of chat turns, with this module's six AI states mapped onto Nuxt UI's four.
- [AI Orb](/components/ai/ai-orb) — A WebGL2 sphere with colour marbling inside it, lit like a real material.
- [AI Orb Face](/components/ai/ai-orb-face) — A character that wears an orb: expression, gaze, breathing, and a fault wobble.
- [AI Orb Face Mouth](/components/ai/ai-orb-face-mouth) — A character that wears an orb: nine moods, gaze, blinking, and a mouth that talks over any of them.
- [AI Prompt Input](/components/ai/ai-prompt-input) — The composer: attachments, a live counter, and a submit button that becomes stop.
- [AI Reasoning](/components/ai/ai-reasoning) — A model thinking out loud, collapsed behind a one-line summary with a measured duration.
- [AI Response](/components/ai/ai-response) — Streamed answer text where words fade in as they arrive and `[n]` markers become citation pills.
- [AI Sources](/components/ai/ai-sources) — A collapsed stack of source favicons that fans on hover and expands into a list.
- [AI Suggestions](/components/ai/ai-suggestions) — Prompt chips that radiate in from the middle of the row, so no chip reads as the important one.
- [AI Task List](/components/ai/ai-task-list) — A plan the model is working through — nested steps, a derived count, and a check that draws itself.
- [AI Tool Call](/components/ai/ai-tool-call) — A single tool invocation with a status ring that keeps its shape through the whole lifecycle.
- [Image Generation Panel](/components/ai/image-generation-panel) — A prompt composer, a grid of tiles that resolve from mosaic to sharp, and the batch progress around them.

### Backgrounds

- [Animated Background](/components/backgrounds/animated-background) — Animated background that follows interactive elements.
- [Animated Grid Pattern](/components/backgrounds/animated-grid-pattern) — A faint lattice with squares that light up at random.
- [Animated Spotlight](/components/backgrounds/animated-spotlight) — Animated spotlight effect with customizable gradients and movement.
- [Aurora Background](/components/backgrounds/aurora-background) — Animated background with aurora-like gradient effects.
- [Aurora Curtain](/components/backgrounds/aurora-curtain) — A WebGL aurora of folding light ribbons with film grain, drifting behind any content.
- [Background Beams](/components/backgrounds/background-beams) — Animated SVG background with customizable beam paths and gradient colors.
- [Background Gradient Animation](/components/backgrounds/background-gradient-animation) — Animated background with customizable gradient colors and interactive effects.
- [Background Lines](/components/backgrounds/background-lines) — Animated SVG background with customizable coloured lines that move across the screen.
- [Background Ripple Effect](/components/backgrounds/background-ripple-effect) — Interactive background ripple effect with customizable grid size and cell dimensions.
- [Boxes Core](/components/backgrounds/boxes-core) — Animated grid of boxes with hover effects and customizable colours.
- [Directional Light](/components/backgrounds/directional-light) — SVG-based directional light effect with customizable colours and positioning.
- [Dotted Glow Background](/components/backgrounds/dotted-glow-background) — Animated dotted background with glowing effects and customizable colours.
- [Dotted Map](/components/backgrounds/dotted-map) — A flat world map traced in dots, with markers that can pulse.
- [Flickering Grid](/components/backgrounds/flickering-grid) — A canvas of squares that keeps re-rolling its own opacity.
- [Hexagon Pattern](/components/backgrounds/hexagon-pattern) — A honeycomb lattice drawn as a single repeating SVG tile.
- [Interactive Grid Pattern](/components/backgrounds/interactive-grid-pattern) — A grid of cells that lights up under the pointer — an interactive background for heros and empty states.
- [Lamp Container](/components/backgrounds/lamp-container) — Animated lamp effect container with customizable gradient colors and lighting effects.
- [Light Rays](/components/backgrounds/light-rays) — A fan of soft light beams sweeping out of one corner or edge.
- [Meteors](/components/backgrounds/meteors) — Animated meteor shower effect with customizable density and timing.
- [Noise Texture](/components/backgrounds/noise-texture) — A film-grain overlay generated by a single SVG turbulence filter.
- [Particles](/components/backgrounds/particles) — A drifting field of dots that scatters away from the pointer.
- [Retro Grid](/components/backgrounds/retro-grid) — A tilted grid plane that scrolls towards the horizon.
- [Shooting Stars](/components/backgrounds/shooting-stars) — Animated shooting stars effect with customizable colours, speed, and timing.
- [Stars Background](/components/backgrounds/stars-background) — Animated starfield background with customizable density and twinkling effects.
- [Striped Pattern](/components/backgrounds/striped-pattern) — A diagonal stripe backdrop drawn from a single repeating gradient.
- [Vortex](/components/backgrounds/vortex) — Animated particle vortex effect with customizable colours, speed, and density.
- [Warp Background](/components/backgrounds/warp-background) — A perspective floor grid that scrolls toward the viewer under a glowing horizon.

### Buttons

- [Button Copy](/components/buttons/button-copy) — A copy button that swaps its icon and its label for a checkmark once the clipboard write is done.
- [Clip Corners Button](/components/buttons/clip-corners-button) — A button whose four corner triangles spring inward on hover, reading as the corners being clipped away.
- [Dot Morph Button](/components/buttons/dot-morph-button) — A UButton whose leading dot turns from a circle into a pill on hover, sized to the button itself.
- [Interactive Hover Button](/components/buttons/interactive-hover-button) — A pill with a dot that blooms into a full fill while the label slides over.
- [Magnetic Button](/components/buttons/magnetic-button) — A button that follows the pointer inside a pull radius and springs back when the pointer leaves.
- [Music Toggle](/components/buttons/music-toggle) — A record that spins while playing, wrapped in a progress ring, with a waveform and a keyboard-seekable slider.
- [Pulsating Button](/components/buttons/pulsating-button) — A primary button with a halo that keeps expanding behind it.
- [Rainbow Button](/components/buttons/rainbow-button) — A button whose one-pixel border carries a rotating conic gradient.
- [Ripple Button](/components/buttons/ripple-button) — A button that spawns a spreading circle wherever you press.
- [Shimmer Button](/components/buttons/shimmer-button) — A dark button with a highlight that keeps sweeping across its face.
- [Shiny Button](/components/buttons/shiny-button) — A bordered button with a light sweep that crosses it on hover.
- [Smooth Button](/components/buttons/smooth-button) — A button with a skewed light sweep on hover and a press scale, wrapped so every UButton prop still works.
- [Theme Toggle](/components/buttons/theme-toggle) — A button that advances Nuxt UI's colour mode through light, dark and system, crossfading the glyph that names the current one.

### Cards

- [App Download Stack](/components/cards/app-download-stack) — An expandable macOS-style app selector that fanned-stack animates icons and drives a multi-app download flow.
- [Apple Invites](/components/cards/apple-invites) — A stacked carousel of Apple-style invite cards that auto-advances with 3D-like slide transitions.
- [Bento Grid](/components/cards/bento-grid) — A responsive grid of cards that reveal more on hover.
- [Card Swipe Deck](/components/cards/card-swipe-deck) — A deck of cards you throw left or right, with drag-driven stamps, a colour wash, a receding stack and an imperative API.
- [Draggable Card](/components/cards/draggable-card) — Interactive card that can be dragged around with 3D tilt effects.
- [Evervault Card](/components/cards/ever-vault-card) — Cybersecurity-inspired card with dynamic gradient effects that follow cursor movement.
- [Expandable Cards](/components/cards/expandable-cards) — An accordion-like stack that expands a single card at a time with smooth height and rotation animations.
- [Figma Comment](/components/cards/figma-comment) — A compact Figma-style comment bubble that expands from a dot to reveal the full comment on click.
- [Focus Cards](/components/cards/focus-cards) — Interactive card grid with hover effects that expand and focus on individual cards.
- [Glare Card](/components/cards/glare-card) — Interactive card with dynamic glare effects that respond to mouse movement.
- [Glass Card](/components/cards/glass-card) — A layered glass surface whose specular highlight, light sweep and chromatic rim track the pointer.
- [Glass Panel](/components/cards/glass-panel) — A frosted card with an optional background image that drifts under the pointer.
- [Glow Hover Cards](/components/cards/glow-hover-cards) — A responsive grid of cards, each with a radial glow that follows the pointer inside it.
- [Glowing Stars Card](/components/cards/glowing-stars-card) — Card component with animated glowing stars effect and customizable colours.
- [Mac Terminal](/components/cards/mac-terminal) — A macOS-style terminal window that types a scripted shell session, with traffic-light controls and a blinking caret.
- [Magic Card](/components/cards/magic-card) — A card whose highlight tracks the pointer across its edge.
- [Mail Card](/components/cards/mail-card) — A mail-list card that expands its body on click with a height animation and a rotating chevron.
- [Photo Stack](/components/cards/photo-stack) — A draggable deck of photo cards. Drag or tap the top card to send it to the back and reveal the next.
- [Price Flow](/components/cards/price-flow) — A price counter that slides each changed digit into place with a single, gently staggered transition when the value updates.
- [Product Card](/components/cards/product-card) — A store-ready product tile with a hover zoom, star rating, discount badge, wishlist and add-to-cart states.
- [Scrollable Card Stack](/components/cards/scrollable-card-stack) — A profile deck that moves one card per wheel, swipe or arrow key, with the cards behind it receding into depth.
- [Shine Border](/components/cards/shine-border) — A single highlight that travels around the edge of a box.
- [Social Hover Card](/components/cards/social-hover-card) — An inline mention that opens a profile preview on hover or focus, with count-up stats and a follow button.
- [Stacked Cards](/components/cards/card-stack) — Animated stack of cards that automatically rotate with smooth transitions.
- [Switchboard Card](/components/cards/switchboard-card) — A card that flips in 3D between a front face and a back face on a driven prop.
- [Tilt Card](/components/cards/tilt-card) — A card that rotates toward the pointer, with an optional glare and depth-based parallax for nested layers.
- [Tweet Card](/components/cards/tweet-card) — A social post card with avatar, handle, timestamp and like and repost counts that lifts on hover.
- [Wallet Card](/components/cards/wallet-card) — A realistic bank-card surface with gradient, grain, EMV chip, contactless glyph and a hover sheen — balance, masked number and optional holder details.
- [Wobble Card](/components/cards/wobble-card) — Card with a wobble effect that responds to cursor movement.

### Carousels

- [Carousel](/components/carousels/carousel) — Nuxt UI's carousel with every slide pushed into a 3D coverflow fan.
- [Coverflow Carousel](/components/carousels/coverflow-carousel) — A self-contained coverflow that fans images in 3D, driven by buttons, drag, keyboard or autoplay.
- [Reviews Carousel](/components/carousels/reviews-carousel) — A snap-scrolling review strip that drifts forward on its own and holds still while hovered.

### Directional

- [Direction Aware Hover](/components/directional/direction-aware-hover) — Card that reveals content based on the direction of mouse entry with smooth animations.
- [Direction Aware Hover New](/components/directional/direction-aware-hover-new) — Enhanced image card with content that slides in from the direction of the cursor.

### Effects

- [Animated Beam](/components/effects/animated-beam) — A gradient comet that travels between two elements.
- [Arcade Pixel](/components/effects/arcade-pixel) — Text or sprites drawn through a 5x7 pixel font on a canvas, with phosphor glow and an optional CRT overlay.
- [ASCII Render](/components/effects/ascii-render) — Samples an image or video into a grid of characters, mapping each cell's luminance to a glyph.
- [Border Beam](/components/effects/border-beam) — A comet of light that travels around a box's border as a stroked dash.
- [Border Trail](/components/effects/border-trail) — An animated border with a trail of particles that travels along its edge — for frames, cards and callouts.
- [Brightness slider](/components/effects/exposure-slider) — A notched exposure-control rail with spring tracking, keyboard support and a progress ring.
- [Confetti](/components/effects/confetti) — A canvas burst of paper pieces, fired on demand — the celebration primitive behind milestones.
- [Depth layers](/components/effects/parallax-layers) — Scroll-driven multi-depth parallax with optional pointer tracking.
- [Dither Chart](/components/effects/dither-chart) — Renders series data as a canvas chart dithered through an ordered Bayer matrix, with a draw-in animation.
- [Dither Image](/components/effects/dither-image) — An image redrawn on a canvas with an ordered or error-diffused dithering algorithm.
- [Div Grid](/components/effects/div-grid) — Grid of div elements with customizable size, colors, and interactive behavior.
- [Drawing Cursor](/components/effects/drawing-cursor) — Turns pointer movement over its own bounds into a fading, speed-tapered ink stroke on a canvas overlay.
- [Emboss Surface](/components/effects/emboss-surface) — A material surface whose relief is built from stacked shadows or a lit SVG filter, with an optional pointer-tracked light angle.
- [Flowing Stroke](/components/effects/flowing-stroke) — A dashed stroke laid along a configurable path that travels on hover or on a loop.
- [Glow Effect](/components/effects/glow-effect) — Component that adds a dynamic glow effect with customizable colours and animations.
- [Glowing Effect](/components/effects/glowing-effect) — Interactive glowing effect with customizable colours, blur, and proximity detection.
- [Gooey Filter](/components/effects/gooey-filter) — An SVG goo filter that makes overlapping shapes melt into one another as they move.
- [Gravity Stars](/components/effects/gravity-stars) — A drifting starfield whose stars fall towards the pointer, swirl past it and settle back into ambient parallax.
- [Icon Cloud](/components/effects/icon-cloud) — A draggable sphere of logos that keeps turning on its own.
- [Iridescent foil](/components/effects/holographic-foil) — A card that tilts toward the pointer under a banded holographic foil, with a looping sheen and a device-tilt mode.
- [Liquid Metal](/components/effects/liquid-metal) — A WebGL2 surface that flows like metal — chrome, gold, mercury or iridescent oil.
- [Mask Container](/components/effects/mask-container) — Dims its content behind a configurable overlay driven by a show prop.
- [Orbiting Circles](/components/effects/orbiting-circles) — Place items on one or more rings that orbit a shared centre.
- [Pixel Flow Field](/components/effects/pixel-flow-field) — A word or image rasterised into a grid of cells and set adrift by a noise flow field, with a pointer wake that scatters cells as you move.
- [Pixelated Canvas](/components/effects/pixelated-canvas) — Interactive pixelated image rendering with distortion effects and customizable cell sizes.
- [Progressive Blur](/components/effects/progressive-blur) — Component that creates a progressive blur effect in a specified direction.
- [Siri Orb](/components/effects/siri-orb) — A Siri-style ambient orb that reacts to audio amplitude and assistant state.
- [Spotlight](/components/effects/spotlight) — Component that creates a spotlight effect following the cursor.
- [Squircle](/components/effects/squircle) — Superellipse corners, generated as a clip path and tracked on resize.
- [SVG Clip Mask](/components/effects/svg-clip-mask) — Masks its content with a real SVG clipPath that can morph, step on scroll, or swap on hover.
- [Tracing Beam](/components/effects/tracing-beam) — A beam that follows the user's scroll position down the page — a scroll-linked highlight for articles and docs.
- [Video Ambient](/components/effects/video-ambient) — A video player with an ambient glow sampled from its own frames.

### Forms

- [Animated File Upload](/components/forms/animated-file-upload) — Nuxt UI's file upload with a drop zone that lifts on drag and file rows that stagger in from the left.
- [Animated Input](/components/forms/animated-input) — A text input whose label floats out of the field on focus or on the first character.
- [Animated Number Input](/components/forms/animated-number-input) — A number input whose digits roll up and down as the value changes.
- [Animated OTP Input](/components/forms/animated-otp-input) — A one-time-code input whose digits flip and scale in as each cell is filled.
- [Animated Progress Bar](/components/forms/animated-progress-bar) — A progress bar whose fill springs to the new value, with an optional shimmer sweep.
- [Animated Stepper](/components/forms/animated-stepper) — A stepper whose content panel slides horizontally in the direction of travel.
- [Animated Tags](/components/forms/animated-tags) — A tags input whose chips blur in, settle with a layout shift, and fall away when removed.
- [Animated Toggle](/components/forms/animated-toggle) — A switch that plays a quick scale pop when toggled on.
- [Auth Form](/components/forms/auth-form) — A sign-in and sign-up form with a mode cross-fade, live password rules, provider buttons and a submit button that morphs through its states.
- [Checkbox](/components/forms/checkbox) — A checkbox whose tick is drawn along its stroke when it is checked.
- [Country Picker](/components/forms/country-picker) — A searchable country dialog with recent choices, regional grouping and full keyboard navigation.
- [Digit Roll](/components/forms/digit-roll) — A numeric field whose digits roll vertically on change, with horizontal scrubbing and keyboard stepping.
- [Duration Picker](/components/forms/duration-picker) — A drag-and-keyboard friendly duration picker with animated digit transitions.
- [Favicon Search](/components/forms/favicon-search) — A combobox search field whose results show each site's favicon, with keyboard navigation and matched-text highlighting.
- [Float Input](/components/forms/float-input) — A text field whose label floats up into the border when the field is focused or filled.
- [Form](/components/forms/form) — A schema-driven form with animated field entrance, messages and error shakes.
- [Morph Toggle](/components/forms/morph-toggle) — A switch whose thumb rolls across the track and squares off while it is off.
- [Radio Group](/components/forms/radio-group) — A Nuxt UI radio group with a staggered entrance, a hover scale, and a dot that pops in.
- [Scrubber](/components/forms/scrubber) — A compact slider with a fill, tick marks and a value readout, driven by pointer capture and the keyboard.
- [Social Selector](/components/forms/social-selector) — A row of social platform buttons with a sliding indicator and a handle link that crossfades between networks.
- [Swap Panel](/components/forms/swap-panel) — A token swap form with a quoted output, countdown ring and a state-aware action button.

### Interactive

- [Accordion](/components/interactive/accordion) — A vertical stack of collapsible panels that spring their height open and closed.
- [Animated Tooltip](/components/interactive/animated-tooltip) — Nuxt UI's tooltip with a spring-driven entrance that scales in from the side it opens on.
- [Basic Dropdown](/components/interactive/basic-dropdown) — A styled select dropdown with animated chevron and custom item rendering.
- [Basic Toast](/components/interactive/basic-toast) — A declarative wrapper over Nuxt UI's useToast() that drives motion toasts with a single component.
- [Code Block](/components/interactive/code-block) — A Shiki-highlighted code panel with a language label and a copy button.
- [Code Comparison](/components/interactive/code-comparison) — Two code panes with a divider you can drag to reveal either side.
- [Contribution Graph](/components/interactive/contribution-graph) — A calendar heatmap of a year of activity, with five intensity levels, month headers and keyboard-reachable day tooltips.
- [Cool Mode](/components/interactive/cool-mode) — Wrap any control and every press throws a burst of emoji from the point you touched.
- [Count Badge](/components/interactive/count-badge) — A notification badge that anchors to a corner, counting, marking presence or just pulsing.
- [Dock](/components/interactive/dock) — macOS-style dock with magnification effects and smooth animations.
- [Drag and Drop](/components/interactive/drag-and-drop) — A sortable list, grid or masonry of items that reorder on drag and report the new order.
- [Drawer](/components/interactive/drawer) — A slide-in panel with animated content and optional handle.
- [Dynamic Group](/components/interactive/dynamic-group) — Lays out a reactive array of items as a grid, row or column and animates entries, exits and reflow.
- [Dynamic Island](/components/interactive/dynamic-island) — A pill that morphs between five system-style views — idle, incoming call, timer, notification and now playing.
- [Emoji Reaction](/components/interactive/emoji-reaction) — A controlled reaction bar with animated counters, a hover picker, and a particle burst on every reaction.
- [Fluid Hover Highlight](/components/interactive/fluid-hover-highlight) — One plate that travels to whatever row the pointer or the keyboard lands on.
- [Folder Reveal](/components/interactive/folder-reveal) — A folder with a tab, a front flap and cards that fan out of the gap when it opens.
- [GitHub Stars Animation](/components/interactive/github-stars-animation) — A repository star count that counts up beside an overlapping stack of stargazer avatars.
- [Hover Expand](/components/interactive/hover-expand) — A row of image panels where the one under the pointer grows and the rest collapse to thin strips.
- [Hover Image List](/components/interactive/hover-image-list) — A list of links that reveals a preview image next to the pointer, with a slight skew driven by pointer speed.
- [Image compare](/components/interactive/image-comparison) — Interactive image comparison component with slider controls for before/after visualization.
- [Image Metadata Preview](/components/interactive/image-metadata-preview) — A photo preview whose metadata panel rises from the bottom, lifting the image clear as the panel opens.
- [Inline Testimonials](/components/interactive/inline-testimonials) — Quotes that live inside the sentence that cites them, opened from the name.
- [Interactive Image Selector](/components/interactive/interactive-image-selector) — A photo grid that switches into a selection mode with a floating share and delete bar.
- [Job Listing](/components/interactive/job-listing) — A list of open roles that opens each posting into a focused detail panel.
- [Lens](/components/interactive/lens) — A magnifying circle that follows the pointer across an image.
- [Morph Icon](/components/interactive/morph-icon) — A 24x24 icon swap that rotates and scales one glyph into another, driven entirely by a boolean.
- [Morph Surface](/components/interactive/morph-surface) — A dock that grows into the composer it opens, instead of summoning one somewhere else.
- [Motion dialog](/components/interactive/animated-dialog) — A modal dialog component with smooth animations powered by motion-v.
- [Notification Badge](/components/interactive/notification-badge) — A count badge that springs onto any element and disappears the moment the count reaches zero.
- [Orbital Image Wheel](/components/interactive/orbital-image-wheel) — A draggable, momentum-spun ring of thumbnails with keyboard stepping and snap-to-item.
- [Phototab](/components/interactive/phototab) — Photo tabs with a pill that follows the pointer and a tab bar that slides in on hover.
- [Pinned List](/components/interactive/pinned-list) — A pinnable list where pinned items animate to the top and keyboard shortcuts let you move focus and pin/unpin.
- [Pixel Brush Canvas](/components/interactive/pixel-brush-canvas) — A pixel-art canvas with pencil, eraser, fill, line and rectangle tools, a keyboard cursor and an undo stack.
- [Power Off Slide](/components/interactive/power-off-slide) — A destructive action behind a handle that has to be dragged the length of the track.
- [Rich Popover](/components/interactive/rich-popover) — Nuxt UI's popover with a spring-scaled content panel and its own animated arrow.
- [Scratch to Reveal](/components/interactive/scratch-to-reveal) — A cover you scratch off with the pointer to uncover whatever sits underneath.
- [Shape-shift dialog](/components/interactive/morphing-dialog) — A modal dialog that morphs from its trigger using shared layout animations.
- [Shape-shift popover](/components/interactive/morphing-popover) — A popover component with morphing animations powered by motion-v, built as a wrapper around Nuxt UI's Popover component.
- [Time Machine Stack](/components/interactive/time-machine-stack) — A 3D stack of panels you page through with the wheel, a drag or the arrow keys.
- [Unlock Face ID](/components/interactive/unlock-face-id) — A Face ID glyph that runs its own scan, with content that blurs until the read succeeds.
- [User Account Avatar](/components/interactive/user-account-avatar) — An avatar button that opens an account menu for editing a profile and reviewing orders.
- [Vector Editor Toolbar](/components/interactive/vector-editor-toolbar) — A drawing-tool toolbar with variants behind each tool, a travelling active pill, keyboard shortcuts and a draggable floating mode.
- [Video Modal](/components/interactive/video-modal) — A modal that mounts a native video element, plays it when it opens and pauses it when it closes.
- [Zoomable Image](/components/interactive/zoomable-image) — A thumbnail that opens into a full-size overlay when you click it.

### Layout

- [Android](/components/layout/android) — A CSS phone frame with a punch-hole camera instead of a dynamic island.
- [Animated Group](/components/layout/animated-group) — Animate multiple elements in sequence with staggered delays.
- [Breakpoint Indicator](/components/layout/breakpoint-indicator) — A development badge that names the active Tailwind breakpoint and shows the live viewport size.
- [Collision](/components/layout/collision) — Collision detection system with animated beams and explosion effects.
- [iPhone 15 Pro](/components/layout/iphone-15-pro) — A CSS phone frame with a dynamic island, sized to hold any content.
- [Safari](/components/layout/safari) — A browser window frame with traffic lights and an address bar.

### Loaders & Progress

- [AI Loader](/components/loaders/ai-loader) — A family of waiting indicators that share one cycle and never fake determinate progress.
- [Circular Progress](/components/loaders/circular-progress) — A ring that fills to a value and eases into every change.
- [Content Skeleton](/components/loaders/content-skeleton) — A loading overlay that borrows the exact shape of the content it stands in for.
- [Grid Loader](/components/loaders/grid-loader) — A 3×3 pixel grid that pulses through one of sixty-odd built-in patterns, or cycles a custom sequence.
- [Motion Loader](/components/loaders/motion-loader) — Twelve hand-built looping spinners rendered from transforms, with a single size, colour and speed control.
- [Page Preloader](/components/loaders/page-preloader) — A teleported full-screen loading overlay with a progress bar or spinner, dismissed by an emitted event.

### Interaction & Movement

- [Cursor](/components/movement/cursor) — Custom animated cursor with various styles and interactive effects.
- [Cursor Follow](/components/movement/cursor-follow) — A custom cursor bubble that grows into a label when it passes over anything marked with data-cursor-text.
- [Cursor Image Trail](/components/movement/cursor-image-trail) — Photos that drop in behind the pointer as it travels across a surface.
- [Force Dot](/components/movement/force-dot) — Interactive particle system with physics-based animations.
- [Magnetic](/components/movement/magnetic) — Component that creates a magnetic effect, attracting elements toward the cursor.
- [Magnetic Field](/components/movement/magnetic-field) — A group of elements that each lean toward the pointer, with a loop that stops when they settle.
- [Tilt](/components/movement/tilt) — Component that creates a 3D tilt effect based on cursor movement.

### Navigation & Toolbars

- [Breadcrumb](/components/navigation/breadcrumb) — A path trail whose crumbs spring in from the left with a short stagger.
- [Expandable Navbar](/components/navigation/expandable-navbar) — A header whose links collapse into a mobile panel that staggers in when it opens.
- [File Tree](/components/navigation/file-tree) — A keyboard-friendly file browser whose folders unfold with an animated height and a rotating chevron.
- [Floating Navbar](/components/navigation/floating-navbar) — A floating header that hides on downward scroll and reappears on upward scroll.
- [Pagination](/components/navigation/pagination) — A page switcher with a fixed-width range and a shared pill that springs between pages.
- [Toolbar adaptive](/components/navigation/toolbar-dynamic) — A pill toolbar that expands in place from a compact icon rail to a wider action bar.
- [Toolbar collapsible](/components/navigation/toolbar-expandable) — A vertical toolbar where each icon button expands a panel of content above it.

### Scroll & Viewport

- [In View](/components/scroll/in-view) — Animates its content when it scrolls into the viewport, and optionally replays on every entry.
- [Infinite Slider](/components/scroll/infinite-slider) — A marquee that duplicates its content once and scrolls it in a seamless loop.
- [Kinetic Type Scroll](/components/scroll/kinetic-type-scroll) — A phrase where each word scales, tracks and lifts on its own window of scroll progress, forming a travelling crest.
- [Marquee](/components/scroll/marquee) — An endless row or column of content that can reverse, run vertically and pause on hover.
- [Scroll Image Reveal](/components/scroll/scroll-image-reveal) — An image unmasked by scroll progress through a wipe, curtain, circle, blinds or scale, with counter-parallax inside the frame.
- [Scroll Progress](/components/scroll/scroll-progress) — A bar whose horizontal scale follows scroll progress, tracking the window or any scroll container.
- [Scroll Velocity](/components/scroll/scroll-velocity) — Text that drifts and accelerates with the speed and direction of your scroll.
- [Svg Draw On Scroll](/components/scroll/svg-draw-on-scroll) — An SVG path that draws itself as you scroll, with an optional marker riding the stroke.

### Text & Numbers

- [Animated Avatar Group](/components/text/animated-avatar-group) — A Nuxt UI avatar group that fans its members apart on hover, optionally overlapping them by a ratio of their size.
- [Animated List](/components/text/animated-list) — A windowed, recede-style list where new entries slide in and older ones fade and shrink as they age.
- [Animated Number](/components/text/animated-number) — An animated numeric value with smooth transitions — spring-damped updates for live counters and metrics.
- [Blur Out Up](/components/text/blur-out-up) — A sentence that resolves out of focus, one word at a time.
- [Bottom Up Letters](/components/text/bottom-up-letters) — Letters that rise out of their own baseline, one after another.
- [Comic Text](/components/text/comic-text) — Chunky comic lettering where every letter springs in from its own angle.
- [Counting Number](/components/text/counting-number) — A number counter with various animation effects — counting up and down, with per-digit timing control.
- [Depth Parallax Words](/components/text/depth-parallax-words) — Words that resolve out of focal depth, one after another.
- [Fade Through](/components/text/fade-through) — Phrase cycling where the old line leaves before the new one arrives.
- [Focus Blur Resolve](/components/text/focus-blur-resolve) — Text that arrives out of focus and resolves to sharp, on mount or on scroll.
- [Gravity Letters](/components/text/gravity-letters) — Text that breaks into letters, falls under gravity and springs back into place.
- [Kinetic Center Build](/components/text/kinetic-center-build) — A phrase that assembles word by word, with the line staying centred as it grows.
- [Line By Line Slide](/components/text/line-by-line-slide) — A block of copy that slides in one line at a time, from the left.
- [Line Shadow Text](/components/text/line-shadow-text) — Text whose shadow is a diagonal stripe pattern that slowly sweeps.
- [Mask Reveal Up](/components/text/mask-reveal-up) — Headline lines that rise out of their own masks, one line at a time.
- [Micro Scale Fade](/components/text/micro-scale-fade) — A whole string that settles in as one object, at 96% scale.
- [Number Flow](/components/text/number-flow) — A three-cell counter whose digits roll in the direction of the change.
- [Per Character Rise](/components/text/per-character-rise) — Letters that lift into place one after another, sharp from the first frame.
- [Per Word Crossfade](/components/text/per-word-crossfade) — A sentence that assembles itself one word at a time.
- [Perspective Text 3D](/components/text/perspective-text-3d) — Words spread through a Z stack on a tilted plane, driven by nothing, the pointer, or scroll.
- [Ransom Note](/components/text/ransom-note) — A string cut into letter scraps on mismatched paper, cut from mismatched typefaces.
- [Rolling Text](/components/text/rolling-text) — Split-flap text where every character cycles through a glyph ramp before landing.
- [Scale Down Fade](/components/text/scale-down-fade) — Copy that enters a touch too large and settles to its natural size.
- [Scroll Reveal Paragraph](/components/text/scroll-reveal-paragraph) — A paragraph that fills in word by word as it travels through the viewport.
- [Shared Axis](/components/text/shared-axis) — A rotating phrase that travels along one axis instead of blinking out and back in.
- [Shimmer Sweep](/components/text/shimmer-sweep) — A headline that glides in from the left while dissolving out of blur.
- [Shine Text](/components/text/shine-text) — A highlight band that sweeps across text, the way light passes over brushed metal.
- [Short Lower in](/components/text/short-slide-down) — Rotating phrases that build one word at a time into a centered stack, then drop away.
- [Short Slide Right](/components/text/short-slide-right) — Rotating phrases that slide in from the left inside an inline slot, one word at a time.
- [Sliding Number](/components/text/sliding-number) — A number whose digits slide in with animation effects — transitions between values without layout shift.
- [Soft Blur In](/components/text/soft-blur-in) — A string that resolves out of focus, one character at a time.
- [Sparkles Text](/components/text/sparkles-text) — Text with a scatter of stars that keep twinkling around it.
- [Spinning Text](/components/text/spinning-text) — Text that spins around a 3D axis — a springy rotation for headlines, badges and attention-grabbing labels.
- [Spring Scale In](/components/text/spring-scale-in) — A headline that pops in word by word, with an overshoot on every word.
- [Stagger From Center](/components/text/stagger-from-center) — Text that resolves outward from the middle character, one ring at a time.
- [Stagger From Edges](/components/text/stagger-from-edges) — Text that closes inward from both ends, meeting in the middle.
- [Text Animate](/components/text/text-animate) — Animate text in word by word, character by character or line by line.
- [Text Glitch](/components/text/text-glitch) — A glitch with chromatic aberration and jitter — headlines and labels that read like a broken signal.
- [Text Glitch New](/components/text/text-glitch-new) — Text with a glitch effect that creates a digital distortion appearance.
- [Text Gradient](/components/text/text-gradient) — Text with animated gradient effects and various animation styles.
- [Text Highlighter](/components/text/text-highlighter) — A marker swipe that paints itself behind a phrase as it scrolls into view.
- [Text Loop](/components/text/text-loop) — Text that loops through different values with smooth transitions.
- [Text Morph](/components/text/text-morph) — Text that morphs between different strings — a smooth character-by-character crossfade for changing labels.
- [Text motion](/components/text/text-effect) — Splits a string into characters, words or lines and staggers a preset reveal across them.
- [Text Reveal](/components/text/text-reveal) — Reveals text one character at a time with a choice of effects.
- [Text Roll](/components/text/text-roll) — Text whose letters roll in from a 3D axis — each glyph rotates into place with a spring.
- [Text Scramble](/components/text/text-scramble) — Text that scrambles through random characters before settling on the final string.
- [Text Shimmer](/components/text/text-shimmer) — Text with shimmer effect that moves across the content.
- [Text Shimmer Wave](/components/text/text-shimmer-wave) — Text with a wave-like shimmer that sweeps across the glyphs — a loading or AI-thinking indicator.
- [Top Down Letters](/components/text/top-down-letters) — Letters that drop onto their own baseline, one after another.
- [True Focus](/components/text/true-focus) — Text focus effect with animated borders and blur transitions.
- [Typing Text](/components/text/typing-text) — Type-on animation for text content — characters appear one by one with per-character timing and caret control.
- [Variable Proximity](/components/text/variable-proximity) — Text effect that responds to mouse proximity with variable font properties.
- [Video Text](/components/text/video-text) — Letters cut straight out of a looping clip, so the footage becomes the type.
- [Wave Text](/components/text/wave-text) — Characters that ripple through a string in sequence, travelling wave and all.
- [Word Rotate](/components/text/word-rotate) — Component that rotates through different words with smooth transitions.

### Transitions

- [Aperture Blur Transition](/components/transitions/aperture-blur-transition) — An iris ring that opens from the centre of the panel and swaps the content behind its glow.
- [Chroma Blur Transition](/components/transitions/chroma-blur-transition) — A diagonal curtain with a split colour fringe that sweeps across the panel.
- [Prism Sweep Transition](/components/transitions/prism-sweep-transition) — A prismatic light band that sweeps across a panel and swaps the content behind it.
- [SDF Blob Transition](/components/transitions/sdf-blob-transition) — A metaball blob that grows over the panel and swaps the content behind its edge.
- [Shader Reveal Transition](/components/transitions/shader-reveal-transition) — Eight reveal shapes — from a noise gate to a barcode shutter — in one compiled shader.
- [Transition Panel](/components/transitions/transition-panel) — Animates between keyed content with enter, center and exit variants.

## Related

The hooks behind these components live under [Composables](/composables) — `useMotionBlockUI` for theming, `useThemeColor` for canvas work, and the cursor helpers. For install and prefix configuration, see [Usage](/getting-started/usage).
