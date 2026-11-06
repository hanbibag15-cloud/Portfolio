(() => {
  "use strict";
  const events=[
    {"id":"autumn-tour","type":"sns","category":"SNS 이벤트","title":"호식이 단풍 투어 댓글 이벤트","date":"2026.11.03 – 2026.11.06","startDate":"2026-11-03","endDate":"2026-11-06","state":"active","description":"호식이 공식 인스타그램 계정 hosigi1999가 11월 3일 공개한 이벤트입니다. 팔로우·좋아요 후 가고 싶은 여행지를 댓글로 남기면 추첨을 통해 30명에게 치킨 세트를 제공합니다. 11월 6일 마감으로 안내됐으며, 참여 전 원문에서 마감 시각을 확인하세요.","source":"공식 인스타그램 게시물 인용 · 돈좀요 2026.11.03","sourceUrl":"https://donzomyo.kr/events/event-701d853be3ea024493f7fb99"},
    {"id":"ddangyo-discount","type":"promo","category":"배달앱 할인","title":"땡겨요 호식이 7천 원 할인","date":"2026.11.05 확인 – 2026.11.30","startDate":"2026-11-05","endDate":"2026-11-30","state":"active","description":"외부 할인정보 집계 사이트가 11월 5일 기준 땡겨요 7,000원 할인, 최소주문 21,000원, 11월 30일 종료 예정으로 안내했습니다. 호식이 공식 공지가 아닌 외부 집계 정보이므로 적용 지역·매장·쿠폰 소진·변경 여부를 반드시 배달앱에서 확인해야 합니다.","source":"주문의고수 외부 집계 · 2026.11.05","sourceUrl":"https://www.jumungosu.com/hosigi-discount"},
    {"id":"yogiyo-discount","type":"promo","category":"배달앱 할인","title":"요기요 호식이 5천 원 할인","date":"2026.11.05 확인 – 2026.11.08","startDate":"2026-11-05","endDate":"2026-11-08","state":"active","description":"외부 할인정보 집계 사이트에 따르면 11월 5일 기준 요기요 5,000원 할인, 최소주문 21,000원, 11월 8일까지로 표시돼 있습니다. 호식이 공식 공지가 아닌 외부 집계 정보이며, 매장이나 주문 조건에 따라 실제 적용되지 않을 수 있습니다.","source":"주문의고수 외부 집계 · 2026.11.05","sourceUrl":"https://www.jumungosu.com/hosigi-discount"},
    {"id":"coupang-nov-discount","type":"promo","category":"배달앱 할인","title":"쿠팡이츠 호식이 5천 원 할인","date":"2026.11.05 확인 – 2026.11.08","startDate":"2026-11-05","endDate":"2026-11-08","state":"active","description":"외부 할인정보 집계 사이트에 따르면 11월 5일 기준 쿠팡이츠 5,000원 할인, 최소주문 21,000원, 11월 8일까지로 안내됩니다. 15시 선착순 등 별도 조건이 있을 수 있으며 호식이 공식 공지가 아닌 집계 정보입니다. 주문 전에 앱에서 실제 쿠폰 조건을 확인하세요.","source":"주문의고수 외부 집계 · 2026.11.05","sourceUrl":"https://www.jumungosu.com/hosigi-discount"},
    {"id":"autumn-excuse","type":"sns","category":"SNS 이벤트","title":"가을은 핑계고 댓글 이벤트","date":"2026.10.28 – 2026.10.30","startDate":"2026-10-28","endDate":"2026-10-30","state":"ended","description":"공식 인스타그램 계정에서 진행한 가을 댓글 참여 이벤트. 팔로우·좋아요 및 댓글 참여자를 대상으로 치킨 세트를 추첨 증정한 행사입니다. 11월 5일 당첨 발표 예정으로 기록돼 있습니다.","source":"돈좀요 · 2026.10.30 마감","sourceUrl":"https://donzomyo.kr/events/event-033ec223f9dd8e1ffd40a369"},
    {"id":"oct-hangeul","type":"sns","category":"SNS 이벤트","title":"우리말 치킨 이름 댓글 이벤트","date":"2026.10.09 – 2026.10.11","startDate":"2026-10-09","endDate":"2026-10-11","state":"ended","description":"한글 관련 댓글 이벤트. 팔로우·좋아요 후 우리말로 치킨 이름을 댓글로 남기는 방식이며 20명에게 딥블랙갈릭치킨과 체다마요 감자튀김 세트를 증정하는 행사로 정리돼 있습니다.","source":"이벤트 응모 기록 · 2026.10.10","sourceUrl":"https://drawvote.tistory.com/96"},
    {"id":"deep-defense","type":"sns","category":"SNS 이벤트","title":"딥크 변호인 모집 이벤트","date":"2026.09.14 – 2026.09.16","startDate":"2026-09-14","endDate":"2026-09-16","state":"ended","description":"딥블랙갈릭치킨 캐릭터를 위한 변호 번호와 한마디를 댓글로 남기는 공식 인스타그램 이벤트. 추첨 20명에게 치킨 세트 증정.","source":"슈퍼투데이 · 2026.09.14","sourceUrl":"https://www.suto.co.kr/cpevent/653398"},
    {"id":"favorite-menu","type":"sns","category":"SNS 이벤트","title":"최애 호식이 메뉴에게 한마디","date":"2026.08.26 – 2026.08.28","startDate":"2026-08-26","endDate":"2026-08-28","state":"ended","description":"공식 SNS에서 좋아하는 호식이 메뉴에게 하고 싶은 말을 댓글로 남기는 이벤트. 추첨 20명에게 딥블랙갈릭치킨과 체다마요 감자튀김 세트를 제공한 행사입니다.","source":"슈퍼투데이 · 2026.08.26","sourceUrl":"https://www.suto.co.kr/cpevent/650005"},
    {"id":"research-comment","type":"sns","category":"SNS 이벤트","title":"딥블랙갈릭치킨 연구 결과 댓글 이벤트","date":"2026.08.19 – 2026.08.21","startDate":"2026-08-19","endDate":"2026-08-21","state":"ended","description":"딥블랙갈릭치킨을 한마디로 표현하는 연구 결과를 댓글에 남기는 이벤트. 팔로우·좋아요와 댓글로 참여하며 치킨 세트 경품이 안내됐습니다.","source":"슈퍼투데이 · 2026.08.19","sourceUrl":"https://www.suto.co.kr/cpevent/648958"},
    {"id":"who-ate","type":"sns","category":"SNS 이벤트","title":"딥블랙갈릭치킨은 누가 먹었을까요?","date":"2026.08.12 – 2026.08.14","startDate":"2026-08-12","endDate":"2026-08-14","state":"ended","description":"딥블랙갈릭치킨을 먹은 캐릭터를 맞히는 공식 SNS 댓글 이벤트. 추첨 20명에게 치킨 세트가 제공됐습니다.","source":"슈퍼투데이 · 2026.08.12","sourceUrl":"https://www.suto.co.kr/cpevent/647876"},
    {"id":"manyong","type":"sns","category":"SNS 이벤트","title":"마뇽이 레벨업 이유 맞히기","date":"2026.06.24 – 2026.06.26","startDate":"2026-06-24","endDate":"2026-06-26","state":"ended","description":"딥블랙갈릭치킨을 먹고 달라진 캐릭터 마뇽이의 이유를 댓글로 맞히는 퀴즈. 추첨 20명에게 치킨 세트를 증정했습니다.","source":"슈퍼투데이 · 2026.06.24","sourceUrl":"https://www.suto.co.kr/cpevent/640061"},
    {"id":"early-bird","type":"promo","category":"앱 프로모션","title":"딥블랙 얼리어닭터 출석 이벤트","date":"2026.06.01 – 2026.06.16","startDate":"2026-06-01","endDate":"2026-06-16","state":"ended","description":"호식이 공식 앱에서 10일 출석 달성 시 5,000원 할인권을 제공하고, 추첨 200명에게 신메뉴 출시일에 사용할 수 있는 딥블랙갈릭치킨 쿠폰을 제공한 행사입니다.","source":"파이낸셜투데이 · 2026.06.01","sourceUrl":"https://www.ftimes.kr/news/articleViewAmp.html?idxno=37762"},
    {"id":"deep-lucky","type":"promo","category":"앱 프로모션","title":"DEEP BLACK LUCKY DRAW","date":"2026.06.01 – 2026.06.30","startDate":"2026-06-01","endDate":"2026-06-30","state":"ended","description":"6월 한 달간 호식이 앱에서 23,000원 이상 구매한 고객을 대상으로 추첨 100명에게 신메뉴 치킨 쿠폰을 증정하는 행사로 소개됐습니다.","source":"파이낸셜투데이 · 2026.06.01","sourceUrl":"https://www.ftimes.kr/news/articleViewAmp.html?idxno=37762"},
    {"id":"zero-raid","type":"promo","category":"앱 프로모션","title":"0원 습격사건 무료 치킨 타임","date":"2026.03.30 – 2026.04.05","startDate":"2026-03-30","endDate":"2026-04-05","state":"ended","description":"호식이 앱 출시 기념. 3월 30일부터 4월 5일까지 매일 오후 8시 푸시 알림 수신 고객 대상으로 무료 치킨 및 쿠폰을 선착순 제공한 행사입니다.","source":"대한뉴스 · 2026.03.30","sourceUrl":"https://www.dhnews.co.kr/news/view/1065601128816138"},
    {"id":"free-year","type":"promo","category":"앱 프로모션","title":"치킨 1년 무료 이용권 추첨","date":"2026.03.30 – 2026.04.30","startDate":"2026-03-30","endDate":"2026-04-30","state":"ended","description":"호식이 앱에서 기간 내 25,000원 이상 구매 고객 자동 응모. 1등 1년, 2등 3개월, 3등 1마리 치킨 교환권을 증정한 행사입니다.","source":"대한뉴스 · 2026.03.30","sourceUrl":"https://www.dhnews.co.kr/news/view/1065601128816138"},
    {"id":"guerrilla","type":"promo","category":"앱 프로모션","title":"4월 치킨 게릴라 타임","date":"2026.04.06 발표 – 2026.04.30","startDate":"2026-04-06","endDate":"2026-04-30","state":"ended","description":"4월 한 달간 매주 월·수·금 임의 시간에 앱 푸시로 치킨 쿠폰을 선착순 제공. 월요일 맵시크, 수요일 간장, 금요일 깐쇼킹 치킨으로 소개됐습니다.","source":"스마트투데이 · 2026.04.06","sourceUrl":"https://www.smarttoday.co.kr/ko-kr/articles/106207"},
    {"id":"ending-quiz","type":"sns","category":"SNS 이벤트","title":"TVCF 엔딩 메뉴 맞히기","date":"2026.02.09 – 2026.02.26","startDate":"2026-02-09","endDate":"2026-02-26","state":"ended","description":"TVCF 엔딩에 등장한 두 메뉴 이름을 맞히는 인스타그램 퀴즈 이벤트. 정답자 중 추첨으로 기프티콘을 증정했으며 광고 캡처 스토리 공유 보너스 이벤트도 진행했습니다.","source":"슈퍼투데이 · 2026.02.09","sourceUrl":"https://www.suto.co.kr/cpevent/618102"},
    {id:"copy-chicken",type:"promo",category:"할인 프로모션",title:"딥블랙갈릭치킨 출시 기념 ‘치킨 복사’",date:"2026.06.29 – 2026.07.05",state:"ended",description:"딥블랙갈릭치킨 이벤트 메뉴 구매 시 후라이드 한 마리를 함께 제공한 행사입니다. 당시 호식이 앱 쿠폰을 통한 선착순 참여 방식으로 운영되었습니다.",source:"스포츠경향 · 2026.06.29"},
    {id:"exam",type:"sns",category:"SNS 이벤트",title:"2026학년도 9월 호식이 모의평가",date:"2026.09.02 – 2026.09.04",state:"ended",description:"2026년 9월 진행된 호식이두마리치킨 SNS 퀴즈 참여 이벤트로, 이벤트 소개 자료에 당첨자 발표일은 9월 8일로 기재되어 있습니다.",source:"슈퍼투데이 이벤트 기록 · 2026.09.02"},
    {id:"coupang",type:"promo",category:"배달앱 할인",title:"쿠팡이츠 7천 원 할인",date:"2026.10.23 – 2026.10.25",state:"ended",description:"리뉴얼 프로젝트의 기존 메인페이지에 소개된 쿠팡이츠 할인 프로모션입니다. 기간이 종료되어 과거 이벤트 사례로 표시합니다.",source:"프로젝트 기존 brand.html 이벤트 콘텐츠"},
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
  const pageSize=9;
  let currentPage=1;
  const pagination=document.getElementById("event-pagination");
  const listSection=document.getElementById("event-list");
  const backdrop=document.getElementById("event-detail-backdrop");
  const closeButton=backdrop.querySelector(".event-detail-close");
  let previousFocus=null;
  // Status is evaluated in Seoul time on each render, so an expired event
  // automatically moves to the ended tab without a manual deployment.
  const koreaToday=()=>{
    const parts=new Intl.DateTimeFormat("en-CA",{
      timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"
    }).formatToParts(new Date());
    const value=type=>parts.find(part=>part.type===type)?.value;
    return value("year")+"-"+value("month")+"-"+value("day");
  };
  const eventState=(event,today=koreaToday())=>{
    if(event.endDate){
      if(today>event.endDate)return "ended";
      if(event.startDate && today<event.startDate)return "upcoming";
      return "active";
    }
    return event.state;
  };
  const status=event=>({
    active:"진행중",ended:"종료",unknown:"진행 여부 확인 필요",
    upcoming:"예정"
  })[eventState(event)];
  function makeCard(event){
    const article=document.createElement("article");
    article.className="event-list-card";
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
    button.addEventListener("click",()=>openDetail(event));
    return article;
  }
  function render(){
    const dataset=currentSection==="events"?events:notices;
    // Newest event start date first in every category.
    // Legacy entries use YYYY.MM.DD text; normalize it to YYYY-MM-DD
    // so they sort correctly alongside entries with startDate.
    const toISO=event=>{
      if(event.startDate)return event.startDate;
      const match=(event.date||"").match(/(20\d{2})[.-](\d{1,2})[.-](\d{1,2})/);
      return match
        ? match[1]+"-"+match[2].padStart(2,"0")+"-"+match[3].padStart(2,"0")
        : "0000-00-00";
    };
    const ordered=[...dataset].sort((a,b)=>{
      const byStart=toISO(b).localeCompare(toISO(a));
      if(byStart)return byStart;
      const byEnd=(b.endDate||"").localeCompare(a.endDate||"");
      return byEnd || a.title.localeCompare(b.title,"ko");
    });
    const selected=ordered.filter(entry=>
      currentStatus==="all" ||
      (currentStatus==="active"&&eventState(entry)==="active") ||
      (currentStatus==="ended"&&eventState(entry)==="ended")
    );
    const totalPages=Math.ceil(selected.length/pageSize);
    currentPage=Math.min(Math.max(currentPage,1),Math.max(totalPages,1));
    const firstIndex=(currentPage-1)*pageSize;
    const visible=selected.slice(firstIndex,firstIndex+pageSize);
    grid.replaceChildren(...visible.map(makeCard));
    pagination.replaceChildren();
    pagination.hidden=totalPages<=1;
    if(totalPages>1){
      const addButton=(label,page,kind,disabled=false)=>{
        const button=document.createElement("button");
        button.type="button";
        button.className="event-page-button event-page-"+kind;
        button.textContent=label;
        button.setAttribute("aria-label",kind==="number"?page+"페이지":label==="◀"?"이전 페이지":"다음 페이지");
        if(kind==="number"&&page===currentPage){
          button.classList.add("is-active");
          button.setAttribute("aria-current","page");
        }
        button.disabled=disabled;
        button.addEventListener("click",()=>{
          if(page===currentPage)return;
          currentPage=page;
          render();
          const headerHeight=document.querySelector(".site-header")?.getBoundingClientRect().height||0;
          const top=window.scrollY+listSection.getBoundingClientRect().top-headerHeight-20;
          window.scrollTo({top:Math.max(0,top),behavior:"smooth"});
        });
        pagination.append(button);
      };
      addButton("◀",currentPage-1,"arrow",currentPage===1);
      for(let page=1;page<=totalPages;page++)addButton(String(page),page,"number");
      addButton("▶",currentPage+1,"arrow",currentPage===totalPages);
    }
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
    const sourceElement=document.getElementById("event-detail-source");
    sourceElement.replaceChildren();
    sourceElement.append(document.createTextNode("자료 기준: "+event.source));
    if(event.sourceUrl){
      const link=document.createElement("a");
      link.href=event.sourceUrl;
      link.target="_blank";
      link.rel="noopener noreferrer";
      link.textContent="출처 확인 ↗";
      link.className="event-source-link";
      sourceElement.append(document.createTextNode(" · "),link);
    }
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
    currentPage=1;
    render();
  }));
  statusFilters.forEach(button=>button.addEventListener("click",()=>{
    currentStatus=button.dataset.status;
    currentPage=1;
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
  render();
})();