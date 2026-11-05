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
  const grid=document.getElementById("event-card-grid");
  const count=document.getElementById("event-count");
  const filters=[...document.querySelectorAll(".event-filter")];
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
    const label=document.createElement("span");label.className="event-placeholder-label";label.textContent="IMAGE PLACEHOLDER";
    const mark=document.createElement("span");mark.className="event-placeholder-mark";mark.setAttribute("aria-hidden","true");mark.textContent="H";
    const state=document.createElement("span");state.className="event-status"+(event.state==="ended"?" is-ended":"");state.textContent=status(event);
    art.append(mark,label,state);
    const info=document.createElement("div");info.className="event-list-info";
    const cat=document.createElement("span");cat.className="event-list-category";cat.textContent=event.category;
    const title=document.createElement("h4");title.textContent=event.title;
    const dates=document.createElement("p");dates.className="event-list-date";dates.textContent=event.date;
    const action=document.createElement("span");action.className="event-list-action";action.textContent="자세히 보기 →";
    info.append(cat,title,dates,action);button.append(art,info);article.append(button);
    button.addEventListener("click",()=>openDetail(event));
    return article;
  }
  function render(filter){
    const selected=events.filter(event=>filter==="all"||event.type===filter||(filter==="ended"&&event.state==="ended"));
    grid.replaceChildren(...selected.map(makeCard));
    count.textContent=selected.length+"개의 이벤트";
    filters.forEach(button=>{
      const active=button.dataset.filter===filter;
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
    backdrop.hidden=false;
    document.body.classList.add("event-dialog-open");
    closeButton.focus();
  }
  function closeDetail(){
    backdrop.hidden=true;
    document.body.classList.remove("event-dialog-open");
    previousFocus?.focus();
  }
  filters.forEach(button=>button.addEventListener("click",()=>render(button.dataset.filter)));
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
  render("all");
})();