/* Header behavior for the STORE subpage; same responsive breakpoint as main.css. */
(() => {
  const header=document.querySelector(".site-header");
  const toggle=document.querySelector(".header-menu-toggle");
  const items=[...document.querySelectorAll(".header-nav .has-submenu")];
  if(!header || !toggle)return;
  const mobile=()=>window.matchMedia("(max-width: 1024px)").matches;
  const closeSubmenus=()=>{
    for(const item of items){
      item.classList.remove("submenu-open");
      item.querySelector(":scope > a")?.setAttribute("aria-expanded","false");
    }
  };
  const closeMenu=()=>{
    header.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded","false");
    toggle.setAttribute("aria-label","메뉴 열기");
    closeSubmenus();
  };
  toggle.addEventListener("click",()=>{
    const open=header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open?"메뉴 닫기":"메뉴 열기");
    if(!open)closeSubmenus();
  });
  for(const item of items){
    const trigger=item.querySelector(":scope > a");
    if(!trigger)return;
    trigger.setAttribute("role","button");
    trigger.setAttribute("tabindex","0");
    const activate=()=>{
      if(!mobile())return;
      const open=!item.classList.contains("submenu-open");
      closeSubmenus();
      item.classList.toggle("submenu-open",open);
      trigger.setAttribute("aria-expanded",String(open));
    };
    trigger.addEventListener("click",event=>{
      // EVENT is a real page link, even though it also has a hover submenu.
      // Do not cancel navigation to event.html.
      if(item.classList.contains("event-nav-item"))return;
      event.preventDefault();
      if(!mobile()){
        // The desktop dropdown is hover-driven. Clicking an <a> leaves it
        // focused, which otherwise keeps CSS :focus-within open after mouseleave.
        // Clear only pointer-click focus; keyboard focus behavior stays intact.
        if(event.detail>0)trigger.blur();
        return;
      }
      activate();
    });
    trigger.addEventListener("keydown",event=>{
      if(item.classList.contains("event-nav-item"))return;
      if(event.key==="Enter"||event.key===" "){event.preventDefault();activate();}
    });
    item.addEventListener("mouseleave",()=>{
      if(!mobile())trigger.setAttribute("aria-expanded","false");
    });
  }
  document.querySelectorAll(".header-nav .header-submenu a").forEach(link=>link.addEventListener("click",closeMenu));
  window.addEventListener("resize",()=>{if(!mobile())closeMenu();});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu();});
})();
