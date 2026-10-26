# Changelog


## Unreleased

### 🚀 Enhancements

- **components:** Add 68 components across the existing categories — agent-chat surfaces, card decks, form controls, interactive panels, text animations and shader transitions — each with a docs page, a basic example and a customizable one
- **3d:** Add `Book`, a hardback whose cover swings open on a 3D hinge as the pointer drags it
- **ai:** Add `AiApproval`, `AiArtifact`, `AiBranch`, `AiContextMeter`, `AiConversation` and `AiSuggestions` for agent chat surfaces, plus `ImageGenerationPanel`, a prompt composer that fills a result grid while it runs
- **backgrounds:** Add `AuroraCurtain`, a WebGL aurora that hangs behind the content and falls back to a CSS gradient when the browser refuses a context
- **cards:** Add `CardSwipeDeck` and `ScrollableCardStack` for swipeable and stacked decks, `PhotoStack` and `TiltCard` for pointer-driven depth, and `MacTerminal` for a window chrome with a typed-out session
- **effects:** Add `ArcadePixel` (a sprite grid with scanlines and a CRT overlay), `DitherImage`, `GravityStars`, `PixelFlowField`, `VideoAmbient` (a glow sampled from a playing video) and `GooeyFilter`
- **forms:** Add `Form` with per-field validation states, plus `AuthForm`, `CountryPicker`, `DigitRoll`, `FaviconSearch`, `FloatInput`, `MorphToggle`, `Scrubber`, `SocialSelector` and `SwapPanel`
- **interactive:** Add `ContributionGraph`, `CountBadge`, `FluidHoverHighlight`, `FolderReveal`, `GitHubStarsAnimation`, `HoverExpand`, `HoverImageList`, `ImageMetadataPreview`, `InlineTestimonials`, `InteractiveImageSelector`, `JobListing`, `MorphSurface`, `Phototab`, `PixelBrushCanvas`, `PowerOffSlide`, `TimeMachineStack`, `UserAccountAvatar` and `VectorEditorToolbar`
- **layout:** Add `BreakpointIndicator`, which reports the active Tailwind breakpoint
- **loaders:** Add `AiLoader` and `ContentSkeleton`
- **movement:** Add `CursorFollow` and `MagneticField`
- **movement:** Add `CursorImageTrail`, photos that drop behind the pointer as it travels, scaled by pointer speed and pooled so nothing is allocated mid-gesture
- **navigation:** Add `Breadcrumb`, `FileTree` and `Pagination`
- **text:** Add `DepthParallaxWords`, `FadeThrough`, `GravityLetters`, `KineticCenterBuild`, `NumberFlow`, `PerCharacterRise`, `ScaleDownFade`, `ScrollRevealParagraph`, `SharedAxis` and `ShimmerSweep`
- **text:** Add `RollingText`, split-flap characters that cycle through a glyph ramp before landing, driven by CSS keyframes and replayable on mount, in view, hover or manually
- **transitions:** Add `ApertureBlurTransition` (a noisy iris ring opening from the centre) and `ChromaBlurTransition` (a diagonal curtain with a split colour fringe), both on the shared shader-transition driver
- **docs:** Give every new page the same section order, show the real source of the customizable example in `Customize`, and update the component count copy to 260+
- **webgl:** Add `easeOutCubic` to the shared easing helpers for the aperture sweep
- **code-block:** Add a `diff` variant with a `lines` prop and a `bare` chrome-less mode, so the same code surface can render a patch
- **ai-diff:** Render the diff body through `CodeBlock` and keep the verdict in local state, replaying by remount
- **theme-color:** Add `theme-color` utilities to map Nuxt UI tokens to CSS variables and resolved colours (and back), so components can follow the active theme instead of hardcoding custom colours
- **theme-color:** Add a `useThemeColor` composable that returns the resolved colour as a ref, re-resolving on mount and whenever the colour mode changes
- **theme-color:** Let a colour prop accept a Nuxt UI token or a literal colour — `Vortex`, `PixelatedCanvas`, `BackgroundGradientAnimation`, `AiOrbFace`, `BackgroundBeams` and `GlowEffect` now resolve either form against the active theme
- **ai-orb-face:** Default the body, edge and features to the theme primary so a bare `AiOrbFace` follows the active theme, and make the AI Orb and AI Orb Face docs demos use theme tokens

