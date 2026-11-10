/* History-only active years and smooth navigation. Year rows share one page scroll. */
(() => {
  "use strict";
  const section = document.querySelector("#story-history");
  if (!section) return;

  const links = [...section.querySelectorAll(".history-year-link")];
  const panels = [...section.querySelectorAll(".history-year-panel")];
  const mobile = window.matchMedia("(max-width: 767px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!links.length || links.length !== panels.length) return;

  let selected = -1;
  let frame = 0;
  let lockedIndex = -1;
  let releaseTimer = 0;

  function readingOffset() {
    const header = document.querySelector(".site-header");
    return (header ? header.getBoundingClientRect().height : 0) + 24;
  }

  function activate(index) {
    if (index < 0 || selected === index) return;
    selected = index;
    links.forEach((link, i) => {
      const active = i === index;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

    // Only the mobile year tabs need their own horizontal position adjustment.
    if (mobile.matches) {
      const list = section.querySelector(".history-year-list");
      const link = links[index];
      if (!list || !link) return;
      const listRect = list.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const left = list.scrollLeft + linkRect.left - listRect.left -
        (list.clientWidth - linkRect.width) / 2;
      list.scrollTo({ left: Math.max(0, left), behavior: reduced.matches ? "auto" : "smooth" });
    }
  }

  function release() {
    lockedIndex = -1;
    clearTimeout(releaseTimer);
  }

  function update() {
    frame = 0;
    if (lockedIndex >= 0) return;
    const line = readingOffset() + 28;
    let index = 0;
    panels.forEach((panel, i) => {
      if (panel.getBoundingClientRect().top <= line) index = i;
    });
    activate(index);
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  links.forEach((link, index) => {
    link.addEventListener("click", event => {
      event.preventDefault();
      release();
      lockedIndex = index;
      activate(index);
      const y = Math.max(0, window.scrollY + panels[index].getBoundingClientRect().top - readingOffset());
      window.scrollTo({ top: y, behavior: reduced.matches ? "auto" : "smooth" });
      releaseTimer = window.setTimeout(() => { release(); schedule(); }, reduced.matches ? 40 : 1800);
    });
  });

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("scrollend", () => { release(); schedule(); });
  window.addEventListener("resize", schedule, { passive: true });
  ["wheel", "touchstart", "keydown"].forEach(type => {
    window.addEventListener(type, () => { release(); schedule(); }, { passive: true });
  });

  // Retain the existing one-time card reveal, without moving layout.
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
      if (card.getBoundingClientRect().top < window.innerHeight)
        card.classList.add("is-visible");
      else observer.observe(card);
    });
    section.classList.add("history-motion-ready");
  } else {
    cards.forEach(card => card.classList.add("is-visible"));
  }

  update();
})();
