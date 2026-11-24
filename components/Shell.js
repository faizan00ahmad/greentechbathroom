'use client';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { initFX } from '../lib/fx';
import { PIC } from '../lib/pics';
import { PROJECTS } from '../lib/site';

const NAMES = ['Facade', 'Thermal', 'Grant', 'Blueprint', 'Finish'];
const WIPE = ['#17261F', '#7B61FF', '#1F3BFF', '#FFD166', '#E3A82B'];

export default function Shell() {
  const router = useRouter();
  const path = usePathname() || '';
  const m = /^\/([1-5])\/(\w+)/.exec(path) || [];
  const d = +m[1] || 1;
  const p = m[2] || 'home';
  const tog = useRef(null);
  const pill = useRef(null);
  const state = useRef({ d, p });
  state.current = { d, p };

  const go = (href) => {
    if (href === window.location.pathname) return;
    const FX = initFX();
    const nd = +((/^\/([1-5])\//.exec(href) || [])[1]) || 1;
    document.documentElement.style.setProperty('--wipe', WIPE[nd - 1]);
    FX.transition(() => router.push(href, { scroll: false }));
  };
  const goRef = useRef(go);
  goRef.current = go;

  // sliding pill under the switcher
  useEffect(() => {
    const place = () => {
      const b = tog.current && tog.current.querySelector('[aria-pressed="true"]');
      if (!b || !pill.current) return;
      pill.current.style.width = b.offsetWidth + 'px';
      pill.current.style.transform = 'translateX(' + b.offsetLeft + 'px)';
      b.scrollIntoView({ block: 'nearest', inline: 'center' });
    };
    place();
    window.addEventListener('resize', place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [d]);

  // global interactions: links, calculator, filters, lightbox, form
  useEffect(() => {
    const FX = initFX();
    const closeLb = () => {
      const l = document.querySelector('.lb');
      if (l) { l.remove(); document.body.style.overflow = ''; }
    };
    const lightbox = (i) => {
      closeLb();
      const pr = PROJECTS[i];
      const cd = state.current.d;
      const el = document.createElement('div');
      el.className = 'lb d' + cd;
      el.innerHTML =
        '<div class="lb-bg"></div><div class="lb-box"><button class="lb-x" aria-label="Close">×</button>' +
        '<div class="lb-img">' + PIC.photo(pr[3], pr[0]) + '</div>' +
        '<div class="lb-c"><div><h3>' + pr[0] + '</h3><p>' + pr[4] + ' Example photo: replace with your own project photos.</p></div><a class="btn" href="/' + cd + '/contact">Request a survey</a></div></div>';
      document.body.appendChild(el);
      FX.bind(el);
      requestAnimationFrame(() => el.classList.add('open'));
      document.body.style.overflow = 'hidden';
    };
    const onClick = (e) => {
      const t = e.target;
      const a = t.closest && t.closest('a[href]');
      if (a) {
        const h = a.getAttribute('href');
        if (/^\/[1-5]\/\w+$/.test(h) && !e.metaKey && !e.ctrlKey) { e.preventDefault(); closeLb(); goRef.current(h); return; }
        if (h && h[0] === '#' && h.length > 1) {
          const el = document.getElementById(h.slice(1));
          if (el) { e.preventDefault(); el.scrollIntoView({ behavior: FX.reduce ? 'auto' : 'smooth' }); }
        }
      }
      const app = document.getElementById('app');
      const tb = t.closest && t.closest('button[data-grp]');
      if (tb && app) {
        const g = tb.dataset.grp, i = tb.dataset.i;
        app.querySelectorAll('button[data-grp="' + g + '"]').forEach((x) => x.classList.toggle('on', x === tb));
        app.querySelectorAll('div[data-grp="' + g + '"]').forEach((x) => { x.hidden = x.dataset.i !== i; });
        if (g === 'is') {
          const r = tb.getBoundingClientRect();
          FX.burst(r.left + r.width / 2, r.top, 40);
          app.querySelectorAll('.bars i').forEach((b) => b.classList.toggle('sel', b.dataset.bar === i));
        }
      }
      const f = t.closest && t.closest('.chip-b');
      if (f && app) {
        app.querySelectorAll('.chip-b').forEach((x) => x.classList.toggle('on', x === f));
        app.querySelectorAll('.proj').forEach((pj) => pj.classList.toggle('off', !(f.dataset.f === 'all' || pj.dataset.type === f.dataset.f)));
      }
      const pj = t.closest && t.closest('.proj');
      if (pj) lightbox(+pj.dataset.i);
      if (t.closest && (t.closest('.lb-x') || (t.classList && t.classList.contains('lb-bg')))) closeLb();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('proj')) lightbox(+e.target.dataset.i);
    };
    const onSubmit = (e) => {
      e.preventDefault();
      const f = e.target;
      if (!f.checkValidity()) { f.reportValidity(); return; }
      f.classList.add('sent');
      f.querySelector('.ok').hidden = false;
      const r = f.querySelector('button').getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top, 90);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('submit', onSubmit);
    };
  }, []);

  const onKeys = (e) => {
    const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!k) return;
    go('/' + (((d - 1 + k + 5) % 5) + 1) + '/' + p);
  };

  return (
    <nav id="tog" ref={tog} aria-label="Choose a design" onKeyDown={onKeys}>
      <div className="pill" ref={pill} aria-hidden="true" />
      {NAMES.map((n, i) => (
        <button key={n} type="button" aria-pressed={d === i + 1} onClick={() => go('/' + (i + 1) + '/' + p)}>
          <i>{i + 1}</i>
          <span>{n}</span>
        </button>
      ))}
    </nav>
  );
}
