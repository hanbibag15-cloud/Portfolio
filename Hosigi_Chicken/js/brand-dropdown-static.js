/* BRAND navigation: keep the parent label non-navigational.
   Submenu entries link to the corresponding brand subpages. */
(() => {
  "use strict";
  const submenu=document.querySelector(".header-nav #brand-submenu");
  if(!submenu)return;
  // Prevent old cached scripts from treating destination links as static labels.
  submenu.querySelectorAll("a[href]").forEach(link=>{
    link.removeAttribute("role");
    link.removeAttribute("aria-disabled");
  });
})();
