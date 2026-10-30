/**
 * Stand-in for optional peer dependencies that the docs app does not install
 * (`three`, `three-globe`). It resolves to an empty module, so the components'
 * own surface check falls back to their install hint instead of the docs build
 * failing to resolve the import.
 */
export const __optionalPeerStub = true

export default {}
