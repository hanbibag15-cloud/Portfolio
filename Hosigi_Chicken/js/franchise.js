(()=>{"use strict";
const nav=document.getElementById("f-nav"), menu=document.querySelector(".header-menu-toggle"), tabs=[...document.querySelectorAll('[role="tab"]')], panels=[...document.querySelectorAll('[role="tabpanel"]')];
const header=document.querySelector(".site-header");
const groups=[...nav.querySelectorAll(".has-submenu")];
const desktop=matchMedia("(min-width:1025px)");
function closeSubmenus(){groups.forEach(g=>{g.classList.remove("submenu-open");g.firstElementChild.setAttribute("aria-expanded","false")})}
const closeMenu=()=>{header.classList.remove("menu-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","메뉴 열기");closeSubmenus()};
menu.addEventListener("click",()=>{const open=header.classList.toggle("menu-open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"메뉴 닫기":"메뉴 열기");if(!open)closeSubmenus()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();if(nav.contains(document.activeElement))menu.focus()}});
function activate(i,focus=false){if(!tabs[i])return;tabs.forEach((t,k)=>{t.setAttribute("aria-selected",String(i===k));t.tabIndex=i===k?0:-1;panels[k].hidden=i!==k;panels[k].classList.remove("is-entering")});void panels[i].offsetWidth;panels[i].classList.add("is-entering");if(focus)tabs[i].focus()}
tabs.forEach((t,i)=>{t.addEventListener("click",()=>activate(i));t.addEventListener("keydown",e=>{let n=i;if(e.key==="ArrowRight")n=(i+1)%tabs.length;else if(e.key==="ArrowLeft")n=(i+tabs.length-1)%tabs.length;else if(e.key==="Home")n=0;else if(e.key==="End")n=tabs.length-1;else return;e.preventDefault();activate(n,true)})});
document.querySelectorAll("[data-open-tab]").forEach(a=>a.addEventListener("click",()=>activate(Number(a.dataset.openTab))));
groups.forEach(g=>{const a=g.firstElementChild;g.addEventListener("pointerleave",()=>{g.classList.remove("submenu-dismissed");if(desktop.matches)a.setAttribute("aria-expanded","false")});g.addEventListener("pointerenter",()=>{if(desktop.matches)a.setAttribute("aria-expanded","true")});a.addEventListener("click",e=>{if(!desktop.matches){e.preventDefault();const open=!g.classList.contains("submenu-open");closeSubmenus();g.classList.toggle("submenu-open",open);a.setAttribute("aria-expanded",String(open));}else{g.classList.add("submenu-dismissed");a.blur()}})});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",e=>{if(e.defaultPrevented)return;closeMenu();if(document.activeElement===a&&!a.matches(":focus-visible"))a.blur()}));
desktop.addEventListener("change",closeMenu);
document.addEventListener("pointerdown",e=>{if(!e.target.closest(".site-header"))closeMenu()});
const reduced=matchMedia("(prefers-reduced-motion:reduce)");
function count(el){if(el.dataset.counted)return;el.dataset.counted="1";const end=Number(el.dataset.count);const format=n=>el.dataset.format==="plain"?String(n):n.toLocaleString("ko-KR");if(reduced.matches){el.textContent=format(end);return}const start=performance.now();function step(now){const p=Math.min(1,(now-start)/1100);el.textContent=format(Math.round(end*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
if("IntersectionObserver"in window&&!reduced.matches){const nodes=[...document.querySelectorAll(".f-reveal")];const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;e.target.classList.add("is-visible");observer.unobserve(e.target);e.target.querySelectorAll("[data-count]").forEach(count)}},{threshold:.08});document.documentElement.classList.add("f-ready");nodes.forEach(n=>observer.observe(n))}
// History fan: reveal the outline and fan once when cards approach the viewport.
const historySection=document.getElementById("history");
if(historySection && "IntersectionObserver" in window && !reduced.matches){
 const fan=historySection.querySelector(".f-timeline");
 if(fan){
  historySection.classList.add("history-motion-ready");
  const observer=new IntersectionObserver(entries=>{
   if(!entries.some(e=>e.isIntersecting))return;
   historySection.classList.add("history-visible");
   observer.disconnect();
  },{threshold:0,rootMargin:"0px 0px -15% 0px"});
  observer.observe(historySection.querySelector(".f-heading") || fan);
 }
}
// Operating metrics: each card reveals once, staggered within the visible group.
const metricResults=document.getElementById("results");
if(metricResults && "IntersectionObserver" in window && !reduced.matches){
 const cards=[...metricResults.querySelectorAll(".f-three article")];
 metricResults.classList.add("metrics-motion-ready");
 const observer=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>cards.indexOf(a.target)-cards.indexOf(b.target));
  visible.forEach((entry,i)=>{
   observer.unobserve(entry.target);
   setTimeout(()=>{
    entry.target.classList.add("metric-visible");
    entry.target.querySelectorAll("[data-count]").forEach(count);
   },i*250);
  });
 },{threshold:.18});
 cards.forEach(card=>observer.observe(card));
}
// Network graph: animate once, without affecting the existing metrics.
const networkVisual=document.querySelector("#growth .f-network-visual");
if(networkVisual && "IntersectionObserver" in window && !reduced.matches){
 networkVisual.classList.add("network-motion-ready");
 const networkObserver=new IntersectionObserver(entries=>{
  if(!entries.some(e=>e.isIntersecting))return;
  networkVisual.classList.add("is-visible");
  networkVisual.querySelectorAll("[data-count]").forEach(count);
  networkObserver.disconnect();
 },{threshold:.2});
 networkObserver.observe(networkVisual);
}
// Reveal the integrated hero once; reuse the original count-up routine.
const hero=document.querySelector(".f-hero-quad");
if(hero && "IntersectionObserver" in window && !reduced.matches){
 const cards=[...hero.querySelectorAll(".f-hero-stat")];
 const disc=hero.querySelector(".f-hero-disc");
 const ring=hero.querySelector(".f-hero-ring");
 hero.classList.add("hero-motion-ready");
 const heroObserver=new IntersectionObserver(entries=>{
  if(!entries.some(e=>e.isIntersecting&&e.intersectionRatio>=.3))return;
  heroObserver.disconnect();
  disc.classList.add("is-visible");
  ring?.classList.add("is-visible");
  cards.forEach((card,i)=>setTimeout(()=>{
   card.classList.add("is-visible");
   card.querySelectorAll("[data-count]").forEach(count);
  },i*150));
 },{threshold:.3});
 heroObserver.observe(hero);
}
// Performance grid: measure the actual image box, not its animated transform.
const performanceGrid=document.querySelector("#performance .f-advantage-grid");
if(performanceGrid){
 const image=performanceGrid.querySelector(".f-advantage-visual img");
 const figure=performanceGrid.querySelector(".f-advantage-visual");
 const cards=[...performanceGrid.querySelectorAll(".f-advantage")];
 const desktop=matchMedia("(min-width:1101px)");
 let frame=0;
 function syncPerformanceGeometry(){
  frame=0;
  if(!desktop.matches){performanceGrid.classList.remove("geometry-ready");return}
  if(!image.naturalWidth || !image.offsetHeight)return;
  const y=figure.offsetTop+image.offsetTop;
  const height=image.offsetHeight;
  const rows=[[cards[0],cards[2],.18],[cards[1],cards[3],.83]];
  let previousBottom=0;
  let gridMin=0;
  for(const [left,right,ratio] of rows){
   const copyHeight=Math.max(left.querySelector(".f-advantage-copy").offsetHeight,right.querySelector(".f-advantage-copy").offsetHeight);
   const anchor=y+height*ratio;
   // Keep labels aligned; reserve the same copy height on both sides.
   const top=Math.max(previousBottom,anchor-copyHeight-24,0);
   const lineTop=Math.max(copyHeight+16,anchor-top);
   const rowHeight=lineTop+1;
   for(const card of [left,right]){
    card.style.setProperty("--row-top",top+"px");
    card.style.setProperty("--row-height",rowHeight+"px");
    card.style.setProperty("--line-top",lineTop+"px");
   }
   previousBottom=top+rowHeight+24;
   gridMin=Math.max(gridMin,top+rowHeight+45);
  }
  performanceGrid.style.setProperty("--grid-min",Math.ceil(gridMin)+"px");
  performanceGrid.classList.add("geometry-ready");
 }
 function queuePerformanceGeometry(){if(!frame)frame=requestAnimationFrame(syncPerformanceGeometry)}
 image.addEventListener("load",queuePerformanceGeometry);
 window.addEventListener("resize",queuePerformanceGeometry,{passive:true});
 desktop.addEventListener("change",queuePerformanceGeometry);
 if("ResizeObserver" in window){
  const geometryObserver=new ResizeObserver(queuePerformanceGeometry);
  geometryObserver.observe(image);
  cards.forEach(card=>geometryObserver.observe(card.querySelector(".f-advantage-copy")));
 }
 if(document.fonts)document.fonts.ready.then(queuePerformanceGeometry);
 queuePerformanceGeometry();
}
// Performance: observe each content group independently and reveal only once.
const performanceSection=document.getElementById("performance");
if(performanceSection && "IntersectionObserver" in window && !reduced.matches){
 const targets=[...performanceSection.querySelectorAll(".f-question-sign,.f-performance-title,.f-advantage-since,.f-advantage-visual img,.f-advantage")];
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(!entry.isIntersecting || entry.intersectionRatio<.25)continue;
   entry.target.classList.add("perf-visible");
   observer.unobserve(entry.target);
  }
 },{threshold:.25});
 targets.forEach(target=>observer.observe(target));
 performanceSection.classList.add("performance-motion-ready");
}
const mainLinks=[...nav.querySelectorAll(":scope > ul > li > a")];
/* Resolve the brand site's real text widths using the browser's computed font,
   then keep franchise slots independent of the franchise labels' lengths. */
