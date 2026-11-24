/* Motion engine: cursor, split text, parallax, tilt, counters, compare sliders, page wipe + one canvas world per design */
export function initFX() {
  if (window.FX) return window.FX;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var mouse = { x: innerWidth / 2, y: innerHeight / 2, vx: 0, vy: 0, down: false };
  var cv = document.getElementById('fx'), cx = cv.getContext('2d');
  var W = 0, H = 0, DPR = Math.min(2, devicePixelRatio || 1), world = null, raf = 0;

  function resize() {
    W = innerWidth; H = innerHeight;
    cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (world && world.resize) world.resize();
  }
  addEventListener('resize', resize);
  addEventListener('mousemove', function (e) { mouse.vx = e.clientX - mouse.x; mouse.vy = e.clientY - mouse.y; mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) { mouse.vx = t.clientX - mouse.x; mouse.vy = t.clientY - mouse.y; mouse.x = t.clientX; mouse.y = t.clientY; } }, { passive: true });
  addEventListener('mousedown', function () { mouse.down = true; });
  addEventListener('mouseup', function () { mouse.down = false; });

  /* ---------- worlds ---------- */
  var worlds = {};

  // 1 FACADE: drifting insulation boards that dodge the cursor
  worlds[1] = function () {
    var cols = ['#2F7D5B', '#E9CC6B', '#B7B2A8', '#17261F', '#8fbf9f'], bs = [], i;
    for (i = 0; i < 46; i++) bs.push({ x: Math.random() * W, y: Math.random() * H, w: 40 + Math.random() * 90, h: 14 + Math.random() * 30, r: Math.random() * 6, vr: (Math.random() - .5) * .006, vx: (Math.random() - .5) * .3, vy: -.1 - Math.random() * .35, c: cols[i % 5], z: .3 + Math.random() * .9 });
    return {
      resize: function () { },
      frame: function (t) {
        cx.clearRect(0, 0, W, H);
        var sy = scrollY;
        bs.forEach(function (b) {
          var dx = b.x - mouse.x, dy = (b.y - sy * b.z * .15) - mouse.y, d = Math.hypot(dx, dy);
          if (d < 160) { b.vx += dx / d * .06; b.vy += dy / d * .06; }
          b.vx *= .985; b.vy = b.vy * .985 + (-.12 - b.vy) * .004;
          b.x += b.vx; b.y += b.vy; b.r += b.vr + b.vx * .002;
          if (b.y < -80) { b.y = H + 80; b.x = Math.random() * W; }
          if (b.x < -120) b.x = W + 100; if (b.x > W + 120) b.x = -100;
          var py = b.y - sy * b.z * .15;
          cx.save(); cx.translate(b.x, ((py % (H + 160)) + H + 160) % (H + 160) - 80); cx.rotate(b.r);
          cx.globalAlpha = .13 + b.z * .12; cx.fillStyle = b.c;
          cx.beginPath(); cx.roundRect ? cx.roundRect(-b.w / 2, -b.h / 2, b.w, b.h, 6) : cx.rect(-b.w / 2, -b.h / 2, b.w, b.h); cx.fill();
          cx.globalAlpha = .1; cx.strokeStyle = '#17261F'; cx.stroke();
          cx.restore();
        });
      }
    };
  };

  // 2 THERMAL: live heat-diffusion field. Move the mouse to heat the wall.
  worlds[2] = function () {
    var gw, gh, a, b, oc, octx, img, S = 12, ramp = [];
    function build() {
      gw = Math.ceil(W / S); gh = Math.ceil(H / S);
      a = new Float32Array(gw * gh); b = new Float32Array(gw * gh);
      oc = document.createElement('canvas'); oc.width = gw; oc.height = gh; octx = oc.getContext('2d'); img = octx.createImageData(gw, gh);
    }
    var stops = [[0, 13, 15, 31, 0], [.18, 42, 47, 143, .35], [.4, 123, 97, 255, .55], [.65, 255, 77, 109, .75], [.85, 255, 183, 3, .85], [1, 255, 242, 160, .95]];
    for (var i = 0; i < 256; i++) {
      var v = i / 255, k = 0; while (k < stops.length - 2 && v > stops[k + 1][0]) k++;
      var s0 = stops[k], s1 = stops[k + 1], u = Math.min(1, Math.max(0, (v - s0[0]) / (s1[0] - s0[0])));
      ramp.push([0, 1, 2, 3, 4].slice(1).map(function (j) { return s0[j] + (s1[j] - s0[j]) * u; }));
    }
    build();
    function heat(px, py, r, amt) {
      var gx = px / S, gy = py / S, x, y;
      for (y = Math.max(0, gy - r | 0); y < Math.min(gh, gy + r + 1); y++) for (x = Math.max(0, gx - r | 0); x < Math.min(gw, gx + r + 1); x++) {
        var d = Math.hypot(x - gx, y - gy); if (d < r) a[y * gw + x] = Math.min(1.4, a[y * gw + x] + amt * (1 - d / r));
      }
    }
    return {
      resize: build,
      frame: function (t) {
        var sp = Math.hypot(mouse.vx, mouse.vy);
        heat(mouse.x, mouse.y, 5, .06 + Math.min(.3, sp * .01) + (mouse.down ? .2 : 0));
        for (var k = 0; k < 3; k++) heat(W * (.5 + .45 * Math.sin(t / 2400 + k * 2.1)), H * (.5 + .4 * Math.cos(t / 3100 + k * 1.7)), 4, .035);
        var x, y, i, n, d = img.data;
        for (y = 1; y < gh - 1; y++) for (x = 1; x < gw - 1; x++) {
          i = y * gw + x; n = (a[i - 1] + a[i + 1] + a[i - gw] + a[i + gw]) * .25;
          b[i] = (a[i] * .4 + n * .6) * .972;
          var v = Math.min(255, Math.max(0, b[i] * 255 | 0)), c = ramp[v], p = i * 4;
          d[p] = c[0]; d[p + 1] = c[1]; d[p + 2] = c[2]; d[p + 3] = c[3] * 255;
        }
        var tm = a; a = b; b = tm;
        octx.putImageData(img, 0, 0);
        cx.clearRect(0, 0, W, H); cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = 'high'; cx.drawImage(oc, 0, 0, W, H);
      }
    };
  };

  // 3 GRANT: floating coins & shapes, click anywhere for a confetti burst
  var parts = [];
  function burst(x, y, n) {
    var cols = ['#1F3BFF', '#FFD60A', '#0B1033', '#FF4D6D', '#2BD4A0'], i;
    for (i = 0; i < (n || 60); i++) { var an = Math.random() * 6.283, sp = 3 + Math.random() * 9; parts.push({ x: x, y: y, vx: Math.cos(an) * sp, vy: Math.sin(an) * sp - 5, r: Math.random() * 6, vr: (Math.random() - .5) * .4, s: 6 + Math.random() * 10, c: cols[i % 5], g: 1, life: 1, k: i % 3 }); }
  }
  worlds[3] = function () {
    var amb = [], i, onclick = function (e) { burst(e.clientX, e.clientY, 70); };
    for (i = 0; i < 26; i++) amb.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 6, vr: (Math.random() - .5) * .02, s: 14 + Math.random() * 26, vy: .2 + Math.random() * .5, c: i % 3 ? '#1F3BFF' : '#FFD60A', k: i % 4, p: Math.random() * 6 });
    addEventListener('click', onclick);
    return {
      destroy: function () { removeEventListener('click', onclick); },
      resize: function () { },
      frame: function (t) {
        cx.clearRect(0, 0, W, H);
        amb.forEach(function (o) {
          o.y += o.vy; o.r += o.vr; if (o.y > H + 40) { o.y = -40; o.x = Math.random() * W; }
          var x = o.x + Math.sin(t / 900 + o.p) * 24;
          cx.save(); cx.translate(x, o.y); cx.rotate(o.r); cx.globalAlpha = .16; cx.fillStyle = o.c;
          if (o.k === 0) { cx.beginPath(); cx.arc(0, 0, o.s / 2, 0, 6.283); cx.fill(); cx.globalAlpha = .5; cx.fillStyle = '#0B1033'; cx.font = '700 ' + o.s * .7 + 'px Plus Jakarta Sans'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('€', 0, 1); }
          else if (o.k === 1) cx.fillRect(-o.s / 2, -o.s / 2, o.s, o.s);
          else if (o.k === 2) { cx.beginPath(); cx.moveTo(0, -o.s / 2); cx.lineTo(o.s / 2, o.s / 2); cx.lineTo(-o.s / 2, o.s / 2); cx.fill(); }
          else { cx.beginPath(); cx.arc(0, 0, o.s / 3, 0, 6.283); cx.lineWidth = 4; cx.strokeStyle = o.c; cx.stroke(); }
          cx.restore();
        });
        for (var j = parts.length - 1; j >= 0; j--) {
          var p = parts[j]; p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= .011;
          if (p.life <= 0 || p.y > H + 30) { parts.splice(j, 1); continue; }
          cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.globalAlpha = Math.min(1, p.life * 1.6); cx.fillStyle = p.c;
          if (p.k === 0) { cx.beginPath(); cx.arc(0, 0, p.s / 2, 0, 6.283); cx.fill(); } else if (p.k === 1) cx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .66); else { cx.beginPath(); cx.moveTo(0, -p.s / 2); cx.lineTo(p.s / 2, p.s / 2); cx.lineTo(-p.s / 2, p.s / 2); cx.fill(); }
          cx.restore();
        }
      }
    };
  };

  // 4 BLUEPRINT: rotating 3D wireframe house you can steer with the mouse
  worlds[4] = function () {
    var V = [[-1.6, 0, -1], [1.6, 0, -1], [1.6, 0, 1], [-1.6, 0, 1], [-1.6, 1.5, -1], [1.6, 1.5, -1], [1.6, 1.5, 1], [-1.6, 1.5, 1], [0, 2.5, -1], [0, 2.5, 1],
      [-1.1, .3, 1], [-.5, .3, 1], [-.5, 1.1, 1], [-1.1, 1.1, 1], [.5, .3, 1], [1.1, .3, 1], [1.1, 1.1, 1], [.5, 1.1, 1], [-.2, 0, 1], [.2, 0, 1], [.2, .9, 1], [-.2, .9, 1], [-1.6, 1.5, -1.0]];
    var E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7], [4, 8], [5, 8], [6, 9], [7, 9], [8, 9], [10, 11], [11, 12], [12, 13], [13, 10], [14, 15], [15, 16], [16, 17], [17, 14], [18, 19], [19, 20], [20, 21], [21, 18]];
    var ang = 0, tilt = .35, rot = 0;
    return {
      resize: function () { },
      frame: function (t) {
        cx.clearRect(0, 0, W, H);
        var mx = (mouse.x / W - .5), my = (mouse.y / H - .5);
        ang += .006 + mx * .02; tilt += (.25 + my * .5 - tilt) * .05;
        var cxp = W * (W > 900 ? .76 : .5), cyp = H * .5, sc = Math.min(W, H) * (W > 900 ? .2 : .14);
        cx.save(); cx.globalAlpha = W > 900 ? .55 : .22;
        // ground grid
        cx.strokeStyle = 'rgba(191,227,255,.35)'; cx.lineWidth = 1;
        var P = function (x, y, z) {
          var c = Math.cos(ang), s = Math.sin(ang), X = x * c - z * s, Z = x * s + z * c, cy2 = Math.cos(tilt), sy2 = Math.sin(tilt), Y = y * cy2 - Z * sy2, Z2 = y * sy2 + Z * cy2, f = 6 / (6 + Z2);
          return [cxp + X * sc * f, cyp - (Y - 1) * sc * f];
        };
        for (var g = -5; g <= 5; g++) { var a1 = P(g * .6, 0, -3), a2 = P(g * .6, 0, 3), b1 = P(-3, 0, g * .6), b2 = P(3, 0, g * .6); cx.beginPath(); cx.moveTo(a1[0], a1[1]); cx.lineTo(a2[0], a2[1]); cx.moveTo(b1[0], b1[1]); cx.lineTo(b2[0], b2[1]); cx.stroke(); }
        // insulation shell pulses outward
        var pul = 1 + .08 * Math.sin(t / 600);
        cx.strokeStyle = 'rgba(255,209,102,.55)'; cx.setLineDash([6, 6]); cx.lineDashOffset = -t / 40;
        E.slice(0, 17).forEach(function (e) { var A = V[e[0]], B = V[e[1]], p = P(A[0] * pul, A[1] * pul, A[2] * pul), q = P(B[0] * pul, B[1] * pul, B[2] * pul); cx.beginPath(); cx.moveTo(p[0], p[1]); cx.lineTo(q[0], q[1]); cx.stroke(); });
        cx.setLineDash([]); cx.strokeStyle = '#BFE3FF'; cx.lineWidth = 2;
        E.forEach(function (e, i) { var p = P.apply(0, V[e[0]]), q = P.apply(0, V[e[1]]); cx.strokeStyle = i >= 12 && i <= 16 ? '#FFD166' : '#BFE3FF'; cx.beginPath(); cx.moveTo(p[0], p[1]); cx.lineTo(q[0], q[1]); cx.stroke(); });
        // scan plane
        var sy = ((t / 20) % 100) / 100 * 2.6, l1 = P(-2.2, sy, 0), l2 = P(2.2, sy, 0); cx.strokeStyle = '#FFD166'; cx.lineWidth = 3; cx.beginPath(); cx.moveTo(l1[0], l1[1]); cx.lineTo(l2[0], l2[1]); cx.stroke();
        cx.restore();
      }
    };
  };

  // 5 FINISH: trowel strokes of plaster follow the cursor and an auto-trowel sweeps the wall
  worlds[5] = function () {
    var pal = ['#E3A82B', '#BFD3C4', '#EBD9A8', '#C9C5BA', '#F7F8F4'], ci = 0, lx = mouse.x, ly = mouse.y, sw = 0;
    function stroke(x1, y1, x2, y2, w, c, al) {
      cx.save(); cx.globalAlpha = al; cx.strokeStyle = c; cx.lineWidth = w; cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(x1, y1); cx.lineTo(x2, y2); cx.stroke(); cx.restore();
    }
    return {
      resize: function () { },
      frame: function (t) {
        cx.save(); cx.globalCompositeOperation = 'destination-out'; cx.fillStyle = 'rgba(0,0,0,.012)'; cx.fillRect(0, 0, W, H); cx.restore();
        var sp = Math.hypot(mouse.x - lx, mouse.y - ly);
        if (sp > 2) { ci = (ci + (sp > 30 ? 1 : 0)) % pal.length; stroke(lx, ly, mouse.x, mouse.y, 26 + Math.min(50, sp), pal[(t / 700 | 0) % pal.length], .32); }
        lx = mouse.x; ly = mouse.y;
        // auto trowel
        sw += .0045; var px = W * (.5 + .55 * Math.sin(sw)), py = H * (.5 + .38 * Math.sin(sw * 1.7 + 1)), ppx = W * (.5 + .55 * Math.sin(sw - .0045)), ppy = H * (.5 + .38 * Math.sin((sw - .0045) * 1.7 + 1));
        stroke(ppx, ppy, px, py, 70, pal[(sw * 2 | 0) % pal.length], .12);
      }
    };
  };

  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (world && !document.hidden) world.frame(t);
  }
  function setWorld(d) {
    if (world && world.destroy) world.destroy();
    cx.clearRect(0, 0, W, H); parts.length = 0;
    world = worlds[d]();
    cv.dataset.d = d;
    if (!raf) raf = requestAnimationFrame(loop);
  }

  /* ---------- text, scroll, hover ---------- */
  function split(root) {
    [].forEach.call(root.querySelectorAll('[data-split]'), function (el) {
      if (el.dataset.done) return; el.dataset.done = 1;
      var txt = el.textContent, i = 0, html = '';
      txt.split(/\s+/).forEach(function (w, wi) {
        html += '<span class="w">';
        w.split('').forEach(function (c) { html += '<span class="ch" style="--i:' + (i++) + '">' + c + '</span>'; });
        html += '</span> ';
      });
      el.setAttribute('aria-label', txt); el.innerHTML = html;
    });
  }
  var io;
  function reveal(root) {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in'); io.unobserve(e.target);
          if (e.target.dataset.count) count(e.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -5% 0px' });
    [].forEach.call(root.querySelectorAll('.rv,[data-count],.draw'), function (e) { io.observe(e); });
  }
  function count(el) {
    var to = +el.dataset.count, pre = el.dataset.pre || '', suf = el.dataset.suf || '', t0 = performance.now(), dur = 1800;
    (function s(t) { var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4); el.textContent = pre + Math.round(to * e).toLocaleString('en-IE') + suf; if (p < 1) requestAnimationFrame(s); })(t0);
  }
  var parEls = [];
  function bind(root) {
    parEls = [].slice.call(root.querySelectorAll('[data-par]'));
    if (reduce) return;
    [].forEach.call(root.querySelectorAll('[data-tilt]'), function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(900px) rotateY(' + (x * 12) + 'deg) rotateX(' + (-y * 12) + 'deg) translateZ(0)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
    [].forEach.call(root.querySelectorAll('[data-mag]'), function (el) {
      el.addEventListener('mousemove', function (e) { var r = el.getBoundingClientRect(); el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .25) + 'px,' + ((e.clientY - r.top - r.height / 2) * .35) + 'px)'; });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
    // compare sliders
    [].forEach.call(root.querySelectorAll('.cmp'), function (c) {
      var user = false, drag = false, t0 = performance.now();
      function set(p) { p = Math.min(100, Math.max(0, p)); c.style.setProperty('--p', p + '%'); c.setAttribute('aria-valuenow', Math.round(p)); }
      function at(e) { var r = c.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); }
      c.addEventListener('pointerdown', function (e) { drag = user = true; c.setPointerCapture(e.pointerId); at(e); });
      c.addEventListener('pointermove', function (e) { if (drag) at(e); });
      c.addEventListener('pointerup', function () { drag = false; });
      c.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { user = true; set(parseFloat(c.style.getPropertyValue('--p')) - 5); } if (e.key === 'ArrowRight') { user = true; set(parseFloat(c.style.getPropertyValue('--p')) + 5); } });
      (function auto(t) { if (!c.isConnected) return; if (!user) set(50 + 42 * Math.sin((t - t0) / 1500)); requestAnimationFrame(auto); })(t0);
    });
  }
  function onScroll() {
    var vh = innerHeight;
    parEls.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect(), f = parseFloat(el.dataset.par) || .1;
      el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - vh / 2) * -f).toFixed(1) + 'px,0)';
    });
    var h = document.documentElement.scrollHeight - vh;
    document.getElementById('prog').style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')';
  }
  var sr = 0; addEventListener('scroll', function () { if (!sr) sr = requestAnimationFrame(function () { sr = 0; onScroll(); }); }, { passive: true });

  /* ---------- cursor ---------- */
  var dot = document.getElementById('cur-d'), ring = document.getElementById('cur-r'), rx = 0, ry = 0;
  if (fine && !reduce) {
    document.documentElement.classList.add('cursor');
    (function cl() {
      rx += (mouse.x - rx) * .16; ry += (mouse.y - ry) * .16;
      dot.style.transform = 'translate(' + mouse.x + 'px,' + mouse.y + 'px)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(cl);
    })();
    document.addEventListener('mouseover', function (e) { ring.classList.toggle('big', !!(e.target.closest && e.target.closest('a,button,summary,.cmp,[data-cur]'))); });
  }

  /* ---------- page wipe ---------- */
  var wipe = document.getElementById('wipe');
  function transition(mid) {
    if (reduce) { mid(); return; }
    wipe.className = 'in';
    setTimeout(function () { mid(); wipe.className = 'out'; setTimeout(function () { wipe.className = ''; }, 800); }, 650);
  }

  resize();
  window.FX = { setWorld: setWorld, split: split, reveal: reveal, bind: bind, scroll: onScroll, transition: transition, burst: burst, mouse: mouse, reduce: reduce };
  return window.FX;
}
