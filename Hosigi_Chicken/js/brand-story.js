/* Shared scroll entrance motion for three BRAND subpages. */
(() => {
  "use strict";
  const root=document.querySelector(".hosigi-story, .brand-subpage");
  if(!root)return;

  const items=[...root.querySelectorAll(".story-reveal, .brand-subpage-reveal")];
  if(!items.length)return;

  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced||!("IntersectionObserver" in window))return;

  // Keep elements already in the viewport visible at page load.
  const topVisible=item=>item.getBoundingClientRect().top < window.innerHeight - 25;
  items.forEach(item=>{
    if(topVisible(item))item.classList.add("is-visible");
  });

  root.classList.add("story-motion-ready");

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },{threshold:0.08,rootMargin:"0px 0px -20px 0px"});

  items.forEach(item=>{
    if(!item.classList.contains("is-visible"))observer.observe(item);
  });
})();

/* Birth story only. Use actual scroll coordinates; never intercept wheel or touch. */
(() => {
  "use strict";
  const section=document.querySelector("#story-begin.story-begin-visual-section");
  if(!section)return;
  const stage=section.querySelector(".story-begin-visual-inner");
  const copy=section.querySelector(".story-begin-description");
  if(!stage||!copy)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const mix=(a,b,p)=>a+(b-a)*p;
  const ease=p=>p*p*(3-2*p);
  let frame=0,geometry=null;
  let isAnimationCompleted=false;
  const put=(name,value)=>section.style.setProperty("--birth-"+name,value);
  function measure(){
    if(reduced.matches){section.classList.remove("is-mask-ready");geometry=null;return}
    const header=document.querySelector(".site-header");
    const top=Math.ceil(header?header.getBoundingClientRect().height:0);
    const w=section.clientWidth;
    const vh=Math.max(1,window.innerHeight-top);
    const mobile=w<=767;
    const wrap=Math.min(1240,w-(mobile?32:48));
    const gap=clamp(w*.05,36,78);
    const copyW=mobile?wrap:(wrap-gap)/2.05;
    const imageW=mobile?Math.min(wrap,520):Math.min((wrap-gap)*1.05/2.05,690);
    const left=(w-wrap)/2;
    put("copy-w",copyW+"px");
    section.classList.add("is-mask-ready");
    const copyH=copy.offsetHeight;
    const stackH=imageW+34+copyH;
    const stageH=mobile?Math.max(vh,stackH+48):Math.max(vh,imageW+48,copyH+48);
    const distance=Math.max(500,vh*1.25);
    const imageX=mobile?(w-imageW)/2:left+copyW+gap;
    const imageY=mobile?24:(stageH-imageW)/2;
    const copyY=mobile?imageY+imageW+34:(stageH-copyH)/2;
    geometry={w,vh,top,stageH,distance,imageW,imageX,imageY,copyY,left};
    put("stage-height",stageH+"px");
    // Both visual transitions end at 90%; release the pin at that exact point.
    put("track-height",(stageH+distance*.9)+"px");
    put("copy-x",left+"px");
    put("copy-y",copyY+"px");
    if(isAnimationCompleted){renderFinal();return}
    update();
  }
  function renderFinal(){
    const g=geometry;
    if(!g)return;
    put("pin",g.distance*.9+"px");
    put("x",g.imageX+"px");
    put("y",g.imageY+"px");
    put("w",g.imageW+"px");
    put("h",g.imageW+"px");
    put("radius","50%");
    put("copy-opacity","1");
    put("copy-shift","0px");
  }
  function update(){
    frame=0;
    if(!geometry||isAnimationCompleted)return;
    const g=geometry;
    const rect=section.getBoundingClientRect();
    const travel=clamp(g.top-rect.top,0,g.distance*.9);
    const p=travel/g.distance;
    if(travel>=g.distance*.9){
      isAnimationCompleted=true;
      renderFinal();
      window.removeEventListener("scroll",schedule);
      return;
    }
    const motion=ease(clamp(p/.9,0,1));
    const reveal=ease(clamp((p-.48)/.42,0,1));
    put("pin",travel+"px");
    put("x",mix(0,g.imageX,motion)+"px");
    put("y",mix(0,g.imageY,motion)+"px");
    put("w",mix(g.w,g.imageW,motion)+"px");
    put("h",mix(g.vh,g.imageW,motion)+"px");
    put("radius",(50*motion)+"%");
    put("copy-opacity",String(reveal));
    put("copy-shift",((1-reveal)*24)+"px");
  }
  function schedule(){if(!isAnimationCompleted&&!frame)frame=requestAnimationFrame(update)}
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",measure,{passive:true});
  window.addEventListener("pageshow",measure);
  if(reduced.addEventListener)reduced.addEventListener("change",measure);
  document.fonts?.ready.then(measure);
  measure();
})();
