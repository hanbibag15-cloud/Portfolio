/* Per-link click feedback for MENU submenu, STORE, EVENT only.
   The underline grows in place rather than sliding from another menu.
   Cross-page feedback is replayed once on the destination page. */
(() => {
  const nav=document.querySelector(".header-nav");
  if(!nav)return;
  const rootLinks=[...nav.querySelectorAll(":scope > ul > li > a")];
  if(rootLinks.length<4)return;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const key="hosigi-nav-click-target";
  const page=location.pathname.split("/").pop();
  const targetPage={2:"store.html",3:"event.html"};
  const trigger=(link,cls)=>{
    if(!link||reduced.matches)return;
    link.classList.remove(cls);
    void link.offsetWidth; // Restart when clicked repeatedly.
    link.classList.add(cls);
    link.addEventListener("animationend",()=>link.classList.remove(cls),{once:true});
  };
  // Do not create any underline on brand or top-level MENU click.
  [2,3].forEach(index=>{
    const link=rootLinks[index];
    if(!link)return;
    link.addEventListener("click",()=>{
      trigger(link,"nav-click-reveal");
      try{sessionStorage.setItem(key,targetPage[index]);}catch{}
    });
  });
  // Capture submenu navigation BEFORE page-specific handlers close the dropdown.
  // Leave the selected text visible long enough to finish the click animation.
  const menuSubmenu=nav.querySelector("#mobile-submenu");
  let menuNavigating=false;
  menuSubmenu?.addEventListener("click",event=>{
    const link=event.target.closest("a[href]");
    if(!link||!menuSubmenu.contains(link)||menuNavigating)return;
    if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const destination=link.href;
    if(!destination)return;
    if(reduced.matches)return; // Respect native navigation for reduced motion.
    event.preventDefault();
    event.stopImmediatePropagation(); // Avoid closing the dropdown before animation.
    menuNavigating=true;
    trigger(link,"nav-submenu-click");
    window.setTimeout(()=>window.location.assign(destination),360);
  },true);
  let incoming=null;
  try{
    incoming=sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
  }catch{}
  if(incoming===page){
    const index=page==="store.html"?2:page==="event.html"?3:-1;
    if(index>=0){
      requestAnimationFrame(()=>requestAnimationFrame(()=>trigger(rootLinks[index],"nav-click-reveal")));
    }
  }
})();
