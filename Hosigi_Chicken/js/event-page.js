(() => {
  "use strict";
  const {events,notices,eventImages,eventState,koreaToday,orderedEvents,loadOfficialEvents,detailUrl}=window.HosigiEvents;
  const grid=document.getElementById("event-card-grid");
  const count=document.getElementById("event-count");
  const filters=[...document.querySelectorAll(".event-filter")];
  const statusFilters=[...document.querySelectorAll(".event-status-filter")];
  // Curated records from the official site's announcement and news boards.
  // Dates are the dates shown on those boards, not newly invented publication dates.
  // Only announcements with an independently verified official posting date.
  // Verified historic announcements/news from the official boards; internal detail only.
  let currentSection=new URLSearchParams(window.location.search).get("section")==="notices"?"notices":"events";
  let currentStatus="all";
  const pageSize=9;
  let currentPage=1;
  let visibleEventList=[];
  const pagination=document.getElementById("event-pagination");
  const params=new URLSearchParams(location.search);
  const stateKey="hosigi-event-list-v1";
  const readSaved=()=>{try{return JSON.parse(sessionStorage.getItem(stateKey)||"null")}catch{return null}};
  const saved=readSaved();
  let linkedId=null;
  try{if(location.hash.startsWith("#event-"))linkedId=decodeURIComponent(location.hash.slice("#event-".length));}catch{}
  const restoring=!linkedId && (params.get("restore")==="1" || performance.getEntriesByType("navigation")[0]?.type==="back_forward");
  if(restoring && saved){
    currentSection=saved.section==="notices"?"notices":"events";
    currentStatus=["all","active","ended"].includes(saved.status)?saved.status:"all";
    currentPage=Math.max(1,Number(saved.page)||1);
  }
  function saveList(){
    try{sessionStorage.setItem(stateKey,JSON.stringify({section:currentSection,status:currentStatus,page:currentPage,y:window.scrollY}));}catch{}
  }
  function navigate(id,section,trigger,event){
    saveList();
    if(event.detail>0)trigger.blur();
    location.href=detailUrl(id,section);
  }
  function makeCard(event){
    const article=document.createElement("article");
    article.className="event-list-card";
    article.dataset.eventId=event.id;
    const button=document.createElement("button");
    button.type="button";button.className="event-card-open";
    button.setAttribute("aria-label",event.title+" 상세 보기");
    const art=document.createElement("div");
    art.className="event-list-art";
    const addEndOverlay=()=>{
      if(eventState(event)!=="ended")return;
      const overlay=document.createElement("div");
      overlay.className="event-ended-overlay";
      const message=document.createElement("span");
      message.textContent="종료된 이벤트입니다.";
      overlay.append(message);
      art.append(overlay);
    };
    const addPlaceholder=()=>{
      art.replaceChildren();
      const label=document.createElement("span");
      label.className="event-placeholder-label";
      label.textContent="IMAGE PLACEHOLDER";
      const mark=document.createElement("span");
      mark.className="event-placeholder-mark";
      mark.setAttribute("aria-hidden","true");
      mark.textContent="H";
      art.append(mark,label);
      addEndOverlay();
    };
    const imagePath=eventImages[event.id];
    if(imagePath){
      const image=document.createElement("img");
      image.className="event-card-image";
      image.src=imagePath;
      image.alt=event.title+" 이벤트 이미지";
      image.loading="lazy";
      image.decoding="async";
      image.addEventListener("error",addPlaceholder,{once:true});
      art.append(image);
    }else addPlaceholder();
    if(imagePath)addEndOverlay();
    const info=document.createElement("div");info.className="event-list-info";
    const cat=document.createElement("span");cat.className="event-list-category";cat.textContent=event.category;
    const title=document.createElement("h4");title.textContent=event.title;
    const dates=document.createElement("p");dates.className="event-list-date";dates.textContent=event.date;
    info.append(cat,title,dates);
    button.append(art,info);
    article.append(button);
    button.addEventListener("click",click=>navigate(event.id,"events",button,click));
    return article;
  }
  function makeNoticeRow(notice){
    const article=document.createElement("article");
    article.className="event-notice-row";
    const button=document.createElement("button");
    button.type="button";
    button.className="event-notice-open";
    button.setAttribute("aria-label",notice.title+" 자세히 보기");
    const tag=document.createElement("span");tag.className="event-notice-category";tag.textContent=notice.category;
    const title=document.createElement("strong");title.className="event-notice-title";title.textContent=notice.title;
    const date=document.createElement("time");date.className="event-notice-date";date.dateTime=notice.startDate;date.textContent=notice.date;
    button.append(tag,title,date);
    button.addEventListener("click",click=>navigate(notice.id,"notices",button,click));
    article.append(button);return article;
  }
  function render(){
    const dataset=currentSection==="events"?events:notices;
    // Newest event start date first in every category.
    // Legacy entries use YYYY.MM.DD text; normalize it to YYYY-MM-DD
    // so they sort correctly alongside entries with startDate.
    const ordered=orderedEvents(dataset);
    const selected=currentSection==="notices" ? ordered : ordered.filter(entry=>
      currentStatus==="all" ||
      (currentStatus==="active"&&eventState(entry)==="active") ||
      (currentStatus==="ended"&&eventState(entry)==="ended")
    );
    const totalPages=Math.ceil(selected.length/pageSize);
    currentPage=Math.min(Math.max(currentPage,1),Math.max(totalPages,1));
    const firstIndex=(currentPage-1)*pageSize;
    const visible=selected.slice(firstIndex,firstIndex+pageSize);
    visibleEventList=selected;
    // Use only the visible cards' natural height on every page.
    // No artificial minimum height or spacer between pagination and footer.
    grid.style.minHeight="";
    grid.classList.toggle("is-notice-list",currentSection==="notices");
    grid.replaceChildren(...visible.map(currentSection==="notices"?makeNoticeRow:makeCard));
    pagination.hidden=totalPages<=1;
    // Preserve the same pagination button elements while switching pages.
    // Removing the focused button makes browsers auto-scroll to a new anchor.
    if(totalPages>1){
      if(pagination.dataset.pageCount!==String(totalPages)){
        pagination.replaceChildren();
        const addButton=(label,kind)=>{
          const button=document.createElement("button");
          button.type="button";
          button.className="event-page-button event-page-"+kind;
          if(kind==="arrow"){
            const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
            svg.setAttribute("viewBox","0 0 24 24");
            svg.setAttribute("fill","none");
            svg.setAttribute("stroke","currentColor");
            svg.setAttribute("stroke-width","2");
            svg.setAttribute("stroke-linecap","round");
            svg.setAttribute("stroke-linejoin","round");
            svg.setAttribute("aria-hidden","true");
            const path=document.createElementNS("http://www.w3.org/2000/svg","path");
            path.setAttribute("d",label==="prev"?"M15 6l-6 6 6 6":"M9 6l6 6-6 6");
            svg.append(path);
            button.append(svg);
          }else button.textContent=label;
          pagination.append(button);
        };
        addButton("prev","arrow");
        for(let page=1;page<=totalPages;page++)addButton(String(page),"number");
        addButton("next","arrow");
        pagination.dataset.pageCount=String(totalPages);
      }
      const buttons=[...pagination.querySelectorAll("button")];
      buttons.forEach((button,index)=>{
        const isArrow=index===0||index===buttons.length-1;
        const page=index===0?currentPage-1:
          index===buttons.length-1?currentPage+1:index;
        const active=!isArrow&&page===currentPage;
        button.dataset.page=String(page);
        button.disabled=isArrow&&(page<1||page>totalPages);
        button.classList.toggle("is-active",active);
        if(active)button.setAttribute("aria-current","page");
        else button.removeAttribute("aria-current");
        button.setAttribute("aria-label",
          index===0?"이전 페이지":
          index===buttons.length-1?"다음 페이지":page+"페이지");
      });
    }
    const heading=document.getElementById("event-list-title");
    const sectionLabel=currentSection==="events"?"이벤트":"공지사항";
    heading.textContent=currentSection==="notices"?"전체 공지사항":(currentStatus==="all"?"전체 ":currentStatus==="active"?"진행중 ":"종료 ")+sectionLabel;
    count.textContent=selected.length+"개의 "+sectionLabel;
    const statusGroup=document.querySelector(".event-status-filters");
    statusGroup.hidden=currentSection==="notices";
    if(!selected.length){
      const empty=document.createElement("div");
      empty.className="event-empty";
      const title=document.createElement("strong");
      const copy=document.createElement("p");
      if(currentSection==="notices"){
        title.textContent="현재 등록된 공지사항이 없습니다.";
        copy.textContent="공식 게시물이 확인되면 이곳에 안내할 예정입니다.";
      }else if(currentStatus==="active"){
        title.textContent="현재 확인된 진행중 이벤트가 없습니다.";
        copy.textContent="진행 여부가 공식 확인된 이벤트만 이 카테고리에 표시합니다.";
      }else{
        title.textContent="해당하는 이벤트가 없습니다.";
        copy.textContent="다른 카테고리를 선택해 주세요.";
      }
      empty.append(title,copy);
      grid.append(empty);
    }
    filters.forEach(button=>{
      const active=button.dataset.section===currentSection;
      button.classList.toggle("is-active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    statusFilters.forEach(button=>{
      const active=button.dataset.status===currentStatus;
      button.classList.toggle("is-active",active);
      button.setAttribute("aria-pressed",String(active));
    });
  }
  filters.forEach(button=>button.addEventListener("click",()=>{
    currentSection=button.dataset.section;
    currentStatus="all";
    currentPage=1;
    render();
  }));
  statusFilters.forEach(button=>button.addEventListener("click",()=>{
    currentStatus=button.dataset.status;
    currentPage=1;
    render();
  }));
  // Keep mouse clicks from focusing a control which moves vertically
  // when a short last page is replaced with a full page.
  pagination.addEventListener("pointerdown",event=>{
    if(event.pointerType==="mouse" && event.target.closest("button[data-page]")){
      event.preventDefault();
    }
  });
  pagination.addEventListener("click",event=>{
    const button=event.target.closest("button[data-page]");
    if(!button||button.disabled)return;
    const page=Number(button.dataset.page);
    if(!Number.isInteger(page)||page<1||page===currentPage)return;

    // Capture document position before replacing cards. Scroll anchoring can
    // otherwise follow the pagination/footer when page 3 grows to page 2.
    const scrollTop=window.scrollY;
    const root=document.documentElement;
    const previousBehavior=root.style.scrollBehavior;
    root.style.scrollBehavior="auto";
    currentPage=page;
    render();
    const restore=()=>{
      if(Math.abs(window.scrollY-scrollTop)>0.5){
        window.scrollTo({top:scrollTop,behavior:"instant"});
      }
    };
    restore();
    requestAnimationFrame(()=>{
      restore();
      root.style.scrollBehavior=previousBehavior;
    });
  });
  const toggle=document.querySelector(".header-menu-toggle");
  const header=document.querySelector(".site-header");
  toggle?.addEventListener("click",()=>{
    const opened=header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded",String(opened));
    toggle.setAttribute("aria-label",opened?"메뉴 닫기":"메뉴 열기");
  });
  const nav=document.querySelector(".header-nav");
  const submenuParents=[...nav.querySelectorAll(".has-submenu")];
  const desktopNav=window.matchMedia("(min-width:1025px)");
  const closeSubmenus=()=>{
    submenuParents.forEach(item=>{
      item.classList.remove("submenu-open");
      item.querySelector(":scope > a")?.setAttribute("aria-expanded","false");
    });
  };
  submenuParents.forEach(item=>{
    const link=item.querySelector(":scope > a");
    link.setAttribute("tabindex","0");
    link.setAttribute("role","button");
    link.addEventListener("click",event=>{
      event.preventDefault();
      if(desktopNav.matches){
        // Desktop dropdowns are hover-driven; a click must not pin them open.
        closeSubmenus();
        item.classList.add("submenu-dismissed");
        link.blur();
      }else{
        const shouldOpen=!item.classList.contains("submenu-open");
        closeSubmenus();
        item.classList.toggle("submenu-open",shouldOpen);
        link.setAttribute("aria-expanded",String(shouldOpen));
      }
    });
    item.addEventListener("mouseleave",()=>{
      item.classList.remove("submenu-dismissed");
      if(desktopNav.matches)closeSubmenus();
    });
    item.addEventListener("focusout",event=>{
      if(item.contains(event.relatedTarget))return;
      if(desktopNav.matches)closeSubmenus();
    });
  });
  nav.querySelectorAll(":scope > ul > li:not(.has-submenu) > a").forEach(link=>{
    link.addEventListener("click",closeSubmenus);
    link.addEventListener("mouseenter",()=>{
      if(desktopNav.matches)closeSubmenus();
    });
  });
  document.addEventListener("pointerdown",event=>{
    if(!nav.contains(event.target))closeSubmenus();
  });
  document.addEventListener("keydown",event=>{
    if(event.key==="Escape"){
      closeSubmenus();
      if(nav.contains(document.activeElement))document.activeElement.blur();
    }
  });
  desktopNav.addEventListener("change",()=>{
    closeSubmenus();
    submenuParents.forEach(item=>item.classList.remove("submenu-dismissed"));
  });
  function restoreScroll(){
    if(!restoring||!saved)return;
    window.scrollTo({top:Math.max(0,Number(saved.y)||0),behavior:"instant"});
  }
  async function initializeList(){
    if(!linkedId){
      render();
      restoreScroll();
      await loadOfficialEvents();
      if(currentSection==="events"){render();restoreScroll();}
      return;
    }
    // Resolve against the same merged dataset and sort order used by pagination.
    currentSection="events";
    currentStatus="all";
    currentPage=1;
    render();
    await loadOfficialEvents();
    const ordered=orderedEvents(events);
    const index=ordered.findIndex(item=>item.id===linkedId);
    if(index<0){render();return;}
    const item=ordered[index];
    if(eventState(item)!=="ended"){
      location.replace(detailUrl(item.id));
      return;
    }
    currentSection="events";
    currentStatus="all";
    currentPage=Math.floor(index/pageSize)+1;
    render();
    // Remove the consumed deep link so a later list return does not retrigger it.
    history.replaceState(history.state,"",location.pathname+location.search);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const card=[...grid.querySelectorAll(".event-list-card")].find(node=>node.dataset.eventId===item.id);
      if(!card)return;
      const header=document.querySelector(".site-header");
      const headerBottom=Math.max(0,header?.getBoundingClientRect().bottom||0);
      const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
      const gap=20;
      // Center within the usable viewport below the fixed header. Tall cards
      // align below the header instead of clipping their top.
      const usable=Math.max(1,innerHeight-headerBottom-2*gap);
      const tall=card.getBoundingClientRect().height>usable;
      const root=document.documentElement;
      const previousPadding=root.style.scrollPaddingTop;
      root.style.scrollPaddingTop=(headerBottom+gap)+"px";
      card.scrollIntoView({block:tall?"start":"center",inline:"nearest",behavior:reduced?"instant":"smooth"});
      root.style.scrollPaddingTop=previousPadding;

      // Wait for actual scroll settling; the timeout is only a safety bound.
      // No focus is moved, so mouse/keyboard hover states stay independent.
      let frame=0,still=0,lastY=window.scrollY,started=performance.now(),done=false;
      let cleanupTimer=0;
      const clear=()=>{card.classList.remove("event-deep-link-highlight");clearTimeout(cleanupTimer);card.removeEventListener("animationend",onAnimationEnd);window.removeEventListener("pagehide",cancel);};
      const onAnimationEnd=e=>{if(e.target===card&&e.animationName==="hosigi-product-arrival")clear();};
      const cancel=()=>{done=true;cancelAnimationFrame(frame);clear();};
      window.addEventListener("pagehide",cancel,{once:true});
      const highlight=()=>{
        if(done)return;done=true;
        if(!card.isConnected||reduced){clear();return;}
        card.classList.add("event-deep-link-highlight");
        card.addEventListener("animationend",onAnimationEnd);
        cleanupTimer=window.setTimeout(clear,1850);
      };
      const check=now=>{
        if(done)return;
        if(!card.isConnected){cancel();return;}
        const y=window.scrollY;
        still=Math.abs(y-lastY)<.5?still+1:0;
        lastY=y;
        if((now-started>=180&&still>=8)||now-started>=2200){highlight();return;}
        frame=requestAnimationFrame(check);
      };
      frame=requestAnimationFrame(check);
    }));
  }
  void initializeList();
  window.addEventListener("pageshow",event=>{
    if(event.persisted){
      const active=document.activeElement;
      if(active?.matches(".event-card-open:not(:focus-visible)"))active.blur();
    }
  });
  let lastDay=koreaToday();
  const refreshStatus=()=>{
    const today=koreaToday();
    if(today!==lastDay){lastDay=today;if(currentSection==="events")render();}
  };
  setInterval(refreshStatus,60000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)refreshStatus();});
})();