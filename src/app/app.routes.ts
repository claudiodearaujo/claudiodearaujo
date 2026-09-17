import { Routes } from '@angular/router';

const section = (title: string, eyebrow: string, description: string) => ({
  title,
  eyebrow,
  description,
});

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pt' },
  {
    path: 'pt',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'pt/work',
    data: section(
      'Selected Work',
      'Work',
      'Projetos e sistemas que representam minha trajetória em engenharia.',
    ),
    loadComponent: () =>
      import('./features/section-placeholder/section-placeholder').then(
        (m) => m.SectionPlaceholder,
      ),
  },
  {
    path: 'pt/engineering',
    data: section(
      'How I Engineer',
      'Engineering',
      'Princípios, decisões e práticas que orientam meu trabalho.',
    ),
    loadComponent: () =>
      import('./features/section-placeholder/section-placeholder').then(
        (m) => m.SectionPlaceholder,
      ),
  },
  {
    path: 'pt/labs',
    data: section('Labs', 'Research', 'Experimentos e pesquisas em sistemas inteligentes.'),
    loadComponent: () =>
      import('./features/section-placeholder/section-placeholder').then(
        (m) => m.SectionPlaceholder,
      ),
  },
  {
    path: 'pt/writing',
    data: section(
      'Writing',
      'Writing',
      'Notas e ensaios sobre engenharia, arquitetura e inteligência artificial.',
    ),
    loadComponent: () =>
      import('./features/section-placeholder/section-placeholder').then(
        (m) => m.SectionPlaceholder,
      ),
  },
  {
    path: 'pt/about',
    data: section(
      'Engineering, intelligence and curiosity',
      'About',
      'Minha trajetória entre software, arquitetura, IA e liderança técnica.',
    ),
    loadComponent: () =>
      import('./features/section-placeholder/section-placeholder').then(
        (m) => m.SectionPlaceholder,
      ),
  },
  {
    path: 'pt/now',
    data: section(
      'Now',
      'Current Focus',
      'Projetos, pesquisas e temas que concentram minha atenção agora.',
    ),
    loadComponent: () =>
      import('./features/section-placeholder/section-placeholder').then(
        (m) => m.SectionPlaceholder,
      ),
  },
  {
    path: 'pt/contact',
    data: section(
      "Let's talk",
      'Contact',
      'Conversas sobre engenharia, IA, arquitetura e liderança técnica.',
    ),
    loadComponent: () =>
      import('./features/section-placeholder/section-placeholder').then(
        (m) => m.SectionPlaceholder,
      ),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
