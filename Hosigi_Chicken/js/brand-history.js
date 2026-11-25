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
  let selected = -1, frame = 0, lock = -1, timer = 0, offset = 112;
  function measure() {
    const header = document.querySelector(".site-header");
    offset = Math.ceil(header ? header.getBoundingClientRect().height : 0) + 24;
    section.style.setProperty("--history-sticky-top", offset + "px");
  }
  function activate(index) {
    if (selected === index) return;
    selected = index;
    links.forEach((link, i) => {
      link.classList.toggle("is-active", i === index);
      if (i === index) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    const link = links[index];
    if (!link || nav.scrollHeight <= nav.clientHeight) return;
    const a = link.getBoundingClientRect(), b = nav.getBoundingClientRect();
    if (a.top < b.top || a.bottom > b.bottom) {
      nav.scrollTo({top:Math.max(0,nav.scrollTop+a.top-b.top-(nav.clientHeight-a.height)/2),behavior:reduced.matches?"auto":"smooth"});
    }
  }
  function release() { lock = -1; clearTimeout(timer); }
  function update() {
    frame = 0;
    if (lock >= 0 && Math.abs(panels[lock].getBoundingClientRect().top-offset) <= 8) release();
    if (lock < 0) {
      let index = 0;
      panels.forEach((panel,i) => { if (panel.getBoundingClientRect().top <= offset+12) index=i; });
      activate(index);
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
  measure();update();
})();
