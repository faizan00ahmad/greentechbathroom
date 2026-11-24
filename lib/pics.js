/* Real photographs (free-licence Pexels images in /public/images, see SOURCES.md).
   Replace any file in /public/images with your own project photo using the same name and it updates everywhere. */
function img(file, alt, cls) {
  return '<img class="pic' + (cls ? ' ' + cls : '') + '" src="/images/' + file + '.jpg" alt="' + alt + '" loading="lazy" decoding="async" draggable="false">';
}

export const PIC = {
  photo: img,
  // scenes used across the five designs
  house: function (state) {
    if (state === 'building') return img('ewi-scaffold-2', 'Scaffolding on a building with insulation boards fixed to the wall');
    if (state === 'bare') return img('brick-house', 'Brick house facade before insulation');
    if (state === 'thermal') return img('house-white', 'House shown in a heat-camera style view (illustrative)', 'thermal');
    return img('house-white', 'House with a smooth rendered external finish');
  },
  layers: function () { return img('ewi-scaffold-1', 'Insulation boards fixed over a wall behind scaffolding'); },
  crew: function () { return img('render-workers', 'Crew applying render to an external wall from scaffolding'); },
  mesh: function () { return img('mesh', 'Reinforcing mesh embedded on an insulated facade'); },
  trowel: function () { return img('trowel', 'Trowel applying plaster by hand'); },
  stone: function () { return img('stone-house', 'House with decorative stone detail and white render'); },
  sill: function () { return img('window-lintel', 'Window with a lintel and sill on a rendered wall'); },
  gutter: function () { return img('gutter-rain', 'Gutter running with rain water'); },
  boards: function () { return img('eps-boards', 'White EPS insulation boards fixed on a building'); }
};

// photo catalogue for the Projects page
export const PROJECT_PHOTOS = {
  'ewi-scaffold-2': 'Insulation boards fixed on a scaffolded building',
  'house-build': 'House wrapped in boards, scaffolding in place',
  'eps-boards': 'EPS boards going up on a building',
  'mesh': 'Mesh embedded over the insulation',
  'render-workers': 'Render applied from scaffolding',
  'trowel': 'Hand-finished trowel work',
  'stone-house': 'Stone detail on a rendered house',
  'stone-window': 'Stone cladding with a window sill',
  'window-lintel': 'Lintel and sill on a rendered wall',
  'sill-purple': 'Coloured render with a clean sill',
  'gutter-rain': 'Gutter refitted and working',
  'drainpipe-blue': 'Downpipe on a coloured render finish',
  'house-white': 'Finished white render facade'
};