const axisRef=document.createElement("div");
axisRef.className="f-brand-axis-reference";
axisRef.setAttribute("aria-hidden","true");
axisRef.inert=true;
for(const label of ["메뉴","브랜드","매장찾기","이벤트"]){const span=document.createElement("span");span.textContent=label;axisRef.append(span)}
header.querySelector(".header-inner").append(axisRef);
function alignBrandAxes(){
 if(!desktop.matches){nav.classList.remove("axis-ready");return;}
 const inner=header.querySelector(".header-inner").getBoundingClientRect();
 const ref=[...axisRef.children].map(el=>{const r=el.getBoundingClientRect();return r.left+r.width/2});
 const widths=mainLinks.map(a=>a.querySelector(".gnb-label").getBoundingClientRect().width);
 const slot=Math.ceil(Math.max(...widths))+4;
 const logo=header.querySelector(".header-logo").getBoundingClientRect();
 const utils=header.querySelector(".header-utils").getBoundingClientRect();
 const min=logo.right+12+slot/2,max=utils.left-12-slot/2;
 let centers=ref;
 // Preserve exact reference axes whenever space permits; avoid collisions otherwise.
 if(ref[0]<min||ref[3]>max||ref.some((x,i)=>i>0&&x-ref[i-1]<slot)){
   const left=Math.min(min,max),right=Math.max(min,max);
   centers=ref.map((_,i)=>left+(right-left)*i/3);
 }
 nav.style.setProperty("--axis-width",inner.width+"px");
 nav.style.setProperty("--axis-slot",slot+"px");
 mainLinks.forEach((a,i)=>a.parentElement.style.setProperty("--axis-x",(centers[i]-inner.left)+"px"));
 nav.classList.add("axis-ready");
}
let axisFrame=0;
function scheduleAxes(){cancelAnimationFrame(axisFrame);axisFrame=requestAnimationFrame(alignBrandAxes)}
alignBrandAxes();
window.addEventListener("resize",scheduleAxes,{passive:true});
if(document.fonts){document.fonts.ready.then(scheduleAxes);document.fonts.addEventListener("loadingdone",scheduleAxes)}
if("ResizeObserver"in window){const observer=new ResizeObserver(scheduleAxes);observer.observe(header.querySelector(".header-inner"));observer.observe(header.querySelector(".header-utils"));observer.observe(axisRef)}