### 💅 Refactors

- **ai-diff:** Match the reference motion — collapse on reject via an `AnimatePresence` height exit, use a `bg-background` card, and drop the `max-height` transition and the `decision` prop
- **theme:** Move diff line slots and the `kind` variants from `ai-diff` into `code-block`
- **theme-color:** Route `AiOrb`, `DottedGlowBackground`, `DitherChart` and the fluid/canvas cursor composables through the shared `theme-color` utilities instead of ad-hoc canvas and `getComputedStyle` reads
- **docs:** Update the AI Diff demo, props, slots and prose for the new API

### 🩹 Fixes

- **ai-orb:** Fall back to the default palette when `colors` is an empty array, and guard the `theme-color` resolvers against non-string input, so a playground seeded with `:colors="[]"` no longer throws in the mount hook
- **docs:** Pass typed props for AI SDK message parts and update the AI Diff and changelog content

## v0.0.3

[compare changes](https://github.com/MuhammadKhizar7/nuxt-motion-block/compare/v0.0.2...v0.0.3)

## v0.0.2

[compare changes](https://github.com/MuhammadKhizar7/nuxt-motion-block/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- Implement TextGlitchNew and TrueFocus components with animation effects ([2f6638a](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/2f6638a))
- Add ScrollVelocity component with animated text effect ([570ea70](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/570ea70))
- Add VariableProximity component for animated text effects ([3de96b8](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/3de96b8))
- Add BackgroundGradientAnimation and BackgroundRippleEffect components with animations ([0b0ba05](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/0b0ba05))
- **ui:** Add new animated background components to index page ([736577d](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/736577d))
- Add GlowingStarsCard and Meteors components with animations ([f50145c](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/f50145c))
- **tracing-beam:** Add new TracingBeam component and demo page ([d60003b](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/d60003b))
- **playground:** Add new card components and dynamic content ([f694fb3](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/f694fb3))
- **ui:** Enhance cards with hover effects and layout improvements ([d2310f1](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/d2310f1))
- **examples:** Enhance animated UI examples with rich content and layout ([b9fab08](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/b9fab08))
- **text-morph:** Enhance text morph examples with advanced controls and presets ([d609202](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/d609202))
- **morphing-popover:** Add support for custom animation variants and transitions ([fab7c15](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/fab7c15))
- **ui:** Add animated dialog demo and update grid layout ([328cf15](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/328cf15))
- **glare-card:** Add customizable glare colors and rainbow background effects ([e4d316b](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/e4d316b))
- **docs:** Add header, footer and lazy content search to index page ([d9effbf](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/d9effbf))

### 🩹 Fixes

- **image-comparison:** Prevent autoPlay interval from running on server ([42ab65a](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/42ab65a))
- **docs:** Update meta image URLs to use relative paths - Change ogImage URL from absolute to relative path - Change twitterImage URL from absolute to relative path - Ensure consistency in documentation page metadata images ([c882336](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/c882336))
- **components:** Fix background gradient size to fill full container ([effccc5](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/effccc5))

### 💅 Refactors

- **playground:** Comment out multiple UCard and container elements ([62f944d](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/62f944d))
- **docs:** Update 3D card styling and clean navigation content ([a6398ad](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/a6398ad))
- **docs:** Enhance examples and update BoxesCore component styling ([4b0f344](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/4b0f344))
- **focus-cards:** Rename image property to src and improve formatting ([5edca8c](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/5edca8c))
- **examples:** Replace static elements with dynamic navigation and tabs ([5b262a8](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/5b262a8))
- **animated-group:** Simplify examples and improve stagger animation handling ([6dde99a](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/6dde99a))
- **landing-page:** Replace manual navbar with UHeader component ([f19323f](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/f19323f))
- **gradient-hero:** Replace motion-v with MInView for animations ([c0e62cc](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/c0e62cc))
- **docs:** Restructure layout and enhance component example controls ([2899649](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/2899649))
- **examples:** Remove unnecessary MMorphingPopoverTrigger wrapper ([1b7485e](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/1b7485e))
- **examples:** Simplify MorphingPopover usage by removing triggers ([feb0948](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/feb0948))
- **examples:** Remove min-height from MorphingPopover containers ([84a1c3a](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/84a1c3a))
- **ui:** Improve formatting and markup consistency in various components ([eef1827](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/eef1827))
- **template:** Remove Complete Landing Page example and related docs ([59e9987](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/59e9987))

### 📖 Documentation

- **components:** Update component examples and refactor navigation structure ([6a8c807](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/6a8c807))
- **tracing-beam:** Replace inline examples with component examples ([a2a2d8f](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/a2a2d8f))
- **layout:** Add full width and height wrapper to component previews ([70d8475](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/70d8475))
- **glow-effect:** Enhance glow effect documentation and update examples ([87cf8b0](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/87cf8b0))
- **examples:** Enhance animated number examples with controls and styling ([8413b2b](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/8413b2b))
- **morphing-popover:** Add MorphingPopover component and usage examples ([33d423b](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/33d423b))
- **animated-dialog:** Update documentation and examples with improved content and usage ([15e9ea9](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/15e9ea9))
- **animated-dialog:** Add comprehensive documentation for AnimatedDialog component ([c9f769b](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/c9f769b))
- **template:** Remove templates documentation file ([3bd4714](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/3bd4714))

### 🏡 Chore

- **release:** V0.0.1 ([ff30921](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/ff30921))
- Clean up changelog by removing redundant release entries and unused docs ([ba4d0bb](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/ba4d0bb))

### ✅ Tests

- **playground:** Add basic test for 3D card component ([d13a135](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/d13a135))

### 🎨 Styles

- **text-loop:** Improve layout and animation container styling ([ce7baac](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/ce7baac))
- **animated-group:** Update layout and spacing in animated group examples ([14c950f](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/14c950f))
- **BorderTrail:** Add rounded-lg style to UCard body ui property ([edc6d47](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/edc6d47))
- **docs:** Reformat and improve readability in example components ([9b63c54](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/9b63c54))

### ❤️ Contributors

- MuhammadKhizar7 <muhammadkhizar7@gmail.com>

## v0.0.1


### 🚀 Enhancements

- Add initial component ([4d5f0d1](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/4d5f0d1))
- Enhance nuxt-motion-block module with new components and features ([697a66d](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/697a66d))
- Add docs for components ([6d211ce](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/6d211ce))
- Add examples for TextGradient and TextLoop components ([ccf29bc](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/ccf29bc))
- Add new examples for components including counting numbers, feature grid, hero buttons, and titles ([2b1701d](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/2b1701d))
- Add zod dependency version 3.25.76 to pnpm-lock.yaml ([f8ebf44](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/f8ebf44))

### 🩹 Fixes

- Cursor issue and add examples ([1e7b464](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/1e7b464))
- Dock with example ([d88db1f](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/d88db1f))
- Custom color glow effect ([aff4e6e](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/aff4e6e))
- Progress blur issue and scroll progress ([f9ec750](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/f9ec750))
- Update TextShimmer component to use 'text' prop instead of 'children' and improve example usage ([046cd90](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/046cd90))
- Update TextShimmerWave component to use 'text' prop instead of 'children' and adjust related examples ([ac93d0c](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/ac93d0c))
- Update AnimatedBackground component to improve background styling and enhance hover effects ([9523e58](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/9523e58))
- Add missing commas and improve code formatting across multiple components ([dfc6c6b](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/dfc6c6b))
- Disable specific ESLint rules and improve type handling in various components ([1ebd77b](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/1ebd77b))
- Update variable declaration in HSVtoRGB function for proper scoping ([fcd7bbd](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/fcd7bbd))
- Correct version number in package.json to 0.0.0 ([bec2b02](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/bec2b02))
- Add vue-ignore comment to prevent warnings in ProgressiveBlur component ([0aba27d](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/0aba27d))
- Config issue ([93df9e0](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/93df9e0))
- Revert version number to 0.0.0 in package.json ([3ef4328](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/3ef4328))
- Change readme text and docs suit module ([b86120f](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/b86120f))

### 💅 Refactors

- **docs:** Remove old example components and update content structure ([ff29000](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/ff29000))

### 🏡 Chore

- Remove unused docs pages ([064c4b0](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/064c4b0))
- Remove template menu ([9d826d6](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/9d826d6))
- Reset version and remove tags ([02a795a](https://github.com/MuhammadKhizar7/nuxt-motion-block/commit/02a795a))

### ❤️ Contributors

- MuhammadKhizar7

