import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DvexuK-D.mjs';
import { manifest } from './manifest_Cfdtf9jy.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/mentions-legales.astro.mjs');
const _page4 = () => import('./pages/politique-de-confidentialite.astro.mjs');
const _page5 = () => import('./pages/services/_slug_.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/mentions-legales.astro", _page3],
    ["src/pages/politique-de-confidentialite.astro", _page4],
    ["src/pages/services/[slug].astro", _page5],
    ["src/pages/index.astro", _page6]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5f067a7e-d3dc-493d-b0dc-9193a0a01b7f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
