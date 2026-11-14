// Keeps the last two words of a text block together so no line ends with a
// single stranded word. Runs after render and again when page content changes
// (wizard steps, tabs). The CSS in globals.css (text-wrap balance and pretty)
// does most of the work; this covers the cases Chrome's heuristics decline:
// narrow cards and short headings.

const SELECTOR = [
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "dd", "dt",
  "blockquote", "figcaption", "td", "th", "label", "legend", ".lead", ".k", ".ft",
].flatMap((s) => [`main ${s}`, `footer ${s}`]).join(",");

const NBSP = "\u00a0";
const NBHY = "\u2011"; // non-breaking hyphen: the last word does not split at its own hyphen

function lastTextNode(el: Element): Text | null {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last: Text | null = null;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if (/\S/.test(n.nodeValue ?? "")) last = n as Text;
  return last;
}

function widthOf(node: Text, start: number, end: number): number {
  const r = document.createRange();
  r.setStart(node, start);
  r.setEnd(node, end);
  // Sum the fragments: a word that breaks at a hyphen spans two lines.
  return Array.from(r.getClientRects()).reduce((w, rc) => w + rc.width, 0);
}

function glue(el: HTMLElement) {
  if (el.closest("pre, code, textarea, [contenteditable], [data-no-glue]")) return;
  const words = (el.textContent ?? "").trim().split(/\s+/);
  if (words.length < 3) return;
  const node = lastTextNode(el);
  if (!node) return;
  const v = node.nodeValue ?? "";
  const end = v.trimEnd().length;
  const space = v.lastIndexOf(" ", end - 1);
  if (space <= 0) return; // the boundary sits across elements
  if (v.slice(space + 1, end).includes(NBSP)) return; // already joined: never join more than two words
  const prevStart = v.lastIndexOf(" ", space - 1) + 1;
  // Measure each word on its own: a range across a line break reports the full line width.
  // Never force a pair that would not fit on one line.
  const pair = widthOf(node, prevStart, space) + widthOf(node, space + 1, end) + 6;
  const avail = el.clientWidth || el.getBoundingClientRect().width;
  if (!avail) return;
  const last = v.slice(space + 1, end).replace(/-/g, NBHY);
  if (pair > avail * 0.95) {
    // Too wide to join: at least keep a hyphenated last word in one piece.
    if (last !== v.slice(space + 1, end) && widthOf(node, space + 1, end) < avail * 0.95) node.nodeValue = v.slice(0, space + 1) + last + v.slice(end);
    return;
  }
  node.nodeValue = v.slice(0, space) + NBSP + last + v.slice(end);
}

export function installNoOrphans(): () => void {
  if (typeof window === "undefined") return () => {};
  let timer = 0;
  const run = () => document.querySelectorAll<HTMLElement>(SELECTOR).forEach(glue);
  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 120);
  };
  run();
  document.fonts?.ready.then(run).catch(() => undefined);
  const main = document.querySelector("main");
  const mo = new MutationObserver(schedule);
  if (main) mo.observe(main, { childList: true, subtree: true });
  return () => {
    window.clearTimeout(timer);
    mo.disconnect();
  };
}
