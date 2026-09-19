import { RenderMode, ServerRoute } from '@angular/ssr';

// Every route is enumerated at build time (content and topic routes are
// generated), so this one entry prerenders the whole site.
//
// No `fallback` here on purpose: `PrerenderFallback` only types against a
// prerender route that declares `getPrerenderParams`, and this app has no
// parameterised routes left to fall back for. There is also no server behind
// the static host that could answer one — an unmatched path is the host's
// 404, which tools/launch/emit-404.mjs publishes.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
