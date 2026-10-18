<template>
  <div class="flex flex-col items-center gap-3 py-6">
    <MOrbitalImageWheel
      :items="items"
      snap
    />

    <p class="text-xs text-muted">
      Drag to spin · <kbd class="rounded border border-default px-1">←</kbd>
      <kbd class="rounded border border-default px-1">→</kbd> to step · click a
      thumbnail to bring it to the top
    </p>
  </div>
</template>

<script setup lang="ts">
const items = [
  { alt: 'Ridge', id: 'ridge', image: swatch('#38bdf8', '#0ea5e9', 'R') },
  { alt: 'Tide', id: 'tide', image: swatch('#34d399', '#059669', 'T') },
  { alt: 'Salt', id: 'salt', image: swatch('#fbbf24', '#d97706', 'S') },
  { alt: 'Birch', id: 'birch', image: swatch('#a3e635', '#65a30d', 'B') },
  { alt: 'Glacier', id: 'glacier', image: swatch('#818cf8', '#4f46e5', 'G') },
  { alt: 'Arch', id: 'arch', image: swatch('#f472b6', '#db2777', 'A') },
]

// Inline SVG thumbnails keep this example self-contained — no network, no
// placeholder service.
function swatch(from: string, to: string, glyph: string) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`
      + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`
      + `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>`
      + `</linearGradient></defs>`
      + `<rect width="80" height="80" fill="url(#g)"/>`
      + `<text x="40" y="52" font-family="system-ui,sans-serif" font-size="34"`
      + ` font-weight="600" fill="white" fill-opacity=".9" text-anchor="middle">${glyph}</text>`
      + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>
