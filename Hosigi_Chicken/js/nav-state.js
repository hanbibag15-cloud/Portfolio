// Persistent current-page / current-section indicator for the GNB.
(function(){
  const nav=document.querySelector('.header-nav');
  if(!nav)return;
  const links=[...nav.querySelectorAll(':scope > ul > li > a')];
  function mark(index){
    links.forEach((link,i)=>{
      const active=i===index;
      link.classList.toggle('is-current',active);
      if(active)link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  }
  function sync(){
    const file=location.pathname.split('/').pop();
    const hash=location.hash;
    if(file==='menu.html'){mark(0);return;}
    if(file!=='brand.html'){mark(-1);return;}
    if(hash==='#menu'){mark(0);}
    else if(hash==='#stores'){mark(2);}
    else if(hash==='#events'){mark(3);}
    else{mark(-1);} // No active GNB item on initial brand-home load.
  }
  sync();
  window.addEventListener('hashchange',sync);
  if(location.pathname.endsWith('/brand.html')){
    links.forEach((link,index)=>{
      link.addEventListener('click',()=>mark(index));
    });
    nav.querySelectorAll('.header-submenu a').forEach(link=>{
      link.addEventListener('click',()=>{if(link.closest('.has-submenu')===links[0]?.parentElement)mark(0);else mark(1);});
    });
  }
})();
