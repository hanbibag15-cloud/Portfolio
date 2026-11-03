// Desktop wheel easing for the brand and all-menu pages.
// Mobile touch, keyboard navigation and reduced-motion preferences stay native.
(() => {
  const desktop = window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let current = 0;
  let target = 0;

  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    current = target = window.scrollY;
  };

  function animate() {
    const difference = target - current;
    current += difference * 0.13;
    if (Math.abs(difference) < 0.6) {
      window.scrollTo(0, target);
      frame = 0;
      return;
    }
    window.scrollTo(0, current);
    frame = requestAnimationFrame(animate);
  }

  // Do not intercept wheel input meant for independently scrolling regions.
  function insideScrollable(element, delta) {
    for (let node = element; node && node !== document.body; node = node.parentElement) {
      if (!(node instanceof HTMLElement)) continue;
      const overflow = getComputedStyle(node).overflowY;
      if (!/auto|scroll/.test(overflow) || node.scrollHeight <= node.clientHeight + 1) continue;
      if ((delta > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) ||
          (delta < 0 && node.scrollTop > 1)) return true;
    }
    return false;
  }

  window.addEventListener('wheel', (event) => {
    if (!desktop.matches || reduced.matches || event.ctrlKey || event.metaKey ||
        event.defaultPrevented || Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        event.target.closest('textarea, select, [role="dialog"]') ||
        insideScrollable(event.target, event.deltaY)) return;

    // Normalize wheel lines/pages; cap large mouse-wheel jumps.
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    const delta = Math.max(-200, Math.min(200, event.deltaY * unit));
    if (!delta) return;
    event.preventDefault();

    if (!frame) current = target = window.scrollY;
    target = Math.max(0, Math.min(maxScroll(), target + delta * 0.9));
    if (!frame && Math.abs(target - current) > 0.5) frame = requestAnimationFrame(animate);
  }, { passive: false });

  // A click on an anchor, keyboard scrolling, or viewport change should not
  // compete with a previous wheel animation.
  window.addEventListener('keydown', stop);
  window.addEventListener('resize', stop);
  window.addEventListener('pagehide', stop);
  document.addEventListener('click', stop);
  desktop.addEventListener('change', stop);
  reduced.addEventListener('change', stop);
})();
