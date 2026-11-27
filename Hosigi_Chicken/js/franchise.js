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

function activeNav(){const y=window.scrollY+header.offsetHeight+80;let index=0;for(const [i,id] of [[1,"performance"],[2,"guide"],[3,"consulting"]]){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top+scrollY<=y)index=i}if(index===2&&tabs[5].getAttribute("aria-selected")==="true")index=3;mainLinks.forEach((a,i)=>a.classList.toggle("gnb-active",i===index))}
window.addEventListener("scroll",activeNav,{passive:true});tabs.forEach(t=>t.addEventListener("click",activeNav));activeNav();
const form=document.getElementById("f-form"), fields=document.getElementById("f-fields"), result=document.getElementById("f-result");
form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;form.reset();result.textContent="시연이 완료되었습니다. 실제 상담 신청은 접수되지 않았으며 입력한 정보는 저장하거나 전송하지 않았습니다.";result.focus({preventScroll:true})});fields.disabled=false;
window.addEventListener("pageshow",e=>{if(e.persisted){closeMenu();form.reset();result.textContent=""}});
})();