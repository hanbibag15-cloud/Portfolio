// Shared floating DOWN/TOP control for brand and menu pages.
(() => {
  const button = document.querySelector('.quick-menu-top');
  if (!button) return;
  const arrow = button.querySelector('[aria-hidden="true"]');
  const label = button.querySelector('.quick-menu-direction');
  let atTop = null;
  let switchTimer = null;
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateDirection() {
    const top = window.scrollY <= 8;
    if (top === atTop) return;
    atTop = top;
    button.classList.toggle('is-down', top);
    button.setAttribute('aria-label', top ? '페이지 맨 아래로 이동' : '페이지 맨 위로 이동');
    const applyText = () => {
      if (arrow) arrow.textContent = top ? '↓' : '↑';
      if (label) label.textContent = top ? 'DOWN' : 'TOP';
      button.classList.remove('is-switching');
    };
    clearTimeout(switchTimer);
    if (reduced() || switchTimer === null) {
      applyText(); // Initial load changes immediately.
    } else {
      button.classList.add('is-switching');
      switchTimer = window.setTimeout(applyText, 180);
    }
    if (switchTimer === null) switchTimer = 0;
  }

  button.addEventListener('click', () => {
    const destination = window.scrollY <= 8
      ? document.documentElement.scrollHeight - window.innerHeight
      : 0;
    window.scrollTo({
      top: Math.max(0, destination),
      behavior: reduced() ? 'auto' : 'smooth'
    });
  });

  window.addEventListener('scroll', updateDirection, { passive: true });
  window.addEventListener('pageshow', updateDirection);
  updateDirection();
})();
