export function supportFetch() {
  return 'fetch' in window && typeof window.fetch === 'function'
}

export function supportXHR() {
  return 'XMLHttpRequest' in window && typeof window.XMLHttpRequest === 'function'
}
