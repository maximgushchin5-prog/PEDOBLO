// Roblox Logo Swapper - content script
//
// Always shows the bundled logo.png in place of the Roblox logo.
// To use a different picture, just replace logo.png.
//
// If Roblox changes its markup and the logo stops being replaced,
// adjust the selectors in these two lists.

const LOGO_URL = chrome.runtime.getURL('logo.png');

// Logo drawn as a CSS background on an element (e.g. <span class="icon-logo-r-95">).
const ICON_SELECTORS = ['[class^="icon-logo"]', '[class*=" icon-logo"]'];

// Logo drawn as an <img>.
const IMG_SELECTORS = [
  'img[alt="Roblox" i]',
  'img[src*="roblox_logo" i]',
  'img[src*="roblox-logo" i]',
  'a.navbar-brand img'
];

const STYLE_ID = 'rls-style';

function ensureStyle() {
  let el = document.getElementById(STYLE_ID);

  // The logo is drawn inside the box Roblox already uses for its own logo, scaled
  // to fit ("contain"). Nothing about the layout is changed, so neighbouring header
  // items (like the SELECT badge and Charts) stay where they were, and any logo copy
  // Roblox keeps hidden (other theme, other screen size) stays hidden.
  const css =
    ICON_SELECTORS.join(',') + '{' +
    'background-image:url("' + LOGO_URL + '") !important;' +
    'background-size:contain !important;' +
    'background-repeat:no-repeat !important;' +
    'background-position:center !important;' +
    'background-color:transparent !important;}' +
    ICON_SELECTORS.map(s => s + '::before,' + s + '::after').join(',') +
    '{content:none !important;}';

  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ID;
    (document.head || document.documentElement).appendChild(el);
  }
  if (el.textContent !== css) el.textContent = css;
}

function syncImages() {
  document.querySelectorAll(IMG_SELECTORS.join(',')).forEach(img => {
    if (img.getAttribute('src') !== LOGO_URL) img.setAttribute('src', LOGO_URL);
    if (img.hasAttribute('srcset')) img.removeAttribute('srcset');
    img.style.objectFit = 'contain';
  });
}

function sync() {
  ensureStyle();
  syncImages();
}

// Roblox is a single-page app that re-renders its header, so re-apply on changes.
// sync() only writes when something differs, so this never loops.
let timer = null;
function schedule() {
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    sync();
  }, 50);
}

new MutationObserver(schedule).observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['src', 'srcset']
});

sync();
