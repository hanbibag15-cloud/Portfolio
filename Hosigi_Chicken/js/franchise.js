(()=>{"use strict";
const nav=document.getElementById("f-nav"), menu=document.querySelector(".f-menu"), tabs=[...document.querySelectorAll('[role="tab"]')], panels=[...document.querySelectorAll('[role="tabpanel"]')];
const closeMenu=()=>{nav.classList.remove("is-open");menu.setAttribute("aria-expanded","false")};
menu.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");menu.setAttribute("aria-expanded",String(open))});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();if(nav.contains(document.activeElement))menu.focus()}});
function activate(i,focus=false){if(!tabs[i])return;tabs.forEach((t,k)=>{t.setAttribute("aria-selected",String(i===k));t.tabIndex=i===k?0:-1;panels[k].hidden=i!==k;panels[k].classList.remove("is-entering")});void panels[i].offsetWidth;panels[i].classList.add("is-entering");if(focus)tabs[i].focus()}
tabs.forEach((t,i)=>{t.addEventListener("click",()=>activate(i));t.addEventListener("keydown",e=>{let n=i;if(e.key==="ArrowRight")n=(i+1)%tabs.length;else if(e.key==="ArrowLeft")n=(i+tabs.length-1)%tabs.length;else if(e.key==="Home")n=0;else if(e.key==="End")n=tabs.length-1;else return;e.preventDefault();activate(n,true)})});
document.querySelectorAll("[data-open-tab]").forEach(a=>a.addEventListener("click",()=>activate(Number(a.dataset.openTab))));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{closeMenu();if(document.activeElement===a&&!a.matches(":focus-visible"))a.blur()}));
document.addEventListener("pointerdown",e=>{if(!e.target.closest(".f-header"))closeMenu()});
const reduced=matchMedia("(prefers-reduced-motion:reduce)");
function count(el){if(el.dataset.counted)return;el.dataset.counted="1";const end=Number(el.dataset.count);const format=n=>el.dataset.format==="plain"?String(n):n.toLocaleString("ko-KR");if(reduced.matches){el.textContent=format(end);return}const start=performance.now();function step(now){const p=Math.min(1,(now-start)/1100);el.textContent=format(Math.round(end*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
if("IntersectionObserver"in window&&!reduced.matches){const nodes=[...document.querySelectorAll(".f-reveal")];const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;e.target.classList.add("is-visible");observer.unobserve(e.target);e.target.querySelectorAll("[data-count]").forEach(count)}},{threshold:.08});document.documentElement.classList.add("f-ready");nodes.forEach(n=>observer.observe(n))}
const mainLinks=[...nav.querySelectorAll(".f-nav-group>a")];
function activeNav(){const y=window.scrollY+document.querySelector(".f-header").offsetHeight+80;let index=0;for(const [i,id] of [[1,"performance"],[2,"guide"],[3,"consulting"]]){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top+scrollY<=y)index=i}if(index===2&&tabs[5].getAttribute("aria-selected")==="true")index=3;mainLinks.forEach((a,i)=>a.classList.toggle("is-active",i===index))}
window.addEventListener("scroll",activeNav,{passive:true});tabs.forEach(t=>t.addEventListener("click",activeNav));activeNav();
const form=document.getElementById("f-form"), fields=document.getElementById("f-fields"), result=document.getElementById("f-result");
form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;form.reset();result.textContent="시연이 완료되었습니다. 실제 상담 신청은 접수되지 않았으며 입력한 정보는 저장하거나 전송하지 않았습니다.";result.focus({preventScroll:true})});fields.disabled=false;
window.addEventListener("pageshow",e=>{if(e.persisted){closeMenu();form.reset();result.textContent=""}});
})();