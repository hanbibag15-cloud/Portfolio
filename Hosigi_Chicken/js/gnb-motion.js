/* Unified main GNB hover and active-state motion.
   Navigation/dropdown behavior stays with existing page scripts. */
(() => {
  "use strict";
  const nav=document.querySelector(".header-nav");
  if(!nav)return;

  const links=[...nav.querySelectorAll(":scope > ul > li")].map(li=>li.querySelector(":scope > a"));
  if(links.length<4)return;

  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const page=location.pathname.split("/").pop().toLowerCase() || "brand.html";
  const activePages={
    "menu.html":0,
    "menu-detail.html":0,
    "brand-story.html":1,
    "brand-philosophy.html":1,
    "brand-social.html":1,
    "store.html":2,
    "event.html":3
  };
  const permanent=Object.prototype.hasOwnProperty.call(activePages,page)?activePages[page]:-1;

  // Wrap only top-level labels; no dropdown links or header layout are altered.
  links.forEach(link=>{
    if(!link)return;
    link.classList.add("gnb-motion-link");
    const brandLabel=link.querySelector(":scope > .brand-gnb-text");
    if(brandLabel){
      brandLabel.classList.remove("brand-gnb-text");
      brandLabel.classList.add("gnb-label");
    }else if(!link.querySelector(":scope > .gnb-label")){
      const span=document.createElement("span");
      span.className="gnb-label";
      while(link.firstChild)span.appendChild(link.firstChild);
      link.appendChild(span);
    }
    // Prevent the older click animation from doubling the underline.
    link.classList.remove("nav-click-reveal");
  });

  let current=-1;
  const sync=index=>{
    if(index===current)return;
    current=index;
    links.forEach((link,i)=>{
      if(!link)return;
      const active=i===index;
      link.classList.toggle("gnb-active",active);
      if(permanent>=0){
        link.classList.toggle("is-current",active);
        if(active)link.setAttribute("aria-current","page");
        else link.removeAttribute("aria-current");
      }
      link.classList.remove("gnb-enter");
    });
    if(index<0||reduced.matches)return;
    const link=links[index];
    // Reflow guarantees animation runs when opened directly or reloaded.
    void link.offsetWidth;
    link.classList.add("gnb-enter");
    link.addEventListener("animationend",event=>{
      if(event.target===link && event.animationName==="hosigi-gnb-underline-in"){
        link.classList.remove("gnb-enter");
      }
    },{once:true});
  };

  if(permanent>=0){
    sync(permanent);
  }else if(page==="brand.html"){
    // Keep existing homepage scroll-based active-section behavior.
    const read=()=>links.findIndex(link=>link?.classList.contains("is-current"));
    sync(read());
    const observer=new MutationObserver(()=>sync(read()));
    links.forEach(link=>{if(link)observer.observe(link,{attributes:true,attributeFilter:["class"]});});
  }else{
    sync(-1);
  }
})();
