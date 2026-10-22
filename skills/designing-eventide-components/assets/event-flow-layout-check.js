// Finds the layout faults of a page drawn from event-flow-template.html before it is published, such as
// boxes that overlap or an arrow drawn through a box. Run it in the page; every list in the result must be empty.
await (async () => {
  const button = [...document.querySelectorAll("button")]
    .find(b => b.textContent.trim() === "Copy for excalidraw.com");
  if (!button) throw new Error("The page has no \"Copy for excalidraw.com\" button: it is not drawn from event-flow-template.html");

  // The template keeps its scene private; its copy button is the way to read the scene as drawn.
  const writeText = navigator.clipboard.writeText;
  let copied = null;
  navigator.clipboard.writeText = text => { copied = text; return Promise.resolve(); };
  try {
    button.click();
    await new Promise(resolve => setTimeout(resolve, 200));
  } finally {
    navigator.clipboard.writeText = writeText;
  }
  if (!copied) throw new Error("The page copied nothing: wait until its status line says that it is live, then run the check again");
  const elements = JSON.parse(copied).elements;
  const byId = {};
  elements.forEach(e => { byId[e.id] = e; });

  const bounds = e => {
    if (e.points) {
      const xs = e.points.map(p => e.x + p[0]), ys = e.points.map(p => e.y + p[1]);
      return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
    }
    return { x0: e.x, y0: e.y, x1: e.x + e.width, y1: e.y + e.height };
  };
  const overlap = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
  const within = (a, b) => a.x0 >= b.x0 - 1 && a.x1 <= b.x1 + 1 && a.y0 >= b.y0 - 1 && a.y1 <= b.y1 + 1;
  // Whether the segment p–q enters the box (Liang–Barsky). The inset keeps an arrow that ends on a side from counting.
  const crosses = (p, q, box, inset) => {
    const dx = q[0] - p[0], dy = q[1] - p[1];
    const ps = [-dx, dx, -dy, dy];
    const qs = [p[0] - (box.x0 + inset), (box.x1 - inset) - p[0], p[1] - (box.y0 + inset), (box.y1 - inset) - p[1]];
    let t0 = 0, t1 = 1;
    for (let i = 0; i < 4; i++) {
      if (ps[i] === 0) {
        if (qs[i] < 0) return false;
      } else {
        const t = qs[i] / ps[i];
        if (ps[i] < 0) { if (t > t1) return false; if (t > t0) t0 = t; }
        else { if (t < t0) return false; if (t < t1) t1 = t; }
      }
    }
    return t0 < t1;
  };
  const segments = arrow => {
    const points = arrow.points.map(p => [arrow.x + p[0], arrow.y + p[1]]);
    return points.slice(1).map((q, i) => [points[i], q]);
  };
  const crossesAny = (arrow, box, inset) => segments(arrow).some(([p, q]) => crosses(p, q, box, inset));

  const rectangles = elements.filter(e => e.type === "rectangle" && !e.id.includes("-lane-"));
  // Messages and notes. A list's grey box lies inside its message, so it is not one of them.
  const boxes = rectangles.filter(r => !rectangles.some(o => o !== r && within(bounds(r), bounds(o))));
  const arrows = elements.filter(e => e.type === "arrow");
  const ownBox = id => boxes.filter(b => id.startsWith(b.id + "-")).sort((a, b) => b.id.length - a.id.length)[0];
  const ends = arrow => [arrow.startBinding && arrow.startBinding.elementId, arrow.endBinding && arrow.endBinding.elementId];

  const faults = { overlappingBoxes: [], arrowsThroughBoxes: [], crossedLabels: [], textOutsideItsBox: [], outsideItsPanel: [] };

  boxes.forEach((a, i) => boxes.slice(i + 1).forEach(b => {
    if (a.frameId === b.frameId && overlap(bounds(a), bounds(b))) faults.overlappingBoxes.push(a.id + " and " + b.id);
  }));

  arrows.forEach(arrow => boxes.forEach(box => {
    if (box.frameId === arrow.frameId && !ends(arrow).includes(box.id) && crossesAny(arrow, bounds(box), 2)) {
      faults.arrowsThroughBoxes.push(arrow.id + " through " + box.id);
    }
  }));

  elements.filter(e => e.type === "text" && !e.id.includes("-lane-")).forEach(text => {
    const owner = ownBox(text.id);
    if (owner) {
      if (!within(bounds(text), bounds(owner))) faults.textOutsideItsBox.push(text.id);
      return;
    }
    // A link's label: no other arrow may cross it, and it may not sit on a box.
    const own = text.id.replace(/-label$/, "");
    arrows.forEach(arrow => {
      if (arrow.id !== own && arrow.frameId === text.frameId && crossesAny(arrow, bounds(text), 1)) {
        faults.crossedLabels.push(text.id + " crossed by " + arrow.id);
      }
    });
    boxes.forEach(box => {
      if (box.frameId === text.frameId && overlap(bounds(text), bounds(box))) faults.crossedLabels.push(text.id + " on " + box.id);
    });
  });

  elements.forEach(e => {
    const frame = byId[e.frameId];
    if (frame && e.type !== "frame" && !within(bounds(e), bounds(frame))) faults.outsideItsPanel.push(e.id);
  });

  return faults;
})();
