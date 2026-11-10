/* Brand Story HISTORY: sticky year rail and continuous scroll-synced milestones. */
(() => {
  "use strict";
  const section = document.querySelector("#story-history");
  if (!section) return;

  const links = [...section.querySelectorAll(".history-year-link")];
  const panels = [...section.querySelectorAll(".history-year-panel")];
  if (!links.length || links.length !== panels.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 767px)");
  const nav = section.querySelector(".history-year-nav");
  let selected = -1;
  let frame = 0;
  let clickTarget = null;

  function offset() {
    const header = document.querySelector(".site-header");
    const height = header ? header.getBoundingClientRect().height : (mobile.matches ? 70 : 90);
    return height + (mobile.matches ? (nav?.getBoundingClientRect().height || 56) + 16 : 34);
  }

  function activate(index) {
    if (index === selected || index < 0) return;
    selected = index;
    links.forEach((link, i) => {
      const active = i === index;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    // Keep the selected tab visible inside the horizontal mobile rail.
    if (mobile.matches) {
      const row = nav?.querySelector(".history-year-list");
      const link = links[index];
      if (row && link) {
        const left = link.offsetLeft - row.offsetLeft - (row.clientWidth - link.offsetWidth) / 2;
        row.scrollTo({ left, behavior: reduced.matches ? "auto" : "smooth" });
      }
    }
  }

  function updateOnScroll() {
    frame = 0;
    const threshold = offset() + 25;
    if (clickTarget !== null) {
      const target = panels[clickTarget];
      if (Math.abs(target.getBoundingClientRect().top - offset()) < 6) clickTarget = null;
      else return; // Don't flicker through intermediate years during programmatic scroll.
    }
    // The last year whose heading is above the reading line is active.
    let index = 0;
    panels.forEach((panel, i) => {
      if (panel.getBoundingClientRect().top <= threshold) index = i;
    });
    activate(index);
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(updateOnScroll);
  }

  links.forEach((link, i) => {
    link.addEventListener("click", event => {
      event.preventDefault();
      clickTarget = i;
      activate(i);
      const targetY = Math.max(0, window.scrollY + panels[i].getBoundingClientRect().top - offset());
      window.scrollTo({ top: targetY, behavior: reduced.matches ? "auto" : "smooth" });
      // Don't change the URL hash: it can trigger a second, uncorrected jump.
      // A user scroll or wheel action can take over immediately.
    });
  });

  window.addEventListener("wheel", () => { clickTarget = null; }, { passive: true });
  window.addEventListener("touchstart", () => { clickTarget = null; }, { passive: true });
  window.addEventListener("keydown", () => { clickTarget = null; });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("scrollend", () => { clickTarget = null; updateOnScroll(); });
  window.addEventListener("resize", onScroll, { passive: true });

  // Reveal cards once without modifying their layout or document height.
  const cards = [...section.querySelectorAll(".history-reveal")];
  if (!reduced.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -15px 0px" });
    cards.forEach(card => {
      if (card.getBoundingClientRect().top < window.innerHeight) card.classList.add("is-visible");
      else observer.observe(card);
    });
    section.classList.add("history-motion-ready");
  } else {
    cards.forEach(card => card.classList.add("is-visible"));
  }

  updateOnScroll();
})();
