(()=>{"use strict";
const reduced=matchMedia("(prefers-reduced-motion:reduce)");
if("IntersectionObserver" in window&&!reduced.matches){const nodes=document.querySelectorAll(".support-reveal");const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}},{threshold:0,rootMargin:"0px 0px -5% 0px"});document.documentElement.classList.add("support-ready");nodes.forEach(n=>observer.observe(n));}
const form=document.getElementById("customer-form");if(!form)return;
const fields=document.getElementById("customer-fields"),result=document.getElementById("customer-result");
form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;form.reset();result.textContent="시연이 완료되었습니다. 실제 문의는 접수되지 않았으며 입력 정보는 저장·전송되지 않았습니다.";result.focus({preventScroll:true});});
form.addEventListener("invalid",()=>{result.textContent="필수 항목 및 입력 형식을 확인해 주세요.";},true);
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


fields.disabled=false;
window.addEventListener("pageshow",e=>{if(e.persisted){form.reset();result.textContent="";}});
})();