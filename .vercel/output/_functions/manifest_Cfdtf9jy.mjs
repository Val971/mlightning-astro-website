import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D7aQp3tG.mjs';
import 'es-module-lexer';
import { f as decodeKey } from './chunks/astro/server_CBzapxIs.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/KASKOD/mlightning-astro-website/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"mentions-legales/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/mentions-legales","isIndex":false,"type":"page","pattern":"^\\/mentions-legales\\/?$","segments":[[{"content":"mentions-legales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mentions-legales.astro","pathname":"/mentions-legales","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"politique-de-confidentialite/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/politique-de-confidentialite","isIndex":false,"type":"page","pattern":"^\\/politique-de-confidentialite\\/?$","segments":[[{"content":"politique-de-confidentialite","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politique-de-confidentialite.astro","pathname":"/politique-de-confidentialite","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://mlightning-custom.fr","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/KASKOD/mlightning-astro-website/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/KASKOD/mlightning-astro-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/KASKOD/mlightning-astro-website/src/pages/mentions-legales.astro",{"propagation":"none","containsHead":true}],["C:/KASKOD/mlightning-astro-website/src/pages/politique-de-confidentialite.astro",{"propagation":"none","containsHead":true}],["C:/KASKOD/mlightning-astro-website/src/pages/services/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/mentions-legales@_@astro":"pages/mentions-legales.astro.mjs","\u0000@astro-page:src/pages/politique-de-confidentialite@_@astro":"pages/politique-de-confidentialite.astro.mjs","\u0000@astro-page:src/pages/services/[slug]@_@astro":"pages/services/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/KASKOD/mlightning-astro-website/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_Cfdtf9jy.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.Ce3lnQmB.js","/astro/hoisted.js?q=0":"_astro/hoisted.DjCsK6Ma.js","/astro/hoisted.js?q=2":"_astro/hoisted.8NcM9Yop.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/syne-latin-ext-wght-normal.JjI8ZrW1.woff2","/_astro/syne-greek-wght-normal.5tOOQDeJ.woff2","/_astro/syne-latin-wght-normal.BVsvWWA4.woff2","/_astro/manrope-greek-wght-normal.DL7QRZyv.woff2","/_astro/manrope-vietnamese-wght-normal.usUDDRr7.woff2","/_astro/manrope-latin-ext-wght-normal.Ch3YOpNY.woff2","/_astro/manrope-latin-wght-normal.DHIcAJRg.woff2","/_astro/manrope-cyrillic-wght-normal.Dvxsihut.woff2","/_astro/index.DOWUlZzD.css","/robots.txt","/images/carousel1.jpg","/images/carousel1.webp","/images/carousel2.jpg","/images/carousel2.webp","/images/carousel3.jpg","/images/carousel3.webp","/images/favicon.png","/images/instagram_Icon.png","/images/logo-holo-cropped.png","/images/logo-holo-cropped.webp","/images/logo-holo-cropped2.png","/images/logo-holo.png","/images/og-image.jpg","/images/PHOTO-2024-11-07-21-38-48.jpg","/images/PHOTO-2024-11-07-21-38-48.webp","/images/PHOTO-2024-11-07-21-41-57-2.jpg","/images/PHOTO-2024-11-07-21-41-57-2.webp","/images/PHOTO-2024-11-07-21-41-57.jpg","/images/PHOTO-2024-11-07-21-41-57.webp","/images/snaptchat_Icon.png","/images/tiktok_Icon.png","/videos/VIDEO-2024-05-15-16-35-28.mp4","/videos/VIDEO-2024-05-15-16-35-32.mp4","/videos/VIDEO-2024-05-15-16-35-39.mp4","/videos/videoPlayer.mp4","/videos/videoPlayer2.mp4","/videos/videoPlayer2.original.mp4.bak","/_astro/hoisted.8NcM9Yop.js","/_astro/hoisted.Ce3lnQmB.js","/_astro/hoisted.DjCsK6Ma.js","/404.html","/mentions-legales/index.html","/politique-de-confidentialite/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"PhcB6fDXh2HbQWB2SfcqPys/mVo2SR39Y+/Y1BMQa1k=","experimentalEnvGetSecretEnabled":false});

export { manifest };
