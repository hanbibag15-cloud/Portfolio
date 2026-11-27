// Static GNB page state; the homepage does not use Scroll Spy.
(() => {
  const nav = document.querySelector('.header-nav');
  if (!nav) return;
  const links = [...nav.querySelectorAll(':scope > ul > li')].map(item => item.querySelector(':scope > a'));
  const page = location.pathname.split('/').pop();

  function mark(index) {
    links.forEach((link, i) => {
      const active = i === index;
      if (!link) return; // BRAND is a non-interactive label.
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  if (page === 'menu.html' || page === 'menu-detail.html' || page === 'event.html') {
    mark(page === 'event.html' ? 3 : 0);
    return;
  }
  // The homepage and other non-mapped pages have no active section marker.
  // Actual subpage activation is retained above and in gnb-motion.js.
  mark(-1);
})();
