<template>
  <div class="p-8 space-y-16">
    <div>
      <h1 class="text-3xl font-bold text-highlighted mb-8">
        Nuxt Motion Block
      </h1>
      <p class="text-muted mb-8">
        Animated components extending Nuxt UI with motion-v
      </p>
    </div>

    <section
      v-for="section in sections"
      :key="section.title"
    >
      <h2 class="text-2xl font-bold text-highlighted mb-4">
        {{ section.title }}
      </h2>
      <p class="text-muted mb-6">
        {{ section.description }}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <NuxtLink
          v-for="item in section.items"
          :key="item.to"
          :to="item.to"
        >
          <UCard class="hover:ring-2 hover:ring-primary transition-all cursor-pointer">
            <p class="font-semibold text-highlighted">{{ item.label }}</p>
            <p class="text-sm text-muted mt-1">{{ item.description }}</p>
          </UCard>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const sections = [
  {
    title: 'Core Demos',
    description: 'Pre-existing animated component demos',
    items: [
      { to: '/accordion-demo', label: 'Accordion', description: 'Animated accordion component' },
      { to: '/animated-dialog-demo', label: 'Motion dialog', description: 'Dialog with motion transitions' },
      { to: '/carousel-demo', label: 'Carousel', description: 'Motion carousel' },
      { to: '/collision-demo', label: 'Collision', description: 'Collision detection demo' },
      { to: '/morphing-dialog-demo', label: 'Shape-shift dialog', description: 'Morphing dialog transitions' },
      { to: '/morphing-popover-demo', label: 'Shape-shift popover', description: 'Morphing popover transitions' },
      { to: '/text-effect-demo', label: 'Text motion', description: 'Text animation effects' },
      { to: '/toolbar-dynamic-demo', label: 'Toolbar adaptive', description: 'Dynamic toolbar demo' },
      { to: '/toolbar-expandable-demo', label: 'Toolbar collapsible', description: 'Expandable toolbar demo' },
      { to: '/transition-panel-demo', label: 'Switch panel', description: 'Panel transition effects' },
    ],
  },
  {
    title: 'Phase 1 — Buttons & Code',
    description: 'Interactive buttons and code display components',
    items: [
      { to: '/msmooth-button-demo', label: 'SmoothButton', description: 'Smooth hover animation button' },
      { to: '/mbutton-copy-demo', label: 'ButtonCopy', description: 'Duplicate button' },
      { to: '/mclip-corners-button-demo', label: 'ClipCornersButton', description: 'Clipped corner button' },
      { to: '/mdot-morph-button-demo', label: 'DotMorphButton', description: 'Dot morphing button' },
      { to: '/mcode-block-demo', label: 'CodeBlock', description: 'Animated code block display' },
    ],
  },
  {
    title: 'Phase 1 — Navigation & Media',
    description: 'Navigation components and media displays',
    items: [
      { to: '/mfloating-navbar-demo', label: 'FloatingNavbar', description: 'Floating navigation bar' },
      { to: '/mcoverflow-carousel-demo', label: 'MCarousel', description: 'Embla-based carousel with coverflow animation' },
    ],
  },
  {
    title: 'Phase 1 — Form & UI',
    description: 'Form elements and UI utility components',
    items: [
      { to: '/mcheckbox-demo', label: 'Checkbox', description: 'Motion checkbox' },
      { to: '/mnotification-badge-demo', label: 'NotificationBadge', description: 'Motion notification badge' },
      { to: '/mduration-picker-demo', label: 'DurationPicker', description: 'Duration picker component' },
      { to: '/mpinned-list-demo', label: 'PinnedList', description: 'Pinned list with animations' },
    ],
  },
  {
    title: 'Phase 1 — Loaders',
    description: 'Loading and progress indicator components',
    items: [
      { to: '/mdither-chart-demo', label: 'DitherChart', description: 'Dither chart loader' },
      { to: '/mgrid-loader-demo', label: 'GridLoader', description: 'Grid-based loader animation' },
      { to: '/mmotion-loader-demo', label: 'MotionLoader', description: 'Motion-based loader' },
    ],
  },
  {
    title: 'Phase 1 Restored',
    description: 'Restored Phase 1 components',
    items: [
      { to: '/mexpandable-navbar-demo', label: 'ExpandableNavbar', description: 'Expandable navbar component' },
      { to: '/mmorph-icon-demo', label: 'MorphIcon', description: 'Icon morphing animation' },
      { to: '/mvideo-modal-demo', label: 'VideoModal', description: 'Video modal with transitions' },
      { to: '/mtheme-toggle-demo', label: 'ThemeToggle', description: 'Theme toggle animation' },
      { to: '/mtweet-card-demo', label: 'TweetCard', description: 'Animated tweet card' },
      { to: '/mpage-preloader-demo', label: 'PagePreloader', description: 'Page preloader animation' },
    ],
  },
  {
    title: 'Phase 2 — Animated Form',
    description: 'Form input components with smooth animations',
    items: [
      { to: '/manimated-input-demo', label: 'AnimatedInput', description: 'Animated text input' },
      { to: '/manimated-number-input-demo', label: 'AnimatedNumberInput', description: 'Animated number input' },
      { to: '/manimated-otp-input-demo', label: 'AnimatedOTPInput', description: 'OTP input with animations' },
      { to: '/manimated-progress-bar-demo', label: 'AnimatedProgressBar', description: 'Motion progress bar' },
      { to: '/manimated-toggle-demo', label: 'AnimatedToggle', description: 'Motion toggle switch' },
      { to: '/manimated-tags-demo', label: 'AnimatedTags', description: 'Animated tag input' },
    ],
  },
  {
    title: 'Phase 2 — Navigation & Overlay',
    description: 'Navigation helpers and overlay components',
    items: [
      { to: '/manimated-stepper-demo', label: 'AnimatedStepper', description: 'Stepper with animations' },
      { to: '/manimated-tooltip-demo', label: 'AnimatedTooltip', description: 'Motion tooltip' },
      { to: '/mdrawer-demo', label: 'Drawer', description: 'Side drawer' },
      { to: '/mradio-group-demo', label: 'RadioGroup', description: 'Radio group with animations' },
    ],
  },
  {
    title: 'Phase 2 — Display',
    description: 'Display and file handling components',
    items: [
      { to: '/manimated-avatar-group-demo', label: 'AnimatedAvatarGroup', description: 'Animated avatar group' },
      { to: '/manimated-avatar-group-2-demo', label: 'AnimatedAvatarGroup — prop tour', description: 'Every prop: overlap, max, sizes, initials fallback, custom slot, dynamic members' },
      { to: '/manimated-file-upload-demo', label: 'AnimatedFileUpload', description: 'File upload with animations' },
      { to: '/manimated-list-demo', label: 'AnimatedList', description: 'Animated list component' },
    ],
  },
  {
    title: 'Phase 2 — Cards & Surfaces',
    description: 'Card and surface components with effects',
    items: [
      { to: '/mproduct-card-demo', label: 'ProductCard', description: 'Product card component' },
      { to: '/mglow-hover-cards-demo', label: 'GlowHoverCards', description: 'Cards with glow hover effect' },
      { to: '/mglass-panel-demo', label: 'GlassPanel', description: 'Glassmorphism panel with parallax' },
      { to: '/mglass-card-demo', label: 'GlassCard', description: 'Liquid glass pane with refractive rim' },
      { to: '/mwobble-card-demo', label: 'WobbleCard', description: 'Wobble/tilt card effect' },
      { to: '/mprice-flow-demo', label: 'PriceFlow', description: 'Price flow animation' },
      { to: '/mwallet-card-demo', label: 'WalletCard', description: 'Wallet card component' },
      { to: '/mmail-card-demo', label: 'MailCard', description: 'Mail card component' },
      { to: '/mexpandable-cards-demo', label: 'ExpandableCards', description: 'Expandable card components' },
    ],
  },
  {
    title: 'Phase 2 — Complex Wrappers',
    description: 'Advanced composite components',
    items: [
      { to: '/msocial-hover-card-demo', label: 'SocialHoverCard', description: 'Social media hover card' },
      { to: '/mrich-popover-demo', label: 'RichPopover', description: 'Popover with rich content' },
      { to: '/mreviews-carousel-demo', label: 'ReviewsCarousel', description: 'Reviews carousel' },
      { to: '/mswitchboard-card-demo', label: 'SwitchboardCard', description: 'Switchboard card component' },
      { to: '/memoji-reaction-demo', label: 'EmojiReaction', description: 'Emoji reaction animation' },
      { to: '/mdynamic-island-demo', label: 'DynamicIsland', description: 'Dynamic island component' },
      { to: '/mdynamic-group-demo', label: 'DynamicGroup', description: 'Dynamic group animations' },
    ],
  },
  {
    title: 'Phase 2 — Misc',
    description: 'Miscellaneous animated components',
    items: [
      { to: '/mapp-download-stack-demo', label: 'AppDownloadStack', description: 'App download stack component' },
      { to: '/mapple-invites-demo', label: 'AppleInvites', description: 'Apple-style invites component' },
      { to: '/mfigma-comment-demo', label: 'FigmaComment', description: 'Figma comment component' },
      { to: '/mmagnetic-button-demo', label: 'MagneticButton', description: 'Magnetic button effect' },
      { to: '/mmusic-toggle-demo', label: 'MusicToggle', description: 'Music toggle animation' },
      { to: '/mbasic-dropdown-demo', label: 'BasicDropdown', description: 'Basic dropdown component' },
      { to: '/mbasic-toast-demo', label: 'BasicToast', description: 'Basic toast notification' },
    ],
  },
  {
    title: 'AI Family',
    description: 'AI interface components',
    items: [
      { to: '/mai-orb-face-demo', label: 'AiOrbFace', description: 'The character: eyes, gaze, blink and the six states' },
      { to: '/mai-orb-face-mouth-demo', label: 'AiOrbFaceMouth', description: 'Character face with mood-driven eyes and mouth, plus a talking mouth that layers over any mood' },
      { to: '/mai-orb-demo', label: 'AiOrb', description: 'The state-agnostic WebGL2 material underneath it' },
      { to: '/mai-prompt-input-demo', label: 'AiPromptInput', description: 'Prompt composer whose ring only moves on done and error' },
      { to: '/mai-tool-call-demo', label: 'AiToolCall', description: 'Collapsible call row with a ring that never gets replaced' },
    ],
  },
  {
    title: 'AI Chat Kit',
    description: 'The pieces a streaming assistant response is made of',
    items: [
      { to: '/mai-response-demo', label: 'AiResponse', description: 'Words arriving rather than being revealed, with inline citation markers' },
      { to: '/mai-reasoning-demo', label: 'AiReasoning', description: 'A trace that shimmers while it thinks, then folds away 600ms after it stops' },
      { to: '/mai-task-list-demo', label: 'AiTaskList', description: 'A plan whose ticks draw themselves in as each step lands' },
      { to: '/mai-diff-demo', label: 'AiDiff', description: 'A proposed edit that wipes in and can be accepted, rejected, or replayed' },
      { to: '/mai-sources-demo', label: 'AiSources', description: 'Provenance collapsed to a fan of favicons that travel into their own rows' },
      { to: '/mai-citation-demo', label: 'AiCitation', description: 'A marker whose card grows out of its own baseline' },
      { to: '/mai-message-demo', label: 'AiMessage', description: 'A bubble whose actions slide out of its own edge, revealed by CSS alone' },
    ],
  },
  {
    title: 'SVG & Canvas Effects',
    description: 'Ported animations that draw themselves rather than transform existing elements',
    items: [
      { to: '/mborder-beam-demo', label: 'BorderBeam', description: 'Light riding the outline of its own container' },
      { to: '/mascii-render-demo', label: 'AsciiRender', description: 'Image sampled to a character grid via Rec.709 luminance' },
      { to: '/mdrawing-cursor-demo', label: 'DrawingCursor', description: 'Ink that tapers with pointer speed and fades as it ages' },
      { to: '/magent-avatar-demo', label: 'AgentAvatar', description: 'Seeded canvas identity that stays stable across frames' },
      { to: '/msvg-draw-on-scroll-demo', label: 'SvgDrawOnScroll', description: 'Paths drawn by scroll, sequenced, with a correctly placed tip marker' },
      { to: '/memboss-surface-demo', label: 'EmbossSurface', description: 'Relief lit by an angle, including a real SVG specular filter' },
      { to: '/msvg-clip-mask-demo', label: 'SvgClipMask', description: 'Object-bounding-box clip paths that morph, step and hover' },
    ],
  },
  {
    title: 'Scroll & Type',
    description: 'Scroll-driven motion applied to typography and images',
    items: [
      { to: '/mkinetic-type-scroll-demo', label: 'KineticTypeScroll', description: 'Weight, tracking, scale and opacity travelling through a line' },
      { to: '/mscroll-image-reveal-demo', label: 'ScrollImageReveal', description: 'Five reveal masks with a counter-parallaxed image behind' },
    ],
  },
  {
    title: 'Bucket A — Ports',
    description: 'Animated components built with Nuxt UI and motion-v',
    items: [
      { to: '/msiri-orb-demo', label: 'SiriOrb', description: 'Five AI states as one gradient disc, scaled and blurred by a live amplitude' },
      { to: '/munlock-face-id-demo', label: 'UnlockFaceId', description: 'Face-id verification with a self-drawing scan ring and a morphing result' },
      { to: '/morbital-image-wheel-demo', label: 'OrbitalImageWheel', description: 'Drag, momentum and snap around a ring of thumbnails' },
      { to: '/mholographic-foil-demo', label: 'HolographicFoil', description: 'Pointer-tracked foil with a real specular highlight and hue drift' },
      { to: '/mexposure-slider-demo', label: 'ExposureSlider', description: 'A slider whose track is the thing being measured' },
      { to: '/mparallax-layers-demo', label: 'ParallaxLayers', description: 'Pointer- and scroll-driven depth across a stack of layers' },
      { to: '/mshine-text-demo', label: 'ShineText', description: 'A specular band travelling across the glyphs, narrow enough to read as a highlight' },
      { to: '/mfocus-blur-resolve-demo', label: 'FocusBlurResolve', description: 'Blur lifting off a line of type as it resolves, optionally on scroll' },
      { to: '/mwave-text-demo', label: 'WaveText', description: 'Characters riding a five-stop wave, staggered from the left' },
      { to: '/mstagger-from-center-demo', label: 'StaggerFromCenter', description: 'Characters resolving outward from the middle, each offset by its distance' },
      { to: '/msquircle-demo', label: 'Squircle', description: 'A superellipse clip path with an adjustable corner and smoothing' },
    ],
  },
  {
    title: 'Text motions',
    description: 'Character- and word-level text animations',
    items: [
      { to: '/mblur-out-up-demo', label: 'BlurOutUp', description: 'Words rise out of a blur, one after another' },
      { to: '/mbottom-up-letters-demo', label: 'BottomUpLetters', description: 'Characters rise into place one after another from below' },
      { to: '/mline-by-line-slide-demo', label: 'LineByLineSlide', description: 'Each line slides in from the left on its own offset' },
      { to: '/mmask-reveal-up-demo', label: 'MaskRevealUp', description: 'Lines rise out of their own clipping box' },
      { to: '/mmicro-scale-fade-demo', label: 'MicroScaleFade', description: 'A whole string fades in while easing up from 96% scale' },
      { to: '/mper-word-crossfade-demo', label: 'PerWordCrossfade', description: 'Each word fades and lifts in on its own offset' },
      { to: '/mperspective-text-3d-demo', label: 'PerspectiveText3D', description: 'Letters parked at different depths on a tilting plane' },
      { to: '/mransom-note-demo', label: 'RansomNote', description: 'Each letter pasted back at a wrong angle' },
      { to: '/mshort-slide-down-demo', label: 'ShortSlideDown', description: 'A phrase assembles word by word, holds, then swaps on a loop' },
      { to: '/mshort-slide-right-demo', label: 'ShortSlideRight', description: 'A phrase glides in from the left, word by word, on a loop' },
      { to: '/msoft-blur-in-demo', label: 'SoftBlurIn', description: 'Characters drift up out of a wide blur and resolve into focus' },
      { to: '/mspring-scale-in-demo', label: 'SpringScaleIn', description: 'Words pop in with an overshoot' },
      { to: '/mstagger-from-edges-demo', label: 'StaggerFromEdges', description: 'Characters resolve inward from both ends' },
      { to: '/mtop-down-letters-demo', label: 'TopDownLetters', description: 'Characters drop into place from above, one after another' },
    ],
  },
  {
    title: 'Transitions',
    description: 'WebGL page-transition shaders with CSS fallbacks',
    items: [
      { to: '/prism-sweep-transition-demo', label: 'PrismSweepTransition', description: 'A refractive prism band sweeping content away' },
      { to: '/msdf-blob-transition-demo', label: 'SdfBlobTransition', description: 'An SDF blob merging or eroding the outgoing page' },
      { to: '/shader-reveal-transition-demo', label: 'ShaderRevealTransition', description: 'A shader-driven reveal wipe between two pages' },
      { to: '/liquid-metal-demo', label: 'LiquidMetal', description: 'A domain-warped noise field read as a normal, then lit' },
    ],
  },
  {
    title: 'Core Backgrounds',
    description: 'Full-screen animated background components',
    items: [
      { to: '/manimated-background-demo', label: 'AnimatedBackground', description: 'Tracked background that activates on hover or click' },
      { to: '/maurora-background-demo', label: 'AuroraBackground', description: 'Animated aurora gradient with a radial vignette' },
      { to: '/mbackground-beams-demo', label: 'BackgroundBeams', description: 'Diagonal light beams sweeping across a dark surface' },
      { to: '/mbackground-gradient-animation-demo', label: 'BackgroundGradientAnimation', description: 'Animated gradient that follows the pointer' },
      { to: '/mbackground-lines-demo', label: 'BackgroundLines', description: 'Interlaced moving lines with cycles and colors' },
      { to: '/mbackground-ripple-effect-demo', label: 'BackgroundRippleEffect', description: 'Click-reactive ripple grid of expanding rings' },
      { to: '/mdotted-glow-background-demo', label: 'DottedGlowBackground', description: 'Gravity-fed glowing dust field, theme-aware' },
      { to: '/mmeteors-demo', label: 'Meteors', description: 'Streaking meteors falling across a dark sky' },
      { to: '/mshooting-stars-demo', label: 'ShootingStars', description: 'One glow-headed star at a time crossing the viewport' },
      { to: '/mstars-background-demo', label: 'StarsBackground', description: 'Star field with density and twinkle control' },
    ],
  },
  {
    title: 'Light & Texture',
    description: 'Spotlight, glow and canvas texture effects',
    items: [
      { to: '/manimated-spotlight-demo', label: 'AnimatedSpotlight', description: 'Pointer-tracked soft light radial' },
      { to: '/mspotlight-demo', label: 'Spotlight', description: 'Cursor-following spotlight across the card' },
      { to: '/mlamp-container-demo', label: 'LampContainer', description: 'A lamp that turns on when content scrolls into view' },
      { to: '/mdirectional-light-demo', label: 'DirectionalLight', description: 'SVG-filter directional light with a hard-coded id' },
      { to: '/mglow-effect-demo', label: 'GlowEffect', description: 'Pulsing glow tint with blur trails' },
      { to: '/mglowing-effect-demo', label: 'GlowingEffect', description: 'Per-letter glow that responds to proximity' },
      { to: '/mdiv-grid-demo', label: 'DivGrid', description: 'Fully controlled click-reactive grid of cells' },
      { to: '/mmask-container-demo', label: 'MaskContainer', description: 'Masked reveal container with icon and label' },
      { to: '/mpixelated-canvas-demo', label: 'PixelatedCanvas', description: 'Image rendered at blocky canvas resolution' },
      { to: '/mvortex-demo', label: 'Vortex', description: 'Particle storm spinning around a vortex' },
      { to: '/mboxes-core-demo', label: 'BoxesCore', description: 'Falling and rotating 3D boxes field' },
    ],
  },
  {
    title: 'Cards & Layers',
    description: 'Card components with depth, motion and compare',
    items: [
      { to: '/m3d-card-demo', label: 'ThreeDCard', description: '3D tilt card with depth-layered content' },
      { to: '/mcard-stack-demo', label: 'CardStack', description: 'Stacked cards that cycle on an interval' },
      { to: '/mdraggable-card-demo', label: 'DraggableCard', description: 'Free-form draggable card with constraints' },
      { to: '/mever-vault-card-demo', label: 'EverVaultCard', description: 'Gradient card lit by pointer position' },
      { to: '/mfocus-cards-demo', label: 'FocusCards', description: 'Data-driven focus card grid' },
      { to: '/mglare-card-demo', label: 'GlareCard', description: 'Hover-revealed glare sweep across the surface' },
      { to: '/mglowing-stars-card-demo', label: 'GlowingStarsCard', description: 'Card with a dense glowing star field' },
      { to: '/mimage-comparison-demo', label: 'ImageComparison', description: 'Before/after image slider with drag compare' },
      { to: '/mdock-demo', label: 'Dock', description: 'macOS-style magnifying dock' },
      { to: '/mdrag-and-drop-demo', label: 'DragAndDrop', description: 'Sortable and transferable lists with drop zones' },
    ],
  },
  {
    title: 'Text motions',
    description: 'Character- and word-level text animation components',
    items: [
      { to: '/mtext-glitch-demo', label: 'TextGlitch', description: 'Glitching slices with flicker and rattle' },
      { to: '/mtext-glitch-new-demo', label: 'TextGlitchNew', description: 'RGB-split glitch with random glyph swaps' },
      { to: '/mtext-gradient-demo', label: 'TextGradient', description: 'Animated gradient text fill' },
      { to: '/mtext-loop-demo', label: 'TextLoop', description: 'Cycling word loop with transitions' },
      { to: '/mtext-loop-alignment-demo', label: 'TextLoop Alignment', description: 'TextLoop aligned with surrounding flow' },
      { to: '/mtext-morph-demo', label: 'TextMorph', description: 'Morphing text that swaps between values' },
      { to: '/mtext-reveal-demo', label: 'TextReveal', description: 'Characters revealed word by word' },
      { to: '/mtext-roll-demo', label: 'TextRoll', description: 'Rolling numbers that count out a sequence' },
      { to: '/mtext-scramble-demo', label: 'TextScramble', description: 'Scramble-to-reveal text' },
      { to: '/mtext-shimmer-demo', label: 'TextShimmer', description: 'Specular band sweeping across text' },
      { to: '/mtext-shimmer-wave-demo', label: 'TextShimmerWave', description: 'Wave layer above the base text' },
      { to: '/mword-rotate-demo', label: 'WordRotate', description: 'Words rotating up out of a stack' },
      { to: '/mspinning-text-demo', label: 'SpinningText', description: 'Text on a spinning circle path' },
      { to: '/mtyping-text-demo', label: 'TypingText', description: 'Typewriter effect with caret' },
      { to: '/mtrue-focus-demo', label: 'TrueFocus', description: 'Focused word sharpens while others blur' },
      { to: '/mvariable-proximity-demo', label: 'VariableProximity', description: 'Letters that push apart as the pointer nears' },
    ],
  },
  {
    title: 'Numbers & Counters',
    description: 'Animated number display components',
    items: [
      { to: '/manimated-number-demo', label: 'AnimatedNumber', description: 'Count-up animation with triggers' },
      { to: '/mcounting-number-demo', label: 'CountingNumber', description: 'Counting numbers with suffix support' },
      { to: '/msliding-number-demo', label: 'SlidingNumber', description: 'Digits that slide on every tick' },
    ],
  },
  {
    title: 'Interaction & Motion',
    description: 'Pointer-driven motion and scroll-linked components',
    items: [
      { to: '/mcursor-demo', label: 'Cursor', description: 'Animated custom cursor with spring following' },
      { to: '/mforce-dot-demo', label: 'ForceDot', description: 'Magnetic dot that warps force toward the pointer' },
      { to: '/min-view-demo', label: 'InView', description: 'Elements that animate on scroll into view' },
      { to: '/mmagnetic-demo', label: 'Magnetic', description: 'Elements that pull toward the pointer' },
      { to: '/mtilt-demo', label: 'Tilt', description: 'Tilt cards that react to pointer position' },
      { to: '/mdirection-aware-hover-demo', label: 'DirectionAwareHover', description: 'Hover light that follows the pointer direction' },
      { to: '/mdirection-aware-hover-new-demo', label: 'DirectionAwareHoverNew', description: 'Enhanced direction-aware hover' },
      { to: '/mscroll-progress-demo', label: 'ScrollProgress', description: 'Progress bar driven by scroll position' },
      { to: '/mscroll-velocity-demo', label: 'ScrollVelocity', description: 'Background text drifting at scroll velocity' },
    ],
  },
  {
    title: 'Media & Misc',
    description: 'Sliders, beams, AI chat and group animations',
    items: [
      { to: '/minfinite-slider-demo', label: 'InfiniteSlider', description: 'Endless horizontal loop of items' },
      { to: '/mflowing-stroke-demo', label: 'FlowingStroke', description: 'SVG stroke that flows along its path' },
      { to: '/mtracing-beam-demo', label: 'TracingBeam', description: 'Beam that traces the scrolling line' },
      { to: '/mprogressive-blur-demo', label: 'ProgressiveBlur', description: 'Blur gradient that progresses across content' },
      { to: '/mborder-trail-demo', label: 'BorderTrail', description: 'A trail of light riding the border' },
      { to: '/mai-messages-demo', label: 'AiMessages', description: 'Streaming assistant chat with animated messages' },
      { to: '/manimated-group-demo', label: 'AnimatedGroup', description: 'Staggered group reveal with layout animation' },
    ],
  },
]
</script>
