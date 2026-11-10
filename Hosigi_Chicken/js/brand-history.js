/* HISTORY-only navigation; preserves other page scroll and GNB behavior. */
(() => {
  "use strict";
  const section = document.querySelector("#story-history");
  if (!section) return;

  const links = [...section.querySelectorAll(".history-year-link")];
  const panels = [...section.querySelectorAll(".history-year-panel")];
  const nav = section.querySelector(".history-year-nav");
  const yearList = section.querySelector(".history-year-list");
  if (!nav || !yearList || !links.length || links.length !== panels.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 767px)");
  let selected = -1;
  let frame = 0;
  let clickTarget = -1;
  let unlockTimer = 0;

  function headerHeight() {
    return document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
  }

  function navTop() {
    return Math.round(headerHeight() + 16);
  }

  function syncNavTop() {
    section.style.setProperty("--history-nav-top", navTop() + "px");
  }

  function readingOffset() {
    return navTop() + (mobile.matches ? nav.getBoundingClientRect().height + 16 : 24);
  }

  function keepVisible(index) {
    const link = links[index];
    if (!link) return;
    const container = mobile.matches ? yearList : nav;
    const bounds = container.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (mobile.matches) {
      const left = container.scrollLeft + item.left - bounds.left -
        (container.clientWidth - item.width) / 2;
      container.scrollTo({
        left: Math.max(0, left),
        behavior: reduced.matches ? "auto" : "smooth"
      });
    } else {
      const top = container.scrollTop + item.top - bounds.top -
        (container.clientHeight - item.height) / 2;
      container.scrollTo({
        top: Math.max(0, top),
        behavior: reduced.matches ? "auto" : "smooth"
      });
    }
  }

  function activate(index) {
    if (index < 0 || index === selected) return;
    selected = index;
    links.forEach((link, i) => {
      const active = i === index;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    keepVisible(index);
  }

  function releaseSelection() {
    clickTarget = -1;
    clearTimeout(unlockTimer);
  }

  function updateOnScroll() {
    frame = 0;
    if (clickTarget >= 0) {
      const gap = Math.abs(panels[clickTarget].getBoundingClientRect().top - readingOffset());
      if (gap > 8) return; // Keep clicked year highlighted while smooth-scrolling.
      releaseSelection();
    }
    const threshold = readingOffset() + 20;
    let index = 0;
    panels.forEach((panel, i) => {
      if (panel.getBoundingClientRect().top <= threshold) index = i;
    });
    activate(index);
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(updateOnScroll);
  }

  links.forEach((link, i) => link.addEventListener("click", event => {
    event.preventDefault();
    clearTimeout(unlockTimer);
    clickTarget = i;
    activate(i);

    const top = Math.max(0,
      window.scrollY + panels[i].getBoundingClientRect().top - readingOffset());
    window.scrollTo({top, behavior: reduced.matches ? "auto" : "smooth"});

    // Fallback for browsers without scrollend; user gestures release it sooner.
    unlockTimer = window.setTimeout(() => {
      releaseSelection();
      scheduleUpdate();
    }, reduced.matches ? 50 : 1700);
  }));

  ["wheel", "touchstart", "pointerdown", "keydown"].forEach(type => {
    window.addEventListener(type, event => {
      if (type === "pointerdown" && event.target.closest?.(".history-year-link")) return;
      if (type === "wheel" && event.target.closest?.(".history-year-nav") &&
          !mobile.matches) return; // Scrolling the year list itself must not change the selection.
      releaseSelection();
    }, {passive:true});
  });
  window.addEventListener("scroll", scheduleUpdate, {passive:true});
  window.addEventListener("scrollend", () => {
    releaseSelection();
    scheduleUpdate();
  }, {passive:true});
  window.addEventListener("resize", () => {
    syncNavTop();
    scheduleUpdate();
  }, {passive:true});

  const cards = [...section.querySelectorAll(".history-reveal")];
  if (!reduced.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {threshold:0.08,rootMargin:"0px 0px -15px 0px"});
    cards.forEach(card => {
      if (card.getBoundingClientRect().top < window.innerHeight)
        card.classList.add("is-visible");
      else observer.observe(card);
    });
    section.classList.add("history-motion-ready");
  } else {
    cards.forEach(card => card.classList.add("is-visible"));
  }

  syncNavTop();
  updateOnScroll();
})();
