/* Brand Story motion: small enhancement; no slider or external dependency. */
(() => {
  "use strict";
  const root=document.querySelector(".hosigi-story");
  if(!root)return;
  const items=[...root.querySelectorAll(".story-reveal")];
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(reduced.matches||!("IntersectionObserver" in window))return;
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },{threshold:0.12,rootMargin:"0px 0px -28px 0px"});
  items.forEach(item=>{
    if(item.getBoundingClientRect().top<window.innerHeight){
      item.classList.add("is-visible");
    }
  });
  root.classList.add("story-motion-ready");
  items.forEach(item=>{if(!item.classList.contains("is-visible"))observer.observe(item);});
})();
