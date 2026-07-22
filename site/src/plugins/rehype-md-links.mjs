import path from 'node:path';

// Rewrites relative Markdown links (e.g. `slope.md`, `./slope.md`,
// `../unit-2/index.md#frag`) to clean, base-prefixed site routes.
//
// Why this exists: Starlight's content-layer loader (`docsLoader`) does NOT
// rewrite relative `.md` links in Markdown body content — they are emitted
// verbatim and 404 under the site `base`. This plugin resolves each link
// against the SOURCE file's location (which is flat/stable), so the same
// `slope.md` link works identically from every page regardless of the
// nested URL it is served at.
const DOCS_ROOT = 'src/content/docs';

export default function rehypeMdLinks({ base = '' } = {}) {
  const basePrefix = base.replace(/\/+$/, '');

  return function (tree, file) {
    const abs = (file?.path || file?.history?.[0] || '').replace(/\\/g, '/');
    const marker = DOCS_ROOT + '/';
    const at = abs.indexOf(marker);
    if (at === -1) return;

    const relFromDocs = abs.slice(at + marker.length); // e.g. levels/grade10/unit-1-linear-relations/cartesian-plane.md
    const currentDir = path.posix.dirname(relFromDocs); // levels/grade10/unit-1-linear-relations

    const visit = (node) => {
      if (
        node.type === 'element' &&
        node.tagName === 'a' &&
        node.properties &&
        typeof node.properties.href === 'string'
      ) {
        node.properties.href = rewrite(node.properties.href, currentDir, basePrefix);
      }
      if (node.children) for (const child of node.children) visit(child);
    };
    visit(tree);
  };
}

function rewrite(href, currentDir, basePrefix) {
  // Skip protocol-absolute (http:, mailto:), root-absolute (/…), and pure anchors (#…)
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('/') || href.startsWith('#')) {
    return href;
  }
  const [pathPart, hash] = href.split('#');
  if (!/\.mdx?$/i.test(pathPart)) return href; // only rewrite links to .md/.mdx files

  const targetRel = path.posix.normalize(path.posix.join(currentDir, pathPart)); // levels/.../slope.md
  let route = targetRel.replace(/\.mdx?$/i, ''); // levels/.../slope
  route = route.replace(/(^|\/)index$/, ''); // index -> its directory

  let url = (basePrefix + '/' + route).replace(/\/{2,}/g, '/');
  if (!url.endsWith('/')) url += '/';
  return hash ? `${url}#${hash}` : url;
}
