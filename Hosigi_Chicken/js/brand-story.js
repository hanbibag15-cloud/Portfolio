/* Shared scroll entrance motion for three BRAND subpages. */
(() => {
  "use strict";
  const root=document.querySelector(".hosigi-story, .brand-subpage");
  if(!root)return;

  const items=[...root.querySelectorAll(".story-reveal, .brand-subpage-reveal")];
  if(!items.length)return;

  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced||!("IntersectionObserver" in window))return;

  // Keep elements already in the viewport visible at page load.
  const topVisible=item=>item.getBoundingClientRect().top < window.innerHeight - 25;
  items.forEach(item=>{
    if(topVisible(item))item.classList.add("is-visible");
  });

  root.classList.add("story-motion-ready");

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },{threshold:0.08,rootMargin:"0px 0px -20px 0px"});

  items.forEach(item=>{
    if(!item.classList.contains("is-visible"))observer.observe(item);
  });
})();
