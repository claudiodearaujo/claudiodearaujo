import { Routes } from '@angular/router';
import { contentRoutes } from './generated/content-routes.generated';
import { topicRoutes } from './generated/topic-routes.generated';
import { publishedLocales } from './generated/locales.generated';
import { DEFAULT_LOCALE, Locale, localizedPath } from './core/i18n/locale';

// The pages that exist once per locale and are not content files. Built per
// locale rather than written out, so publishing a language adds its routes
// without editing this file — the same shape `staticSections` generates in
// tools/content/build-content.mjs for the sitemap (E7).
const sectionRoutes = (locale: Locale): Routes => [
  {
    path: locale,
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: `${locale}/work`,
    loadComponent: () => import('./features/work/work.page').then((m) => m.WorkPage),
  },
  {
    path: `${locale}/engineering`,
    loadComponent: () =>
      import('./features/engineering/engineering.page').then((m) => m.EngineeringPage),
  },
  {
    path: `${locale}/engineering/decisions`,
    loadComponent: () =>
      import('./features/engineering-decisions/engineering-decisions.page').then(
        (m) => m.EngineeringDecisionsPage,
      ),
  },
  {
    path: `${locale}/writing`,
    data: {
      locale,
      title: 'Writing',
      eyebrow: 'Writing',
      description: 'Ensaios sobre engenharia, arquitetura e inteligência artificial.',
      contentType: 'article',
      canonical: localizedPath('writing', locale),
      ogImage: '/og/site/writing.png',
    },
    loadComponent: () =>
      import('./features/content-index/content-index.page').then((m) => m.ContentIndexPage),
  },
  {
    path: `${locale}/labs`,
    data: {
      locale,
      title: 'Labs',
      eyebrow: 'Research',
      description: 'Experimentos e pesquisas em sistemas inteligentes.',
      contentType: 'lab',
      canonical: localizedPath('labs', locale),
      ogImage: '/og/site/labs.png',
    },
    loadComponent: () =>
      import('./features/content-index/content-index.page').then((m) => m.ContentIndexPage),
  },
];

export const routes: Routes = [
  // Kept alongside the edge redirect in render.yaml, which is what a crawler
  // actually gets; this is the fallback for any host that ignores it (D20).
  { path: '', pathMatch: 'full', redirectTo: DEFAULT_LOCALE },
  ...publishedLocales.flatMap(sectionRoutes),
  ...contentRoutes,
  ...topicRoutes,
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
