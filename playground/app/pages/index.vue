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
      { to: '/animated-dialog-demo', label: 'Animated Dialog', description: 'Dialog with motion transitions' },
      { to: '/carousel-demo', label: 'Carousel', description: 'Animated carousel' },
      { to: '/collision-demo', label: 'Collision', description: 'Collision detection demo' },
      { to: '/disclosure-demo', label: 'Disclosure', description: 'Animated disclosure panel' },
      { to: '/morphing-dialog-demo', label: 'Morphing Dialog', description: 'Morphing dialog transitions' },
      { to: '/morphing-popover-demo', label: 'Morphing Popover', description: 'Morphing popover transitions' },
      { to: '/text-effect-demo', label: 'Text Effect', description: 'Text animation effects' },
      { to: '/toolbar-dynamic-demo', label: 'Toolbar Dynamic', description: 'Dynamic toolbar demo' },
      { to: '/toolbar-expandable-demo', label: 'Toolbar Expandable', description: 'Expandable toolbar demo' },
      { to: '/transition-panel-demo', label: 'Transition Panel', description: 'Panel transition effects' },
    ],
  },
  {
    title: 'Phase 1 — Buttons & Code',
    description: 'Interactive buttons and code display components',
    items: [
      { to: '/msmooth-button-demo', label: 'SmoothButton', description: 'Smooth hover animation button' },
      { to: '/mbutton-copy-demo', label: 'ButtonCopy', description: 'Copy-to-clipboard button' },
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
      { to: '/mcheckbox-demo', label: 'Checkbox', description: 'Animated checkbox' },
      { to: '/mnotification-badge-demo', label: 'NotificationBadge', description: 'Animated notification badge' },
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
      { to: '/manimated-progress-bar-demo', label: 'AnimatedProgressBar', description: 'Animated progress bar' },
      { to: '/manimated-toggle-demo', label: 'AnimatedToggle', description: 'Animated toggle switch' },
      { to: '/manimated-tags-demo', label: 'AnimatedTags', description: 'Animated tag input' },
    ],
  },
  {
    title: 'Phase 2 — Navigation & Overlay',
    description: 'Navigation helpers and overlay components',
    items: [
      { to: '/manimated-stepper-demo', label: 'AnimatedStepper', description: 'Stepper with animations' },
      { to: '/manimated-tooltip-demo', label: 'AnimatedTooltip', description: 'Animated tooltip' },
      { to: '/mdrawer-demo', label: 'Drawer', description: 'Drawer component' },
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
      { to: '/mrich-popover-demo', label: 'RichPopover', description: 'Rich content popover' },
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
]
</script>
