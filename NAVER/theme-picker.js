/* Switch only the theme stylesheet and class; preserve screen2_page/state_page. */
document.addEventListener('DOMContentLoaded', function () {
  const wrap = document.getElementById('wrap');
  const picker = document.querySelector('.theme-picker');
  const themeLink = document.getElementById('active-theme-css');
  if (!wrap || !picker || !themeLink) return;

  const themes = {
    original: null,
    'neo-brutalism': 'neo-brutalism.css',
    'y2k-chrome': 'y2k-chrome.css',
    'pixel-art': 'pixel-art.css',
    collage: 'collage.css',
    'art-deco': 'art-deco.css',
    cyberpunk: 'cyberpunk.css',
    memphis: 'memphis.css',
    glassmorphism: 'glassmorphism.css',
    'swiss-style': 'swiss-style.css',
    'bento-grid': 'bento-grid.css',
    editorial: 'editorial.css',
    minimalism: 'minimalism.css',
    claymorphism: 'claymorphism.css',
    maximalism: 'maximalism.css',
    'kinetic-typography': 'kinetic-typography.css',
    'grainy-gradient': 'grainy-gradient.css',
    bauhaus: 'bauhaus.css',
    'pop-art': 'pop-art.css'
  };
  const buttons = picker.querySelectorAll('[data-theme]');
  const themeNames = Object.keys(themes);
  function activate(theme) {
    if (!Object.prototype.hasOwnProperty.call(themes, theme)) return;
    wrap.classList.remove(...themeNames.filter(name => name !== 'original'));
    if (theme !== 'original') wrap.classList.add(theme);
    const file = themes[theme];
    if (file) { themeLink.href = file; themeLink.disabled = false; }
    else { themeLink.disabled = true; themeLink.removeAttribute('href'); }
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
    try { localStorage.setItem('naver-login-theme', theme); } catch (_) {}
  }
  buttons.forEach(button => button.addEventListener('click', () => activate(button.dataset.theme)));
  let saved = 'pop-art';
  try { saved = localStorage.getItem('naver-login-theme') || saved; } catch (_) {}
  activate(Object.prototype.hasOwnProperty.call(themes, saved) ? saved : 'pop-art');
  picker.open = true;
});
