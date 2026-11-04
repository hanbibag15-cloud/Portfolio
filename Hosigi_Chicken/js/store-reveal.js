/* Same 36px / 750ms scroll reveal as the main brand sections.
   Observe new search-result cards too, without interfering with Leaflet. */
(() => {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = document.querySelectorAll(
    ".store-intro h2, .store-intro p, .store-search, " +
    ".store-results-heading, .store-map-panel, .store-list"
  );
  const items = Array.from(targets);

  function markReady(element) {
    element.classList.add("store-scroll-reveal", "is-reveal-ready");
  }
  items.forEach(markReady);

  // The brand homepage reveals content when it reaches 78% of the viewport.
  let frameScheduled = false;
  function update() {
    frameScheduled = false;
    const threshold = window.innerHeight * .78;
    for (const element of items) {
      const bounds = element.getBoundingClientRect();
      element.classList.toggle(
        "is-visible",
        bounds.top <= threshold && bounds.bottom >= 0
      );
    }
  }
  function scheduleUpdate() {
    if (frameScheduled) return;
    frameScheduled = true;
    requestAnimationFrame(update);
  }
  window.addEventListener("scroll", scheduleUpdate, {passive:true});
  window.addEventListener("resize", scheduleUpdate);
  // Wait for the hidden starting state to paint before showing visible elements.
  requestAnimationFrame(() => requestAnimationFrame(update));
})();