const form=document.getElementById("f-form"), fields=document.getElementById("f-fields"), result=document.getElementById("f-result");
const consultSection=document.getElementById("consulting");
if(consultSection && form && "IntersectionObserver" in window && !reduced.matches){
 consultSection.classList.add("consult-motion-ready");
 const consultObserver=new IntersectionObserver(entries=>{
  if(!entries.some(entry=>entry.isIntersecting))return;
  form.classList.add("consult-visible");
  consultObserver.disconnect();
 },{threshold:0,rootMargin:"0px 0px -10% 0px"});
 consultObserver.observe(form);
 form.addEventListener("focusin",()=>{form.classList.add("consult-visible");consultObserver.disconnect()},{once:true});
}
form.addEventListener("invalid",()=>{result.textContent="필수 입력 항목과 입력 형식을 확인해 주세요."},true);
form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;form.reset();result.textContent="시연이 완료되었습니다. 실제 상담 신청은 접수되지 않았으며 입력한 정보는 저장하거나 전송하지 않았습니다.";result.focus({preventScroll:true})});fields.disabled=false;
/* Reuse the STORE region picker structure and behavior for every consultation select.
   The real select remains in the DOM and validatable; only its visual UI is replaced. */
const consultPickers=[];
for(const select of form.querySelectorAll("select")){
 const dropdown=document.createElement("div");dropdown.className="consult-select-dropdown";
 const trigger=document.createElement("button");trigger.type="button";trigger.className="consult-select-trigger";
 const text=document.createElement("span");text.className="consult-select-current";text.id=select.id+"-current";
 const chevron=document.createElement("span");chevron.className="consult-select-chevron";chevron.setAttribute("aria-hidden","true");
 trigger.append(text,chevron);
 const options=document.createElement("div");options.className="consult-select-options";options.id=select.id+"-options";options.setAttribute("role","listbox");
 const label=select.labels?.[0];if(label&&!label.id)label.id=select.id+"-label";
 if(label){trigger.setAttribute("aria-labelledby",label.id+" "+text.id);options.setAttribute("aria-labelledby",label.id);}
 trigger.setAttribute("aria-haspopup","listbox");trigger.setAttribute("aria-expanded","false");trigger.setAttribute("aria-controls",options.id);
 const items=[];
 const close=()=>{dropdown.classList.remove("is-open");trigger.setAttribute("aria-expanded","false");items.forEach(item=>item.tabIndex=-1);};
 const sync=()=>{text.textContent=select.selectedOptions[0]?.textContent||"";items.forEach((item,i)=>{const chosen=Number(item.dataset.optionIndex)===select.selectedIndex;item.classList.toggle("is-active",chosen);item.setAttribute("aria-selected",String(chosen));});if(select.validity.valid)trigger.removeAttribute("aria-invalid");};
 for(const [index,option] of [...select.options].entries()){
  if(option.value==="")continue; // Placeholder remains native state only.
  const item=document.createElement("button");item.type="button";item.className="consult-select-option";item.setAttribute("role","option");item.tabIndex=-1;item.disabled=option.disabled;item.dataset.optionIndex=String(index);item.textContent=option.textContent;
  item.addEventListener("click",()=>{select.selectedIndex=index;select.dispatchEvent(new Event("change",{bubbles:true}));close();trigger.focus({preventScroll:true});});
  items.push(item);options.append(item);
 }
 const scrollIndicator=document.createElement("span");scrollIndicator.className="consult-select-scroll-indicator";scrollIndicator.setAttribute("aria-hidden","true");
 const scrollThumb=document.createElement("span");scrollThumb.className="consult-select-scroll-thumb";scrollIndicator.append(scrollThumb);
 const updateThumb=()=>{const remaining=options.scrollHeight-options.clientHeight;const travel=Math.max(0,scrollIndicator.clientHeight-scrollThumb.offsetHeight);scrollIndicator.classList.toggle("has-overflow",remaining>1);scrollThumb.style.transform="translateY("+(remaining>0?options.scrollTop/remaining*travel:0)+"px)";};
 const focusItem=index=>{const item=items[index];if(!item||item.disabled)return;items.forEach(x=>x.tabIndex=-1);item.tabIndex=0;item.focus({preventScroll:true});const top=item.offsetTop,bottom=top+item.offsetHeight;if(top<options.scrollTop)options.scrollTop=top;else if(bottom>options.scrollTop+options.clientHeight)options.scrollTop=bottom-options.clientHeight;updateThumb();};
 const open=()=>{consultPickers.forEach(p=>{if(p.close!==close)p.close();});dropdown.classList.add("is-open");trigger.setAttribute("aria-expanded","true");requestAnimationFrame(()=>{if(dropdown.classList.contains("is-open")){const selectedItem=items.findIndex(item=>Number(item.dataset.optionIndex)===select.selectedIndex);focusItem(selectedItem>=0?selectedItem:0);updateThumb();}});};
 select.before(dropdown);dropdown.append(select,trigger,options,scrollIndicator);select.classList.add("consult-select-native");select.tabIndex=-1;select.setAttribute("aria-hidden","true");
 trigger.addEventListener("click",()=>dropdown.classList.contains("is-open")?close():open());
 label?.addEventListener("click",e=>{e.preventDefault();trigger.focus();});
 dropdown.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&dropdown.classList.contains("is-open")){e.preventDefault();e.stopPropagation();close();trigger.focus({preventScroll:true});return;}
  if(e.key==="Tab"){close();trigger.focus({preventScroll:true});return;}
  if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){e.preventDefault();if(!dropdown.classList.contains("is-open")){open();return;}const index=items.indexOf(document.activeElement);let next=e.key==="Home"?0:e.key==="End"?items.length-1:(index+(e.key==="ArrowDown"?1:-1)+items.length)%items.length;focusItem(next);}
 });
 dropdown.addEventListener("focusout",e=>{if(e.relatedTarget&&!dropdown.contains(e.relatedTarget))close();});
 document.addEventListener("pointerdown",e=>{if(!dropdown.contains(e.target))close();});
 options.addEventListener("scroll",updateThumb,{passive:true});window.addEventListener("resize",updateThumb,{passive:true});
 select.addEventListener("change",sync);
 select.addEventListener("invalid",e=>{e.preventDefault();trigger.setAttribute("aria-invalid","true");trigger.focus();});
 consultPickers.push({close,sync});sync();
}
form.addEventListener("reset",()=>{consultPickers.forEach(p=>p.close());queueMicrotask(()=>consultPickers.forEach(p=>p.sync()));});

window.addEventListener("pageshow",e=>{if(e.persisted){closeMenu();form.reset();result.textContent=""}});
})();