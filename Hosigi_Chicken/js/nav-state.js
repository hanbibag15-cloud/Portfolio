// Show the active GNB marker only while the selected section is in view.
(() => {
  const nav = document.querySelector('.header-nav');
  if (!nav) return;
  const links = [...nav.querySelectorAll(':scope > ul > li > a')];
  const page = location.pathname.split('/').pop();
  let selected = -1;
  let hasEnteredSelectedSection = false;

  function mark(index) {
    links.forEach((link, i) => {
      // The main page MENU is a dropdown trigger, not an active navigation destination.
      const active = i === index && !(page === 'brand.html' && i === 0);
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
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    const viewportThreshold = Math.min(window.innerHeight * 0.35, 220);
    // Detect MENU and STORE on manual scroll, in either direction.
    for (const index of [0, 2]) {
      const rect = targets[index]?.getBoundingClientRect();
      const visible = rect &&
        rect.bottom > headerBottom + 8 &&
        rect.top < window.innerHeight - viewportThreshold;
      if (visible && (selected === -1 || selected === index)) {
        selected = index;
        hasEnteredSelectedSection = true;
        mark(index);
        return;
      }
    }
    if (selected < 0 || !targets[selected]) return;
    const rect = targets[selected].getBoundingClientRect();
    const isVisible = rect.bottom > headerBottom + 8 &&
                      rect.top < window.innerHeight - viewportThreshold;
    // On first click, keep the indicator visible while smooth scrolling
    // toward the section. Hide it only AFTER the section was reached.
    if (isVisible) {
      hasEnteredSelectedSection = true;
    } else if (hasEnteredSelectedSection) {
      selected = -1;
      hasEnteredSelectedSection = false;
      mark(-1);
    }
  }

  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      selected = targets[index] ? index : -1;
      hasEnteredSelectedSection = false;
      mark(index);
    });
  });

  nav.querySelectorAll('.header-submenu a').forEach(link => {
    link.addEventListener('click', () => {
      const parent = link.closest('.has-submenu');
      const index = parent === links[0]?.parentElement ? 0 : 1;
      selected = targets[index] ? index : -1;
      hasEnteredSelectedSection = false;
      mark(index);
    });
  });

  // A direct #menu / #stores / #events URL still receives the right indicator.
  function syncHash() {
    const index = ({ '#menu': 0, '#stores': 2, '#events': 3 })[location.hash];
    if (index === undefined) { selected = -1; mark(-1); return; }
    selected = index;
    hasEnteredSelectedSection = false;
    mark(index);
  }
  syncHash();
  window.addEventListener('hashchange', syncHash);
  window.addEventListener('scroll', updateOnScroll, { passive: true });
  window.addEventListener('resize', updateOnScroll);
  updateOnScroll();
})();
