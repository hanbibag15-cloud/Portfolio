/* Brand submenu labels are informational, not navigation links.
   Defensive capture handler for legacy or cached markup on subpages. */
(() => {
  const nav=document.querySelector(".header-nav");
  if(!nav)return;
  const submenu=nav.querySelector("#brand-submenu");
  if(!submenu)return;
  submenu.addEventListener("click",event=>{
    const item=event.target.closest("a[href]");
    if(!item||!submenu.contains(item))return;
    event.preventDefault();
    event.stopImmediatePropagation();
  },true);
  submenu.addEventListener("auxclick",event=>{
    if(event.target.closest("a[href]"))event.preventDefault();
  },true);
})();
