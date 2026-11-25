/* HISTORY only: sticky index, scroll spy, smooth jumps and card reveals. */
(() => {
  "use strict";
  const section = document.querySelector("#story-history");
  if (!section) return;
  const nav = section.querySelector(".history-year-nav");
  const links = [...section.querySelectorAll(".history-year-link")];
  const panels = links.map(link => document.getElementById(link.hash.slice(1)));
  if (!nav || !links.length || panels.some(panel => !panel)) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const wide = window.matchMedia("(min-width: 1550px)");
  const decorations = [...section.querySelectorAll(".history-decoration")];
  const layout = section.querySelector(".history-layout");
  const content = section.querySelector(".history-content");
  if (!layout || !content) return;
  let selected = -1, frame = 0, lock = -1, timer = 0, offset = 112;
  let previousY = window.scrollY, direction = 1;
  const bounds = panels.map(panel => ({banner:panel.querySelector(".history-year-banner"),list:panel.querySelector(".history-event-list")}));
  function measure() {
    const header = document.querySelector(".site-header");
    offset = Math.ceil(header ? header.getBoundingClientRect().height : 0) + 24;
    section.style.setProperty("--history-sticky-top", offset + "px");
    const available = Math.max(1, innerHeight - offset - 16);
    const nominal = innerWidth <= 767 ? 14 : Math.max(17, Math.min(22, innerWidth * .015));
    const size = Math.min(nominal, available / links.length / 1.2);
    const pad = Math.max(0, Math.min(8, (available / links.length - size * 1.2) / 2));
    section.style.setProperty("--history-link-size", size + "px");
    section.style.setProperty("--history-link-pad", pad + "px");
  }
  function activate(index) {
    if (selected === index) return;
    selected = index;
    links.forEach((link, i) => {
      link.classList.toggle("is-active", i === index);
      if (i === index) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  function release() { lock = -1; clearTimeout(timer); }
  function update() {
    frame = 0;
    const y = window.scrollY;
    if (Math.abs(y-previousY) > .5) direction = y > previousY ? 1 : -1;
    previousY = y;
    const rail = layout.getBoundingClientRect();
    const end = content.getBoundingClientRect().bottom;
    const travel = Math.max(0, end - rail.top - nav.offsetHeight);
    const shift = Math.max(0, Math.min(travel, offset - rail.top));
    nav.style.setProperty("--history-nav-y", shift.toFixed(2)+"px");
    if (lock >= 0 && Math.abs(panels[lock].getBoundingClientRect().top-offset) <= 8) release();
    if (lock < 0) {
      const top = offset, bottom = innerHeight - 12, viewport = Math.max(1,bottom-top);
      const metrics = bounds.map((item,i) => {
        const a = (item.banner || panels[i]).getBoundingClientRect();
        const b = (item.list || panels[i]).getBoundingClientRect();
        const height = Math.max(1,b.bottom-a.top);
        const visible = Math.max(0,Math.min(bottom,b.bottom)-Math.max(top,a.top));
        const ratio = visible / Math.min(height,viewport);
        const center = Math.abs((Math.max(top,a.top)+Math.min(bottom,b.bottom))/2-(top+bottom)/2);
        return {i,ratio,visible,center,eligible:ratio >= .85};
      });
      const candidates = metrics.filter(m=>m.eligible && m.visible>0);
      candidates.sort((a,b)=>b.visible-a.visible || a.center-b.center || direction*(b.i-a.i));
      const current=metrics[selected];
      if (candidates.length) {
        const best=candidates[0];
        if (!current || !current.eligible || best.i===selected || best.visible>current.visible+Math.max(20,viewport*.07)) activate(best.i);
      } else if (!current || current.visible===0) {
        // During large jumps or initial deep links choose the dominant visible group.
        const best=metrics.filter(m=>m.visible>0).sort((a,b)=>b.visible-a.visible)[0];
        if (best && best.ratio>=.5) activate(best.i);
        else if (selected<0) activate(0);
      }
    }
    if (wide.matches && !reduced.matches) {
      const rect = section.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        decorations.forEach((el,i) => {
          const distance = el.getBoundingClientRect().top - innerHeight/2;
          const drift = Math.max(-28,Math.min(28,distance*.035));
          el.style.setProperty("--history-drift",(i===0?drift:-drift).toFixed(1)+"px");
        });
      }
    }
  }
  function schedule() { if (!frame) frame=requestAnimationFrame(update); }
  links.forEach((link,i) => link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); release(); measure(); lock=i; activate(i);
    const top=Math.max(0,scrollY+panels[i].getBoundingClientRect().top-offset);
    window.scrollTo({top,behavior:reduced.matches?"auto":"smooth"});
    timer=setTimeout(()=>{release();schedule()},reduced.matches?40:1800);
  }));
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",()=>{measure();schedule()},{passive:true});
  window.addEventListener("pageshow",()=>{measure();schedule()});
  window.addEventListener("scrollend",()=>{release();schedule()});
  ["wheel","touchstart","keydown"].forEach(type=>window.addEventListener(type,()=>{release();schedule()},{passive:true}));
  const cards=[...section.querySelectorAll(".history-reveal")];
  if (!reduced.matches && "IntersectionObserver" in window) {
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");observer.unobserve(entry.target);
    }),{threshold:.08,rootMargin:"0px 0px -15px 0px"});
    cards.forEach(card=>{if(card.getBoundingClientRect().top<innerHeight)card.classList.add("is-visible");else observer.observe(card)});
    section.classList.add("history-motion-ready");
  } else cards.forEach(card=>card.classList.add("is-visible"));
  if ("ResizeObserver" in window) {
    const observer=new ResizeObserver(()=>{measure();schedule()});
    observer.observe(document.querySelector(".site-header") || section);
    observer.observe(content);
  }
  document.fonts?.ready.then(()=>{measure();schedule()});
  measure();update();
})();
