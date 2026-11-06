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
  // Menu submenu clicks highlight the selected submenu text only.
  const menuSubmenu=nav.querySelector("#mobile-submenu");
  menuSubmenu?.querySelectorAll("a[href]").forEach(link=>{
    link.addEventListener("click",event=>{
      if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      trigger(link,"nav-submenu-click");
      if(reduced.matches)return;
      // Let the click response play before navigating away.
      const destination=link.href;
      if(!destination)return;
      event.preventDefault();
      window.setTimeout(()=>{window.location.href=destination;},260);
    });
  });
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
