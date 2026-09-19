import { Routes } from '@angular/router';
import { contentRoutes } from './generated/content-routes.generated';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pt' },
  { path: 'pt', loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage) },
  {
    path: 'pt/work',
    loadComponent: () => import('./features/work/work.page').then((m) => m.WorkPage),
  },
  {
    path: 'pt/engineering',
    loadComponent: () =>
      import('./features/engineering/engineering.page').then((m) => m.EngineeringPage),
  },
  {
    path: 'pt/writing',
    data: {
      title: 'Writing',
      eyebrow: 'Writing',
      description: 'Ensaios sobre engenharia, arquitetura e inteligência artificial.',
      contentType: 'article',
      canonical: '/pt/writing',
      ogImage: '/og/site/writing.png',
    },
    loadComponent: () =>
      import('./features/content-index/content-index.page').then((m) => m.ContentIndexPage),
  },
  {
    path: 'pt/labs',
    data: {
      title: 'Labs',
      eyebrow: 'Research',
      description: 'Experimentos e pesquisas em sistemas inteligentes.',
      contentType: 'lab',
      canonical: '/pt/labs',
      ogImage: '/og/site/labs.png',
    },
    loadComponent: () =>
      import('./features/content-index/content-index.page').then((m) => m.ContentIndexPage),
  },
  ...contentRoutes,
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
