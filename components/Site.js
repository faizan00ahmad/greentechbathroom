'use client';
import { useEffect } from 'react';
import { initFX } from '../lib/fx';

// The server renders the page HTML (full SEO, instant paint). The client then wakes the motion layer.
export default function Site({ d, p, html }) {
  useEffect(() => {
    const FX = initFX();
    const app = document.getElementById('app');
    window.scrollTo(0, 0);
    FX.split(app);
    FX.reveal(app);
    FX.bind(app);
    FX.scroll();
    if (document.body.dataset.world !== String(d)) {
      FX.setWorld(d);
      document.body.dataset.world = String(d);
    }
    document.body.dataset.d = d;
  }, [d, p]);
  return (
    <div className={'site d' + d}>
      <div className="bgfix" />
      <div id="app" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
