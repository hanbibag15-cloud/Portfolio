(() => {
  "use strict";
  const events=[
    {id:"benefit-factory",type:"promo",category:"앱 프로모션",title:"HOSIGI 앱 혜택공장 이벤트",date:"2026.05.01 시작 · 종료일 미확인",state:"unknown",description:"호식이 앱에서 하루 한 번 참여해 할인 쿠폰이나 메뉴 쿠폰 당첨 여부를 확인하는 이벤트로 소개되었습니다. 현재 운영 여부와 혜택 조건은 확인되지 않았습니다.",source:"보건뉴스 · 2026.04.30"},
    {id:"is-back",type:"promo",category:"앱 프로모션",title:"HOSIGI IS BACK 선착순 쿠폰 이벤트",date:"2026.05.19 보도 · 종료일 미확인",state:"unknown",description:"행사 당시 매일 오후 5시에 선착순으로 1만원, 7천원, 5천원 할인 쿠폰을 제공하는 방식으로 안내되었습니다. 현재 발급 가능 여부는 확인되지 않았습니다.",source:"보건뉴스 · 2026.05.19"},
    {id:"copy-chicken",type:"promo",category:"할인 프로모션",title:"딥블랙갈릭치킨 출시 기념 ‘치킨 복사’",date:"2026.06.29 – 2026.07.05",state:"ended",description:"딥블랙갈릭치킨 이벤트 메뉴 구매 시 후라이드 한 마리를 함께 제공한 행사입니다. 당시 호식이 앱 쿠폰을 통한 선착순 참여 방식으로 운영되었습니다.",source:"스포츠경향 · 2026.06.29"},
    {id:"exam",type:"sns",category:"SNS 이벤트",title:"2026학년도 9월 호식이 모의평가",date:"2026.09.02 – 2026.09.04",state:"ended",description:"2026년 9월 진행된 호식이두마리치킨 SNS 퀴즈 참여 이벤트로, 이벤트 소개 자료에 당첨자 발표일은 9월 8일로 기재되어 있습니다.",source:"슈퍼투데이 이벤트 기록 · 2026.09.02"},
    {id:"coupang",type:"promo",category:"배달 프로모션",title:"쿠팡이츠 7천 원 할인",date:"2026.10.23 – 2026.10.25",state:"ended",description:"리뉴얼 프로젝트의 기존 메인페이지에 소개된 쿠팡이츠 할인 프로모션입니다. 기간이 종료되어 과거 이벤트 사례로 표시합니다.",source:"프로젝트 기존 brand.html 이벤트 콘텐츠"},
    {id:"detective",type:"sns",category:"SNS 이벤트",title:"치킨 범인 맞히기 이벤트",date:"2026.10.14 – 2026.10.16",state:"ended",description:"리뉴얼 프로젝트의 기존 메인페이지에 소개된 SNS 퀴즈형 이벤트입니다. 기간이 종료되어 참여할 수 없는 사례로 정리했습니다.",source:"프로젝트 기존 brand.html 이벤트 콘텐츠"}
  ];
  // Existing main-page artwork; remaining events intentionally use placeholders.
  const eventImages={
    coupang:"img/Event_img01.png",
    detective:"img/Event_img02.png"
  };
  const grid=document.getElementById("event-card-grid");
  const count=document.getElementById("event-count");
  const filters=[...document.querySelectorAll(".event-filter")];
  const statusFilters=[...document.querySelectorAll(".event-status-filter")];
  const notices=[]; // 공식 게시물을 검증한 뒤 등록 (가짜 공지 생성 방지)
  let currentSection="events";
  let currentStatus="all";
  const backdrop=document.getElementById("event-detail-backdrop");
  const closeButton=backdrop.querySelector(".event-detail-close");
  let previousFocus=null;
  const status=event=>event.state==="ended"?"종료":"진행 여부 확인 필요";
  function makeCard(event){
    const article=document.createElement("article");
    article.className="event-list-card";
    const button=document.createElement("button");
    button.type="button";button.className="event-card-open";
    button.setAttribute("aria-label",event.title+" 상세 보기");
    const art=document.createElement("div");
    art.className="event-list-art";
    const addEndOverlay=()=>{
      if(event.state!=="ended")return;
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
    button.addEventListener("click",()=>openDetail(event));
    return article;
  }
  function render(){
    const dataset=currentSection==="events"?events:notices;
    const selected=dataset.filter(entry=>
      currentStatus==="all" ||
      (currentStatus==="active"&&entry.state==="active") ||
      (currentStatus==="ended"&&entry.state==="ended")
    );
    grid.replaceChildren(...selected.map(makeCard));
    const heading=document.getElementById("event-list-title");
    const sectionLabel=currentSection==="events"?"이벤트":"공지사항";
    heading.textContent=(currentStatus==="all"?"전체 ":currentStatus==="active"?"진행중 ":"종료 ")+sectionLabel;
    count.textContent=selected.length+"개의 "+sectionLabel;
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
  function openDetail(event){
    previousFocus=document.activeElement;
    document.getElementById("event-detail-title").textContent=event.title;
    document.getElementById("event-detail-type").textContent=event.category+" · "+status(event);
    document.getElementById("event-detail-date").textContent=event.date;
    document.getElementById("event-detail-description").textContent=event.description;
    document.getElementById("event-detail-source").textContent="자료 기준: "+event.source;
    const poster=backdrop.querySelector(".event-detail-poster");
    poster.replaceChildren();
    if(eventImages[event.id]){
      const image=document.createElement("img");
      image.src=eventImages[event.id];
      image.alt=event.title+" 이벤트 이미지";
      image.addEventListener("error",()=>{
        poster.replaceChildren();
        const label=document.createElement("span");
        label.textContent="EVENT IMAGE";
        poster.append(label);
      },{once:true});
      poster.append(image);
    }else{
      const label=document.createElement("span");
      label.textContent="EVENT IMAGE";
      const tip=document.createElement("small");
      tip.textContent="이미지 교체 영역";
      poster.append(label,tip);
    }
    backdrop.hidden=false;
    document.body.classList.add("event-dialog-open");
    closeButton.focus();
  }
  function closeDetail(){
    backdrop.hidden=true;
    document.body.classList.remove("event-dialog-open");
    previousFocus?.focus();
  }
  filters.forEach(button=>button.addEventListener("click",()=>{
    currentSection=button.dataset.section;
    currentStatus="all";
    render();
  }));
  statusFilters.forEach(button=>button.addEventListener("click",()=>{
    currentStatus=button.dataset.status;
    render();
  }));
  closeButton.addEventListener("click",closeDetail);
  backdrop.addEventListener("click",event=>{if(event.target===backdrop)closeDetail();});
  document.addEventListener("keydown",event=>{
    if(backdrop.hidden)return;
    if(event.key==="Escape")closeDetail();
    if(event.key==="Tab"){
      event.preventDefault();closeButton.focus();
    }
  });
  const toggle=document.querySelector(".header-menu-toggle");
  const header=document.querySelector(".site-header");
  toggle?.addEventListener("click",()=>{
    const opened=header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded",String(opened));
    toggle.setAttribute("aria-label",opened?"메뉴 닫기":"메뉴 열기");
  });
  document.querySelectorAll(".header-nav .has-submenu > a").forEach(link=>{
    link.setAttribute("tabindex","0");
    link.setAttribute("role","button");
    const item=link.closest(".has-submenu");
    const control=()=>{
      const expanded=item.classList.toggle("submenu-open");
      link.setAttribute("aria-expanded",String(expanded));
    };
    link.addEventListener("click",event=>{event.preventDefault();control();});
    link.addEventListener("keydown",event=>{
      if(event.key==="Enter"||event.key===" "){event.preventDefault();control();}
    });
  });
  render();
})();