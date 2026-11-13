/* Fernando Freitas — site v3 (protótipo local). Sem build: scripts clássicos, abre também por file://.
   O conteúdo vem de js/data.js. */
(function () {
  'use strict';

  const D = window.FF_DATA;
  const root = document.documentElement;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const h = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const pad2 = n => String(n).padStart(2, '0');
  const byN = n => D.projects.find(p => p.n === Number(n));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Pele ---------- */
  const THEME = { fff: '#020202', storm: '#0C0D10' };
  function setSkin(skin, save) {
    root.dataset.skin = skin;
    $$('[data-set-skin]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setSkin === skin)));
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = THEME[skin];
    if (save) { try { localStorage.setItem('ff-skin', skin); } catch (e) { /* sem storage: só não lembra */ } }
  }
  $$('[data-set-skin]').forEach(b => b.addEventListener('click', () => setSkin(b.dataset.setSkin, true)));
  setSkin(root.dataset.skin === 'storm' ? 'storm' : 'fff', false);

  /* ---------- Prévias em vídeo: tocam quando o card está na tela ---------- */
  const prevIO = reduceMotion ? null : new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        const p = v.play(); if (p && p.catch) p.catch(() => {});
      } else if (!v.paused) v.pause();
    });
  }, { threshold: .3 });
  function prevVideo(src) {
    const v = h('video', 'prev');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none';
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.tabIndex = -1;
    v.dataset.src = src;
    v.addEventListener('playing', () => v.classList.add('is-on'), { once: true });
    if (prevIO) prevIO.observe(v);
    return v;
  }

  /* ---------- Prêmios ---------- */
  const awards = $('#awards');
  D.awards.forEach(a => {
    const li = h('li');
    const b = h('button');
    b.type = 'button';
    b.dataset.open = a.n;
    b.append(h('span', 'aw-name', a.award), h('span', 'aw-cat', a.cat), h('span', 'aw-proj', a.project));
    li.append(b);
    awards.append(li);
  });

  /* ---------- Grade de projetos ---------- */
  const grid = $('#grid');
  D.projects.forEach(p => {
    const li = h('li');
    const b = h('button', 'card');
    b.type = 'button';
    b.dataset.open = p.n;

    const fig = h('span', 'card-img');
    const img = new Image();
    img.alt = '';
    img.width = 1616; img.height = 1264;
    img.decoding = 'async';
    img.loading = p.n > 3 ? 'lazy' : 'eager';
    img.src = p.cover;
    const hasVideo = p.items.some(i => i.type !== 'image' && i.type !== 'pages');
    fig.append(img);
    if (p.n !== 12) fig.append(prevVideo('assets/prev/p' + pad2(p.n) + '.mp4'));
    fig.append(h('span', 'card-play', hasVideo ? '▶ Play' : 'View'));

    const cap = h('span', 'card-cap');
    const title = h('span', 'card-title');
    title.append(h('span', 'card-n', pad2(p.n)), document.createTextNode(p.title));
    cap.append(title, h('span', 'card-meta', [p.kind, p.role, p.with, p.year].filter(Boolean).join(' · ')));
    if (p.award) cap.append(h('span', 'card-award', p.award));

    b.append(fig, cap);
    li.append(b);
    grid.append(li);
  });

  /* ---------- Comerciais e clipes: um por um ---------- */
  const selects = $('#selects');
  [10, 11].forEach(n => {
    const p = byN(n);
    if (!selects || !p) return;
    const box = h('section', 'selects');
    box.append(h('h3', 'selects-title', n === 10 ? 'Commercials' : 'Music videos'));
    const ul = h('ul', 'selects-grid');
    p.items.forEach((it, i) => {
      const li = h('li');
      const b = h('button', 'tile');
      b.type = 'button';
      b.dataset.open = n;
      b.dataset.item = i;
      const fig = h('span', 'tile-img');
      const img = new Image();
      img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.width = 800; img.height = 450;
      img.src = 'assets/thumbs/' + it.id + '.jpg';
      fig.append(img, prevVideo('assets/prev/' + it.id + '.mp4'), h('span', 'card-play', '▶ ' + (it.dur || 'Play')));
      b.append(fig, h('span', 'tile-label', it.label));
      if (it.sub) b.append(h('span', 'tile-sub', it.sub));
      li.append(b);
      ul.append(li);
    });
    box.append(ul);
    selects.append(box);
  });

  /* ---------- AI Lab: miniaturas das pranchas ---------- */
  const boards = $('#labBoards');
  const oneTake = byN(4);
  if (boards && oneTake) {
    oneTake.items.forEach((it, i) => {
      if (it.type !== 'image') return;
      const b = h('button');
      b.type = 'button';
      b.dataset.open = 4;
      b.dataset.item = i;
      b.setAttribute('aria-label', it.sub + ': ' + it.label);
      const img = new Image();
      img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.src = it.src;
      b.append(img);
      boards.append(b);
    });
  }

  /* ---------- Hero ---------- */
  const hero = $('#reel');
  const heroVideo = $('#heroVideo');
  const heroToggle = $('#heroToggle');
  const ruler = $('.hero-ruler');
  let heroVisible = true;
  let heroWanted = !reduceMotion;   // o que o visitante quer: tocando ou parado

  function syncHeroBtn() {
    const playing = !heroVideo.paused;
    heroToggle.textContent = playing ? 'Pause' : 'Play';
    heroToggle.setAttribute('aria-label', playing ? 'Pause the background film' : 'Play the background film');
  }
  function playHero() { const p = heroVideo.play(); if (p && p.catch) p.catch(syncHeroBtn); }
  heroVideo.addEventListener('play', syncHeroBtn);
  heroVideo.addEventListener('pause', syncHeroBtn);
  heroToggle.addEventListener('click', () => {
    heroWanted = heroVideo.paused;
    if (heroWanted) playHero(); else heroVideo.pause();
  });
  if (reduceMotion) heroVideo.pause();
  syncHeroBtn();
  /* O filme nunca para: se o navegador pausar (troca de aba, economia de energia, fim do arquivo), volta a tocar. */
  let heroDucked = false;
  function keepHero() { if (heroWanted && heroVideo.paused && !document.hidden) playHero(); }
  heroVideo.addEventListener('pause', () => setTimeout(keepHero, 250));
  heroVideo.addEventListener('ended', () => { heroVideo.currentTime = 0; keepHero(); });
  document.addEventListener('visibilitychange', keepHero);
  setInterval(keepHero, 2000);

  /* Som: o filme abre mudo (regra dos navegadores); o visitante liga. Trilha de base opcional em FF_DATA.heroMusic. */
  const heroSound = $('#heroSound');
  const music = D.heroMusic ? new Audio(D.heroMusic) : null;
  if (music) { music.loop = true; music.volume = .55; music.preload = 'none'; }
  function syncMusic() {
    if (!music) return;
    if (!heroVideo.muted && !heroVideo.paused) {
      if (Math.abs(music.currentTime - heroVideo.currentTime) > .35) music.currentTime = heroVideo.currentTime;   // a trilha anda junto com o filme
      const p = music.play(); if (p && p.catch) p.catch(() => {});
    }
    else music.pause();
  }
  function setSound(on) {
    heroVideo.muted = !on;
    heroVideo.volume = music ? .7 : 1;
    heroSound.textContent = on ? 'Sound on' : 'Sound off';
    heroSound.setAttribute('aria-pressed', String(on));
    heroSound.setAttribute('aria-label', on ? 'Turn the film sound off' : 'Turn the film sound on');
    if (on && heroVideo.paused) { heroWanted = true; playHero(); }
    syncMusic();
  }
  heroSound.addEventListener('click', () => setSound(heroVideo.muted));
  heroVideo.addEventListener('play', syncMusic);
  heroVideo.addEventListener('pause', syncMusic);
  heroVideo.addEventListener('seeked', syncMusic);   // o filme voltou ao início: a trilha volta junto

  /* O select da abertura passa por vários filmes: título, crédito e botão acompanham o trecho. */
  let heroCue = null;
  heroVideo.addEventListener('timeupdate', () => {
    const c = (D.hero || []).find(x => heroVideo.currentTime < x.until);
    if (!c || c === heroCue) return;
    heroCue = c;
    root.dataset.tone = String((D.hero || []).indexOf(c) % 3);   // azul, amarelo, vermelho: troca a cada filme
    $('#heroTitle').textContent = c.title;
    $('#heroCredit').textContent = c.credit;
    const b = $('#heroOpen');
    b.textContent = c.cta;
    b.dataset.open = c.n;
    b.dataset.item = c.item || 0;
  });

  /* Pele B: o raio é a agulha da timeline e anda com o filme. */
  function needle() {
    if (heroVisible && root.dataset.skin === 'storm' && heroVideo.duration) {
      ruler.style.setProperty('--p', (heroVideo.currentTime / heroVideo.duration).toFixed(4));
    }
    requestAnimationFrame(needle);
  }
  requestAnimationFrame(needle);

  /* ---------- Cabeçalho: sólido depois do hero + seção ativa no menu ---------- */
  const top = $('#top');
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      heroVisible = e.isIntersecting;
      top.classList.toggle('is-solid', !e.isIntersecting);
    });
  }, { rootMargin: '-150px 0px 0px 0px' }).observe(hero);

  const links = $$('.nav a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => {
        const on = a.getAttribute('href') === '#' + e.target.id;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-42% 0px -56% 0px' });
  ['reel', 'works', 'ailab', 'info'].forEach(id => spy.observe(document.getElementById(id)));

  /* Loops do AI Lab: carregam e tocam só quando estão na tela. */
  const labVids = $$('.lab-v');
  const labOn = new Set();
  function playLab(v) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
  if (!reduceMotion) {
    const labIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { labOn.add(e.target); playLab(e.target); }
        else { labOn.delete(e.target); e.target.pause(); }
      });
    }, { threshold: .25 });
    labVids.forEach(v => labIO.observe(v));
  }

  /* ---------- Sobre: EN / ES ---------- */
  function setLang(lang) {
    $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('[data-lang-panel]').forEach(p => { p.hidden = p.dataset.langPanel !== lang; });
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  if ((navigator.language || '').toLowerCase().startsWith('es')) setLang('es');

  /* ---------- Player ---------- */
  const dlg = $('#player');
  const stage = $('#pStage');
  const proto = $('#pProto');
  const list = $('#pList');
  let cur = null;
  let curItem = 0;
  let opener = null;

  function mount(i) {
    curItem = i;
    const it = cur.items[i];
    stage.textContent = '';
    let node;
    if (it.type === 'vimeo') {
      node = h('iframe');
      node.src = 'https://player.vimeo.com/video/' + it.id + '?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=' +
        (root.dataset.skin === 'storm' ? 'ffd21f' : '5408ff');
      node.allow = 'autoplay; fullscreen; picture-in-picture';
      node.title = it.label;
    } else if (it.type === 'youtube') {
      node = h('iframe');
      node.referrerPolicy = 'strict-origin-when-cross-origin';
      node.src = 'https://www.youtube-nocookie.com/embed/' + it.id + '?autoplay=1&rel=0&playsinline=1';
      node.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      node.title = it.label;
    } else if (it.type === 'file') {
      node = h('video');
      node.controls = true;
      node.playsInline = true;
      node.autoplay = true;
      if (it.loop) { node.loop = true; node.muted = true; }
      if (it.poster) node.poster = it.poster;
      node.src = it.src;
    } else if (it.type === 'pages') {
      node = h('div', 'stage-pages');
      node.tabIndex = 0;
      node.setAttribute('aria-label', it.label + ', ' + it.count + ' pages. Scroll sideways to read.');
      node.addEventListener('contextmenu', e => e.preventDefault());
      for (let k = 1; k <= it.count; k++) {
        const pg = new Image();
        pg.alt = 'Page ' + k; pg.draggable = false; pg.decoding = 'async';
        pg.loading = k > 3 ? 'lazy' : 'eager';
        pg.width = 960; pg.height = 1280;
        pg.src = it.dir + 'p' + pad2(k) + '.jpg';
        node.append(pg);
      }
    } else if (it.type === 'link') {
      node = h('div', 'stage-link');
      const bg = new Image();
      bg.alt = ''; bg.src = cur.cover;
      const a = h('a', 'btn btn-solid', (it.cta || 'Open') + ' ↗');
      a.href = it.href; a.target = '_blank'; a.rel = 'noopener';
      node.append(bg, a);
    } else {
      node = new Image();
      node.alt = it.label;
      node.src = it.src;
    }
    stage.append(node);
    proto.hidden = !it.proto;
    proto.textContent = it.proto || '';
    $$('button', list).forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
  }

  function openProject(n, item) {
    const p = byN(n);
    if (!p) return;
    cur = p;
    $('#pCount').textContent = pad2(p.n) + ' / ' + pad2(D.projects.length);
    $('#pKind').textContent = p.kind;
    $('#pTitle').textContent = p.title;
    $('#pMeta').textContent = [p.role, p.with, p.year].filter(Boolean).join(' · ');
    $('#pAward').textContent = p.award || '';

    list.textContent = '';
    if (p.items.length > 1) {
      p.items.forEach((it, i) => {
        const li = h('li');
        const b = h('button');
        b.type = 'button';
        b.append(h('span', 'pl-label', it.label));
        if (it.dur) b.append(h('span', 'pl-dur', it.dur));
        if (it.sub) b.append(h('span', 'pl-sub', it.sub));
        b.addEventListener('click', () => { mount(i); dlg.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });
        li.append(b);
        list.append(li);
      });
    }

    const desc = $('#pDesc');
    desc.textContent = '';
    p.desc.forEach(t => desc.append(h('p', '', t)));
    $('#pCredits').textContent = p.credits || '';

    const linksBox = $('#pLinks');
    linksBox.textContent = '';
    (p.buy ? [{ label: 'Buy on Amazon', href: p.buy, solid: true }] : []).concat(p.links || []).forEach(l => {
      const a = h('a', 'btn ' + (l.solid ? 'btn-solid' : 'btn-ghost'), l.label + ' ↗');
      a.href = l.href; a.target = '_blank'; a.rel = 'noopener';
      linksBox.append(a);
    });

    if (!dlg.open) {
      opener = document.activeElement;
      heroDucked = !heroVideo.muted;   // o filme da abertura segue rodando atrás, só fica mudo enquanto o player está aberto
      heroVideo.muted = true; syncMusic();
      labVids.forEach(v => v.pause());
      dlg.showModal();
    }
    mount(Math.min(item || 0, p.items.length - 1));
    dlg.scrollTop = 0;
  }

  function step(d) {
    const i = D.projects.indexOf(cur);
    const next = D.projects[(i + d + D.projects.length) % D.projects.length];
    openProject(next.n, 0);
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-open]');
    if (t) openProject(t.dataset.open, Number(t.dataset.item) || 0);
  });
  $('#pClose').addEventListener('click', () => dlg.close());
  $('#pPrev').addEventListener('click', () => step(-1));
  $('#pNext').addEventListener('click', () => step(1));
  dlg.addEventListener('close', () => {
    if (dlg.open) return;            // o evento chega atrasado: se já reabriu, não limpa o que acabou de montar
    stage.textContent = '';          // tira o iframe/vídeo: para o som
    cur = null;
    if (heroDucked) { heroVideo.muted = false; heroDucked = false; }
    if (heroWanted) playHero();
    syncMusic();
    labOn.forEach(playLab);
    if (opener && opener.focus) opener.focus();
  });

  /* Link direto para um projeto: index.html#work-3 abre o projeto 03. */
  const deep = /^#work-(\d+)$/.exec(location.hash);
  if (deep && byN(deep[1])) openProject(deep[1], 0);
})();
