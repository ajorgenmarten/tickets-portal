export function getTheme() {
  if (!window.matchMedia) return 'light'

  if (window.matchMedia('(prefres-color-scheme: dark)').matches)
    return 'dark'

  return 'light'
    
}
