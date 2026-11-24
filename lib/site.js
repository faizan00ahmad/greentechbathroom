import { PIC } from "./pics.js";
var P = PIC;
  var NAME = ['', 'Facade', 'Thermal', 'Grant', 'Blueprint', 'Finish'];
  var BRAND = ['', 'Green Tech<br>Home Installation', 'GREEN TECH', 'Green Tech Home', 'Green Tech Home', 'Green Tech Home'];
  var PAGES = [['home', 'Home'], ['services', 'Services'], ['projects', 'Projects'], ['contact', 'Contact']];
  var LOGO = {
    1: '<svg width="42" height="42" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#17261F"/><path d="M8 21 20 10l12 11v10H8z" fill="#2F7D5B"/><path d="M20 28c0-5 3-8 8-9 0 5-3 8-8 9z" fill="#F2F3EE"/></svg>',
    2: '<svg width="36" height="36" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="16" fill="none" stroke="#4CC9F0" stroke-width="2"/><path d="M8 18 17 10l9 8v8H8z" fill="#7B61FF"/></svg>',
    3: '<svg width="40" height="40" viewBox="0 0 38 38" aria-hidden="true"><rect width="38" height="38" rx="11" fill="#1F3BFF"/><path d="M8 20 19 10l11 10v9H8z" fill="#FFD60A"/></svg>',
    4: '<svg width="38" height="38" viewBox="0 0 36 36" aria-hidden="true"><rect x="2" y="2" width="32" height="32" fill="none" stroke="#BFE3FF" stroke-width="2"/><path d="M8 20 18 11l10 9v8H8z" fill="none" stroke="#FFD166" stroke-width="2"/></svg>',
    5: '<svg width="40" height="40" viewBox="0 0 38 38" aria-hidden="true"><circle cx="19" cy="19" r="19" fill="#1E3B2C"/><path d="M9 21 19 11l10 10v8H9z" fill="#E3A82B"/></svg>'
  };
  var SERV = [
    { t: 'Insulation boards', d: 'Rock wool and EPS polystyrene systems, fitted from the starting rail up to the finish.', pic: 'boards', li: ['Rock wool or EPS polystyrene', 'Starting rail set level', 'Boards fixed course by course, joints staggered'] },
    { t: 'Mesh and basecoat', d: 'Reinforcing mesh embedded in basecoat to make a hard, even surface.', pic: 'mesh', li: ['Mesh embedded in basecoat', 'Corners and openings reinforced', 'Flat base ready for the finish'] },
    { t: 'Acrylic and trowelled finishes', d: 'Decorative trowelled render and acrylic finishes in the colour and texture you choose.', pic: 'trowel', li: ['Acrylic: smooth, even colour', 'Trowelled: hand-worked texture', 'Colour and texture chosen with you'] },
    { t: 'Lintels, corners, stone', d: 'False lintels, false corner stones and decorative stone built into the insulation.', pic: 'stone', li: ['False lintels over openings', 'False corner stones', 'Decorative stone in panels or full elevations'] },
    { t: 'Aluminium window sills', d: 'New aluminium sills installed so the deeper wall still sheds water cleanly.', pic: 'sill', li: ['Water drains clear of the thicker wall', 'Reveals wrapped, not stopped at the frame'] },
    { t: 'Gutters and fittings', d: 'Gutters and accessories fixed to the facade are removed and reinstalled when we finish.', pic: 'gutter', li: ['Removed before the wrap', 'Refitted when the work is done'] }
  ];
  var TAGS = [['Rock wool', 'EPS polystyrene'], ['Mesh', 'Basecoat'], ['Acrylic', 'Trowelled'], ['Lintels', 'Corner stones', 'Stone'], ['Aluminium', 'Water-shedding'], ['Removed', 'Refitted']];
  var ICONS = [
    '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="22" height="18" rx="2"/><path d="M3 11h22M3 17h22M14 5v6M9 11v6M19 11v6"/></svg>',
    '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 3h22v22H3zM3 10h22M3 17h22M10 3v22M17 3v22"/></svg>',
    '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22 18 8l6 6L10 28zM18 8l3-3 4 4-3 3"/></svg>',
    '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="2" y="9" width="24" height="6"/><rect x="2" y="15" width="8" height="8"/><rect x="18" y="15" width="8" height="8"/></svg>',
    '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="3" width="18" height="16"/><path d="M2 22h24M5 19v3M23 19v3"/></svg>',
    '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 8h24v5H2zM22 13v10M20 23h4"/></svg>'];
  var CUR = 1;
  var STEPS = [['Survey', 'We inspect the walls and plan details around windows, eaves and corners.'], ['Starting rail and boards', 'Rail set level, boards fixed course by course, joints staggered.'], ['Mesh and basecoat', 'Mesh embedded in basecoat, corners and openings reinforced.'], ['Finish and details', 'Acrylic or trowelled render, lintels, corner stones and stone.'], ['Sills and gutters', 'Aluminium sills fitted, gutters and accessories put back.']];
  var PROJ = [
    ['Boards fixed on scaffold', 'insulation', 'Insulation boards', 'ewi-scaffold-2', 'Insulation boards fixed course by course on a scaffolded building.'],
    ['Whole house wrapped in boards', 'insulation', 'Insulation boards', 'house-build', 'The full house wrapped before mesh and basecoat go on.'],
    ['EPS boards going up', 'insulation', 'EPS polystyrene', 'eps-boards', 'EPS polystyrene boards fitted from the starting rail up.'],
    ['Mesh over the insulation', 'render', 'Mesh and basecoat', 'mesh', 'Reinforcing mesh embedded in basecoat for a hard, even surface.'],
    ['Render going on', 'render', 'Render', 'render-workers', 'Render applied to the wall from the scaffold.'],
    ['Hand-finished trowel work', 'render', 'Trowelled finish', 'trowel', 'Trowelled render worked by hand so the texture catches the light.'],
    ['Stone detail on render', 'stone', 'Decorative stone', 'stone-house', 'Decorative stone built into the insulation against a clean render.'],
    ['Stone and window sill', 'stone', 'Decorative stone', 'stone-window', 'Stone finish with a crisp sill under the opening.'],
    ['Lintel and sill on render', 'windows', 'Lintels and sills', 'window-lintel', 'A shaped lintel and sill restore the proportions around the window.'],
    ['Coloured render, clean sill', 'windows', 'Aluminium sills', 'sill-purple', 'Colour render with a sill that sheds water clear of the wall.'],
    ['Gutter refitted and working', 'gutters', 'Gutters', 'gutter-rain', 'Gutters removed for the wrap and put back when we finish.'],
    ['Downpipe on coloured render', 'gutters', 'Gutters', 'drainpipe-blue', 'Downpipe and fittings refitted neatly on the finished wall.'],
    ['Finished white facade', 'render', 'Acrylic finish', 'house-white', 'A smooth acrylic finish, even colour from eaves to plinth.']];
  var GRANTS = [['Detached house', '€8,000', 100], ['Semi-detached house', '€6,000', 75], ['Mid-terrace house', '€3,500', 44], ['Apartment', '€3,000', 38]];
  var WORDS = ['Rock wool', 'EPS polystyrene', 'Mesh and basecoat', 'Acrylic finish', 'Trowelled render', 'False lintels', 'Corner stones', 'Aluminium sills', 'Gutter refit'];

  /* ---------- fragments ---------- */
  function fr(h, c, par) { return '<div class="frame ' + (c || '') + '">' + (par ? '<div class="par" data-par="' + par + '">' + h + '</div>' : h) + '</div>'; }
  function cmp(a, b, la, lb) { return '<div class="cmp" tabindex="0" role="slider" aria-label="Drag to compare before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" style="--p:50%" data-cur><div class="cmp-a">' + a + '</div><div class="cmp-b">' + b + '</div><span class="cmp-l l">' + la + '</span><span class="cmp-l r">' + lb + '</span><i class="cmp-h"><b></b></i></div>'; }
  function marquee(rev) { var w = WORDS.map(function (x) { return '<span>' + x + '</span>'; }).join(''); return '<div class="mq' + (rev ? ' rev' : '') + '" aria-hidden="true"><div class="mqi">' + w + w + w + '</div></div>'; }
  function stats() {
    return '<section class="stats">' + [[8000, '€', '', 'Max SEAI grant, detached home*'], [2, '', '', 'Insulation systems'], [5, '', '', 'Steps, survey to gutters'], [6, '', '', 'Services, one crew']].map(function (s, i) {
      return '<div class="stat rv" style="--d:' + i * .1 + 's"><b data-count="' + s[0] + '" data-pre="' + s[1] + '">0</b><span>' + s[3] + '</span></div>';
    }).join('') + '</section>';
  }
  function cards(n) {
    return SERV.slice(0, n).map(function (s, i) {
      return '<article class="scard rv" style="--d:' + (i % 3) * .12 + 's" data-tilt><div class="scard-img">' + P[s.pic]() + '<span class="scard-n">0' + (i + 1) + '</span><i class="scard-ic">' + ICONS[i] + '</i></div>' +
        '<div class="scard-b"><h3>' + s.t + '</h3><p>' + s.d + '</p><div class="tags">' + TAGS[i].map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div><a class="scard-l" href="/' + CUR + '/services">See the details <b>→</b></a></div></article>';
    }).join('');
  }
  function steps() {
    return '<div class="steps">' + STEPS.map(function (s, i) { return '<div class="step rv" style="--d:' + i * .1 + 's"><div class="line"></div><b>' + (i + 1) + ' ' + s[0] + '</b><span>' + s[1] + '</span></div>'; }).join('') + '</div>';
  }
  function cta(d, h) {
    return '<section class="cta rv"><div><h2 class="h2">' + (h || 'Book a survey for your house.') + '</h2><p>Tell us your Eircode and the best number to reach you. SEAI grant support details: [CONFIRM REGISTRATION NUMBER BEFORE PUBLISHING].</p></div><a class="btn big" data-mag href="/' + d + '/contact">Request a survey</a></section>';
  }
  function head(d, eyebrow, title, lead) {
    return '<section class="phead"><span class="eyebrow rv">' + eyebrow + '</span><h1 data-split>' + title + '</h1><p class="lead rv">' + lead + '</p></section>';
  }
  function header(d, page) {
    return '<header class="hdr"><a class="logo" href="/' + d + '/home">' + LOGO[d] + '<span>' + BRAND[d] + '</span></a><nav aria-label="Pages">' +
      PAGES.map(function (p) { return '<a href="/' + d + '/' + p[0] + '"' + (p[0] === page ? ' aria-current="page"' : '') + '>' + p[1] + '</a>'; }).join('') +
      '</nav><a class="btn" data-mag href="/' + d + '/contact">Request a survey</a></header>';
  }
  function footer(d) {
    return '<footer class="foot"><span>Green Tech Home Installation, Dublin, Ireland</span><span>[PHONE] · [EMAIL]</span><span>*Subject to SEAI eligibility. Photos: Pexels (free licence), standing in for your own.</span></footer>';
  }

  /* ---------- HOME, one per design ---------- */
  var HOME = {
    1: function () {
      return '<section class="hero"><div class="hero-t"><span class="eyebrow rv">External wall insulation · Dublin</span><h1 data-split>A warmer home, wrapped like it was built that way.</h1><p class="lead rv">Rock wool or EPS polystyrene insulation, fitted from the starting rail to the finish. Reinforced, based and rendered by hand, then detailed so it looks designed.</p><div class="btns rv"><a class="btn" data-mag href="/1/contact">Request a survey</a><a class="btn ghost" href="/1/services">See how we build it</a></div></div>' +
        '<div class="hero-v">' + fr(P.house('building'), 'big', .05).replace('class="frame big"', 'class="frame big" data-tilt') + '<span class="chip c1">Rock wool</span><span class="chip c2">EPS polystyrene</span><span class="chip c3">Hand-finished</span></div></section>' +
        marquee() + stats() +
        '<section class="sec"><h2 class="h2 rv">Drag the wall. Brick, then wrapped.</h2><p class="lead rv">A bare brick facade on one side, an insulated and rendered finish on the other.</p>' + cmp(P.house('bare'), P.house('wrapped'), 'Brick facade', 'Wrapped and rendered') + '</section>' +
        '<section class="sec"><h2 class="h2 rv">One crew, from the first rail to the last gutter bracket.</h2><div class="grid3">' + cards(6) + '</div><a class="btn ghost rv" href="/1/services">All six services</a></section>' +
        '<section class="sec"><h2 class="h2 rv">How the wall goes up.</h2>' + fr(P.layers(), 'wide rv') + steps() + '</section>' + cta(1);
    },
    2: function () {
      var rings = [[14, 42], [86, 42], [50, 15], [25, 70], [75, 70]].map(function (r, i) { return '<i class="ring" style="left:' + r[0] + '%;top:' + r[1] + '%;--dl:' + i * .4 + 's"></i>'; }).join('');
      return '<section class="hero"><div class="hero-t"><span class="eyebrow rv">EXTERNAL WALL INSULATION / DUBLIN</span><h1 data-split>Stop heating the street.</h1><p class="lead rv">Heat leaves a house through walls, corners, sills and eaves. We wrap the whole outside in rock wool or EPS polystyrene, from the starting rail to the finish, and treat every thermal bridge on the way.</p><div class="btns rv"><a class="btn" data-mag href="/2/contact">Request a survey</a><a class="btn ghost" href="/2/services">Where heat escapes</a></div></div>' +
        '<div class="hero-v rv z">' + cmp(P.house('thermal'), P.house('wrapped'), 'Heat loss', 'Insulated') + '<small class="note">Drag the scanner. Illustration only, not a measurement. Move your cursor over the page to heat it up.</small></div></section>' +
        marquee() + stats() +
        '<section class="sec split"><div class="rv l">' + fr(P.house('thermal') + rings, 'big hot', .04) + '</div><div><h2 class="h2 rv">Four places a wrap usually fails.</h2>' +
        [['Corners.', 'Two walls meet, the insulation thins. We reinforce and finish them, or form false corner stones over them.'], ['Window reveals and lintels.', 'The wall gets deeper, so the opening needs wrapping, not stopping at the frame.'], ['Sills.', 'New aluminium sills are fitted so water drains clear of the thicker wall.'], ['Eaves and gutters.', 'Gutters and accessories come off and go back on after the wrap.']].map(function (l, i) { return '<div class="leak rv" style="--d:' + i * .12 + 's"><b>0' + (i + 1) + '</b><span><strong>' + l[0] + '</strong> ' + l[1] + '</span></div>'; }).join('') + '</div></section>' +
        '<section class="sec"><h2 class="h2 rv">Method, in four passes.</h2><div class="grid3">' + cards(6) + '</div></section>' + cta(2, 'Find out where your house leaks.');
    },
    3: function () {
      return '<section class="hero"><div class="hero-t"><span class="eyebrow rv">External wall insulation in Dublin</span><h1>Up to <span class="hl"><span data-count="8000" data-pre="€">€0</span></span> off your wall insulation.</h1><p class="lead rv">That is the SEAI grant for a detached home. Pick your house type and see yours. We fit the insulation, the finish and the details.</p><div class="btns rv"><a class="btn" data-mag href="#calc">See my grant</a><span class="small">Subject to SEAI eligibility.</span></div></div>' +
        '<div class="hero-v"><div class="orbit-w"><div class="orbit"><b>€</b></div><div class="orbit o2"><b>%</b></div><div class="disc float">' + P.house('wrapped') + '</div></div></div></section>' +
        marquee() +
        '<section class="sec calc" id="calc"><div class="calc-l"><h2 class="h2 rv">What kind of home do you have?</h2><div class="tabs">' + GRANTS.map(function (g, i) { return '<button class="tb' + (i ? '' : ' on') + '" data-grp="is" data-i="' + i + '">' + g[0].replace(' house', '') + '</button>'; }).join('') + '</div><p>Maximum SEAI grant for external wall insulation by dwelling type. Your actual grant depends on eligibility and your contractor\'s registration.</p><div class="bars">' + GRANTS.map(function (g, i) { return '<i style="--h:' + g[2] + '%;--dl:' + i * .1 + 's" data-bar="' + i + '"></i>'; }).join('') + '</div></div>' +
        '<div class="calc-r">' + GRANTS.map(function (g, i) { return '<div data-grp="is" data-i="' + i + '"' + (i ? ' hidden' : '') + '><div class="pop"><span>' + g[0] + ', up to</span><b class="big">' + g[1] + '</b><div class="meter"><i style="width:' + g[2] + '%"></i></div></div></div>'; }).join('') + '<a class="btn" href="/3/contact">Book a survey</a></div></section>' +
        stats() +
        '<section class="sec"><h2 class="h2 rv">Three steps. Then the house is warm.</h2><div class="grid3">' +
        [['We survey', 'We look at your walls, windows, corners and gutters and plan the details.', 'crew'], ['We insulate', 'Rock wool or EPS polystyrene from the starting rail up, then mesh and basecoat.', 'mesh'], ['We finish', 'Acrylic or trowelled render, aluminium sills fitted, gutters and fittings put back.', 'trowel']].map(function (s, i) { return '<article class="card step3 rv" style="--d:' + i * .12 + 's"><b class="bn">' + (i + 1) + '</b>' + fr(P[s[2]]()) + '<div class="card-b"><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div></article>'; }).join('') + '</div></section>' +
        '<section class="sec split"><div><h2 class="h2 rv">Pick the face your house gets.</h2><div class="tabs">' + ['Acrylic', 'Trowelled', 'Stone'].map(function (n, i) { return '<button class="tb' + (i ? '' : ' on') + '" data-grp="fin" data-i="' + i + '">' + n + '</button>'; }).join('') + '</div><p>Add false lintels, false corner stones or decorative stone on the insulation. Every colour and texture is chosen with you before we start.</p></div><div>' +
        [P.house('wrapped'), P.trowel(), P.stone()].map(function (p, i) { return '<div data-grp="fin" data-i="' + i + '"' + (i ? ' hidden' : '') + '><div class="pop">' + fr(p, 'big') + '</div></div>'; }).join('') + '</div></section>' + cta(3, 'Ready to see what your grant covers?');
    },
    4: function () {
      var dr = function (h, i) { return h.replace('<', '<').replace(/<(rect|line|polyline)/, '<$1 pathLength="1" class="dr" style="--i:' + i + '"'); };
      return '<section class="hero"><div class="sheet hero-sheet rv"><div class="hero-t"><span class="eyebrow type">SHEET 01 / EXTERNAL WALL INSULATION / DUBLIN</span><h1 data-split>Built to the drawing.</h1><p class="lead">Rock wool or EPS polystyrene fitted from the starting rail to the finish. Every layer, opening and thermal bridge detailed before a board goes up.</p><div class="btns"><a class="btn" data-mag href="/4/contact">Request a survey</a><a class="btn ghost" href="/4/services">Read the schedule</a></div></div><div class="stamp" aria-hidden="true">Dublin, IE</div></div></section>' +
        marquee() +
        '<section class="sec"><div class="sheet split draw"><div>' + fr(P.layers(), 'big') + '</div><div><h2 class="h2">Section through the wrap.</h2><p>The wall is built outward in a fixed order. Each layer is checked before the next goes on, so the finish sits on a flat, reinforced base.</p>' +
        '<svg viewBox="0 0 400 150" class="mini" role="img" aria-label="Drawn wall section"><g fill="none" stroke="#BFE3FF" stroke-width="2"><rect class="dr" style="--i:0" pathLength="1" x="30" y="20" width="40" height="100"/><rect class="dr" style="--i:1" pathLength="1" x="70" y="20" width="110" height="100" stroke="#FFD166"/><rect class="dr" style="--i:2" pathLength="1" x="180" y="20" width="12" height="100"/><rect class="dr" style="--i:3" pathLength="1" x="192" y="20" width="26" height="100" fill="#BFE3FF" fill-opacity=".3"/><line class="dr" style="--i:4" pathLength="1" x1="10" y1="132" x2="260" y2="132"/></g><g font-size="11" fill="#D6ECFF" font-family="JetBrains Mono"><text x="30" y="14">INT</text><text x="196" y="14">EXT</text><text x="230" y="60">Finish</text><text x="230" y="80" fill="#FFD166">Rock wool / EPS</text></g></svg></div></div></section>' +
        '<section class="sec"><div class="sheet split flip"><div class="rv">' + fr(P.house('wrapped') + '<i class="pin" style="left:25%;top:55%">1</i><i class="pin" style="left:13%;top:60%">2</i><i class="pin" style="left:38%;top:20%">3</i><i class="pin" style="left:82%;top:78%">4</i>', 'big') + '</div><div><h2 class="h2 rv">Elevation, with details.</h2><div class="legend rv"><div><b>1</b> False lintel over each opening</div><div><b>2</b> False corner stones</div><div><b>3</b> Gutter and accessories removed and refitted</div><div><b>4</b> Aluminium window sill and plinth</div></div></div></div></section>' +
        stats() +
        '<section class="sec"><div class="sheet"><h2 class="h2">Schedule of works.</h2>' + SERV.map(function (s, i) { return '<div class="tbl rv"><b>' + 'ABCDEF'[i] + '</b><b>' + s.t + '</b><span>' + s.d + '</span></div>'; }).join('') + '</div></section>' + cta(4, 'Issue for survey.');
    },
    5: function () {
      return '<section class="hero"><div class="hero-t"><span class="eyebrow rv">External wall insulation / Dublin</span><h1 data-split>The warm part is hidden. The finish is what they see.</h1><p class="lead rv">We insulate with rock wool or EPS polystyrene, then finish the outside by hand: acrylic, trowelled decorative render, false lintels, corner stones and stone.</p><div class="btns rv"><a class="btn" data-mag href="/5/contact">Request a survey</a><a class="btn dark" href="#lib">Browse finishes</a></div></div>' +
        '<div class="hero-v"><div class="fac" data-tilt><div class="fa fa1">' + P.house('wrapped') + '</div><div class="fa fa2">' + P.trowel() + '</div><div class="fa fa3">' + P.stone() + '</div><div class="cap"><span class="c1">Acrylic finish</span><span class="c2">Trowelled render</span><span class="c3">Decorative stone</span></div></div><i class="spark s1"></i><i class="spark s2"></i><i class="spark s3"></i></div></section>' +
        marquee() + stats() +
        '<section class="sec" id="lib"><h2 class="h2 rv">The finish library.</h2><div class="grid3">' +
        [['Acrylic', 'A smooth, coloured acrylic coat over the basecoat. Clean lines, even colour.', 'house'], ['Trowelled decorative render', 'Worked by hand so the texture catches the light. No two walls read the same.', 'trowel'], ['Decorative stone', 'Stone fixed to the insulation for plinths, panels, lintels and false corner stones.', 'stone']].map(function (s, i) { return '<article class="card sw rv" style="--d:' + i * .12 + 's">' + fr(s[2] === 'house' ? P.house('wrapped') : P[s[2]]()) + '<div class="card-b"><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div></article>'; }).join('') + '</div></section>' +
        '<section class="sec split"><div class="rv l"><h2 class="h2">From the starting rail to the last bracket.</h2><p class="lead">We respect all standards and treat every thermal bridge. The finish only looks this good because what is under it is right.</p>' + fr(P.crew(), 'big', .04) + '</div><div class="rail">' +
        [['Starting rail and boards', 'Rock wool or EPS polystyrene, fitted course by course.'], ['Mesh and basecoat', 'Reinforcement embedded for a flat, strong base.'], ['Finish and stone details', 'Acrylic or trowelled render, false lintels, corner stones, decorative stone.'], ['Sills, gutters, fittings', 'Aluminium sills installed. Gutters and facade accessories refitted.']].map(function (s, i) { return '<div class="rv r" style="--d:' + i * .1 + 's"><span class="nd" style="--dl:' + i * .6 + 's"></span><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>'; }).join('') + '</div></section>' + cta(5, 'Choose your finish. We will do the rest.');
    }
  };

  /* ---------- SERVICES / PROJECTS / CONTACT: shared builders, themed by CSS ---------- */
  function services(d) {
    return head(d, 'What we do', 'Everything on the outside of your house.', 'Six jobs, one crew. Each is fitted in order so the next one sits on something right.') +
      '<section class="svcs">' + SERV.map(function (s, i) {
        return '<article class="svc rv ' + (i % 2 ? 'r' : 'l') + '">' + fr(P[s.pic](), 'big', .03) + '<div class="svc-t"><span class="num">0' + (i + 1) + '</span><h3 class="h3">' + s.t + '</h3><p>' + s.d + '</p><ul>' + s.li.map(function (l) { return '<li>' + l + '</li>'; }).join('') + '</ul></div></article>';
      }).join('') + '</section>' + marquee(true) +
      '<section class="sec"><h2 class="h2 rv">Five steps, survey to gutters.</h2>' + steps() + '</section>' + cta(d);
  }
  function projects(d) {
    return head(d, 'Projects', 'The work, up close.', 'Boards, mesh, render, stone, sills and gutters. These photos stand in for your own project photos. Click any one to open it.') +
      '<div class="chips rv" role="group" aria-label="Filter projects"><button class="chip-b on" data-f="all">All</button><button class="chip-b" data-f="insulation">Insulation</button><button class="chip-b" data-f="render">Render and finish</button><button class="chip-b" data-f="stone">Stone</button><button class="chip-b" data-f="windows">Sills and lintels</button><button class="chip-b" data-f="gutters">Gutters</button></div>' +
      '<section class="gal">' + PROJ.map(function (p, i) {
        return '<figure class="proj rv" style="--d:' + (i % 3) * .1 + 's" data-type="' + p[1] + '" data-i="' + i + '" tabindex="0" data-cur><div class="frame" data-tilt>' + P.photo(p[3], p[0]) + '<span class="tag">' + p[2] + '</span></div><figcaption><b>' + p[0] + '</b><span>Open</span></figcaption></figure>';
      }).join('') + '</section>' + cta(d, 'Want your house on this page?');
  }
  function contact(d) {
    var faq = [['What do you insulate with?', 'Rock wool or EPS polystyrene, fitted from the starting rail to the finish.'], ['What finishes can I choose?', 'Acrylic or trowelled decorative render, plus false lintels, false corner stones and decorative stone. Colour and texture are chosen with you before we start.'], ['Do you deal with gutters and sills?', 'Yes. Gutters and facade accessories are removed and reinstalled, and new aluminium window sills are fitted.'], ['Is there a grant?', 'SEAI grants may apply, up to €8,000 for a detached home, subject to eligibility. Registration details: [CONFIRM SEAI REGISTRATION BEFORE PUBLISHING].']];
    return head(d, 'Contact', 'Book a survey for your house.', 'Tell us your Eircode and the best number to reach you.') +
      '<section class="sec split cform"><form class="form rv l" novalidate><label>Name<input name="n" autocomplete="name" required></label><label>Phone<input name="p" type="tel" autocomplete="tel" required></label><label>Eircode<input name="e" required></label><label>House type<select name="t"><option>Detached</option><option>Semi-detached</option><option>Mid-terrace</option><option>Apartment</option></select></label><label>Anything we should know<textarea name="m" rows="3"></textarea></label><button class="btn big" type="submit" data-mag>Request a survey</button><p class="ok" hidden>Thanks. This demo form is not connected to a backend yet, so nothing was sent.</p></form>' +
      '<div class="rv r"><div class="frame map" aria-label="Dublin map"><svg viewBox="0 0 600 400" class="pic"><rect width="600" height="400" fill="var(--panel)"/><g stroke="var(--ink)" stroke-opacity=".12" stroke-width="2">' + [60, 130, 200, 270, 340].map(function (y) { return '<path d="M0 ' + y + 'H600"/>'; }).join('') + [90, 180, 280, 380, 470, 540].map(function (x) { return '<path d="M' + x + ' 0V400"/>'; }).join('') + '</g><path d="M0 250C120 220 200 290 300 250S480 210 600 270" stroke="#4C9FFF" stroke-width="16" fill="none" opacity=".55" class="river"/><g class="radar" style="transform-origin:300px 200px"><path d="M300 200L300 20A180 180 0 0 1 430 70Z" fill="var(--acc)" opacity=".25"/></g><circle class="pr" cx="300" cy="200" r="10" fill="none" stroke="var(--acc)" stroke-width="3"/><circle class="pr" style="--dl:-1s" cx="300" cy="200" r="10" fill="none" stroke="var(--acc)" stroke-width="3"/><circle cx="300" cy="200" r="10" fill="var(--acc)"/><text x="316" y="190" fill="var(--ink)" class="t1">Dublin, Ireland</text></svg></div>' +
      '<div class="info"><div><b>Phone</b><span>[PHONE]</span></div><div><b>Email</b><span>[EMAIL]</span></div><div><b>Area</b><span>Dublin, Ireland</span></div></div></div></section>' +
      '<section class="sec"><h2 class="h2 rv">Questions.</h2><div class="faq">' + faq.map(function (f, i) { return '<details class="rv" style="--d:' + i * .08 + 's"><summary>' + f[0] + '</summary><p>' + f[1] + '</p></details>'; }).join('') + '</div></section>';
  }


export const PAGE_IDS = PAGES.map(function (p) { return p[0]; });
export const DESIGN_NAMES = NAME;
export function renderPage(d, p) {
  CUR = d;
  var body = p === 'home' ? HOME[d]() : p === 'services' ? services(d) : p === 'projects' ? projects(d) : contact(d);
  return header(d, p) + '<main class="pg">' + body + '</main>' + footer(d);
}
export function pageTitle(d, p) {
  var n = PAGES.filter(function (x) { return x[0] === p; })[0][1];
  return (p === 'home' ? '' : n + ' · ') + 'Green Tech Home Installation · ' + NAME[d];
}
export const PROJECTS = PROJ;
