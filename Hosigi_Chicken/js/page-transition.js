// Cross-document transition for the brand and menu pages.
(() => {
  const root = document.documentElement;
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = location.pathname.split('/').pop();
  const overlay = document.createElement('div');
  overlay.className = 'page-fade-layer';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  // The head bootstrap sets page-is-entering BEFORE the destination's first paint.
  if (root.classList.contains('page-is-entering')) {
    sessionStorage.removeItem('hosigi-page-transition');
    if (reduceMotion()) root.classList.remove('page-is-entering');
    else requestAnimationFrame(() => requestAnimationFrame(() => {
      root.classList.add('page-is-revealing');
      window.setTimeout(() => root.classList.remove('page-is-entering', 'page-is-revealing'), 660);
    }));
  }

  let navigating = false;
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.target === '_blank' || link.hasAttribute('download')) return;
    const target = new URL(link.href, location.href);
    if (target.origin !== location.origin || target.pathname === location.pathname) return;
    const next = target.pathname.split('/').pop();
    if (!((page === 'brand.html' && next === 'menu.html') ||
          (page === 'menu.html' && next === 'brand.html'))) return;
    if (reduceMotion() || navigating) return;
    event.preventDefault();
    navigating = true;
    root.classList.add('page-is-leaving');
    sessionStorage.setItem('hosigi-page-transition', next);
    window.setTimeout(() => { location.assign(target.href); }, 440);
  });

  window.addEventListener('pageshow', () => {
    // When a previous document is restored from the back/forward cache.
    root.classList.remove('page-is-leaving');
    navigating = false;
  });
})();
