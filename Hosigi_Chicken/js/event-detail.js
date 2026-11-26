(() => {
"use strict";
const data=window.HosigiEvents;
const params=new URLSearchParams(location.search);
const section=params.get("section")==="notices"?"notices":"events";
const notice=section==="notices";
const id=params.get("id");
const get=id=>document.getElementById(id);
const post=get("event-post"),content=get("event-post-content");
const tab=get(notice?"detail-notices-tab":"detail-events-tab");
const other=get(notice?"detail-events-tab":"detail-notices-tab");
tab.classList.add("is-active");tab.setAttribute("aria-current","page");
other.classList.remove("is-active");other.removeAttribute("aria-current");
let saved=null;try{saved=JSON.parse(sessionStorage.getItem("hosigi-event-list-v1")||"null")}catch{}
const back=new URLSearchParams({section});
if(saved?.section===section)back.set("restore","1");
get("event-post-back").href="event.html?"+back.toString();
function neighbor(el,record,empty){el.textContent=record?record.title:empty;if(record)el.href=data.detailUrl(record.id,section);else el.removeAttribute("href")}
function render(){
const ordered=data.orderedEvents(notice?data.notices:data.events);
const index=ordered.findIndex(event=>event.id===id);
const item=ordered[index];
post.querySelector(".event-post-loading").hidden=true;
post.setAttribute("aria-busy","false");
get("event-post-error").hidden=!!item;
content.hidden=!item;
if(!item)return;
document.title=item.title+" | 호식이두마리치킨";
get("event-post-type").textContent=item.category+(notice?"":" · "+(data.status(item)||"진행 여부 확인 필요"));
get("event-post-title").textContent=item.title;
get("event-post-date").textContent=(notice?"게시일 ":"")+item.date;
get("event-post-description-heading").textContent=notice?"공지사항 안내":"이벤트 상세 안내 및 참여 방법";
get("event-post-description").textContent=item.description;
const poster=get("event-post-poster");poster.replaceChildren();poster.hidden=true;
if(!notice&&data.eventImages[item.id]){const img=document.createElement("img");img.src=data.eventImages[item.id];img.alt=item.title+" 이벤트 이미지";img.addEventListener("error",()=>{poster.hidden=true},{once:true});poster.append(img);poster.hidden=false}
const source=get("event-post-source");source.textContent="자료 기준: "+(item.source||"확인 필요");
// Sources remain plain text; source URLs are retained only in the shared data for synchronization and deduplication.
neighbor(get("event-post-prev"),ordered[index+1],"이전 글이 없습니다.");
neighbor(get("event-post-next"),ordered[index-1],"다음 글이 없습니다.");
}
if((notice?data.notices:data.events).some(e=>e.id===id))render();
data.loadOfficialEvents().then(render);
})();
