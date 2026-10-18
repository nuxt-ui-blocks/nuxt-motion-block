import redirects from '../data/legacy-redirects.json'

export default defineEventHandler((event) => {
  const path = event.path.split('?')[0].replace(/\/+$/, '') || '/'
  const target = (redirects as Record<string, string>)[path]
  if (target) {
    return sendRedirect(event, target, 301)
  }
})
