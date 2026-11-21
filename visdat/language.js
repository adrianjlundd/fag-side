/* Static, local bilingual delivery. URLs, question IDs and anchors are shared. */
(() => {
  'use strict';
  const preferenceKey = 'visdat.language';
  let lang = 'en';
  try { if (localStorage.getItem(preferenceKey) === 'nb') lang = 'nb'; } catch {}
  const explicit = new URLSearchParams(location.search).get('lang');
  if (explicit === 'en' || explicit === 'nb') lang = explicit;
  document.documentElement.lang = lang;
  window.visdatLanguage = lang;
  window.addEventListener('pageshow', event => {
    if (!event.persisted || explicit) return;
    try {
      const stored = localStorage.getItem(preferenceKey) === 'nb' ? 'nb' : 'en';
      if (stored !== lang) location.reload();
    } catch {}
  });
  const base = new URL('.', document.currentScript.src);
  const load = file => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(file, base);
    script.onload = resolve;
    script.onerror = () => reject(new Error('Could not load ' + file));
    document.head.append(script);
  });
  const stateKey = 'visdat.language-state';
  const fields = () => [...document.querySelectorAll('input, select, textarea')];
  function saveState() {
    const threshold = (document.querySelector('.mast')?.getBoundingClientRect().height || 75) + 45;
    const section = [...document.querySelectorAll('main section[id], main [id^="doc-section-"]')]
      .filter(el => el.getBoundingClientRect().top <= threshold).pop();
    const state = {
      url: location.href, y: scrollY, section: section?.id,
      offset: section?.getBoundingClientRect().top,
      details: [...document.querySelectorAll('details')].map(el => el.open),
      fields: fields().map(el => ({value: el.value, index: el.selectedIndex,
        checked: el.checked, type: el.type})),
      pixels: [...document.querySelectorAll('.pixel-row button')].map(el => el.textContent),
    };
    try { sessionStorage.setItem(stateKey, JSON.stringify(state)); } catch {}
  }
  function restoreState() {
    let state;
    try {
      state = JSON.parse(sessionStorage.getItem(stateKey));
      sessionStorage.removeItem(stateKey);
    } catch {}
    if (!state || state.url !== location.href) return false;
    fields().forEach((el, i) => {
      const saved = state.fields[i];
      if (!saved) return;
      if (el.tagName === 'SELECT') el.selectedIndex = saved.index;
      else { el.value = saved.value; el.checked = saved.checked; }
      // Navigation selects must not trigger navigation during restoration.
      if (!['pick', 'mode', 'topic'].includes(el.id)) {
        el.dispatchEvent(new Event('input', {bubbles: true}));
        el.dispatchEvent(new Event('change', {bubbles: true}));
      }
    });
    document.querySelectorAll('.pixel-row button').forEach((el, i) => {
      if (state.pixels[i] !== undefined && el.textContent !== state.pixels[i]) el.click();
    });
    document.querySelectorAll('details').forEach((el, i) => { el.open = state.details[i] || false; });
    const section = state.section && document.getElementById(state.section);
    const top = section ? scrollY + section.getBoundingClientRect().top - state.offset : state.y;
    window.scrollTo({top, behavior: 'instant'});
    return true;
  }
  function switchLanguage(next) {
    if (next === lang) return;
    saveState();
    try { localStorage.setItem(preferenceKey, next); } catch {
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      try {
        const state = JSON.parse(sessionStorage.getItem(stateKey));
        state.url = url.href;
        sessionStorage.setItem(stateKey, JSON.stringify(state));
      } catch {}
      location.replace(url);
      return;
    }
    if (explicit) {
      const url = new URL(location.href);
      url.searchParams.delete('lang');
      history.replaceState(null, '', url);
      // Match the restored state to the URL with the fallback parameter removed.
      try {
        const state = JSON.parse(sessionStorage.getItem(stateKey));
        state.url = location.href;
        sessionStorage.setItem(stateKey, JSON.stringify(state));
      } catch {}
    }
    location.reload();
  }
  async function start() {
    await load('shell.js');
    if (lang === 'nb') {
      const normalize = s => s.trim().replace(/\s+/g, ' ');
      const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (['SCRIPT','STYLE'].includes(node.parentElement?.tagName)) continue;
        const value = window.visdatNorwegianShell[normalize(node.textContent)];
        if (value !== undefined) node.textContent = value;
      }
      document.querySelectorAll('[aria-label], [title], [alt], [placeholder]').forEach(el => {
        for (const attr of ['aria-label','title','alt','placeholder']) {
          const value = window.visdatNorwegianShell[normalize(el.getAttribute(attr) || '')];
          if (value !== undefined) el.setAttribute(attr, value);
        }
      });
    }
    const toggle = document.createElement('div');
    toggle.className = 'language-toggle';
    toggle.setAttribute('role', 'group');
    toggle.setAttribute('aria-label', lang === 'en' ? 'Language' : 'Språk');
    for (const [code, label, name] of [['en','EN','English'],['nb','NO','Norsk bokmål']]) {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = label; button.lang = code;
      button.setAttribute('aria-label', name);
      button.setAttribute('aria-pressed', String(code === lang));
      button.onclick = () => switchLanguage(code);
      toggle.append(button);
    }
    document.querySelector('.mast-inner')?.append(toggle);
    const mast = document.querySelector('.mast');
    if (mast) new ResizeObserver(() => document.documentElement.style.setProperty('--mast-height', mast.getBoundingClientRect().height + 'px')).observe(mast);
    for (const file of ['cg','ip','figurer','side']) {
      const suffix = ['cg','ip'].includes(file) ? '.' + lang : lang === 'en' ? '.en' : '';
      await load(file + suffix + '.js');
    }
    await window.visdatPageReady;
    await document.fonts.ready;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!restoreState() && location.hash) {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant', block:'start'});
      }
      document.documentElement.classList.remove('language-loading');
      window.visdatLoaded = true;
      // Retain a selected language even when persistent storage is unavailable.
      if (explicit) document.querySelectorAll('a[href]').forEach(link => {
        const target = new URL(link.href, location.href);
        if (target.origin === location.origin && /(?:\/|\.html)$/.test(target.pathname)) {
          target.searchParams.set('lang', lang);
          link.href = target;
        }
      });
    }));
  }
  document.documentElement.classList.add('language-loading');
  document.addEventListener('DOMContentLoaded', () => start().catch(error => {
    document.documentElement.classList.remove('language-loading');
    const target = document.querySelector('#sideinnhold') || document.querySelector('main');
    const message = document.createElement('p');
    message.setAttribute('role','alert');
    message.textContent = lang === 'en'
      ? 'The study content could not be loaded. Reload this page to try again.'
      : 'Fagstoffet kunne ikke lastes. Last siden på nytt for å prøve igjen.';
    target?.append(message);
    console.error(error);
  }), {once: true});
})();
