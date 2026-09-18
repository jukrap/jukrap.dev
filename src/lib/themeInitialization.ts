// Runs before the body is painted; React synchronizes the toggle state on mount.
export const themeInitializationScript = `(() => {
  let saved;
  try { saved = localStorage.getItem('jukrap-theme'); } catch {}
  const dark = saved === 'dark' || (saved !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
})();`;
