/* History-only active years and smooth navigation. Year rows share one page scroll. */
(() => {
  "use strict";
  const section = document.querySelector("#story-history");
  if (!section) return;

  const yearList = section.querySelector(".history-year-list");
  const content = section.querySelector(".history-content");
  if (!yearList || !content) return;

  // Keep the navigation and panels in matching chronological Grid rows,
  // even if an older version of the HTML is loaded.
  const years = [...content.querySelectorAll(".history-year-panel")]
    .sort((a, b) => Number(a.dataset.historyYear) - Number(b.dataset.historyYear));
  const navItems = new Map(
    [...yearList.querySelectorAll("li")].map(li => [
      li.querySelector(".history-year-link")?.getAttribute("href")?.replace("#history-", ""),
      li
    ])
  );
  years.forEach((panel, index) => {
    const row = String(index + 1);
    const li = navItems.get(panel.dataset.historyYear);
    if (!li) return;
    panel.style.setProperty("--history-row", row);
    li.style.setProperty("--history-row", row);
    yearList.appendChild(li);
    content.appendChild(panel);
  });

  const links = [...yearList.querySelectorAll(".history-year-link")];
  const panels = [...content.querySelectorAll(".history-year-panel")];
  const banners = panels.map(panel => panel.querySelector(".history-year-banner"));
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
    // The selection lock is only for a programmatic year-link jump.
    // Release it on arrival; manual wheel/touch/keyboard also releases it.
    if (lockedIndex >= 0) {
      const destination = panels[lockedIndex];
      if (destination &&
          Math.abs(destination.getBoundingClientRect().top - readingOffset()) < 12) {
        release();
      } else {
        return;
      }
    }

    // Use the red YEAR HEADER, not the card or the top of the viewport.
    // At 75% viewport height, the next year is already active.
    const activationLine = window.innerHeight * 0.75;
    let index = 0;
    banners.forEach((banner, i) => {
      if (banner && banner.getBoundingClientRect().top <= activationLine) index = i;
    });
    activate(index);
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  // Crossings of the 75% line trigger a recheck even if scroll events are
  // throttled. The pixel rootMargin is recalculated on viewport resize.
  let yearObserver = null;
  function observeYearHeaders() {
    if (!("IntersectionObserver" in window)) return;
    if (yearObserver) yearObserver.disconnect();
    yearObserver = new IntersectionObserver(schedule, {
      root: null,
      rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.25)}px 0px`,
      threshold: 0
    });
    banners.forEach(banner => { if (banner) yearObserver.observe(banner); });
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
  window.addEventListener("resize", () => {
    observeYearHeaders();
    schedule();
  }, { passive: true });
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

  observeYearHeaders();
  update();

  // The desktop page also uses eased wheel scrolling. Recheck the actual
  // element positions while HISTORY is visible, even if scroll events or
  // IntersectionObserver callbacks are delayed by other scroll handlers.
  // No page content or layout is altered by this monitor.
  function monitorActiveYear() {
    if (!document.hidden) {
      const rect = section.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) update();
    }
    requestAnimationFrame(monitorActiveYear);
  }
  requestAnimationFrame(monitorActiveYear);
})();
