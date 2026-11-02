// Fade only when navigating between the brand main page and the menu subpage.
(() => {
  const overlay = document.createElement('div');
  overlay.className = 'page-fade-layer';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const path = location.pathname.split('/').pop();
  if (path === 'menu.html' && !reduceMotion()) {
    document.documentElement.classList.add('page-is-entering');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.documentElement.classList.remove('page-is-entering');
    }));
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    const target = new URL(link.href, location.href);
    if (target.origin !== location.origin || target.pathname === location.pathname) return;
    const destination = target.pathname.split('/').pop();
    if (!((path === 'brand.html' && destination === 'menu.html') || (path === 'menu.html' && destination === 'brand.html'))) return;
    if (reduceMotion()) return;
    event.preventDefault();
    document.documentElement.classList.add('page-is-leaving');
    window.setTimeout(() => { location.href = target.href; }, 300);
  });
  // Clear the fade if the browser restores this page from its back-forward cache.
  window.addEventListener('pageshow', () => document.documentElement.classList.remove('page-is-leaving'));
})();
