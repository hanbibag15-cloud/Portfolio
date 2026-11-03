// Deprecated: page-to-page fade is disabled.
// Keep only legacy transition-state cleanup for older cached entry points.
(() => {
  document.documentElement.classList.remove('page-is-entering', 'page-is-revealing', 'page-is-leaving');
  try { sessionStorage.removeItem('hosigi-page-transition'); } catch (error) { /* storage unavailable */ }
})();
