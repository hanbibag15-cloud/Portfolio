// Show the active GNB marker only while the selected section is in view.
(() => {
  const nav = document.querySelector('.header-nav');
  if (!nav) return;
  const links = [...nav.querySelectorAll(':scope > ul > li > a')];
  const page = location.pathname.split('/').pop();
  let selected = -1;

  function mark(index) {
    links.forEach((link, i) => {
      const active = i === index;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  if (page === 'menu.html') {
    mark(0); // On the menu subpage the current-page indicator stays visible.
    return;
  }
  if (page !== 'brand.html') {
    mark(-1);
    return;
  }

  const targets = [
    document.querySelector('#menu'),
    null,
    document.querySelector('#stores'),
    document.querySelector('#events')
  ];
  const header = document.querySelector('.site-header');

  function updateOnScroll() {
    if (selected < 0 || !targets[selected]) return;
    const rect = targets[selected].getBoundingClientRect();
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    const viewportThreshold = Math.min(window.innerHeight * 0.35, 220);
    // Hide when the chosen section is no longer the section being viewed.
    if (rect.bottom <= headerBottom + 8 || rect.top >= window.innerHeight - viewportThreshold) {
      selected = -1;
      mark(-1);
    }
  }

  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      selected = targets[index] ? index : -1;
      mark(index);
    });
  });

  nav.querySelectorAll('.header-submenu a').forEach(link => {
    link.addEventListener('click', () => {
      const parent = link.closest('.has-submenu');
      const index = parent === links[0]?.parentElement ? 0 : 1;
      selected = targets[index] ? index : -1;
      mark(index);
    });
  });

  // A direct #menu / #stores / #events URL still receives the right indicator.
  function syncHash() {
    const index = ({ '#menu': 0, '#stores': 2, '#events': 3 })[location.hash];
    if (index === undefined) { selected = -1; mark(-1); return; }
    selected = index;
    mark(index);
  }
  syncHash();
  window.addEventListener('hashchange', syncHash);
  window.addEventListener('scroll', updateOnScroll, { passive: true });
  window.addEventListener('resize', updateOnScroll);
})();
