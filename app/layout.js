import './globals.css';
import Shell from '../components/Shell';

export const metadata = {
  title: 'Green Tech Home Installation · External Wall Insulation, Dublin',
  description: 'External wall insulation in Dublin. Rock wool or EPS polystyrene, mesh and basecoat, acrylic and trowelled finishes, fitted from the starting rail to the last gutter bracket.'
};
export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;700;800&family=DM+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@600;800&family=Plus+Jakarta+Sans:wght@500;700;800&family=Barlow+Condensed:wght@600;700&family=JetBrains+Mono:wght@400;500;700&family=Work+Sans:wght@400;500;700&family=Young+Serif&display=swap" />
      </head>
      <body>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
          <filter id="thermal" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values=".33 .33 .33 0 0  .33 .33 .33 0 0  .33 .33 .33 0 0  0 0 0 1 0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.05 0.25 0.6 0.95 1 1" />
              <feFuncG type="table" tableValues="0 0 0.1 0.45 0.85 1" />
              <feFuncB type="table" tableValues="0.25 0.6 0.5 0.15 0.1 0.6" />
            </feComponentTransfer>
          </filter>
        </svg>
        <div id="prog" />
        <canvas id="fx" aria-hidden="true" />
        <div id="cur-d" aria-hidden="true" />
        <div id="cur-r" aria-hidden="true" />
        <div id="wipe" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        {children}
        <Shell />
      </body>
    </html>
  );
}
