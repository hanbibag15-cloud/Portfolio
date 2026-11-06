/* Keep BRAND dropdown visible while making every entry non-navigational.
   Replace legacy anchor markup so cached/subpage templates cannot navigate. */
(() => {
  "use strict";
  const submenu = document.querySelector(".header-nav #brand-submenu");
  if (!submenu) return;

  const removeLinks = () => {
    submenu.querySelectorAll("a").forEach(link => {
      const label = document.createElement("span");
      label.className = "brand-submenu-label";
      label.textContent = link.textContent;
      link.replaceWith(label);
    });
  };

  // Stop navigation immediately, even if another script inserts an old link.
  for (const type of ["click", "auxclick"]) {
    submenu.addEventListener(type, event => {
      const anchor = event.target.closest?.("a");
      if (!anchor || !submenu.contains(anchor)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      removeLinks();
    }, true);
  }

  removeLinks();
  // Handle menu content restored or replaced by other page scripts.
  new MutationObserver(removeLinks).observe(submenu, {childList: true, subtree: true});
})();
