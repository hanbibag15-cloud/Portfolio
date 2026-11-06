/* GNB indicator movement shared by brand, menu, store and event.
   Stores only a menu index (not personal data) for a one-time cross-page sweep. */
(() => {
  const nav=document.querySelector(".header-nav");
  if(!nav)return;
  const links=[...nav.querySelectorAll(":scope > ul > li > a")];
  if(links.length<4)return;
  const desktop=window.matchMedia("(min-width:1025px)");
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const page=location.pathname.split("/").pop();
  const key="hosigi-nav-from";
  const line=document.createElement("span");
  line.className="nav-motion-line";
  line.setAttribute("aria-hidden","true");
  nav.append(line);
  let active=-1;
  let initialized=false;
  const currentIndex=()=>links.findIndex(link=>link.classList.contains("is-current"));
  const getPrevious=()=>{
    try{
      const raw=sessionStorage.getItem(key);
      sessionStorage.removeItem(key);
      if(raw===null)return -1;
      const id=Number(raw);
      return Number.isInteger(id)&&id>=0&&id<links.length?id:-1;
    }catch{return -1;}
  };
  const savePrevious=index=>{
    try{sessionStorage.setItem(key,String(index));}catch{}
  };
  const pos=index=>{
    const target=links[index];
    if(!target)return null;
    const navRect=nav.getBoundingClientRect(),r=target.getBoundingClientRect();
    const bottom=parseFloat(getComputedStyle(target,"::after").bottom)||-18;
    return {left:r.left-navRect.left,width:r.width,top:r.bottom-navRect.top-bottom-3};
  };
  const place=(index,animate=true)=>{
    if(index<0||!desktop.matches){line.style.opacity="0";return;}
    const p=pos(index);
    if(!p)return;
    line.style.transitionDuration=animate&&!reduced.matches?"":"0s";
    line.style.top=p.top+"px";
    line.style.width=p.width+"px";
    line.style.transform="translateX("+p.left+"px)";
    line.style.opacity="1";
  };
  const refresh=()=>{
    active=currentIndex();
    place(active,false);
  };
  const setUp=()=>{
    if(!desktop.matches){nav.classList.remove("has-motion");line.style.opacity="0";return;}
    nav.classList.add("has-motion");
    active=currentIndex();
    if(!initialized){
      initialized=true;
      const previous=getPrevious();
      if(active>=0 && previous>=0 && previous!==active && !reduced.matches){
        place(previous,false);
        requestAnimationFrame(()=>requestAnimationFrame(()=>place(active,true)));
      }else if(active>=0){
        // From no previous selection, softly introduce the underline.
        place(active,false);
        if(!reduced.matches){
          line.style.opacity="0";
          requestAnimationFrame(()=>requestAnimationFrame(()=>{line.style.transitionDuration="";line.style.opacity="1";}));
        }
      }
    }else place(active,false);
  };
  // Only an actual navigation click moves the underline. Pointer hover and
  // keyboard focus keep the underline at the current page/section.
  links.forEach((link,index)=>{
    link.addEventListener("click",()=>{
      const href=link.getAttribute("href");
      if(!href || href==="#" || href.startsWith("javascript:"))return;
      // Restore the previous menu position after loading the destination page.
      if(!href.startsWith("#")){
        const origin=currentIndex();
        savePrevious(origin>=0?origin:index);
      }
      // On the current page, animate immediately on click; after navigation,
      // the destination page animates from the saved previous position.
      place(index,true);
    });
  });
  nav.querySelectorAll(".header-submenu a[href]").forEach(link=>{
    link.addEventListener("click",()=>{
      const parent=link.closest(".has-submenu");
      const index=links.findIndex(top=>top.parentElement===parent);
      if(index<0)return;
      const href=link.getAttribute("href");
      if(href && !href.startsWith("#")){
        const origin=currentIndex();
        savePrevious(origin>=0?origin:index);
      }
      place(index,true);
    });
  });
  const observer=new MutationObserver(records=>{
    if(records.some(record=>record.attributeName==="class" && links.includes(record.target))){
      refresh();
    }
  });
  links.forEach(link=>observer.observe(link,{attributes:true,attributeFilter:["class"]}));
  desktop.addEventListener("change",setUp);
  window.addEventListener("resize",()=>{if(desktop.matches)place(currentIndex(),false);},{passive:true});
  window.addEventListener("pageshow",()=>{if(desktop.matches)refresh();});
  setUp();
})();
